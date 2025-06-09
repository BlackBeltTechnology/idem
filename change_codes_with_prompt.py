import os
import platform
import subprocess
import shutil
import sys
import argparse
import tempfile

# --- Requirement: gitignore-parser ---
try:
    from gitignore_parser import parse_gitignore
except ImportError:
    print("Error: The 'gitignore-parser' library is required.", file=sys.stderr)
    print("Please install it by running: pip install gitignore-parser", file=sys.stderr)
    sys.exit(1)

# --- Requirement: google-generativeai ---
try:
    import google.generativeai as genai
except ImportError:
    print("Error: The 'google-generativeai' library is required.", file=sys.stderr)
    print("Please install it by running: pip install google-generativeai", file=sys.stderr)
    sys.exit(1)


class GitignoreManager:
    """
    Manages and applies .gitignore rules from multiple locations in a project.

    This class finds all .gitignore files in a directory tree, parses them,
    and can then determine if any given file path should be ignored. It correctly
    handles the cascading nature of gitignore rules, where rules in subdirectories
    override rules from parent directories.
    """
    def __init__(self, start_path):
        self.start_path = os.path.abspath(start_path)
        self.matchers = {}

        print("Scanning for all .gitignore files...", file=sys.stderr)
        for root, _, files in os.walk(self.start_path, topdown=True):
            if '.gitignore' in files:
                gitignore_path = os.path.join(root, '.gitignore')
                # The base_dir for patterns is the directory containing the .gitignore
                base_dir = os.path.dirname(gitignore_path)
                try:
                    matcher = parse_gitignore(gitignore_path, base_dir=base_dir)
                    self.matchers[base_dir] = matcher
                except Exception as e:
                    print(f"⚠️ Warning: Could not parse {gitignore_path}: {e}", file=sys.stderr)

        count = len(self.matchers)
        if count > 0:
            print(f"✅ Loaded rules from {count} .gitignore file(s).", file=sys.stderr)

    def is_ignored(self, file_path):
        """
        Checks if a file or directory path is ignored by any relevant .gitignore.

        It checks rules from the deepest .gitignore file upwards to the root.
        The first rule (ignore or re-include) found determines the outcome.
        """
        path_to_check = os.path.abspath(file_path)

        # Start from the file's own directory and walk up to the project root
        current_dir = os.path.dirname(path_to_check)

        while current_dir.startswith(self.start_path):
            if current_dir in self.matchers:
                matcher = self.matchers[current_dir]
                if matcher(path_to_check):
                    return True # Ignored by a rule at this level

            if current_dir == self.start_path:
                break
            current_dir = os.path.dirname(current_dir)

        return False # Not ignored by any rule


