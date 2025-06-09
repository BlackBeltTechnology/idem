import os
import platform
import subprocess
import shutil
import sys

# --- Requirement: gitignore-parser ---
try:
    from gitignore_parser import parse_gitignore
except ImportError:
    print("Error: The 'gitignore-parser' library is required.", file=sys.stderr)
    print("Please install it by running: pip install gitignore-parser", file=sys.stderr)
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
    supported_extensions = (".ts", ".java", ".g4")

    # --- Use the new GitignoreManager ---
    ignore_manager = GitignoreManager(start_path)

    for root, dirs, files in os.walk(start_path, topdown=True):
        # --- Prune ignored directories ---
        # We must check a copy of 'dirs' because we modify it in-place.
        for d in list(dirs):
            dir_path = os.path.join(root, d)
            if ignore_manager.is_ignored(dir_path):
                dirs.remove(d)

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

# The following functions remain unchanged, but are included for completeness
def copy_to_clipboard(text: str):
    """Copies the given text to the system clipboard (macOS & Linux)."""
    os_name = platform.system()
    try:
        if os_name == 'Darwin':
            subprocess.run(['pbcopy'], input=text.encode('utf-8'), check=True)
            print("✅ Prompt copied to clipboard for macOS.")
        elif os_name == 'Linux':
            if shutil.which('xclip'):
                subprocess.run(['xclip', '-selection', 'clipboard'], input=text.encode('utf-8'), check=True)
                print("✅ Prompt copied to clipboard using xclip.")
            elif shutil.which('xsel'):
                subprocess.run(['xsel', '--clipboard', '--input'], input=text.encode('utf-8'), check=True)
                print("✅ Prompt copied to clipboard using xsel.")
            else:
                print("⚠️ Could not copy to clipboard. Please install 'xclip' or 'xsel'.", file=sys.stderr)
                print("\n--- PROMPT CONTENT (printing as fallback) ---\n", file=sys.stderr)
                print(text)
        else:
            print(f"⚠️ Clipboard functionality not supported for {os_name}.", file=sys.stderr)
            print("\n--- PROMPT CONTENT (printing as fallback) ---\n", file=sys.stderr)
            print(text)
    except subprocess.CalledProcessError as e:
        print(f"Error: Clipboard command failed: {e}", file=sys.stderr)
        print("\n--- PROMPT CONTENT (printing as fallback) ---\n", file=sys.stderr)
        print(text)

def create_gemini_prompt(source_files):
    """Formats the source file data into a string suitable for a Gemini prompt."""
    if not source_files:
        return ""
    prompt = "Here is the source code from my project:\n\n"
    for file_info in source_files:
        prompt += f"--- FILE: {file_info['file_path']} ---\n"
        prompt += f"```\n{file_info['content']}\n```\n\n"
    return prompt

if __name__ == "__main__":
    project_directory = "."

    print(f"Scanning project in: {os.path.abspath(project_directory)}", file=sys.stderr)
    found_files = find_source_files(project_directory)

    if found_files:
        print(f"Found {len(found_files)} source files to include.", file=sys.stderr)
        gemini_prompt_text = create_gemini_prompt(found_files)
        copy_to_clipboard(gemini_prompt_text)
    else:
        print("No matching source files found (after respecting all .gitignore files).", file=sys.stderr)