def find_source_files(start_path):
    """
    Scans for source files, respecting all .gitignore files in the tree.
    """
    source_files = []
    supported_extensions = (".ts", ".java", ".g4", ".py", ".js", ".html", ".css", ".md")

    # --- Use the new GitignoreManager ---
    ignore_manager = GitignoreManager(start_path)

    for root, dirs, files in os.walk(start_path, topdown=True):
        # --- Prune ignored directories ---
        # We must check a copy of 'dirs' because we modify it in-place.
        dirs[:] = [d for d in dirs if not ignore_manager.is_ignored(os.path.join(root, d))]


        # --- Process allowed files ---
        for file in files:
            full_path = os.path.join(root, file)

            if ignore_manager.is_ignored(full_path):
                continue

            if file.endswith(supported_extensions):
                relative_path = os.path.relpath(full_path, start_path)
                try:
                    with open(full_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    source_files.append({
                        "file_path": relative_path,
                        "content": content
                    })
                except Exception as e:
                    print(f"Error reading file {full_path}: {e}", file=sys.stderr)
    return source_files


def copy_to_clipboard(text: str):
    """Copies the given text to the system clipboard (macOS & Linux)."""
    os_name = platform.system()
    try:
        if os_name == 'Darwin':
            subprocess.run(['pbcopy'], input=text.encode('utf-8'), check=True)
            print("✅ Prompt context copied to clipboard for macOS.")
        elif os_name == 'Linux':
            if shutil.which('xclip'):
                subprocess.run(['xclip', '-selection', 'clipboard'], input=text.encode('utf-8'), check=True)
                print("✅ Prompt context copied to clipboard using xclip.")
            elif shutil.which('xsel'):
                subprocess.run(['xsel', '--clipboard', '--input'], input=text.encode('utf-8'), check=True)
                print("✅ Prompt context copied to clipboard using xsel.")
            else:
                print("⚠️ Could not copy to clipboard. Please install 'xclip' or 'xsel'.", file=sys.stderr)
    except subprocess.CalledProcessError as e:
        print(f"Error: Clipboard command failed: {e}", file=sys.stderr)


def create_context_prompt(source_files):
    """Formats the source file data into a string for context."""
    if not source_files:
        return ""
    # Sort files by path for consistent ordering
    sorted_files = sorted(source_files, key=lambda x: x['file_path'])
    prompt = "Here is the source code from my project. Review it carefully.\n\n"
    for file_info in sorted_files:
        prompt += f"--- FILE: {file_info['file_path']} ---\n"
        prompt += f"```\n{file_info['content']}\n```\n\n"
    return prompt


def call_gemini_api(full_prompt):
    """
    Calls the Gemini API and streams the response to the console,
    while also returning the full response for processing.
    """
    print("🤖 Calling Gemini API and streaming response...", file=sys.stderr)
    try:
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        model = genai.GenerativeModel('gemini-1.5-pro-latest')

        safety_settings = [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
        ]

        # Use stream=True to get a streaming response
        streaming_response = model.generate_content(
            full_prompt,
            stream=True,
            safety_settings=safety_settings
        )

        collected_response_parts = []
        print("\n--- Start of Gemini Response Stream ---\n", file=sys.stderr)

        # Iterate over the streaming response
        for chunk in streaming_response:
            if chunk.text:
                # Print each chunk to the console as it arrives
                sys.stdout.write(chunk.text)
                sys.stdout.flush()
                # Collect the parts for the full response
                collected_response_parts.append(chunk.text)

        print("\n\n--- End of Gemini Response Stream ---\n", file=sys.stderr)

        # Join the collected parts into a single string
        full_response_text = "".join(collected_response_parts)

        if not full_response_text.strip():
            print("⚠️ Warning: Received an empty response from the API.", file=sys.stderr)
            return None

        # The AI often wraps each file's diff in markdown fences (```diff ... ```).
        # We must remove all occurrences of these to create a valid patch file.
        diff_content = full_response_text.replace("```diff", "").replace("```", "").strip()

        print("✅ Stream finished.", file=sys.stderr)
        return diff_content

    except Exception as e:
        print(f"❌ Error calling Gemini API: {e}", file=sys.stderr)
        return None

def _sanitize_patch_content(patch_content: str) -> str:
    """
    Pre-processes raw patch text to fix common, correctable AI errors.

    This version handles:
    1.  Mismatched '--- a/' and '+++ b/' paths.
    2.  Incorrectly concatenated patches (missing newlines between file hunks).
    3.  General markdown fence cleanup.
    """
    # First, do a general cleanup of markdown fences.
    content = patch_content.replace("```diff", "").replace("```", "").strip()

    # Split the entire content by the '--- a/' delimiter.
    patch_chunks = list(filter(None, content.split('--- a/')))

    clean_full_patch = []
    for chunk in patch_chunks:
        # Restore the header to the chunk. We use rstrip() to remove trailing
        # whitespace from the chunk itself without removing the vital newlines
        # within it.
        current_patch = ("--- a/" + chunk.rstrip())
        lines = current_patch.splitlines()

        if not lines:
            continue

        # Correct the '+++ b/...' path if it's mismatched.
        from_path_line = lines[0]
        if len(lines) > 1 and lines[1].startswith('+++ b/'):
            expected_to_path = '+++ b/' + from_path_line[len('--- a/'):]
            if lines[1] != expected_to_path:
                print(f"⚠️  Warning: Corrected mismatched patch path.", file=sys.stderr)
                print(f"   Original: {lines[1]}", file=sys.stderr)
                print(f"   Corrected: {expected_to_path}", file=sys.stderr)
                lines[1] = expected_to_path

        # Rebuild the cleaned chunk as a single string.
        rebuilt_chunk = "\n".join(lines)

        # *** THE CRUCIAL FIX IS HERE ***
        # Ensure the processed chunk always ends with a newline before being
        # added to the list. This guarantees separation in the final patch.
        if not rebuilt_chunk.endswith('\n'):
            rebuilt_chunk += '\n'

        clean_full_patch.append(rebuilt_chunk)

    # Join the sanitized chunks. Since each now ends with a newline, we can
    # simply concatenate them.
    return "".join(clean_full_patch)

def apply_git_patch(patch_content):
    """
    Sanitizes, saves, and applies the patch content using git.
    If the patch fails, it prints a detailed error and preserves the patch file.
    """
    if not patch_content or not patch_content.strip():
        print("No patch content to apply.", file=sys.stderr)
        return

    print("🔬 Sanitizing patch content for common errors...", file=sys.stderr)
    sanitized_content = _sanitize_patch_content(patch_content)

    # Create a temporary file to store the patch
    # The 'delete=False' flag is crucial because we manage deletion manually.
    with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix=".patch", encoding='utf-8') as patch_file:
        patch_file.write(sanitized_content)
        patch_filename = patch_file.name

    try:
        print(f"Attempting to apply sanitized patch stored in: {patch_filename}", file=sys.stderr)

        # Use git apply to patch the files
        # We add --reject to create .rej files for hunks that fail
        result = subprocess.run(
            ['git', 'apply', '--reject', '--unidiff-zero', '--inaccurate-eof', patch_filename],
            capture_output=True, text=True, check=False # check=False prevents raising an exception
        )

        if result.returncode == 0:
            print("✅ Successfully applied the patch.", file=sys.stderr)
            # On success, clean up the patch file
            os.remove(patch_filename)
        else:
            # This block handles the patching failure gracefully.
            print("\n❌❌❌ ERROR: The patch could not be applied cleanly. ❌❌❌", file=sys.stderr)
            print("This can happen due to content errors (like stray characters) that cannot be auto-corrected.", file=sys.stderr)
            print("Your local files may have been partially modified. Look for '.rej' files.", file=sys.stderr)
            print(f"The failed patch has been saved for inspection: {patch_filename}", file=sys.stderr)
            print("\n--- Why this might happen ---", file=sys.stderr)
            print("1. The AI generated a malformed or incorrect patch for some hunks (e.g., content errors).")
            print("2. Your local files have changed since the script was started.")
            print("\n--- Git Error Details ---", file=sys.stderr)
            if result.stdout:
                print(result.stdout, file=sys.stderr)
            if result.stderr:
                print(result.stderr, file=sys.stderr)
            print("\nContinuing script execution...", file=sys.stderr)

    except Exception as e:
        print(f"❌ An unexpected error occurred during the patching process: {e}", file=sys.stderr)
        if 'patch_filename' in locals() and os.path.exists(patch_filename):
            print(f"The patch file is available at: {patch_filename}", file=sys.stderr)

if __name__ == "__main__":
    # --- Check for prerequisites ---
    if not shutil.which('git'):
        print("Error: 'git' command not found. Please install Git and ensure it's in your PATH.", file=sys.stderr)
        sys.exit(1)

    if "GEMINI_API_KEY" not in os.environ:
        print("Error: The 'GEMINI_API_KEY' environment variable is not set.", file=sys.stderr)
        sys.exit(1)

    # --- Argument Parsing ---
    parser = argparse.ArgumentParser(
        description="Scan a project, send it to Gemini for modifications, and apply the response as a git patch.",
        formatter_class=argparse.RawTextHelpFormatter
    )
    parser.add_argument(
        '--prompt',
        help="The instruction or prompt for the AI. If not provided, reads from stdin."
    )
    args = parser.parse_args()

    # --- Get User Prompt ---
    user_prompt = ""
    if args.prompt:
        user_prompt = args.prompt
    else:
        if not sys.stdin.isatty():
            # Read from a pipe
            print("Reading prompt from stdin...", file=sys.stderr)
            user_prompt = sys.stdin.read()
        else:
            # Prompt user for input directly
            print("Please enter your prompt (end with Ctrl-D on Linux/macOS or Ctrl-Z on Windows):", file=sys.stderr)
            user_prompt = sys.stdin.read()

    if not user_prompt.strip():
        print("Error: Prompt is empty. Nothing to do.", file=sys.stderr)
        sys.exit(1)


    # --- Main Execution ---
    project_directory = "."
    print(f"Scanning project in: {os.path.abspath(project_directory)}", file=sys.stderr)
    found_files = find_source_files(project_directory)

    if found_files:
        print(f"Found {len(found_files)} source files to include in context.", file=sys.stderr)

        # 1. Create the context part of the prompt
        context_prompt = create_context_prompt(found_files)
        copy_to_clipboard(context_prompt) # Copy for debugging or manual use if needed

        # 2. Construct the final prompt for the AI
        final_prompt = (
            f"{context_prompt}"
            "Based on the source code provided, please perform the following task:\n\n"
            f"--- TASK ---\n{user_prompt}\n\n"
            "--- INSTRUCTIONS ---\n"
            "Your response MUST be ONLY a git diff patch file. Do not include any other text, "
            "explanations, or code blocks. Just the raw diff content."
        )

        # 3. Call the API
        api_response = call_gemini_api(final_prompt)

        # 4. Apply the response as a patch
        if api_response:
            apply_git_patch(api_response)

    else:
        print("No matching source files found (after respecting all .gitignore files).", file=sys.stderr)