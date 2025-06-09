import os
import platform
import subprocess
import shutil
import sys
import argparse
import tempfile
from abc import ABC, abstractmethod
import time
import random
import fnmatch

# --- Prerequisites ---
try:
    from gitignore_parser import parse_gitignore
except ImportError:
    print("Error: 'gitignore-parser' is required. `pip install gitignore-parser`", file=sys.stderr); sys.exit(1)
try:
    import google.generativeai as genai
    from google.api_core import exceptions as google_exceptions
except ImportError:
    print("Error: 'google-generativeai' is required. `pip install google-generativeai`", file=sys.stderr); sys.exit(1)
try:
    import anthropic
except ImportError:
    print("Error: 'anthropic' is required. `pip install anthropic`", file=sys.stderr); sys.exit(1)
try:
    import openai
except ImportError:
    print("Error: 'openai' is required. `pip install openai`", file=sys.stderr); sys.exit(1)


# --- Constants ---
MAX_API_RETRIES = 3
MODEL_MAP = {
    "claude-opus": "claude-3-opus-20240229",
    "claude-sonnet": "claude-3-5-sonnet-20240620",
    "claude-haiku": "claude-3-haiku-20240307",
    "gemini-pro": "gemini-1.5-pro-latest",
    "openai-gpt4o": "gpt-4o",
    "openai-gpt4-turbo": "gpt-4-turbo",
}

# --- AI Client Abstraction (Supporting Dual Workflows) ---
class AIClient(ABC):
    @abstractmethod
    def get_full_file_rewrite(self, system_prompt, user_prompt): pass
    @abstractmethod
    def stream_patch_generation(self, system_prompt, user_prompt): pass
    @abstractmethod
    def get_fixed_patch(self, fixer_prompt_messages): pass

class GeminiClient(AIClient):
    """AI Client for Google's Gemini models (Patch Workflow)."""
    def __init__(self, api_key, model_name):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)
        print(f"✅ Initialized Google Gemini Client with model: {model_name}", file=sys.stderr)
    def get_full_file_rewrite(self, system_prompt, user_prompt): raise NotImplementedError("Gemini client uses the patch-based workflow.")
    def stream_patch_generation(self, system_prompt, user_prompt):
        full_prompt = f"{system_prompt}\n\n{user_prompt}"
        safety_settings = [{"category": f"HARM_CATEGORY_{c}", "threshold": "BLOCK_NONE"} for c in ["HARASSMENT", "HATE_SPEECH", "SEXUALLY_EXPLICIT", "DANGEROUS_CONTENT"]]
        stream = self.model.generate_content(full_prompt, stream=True, safety_settings=safety_settings)
        for chunk in stream: yield chunk.text
    def get_fixed_patch(self, fixer_prompt_messages):
        prompt_text = "\n\n".join([msg['content'] for msg in fixer_prompt_messages])
        response = self.model.generate_content(prompt_text)
        return response.text

class ClaudeClient(AIClient):
    """AI Client for Anthropic's Claude models (Overwrite Workflow)."""
    def __init__(self, api_key, model_name):
        self.client = anthropic.Anthropic(api_key=api_key)
        self.model_name = model_name
        print(f"✅ Initialized Anthropic Claude Client with model: {self.model_name}", file=sys.stderr)
    def get_full_file_rewrite(self, system_prompt, user_prompt):
        response = self.client.messages.create(max_tokens=8192, system=system_prompt, messages=[{"role": "user", "content": user_prompt}], model=self.model_name)
        return response.content[0].text
    def stream_patch_generation(self, system_prompt, user_prompt):
        with self.client.messages.stream(max_tokens=8192, system=system_prompt, messages=[{"role": "user", "content": user_prompt}], model=self.model_name) as stream:
            yield from stream.text_stream
    def get_fixed_patch(self, fixer_prompt_messages):
        system_prompt = fixer_prompt_messages[0]['content']
        user_messages = [{"role": m['role'], "content": m['content']} for m in fixer_prompt_messages[1:]]
        response = self.client.messages.create(max_tokens=8192, system=system_prompt, messages=user_messages, model=self.model_name)
        return response.content[0].text

class OpenAIClient(AIClient):
    """AI Client for OpenAI's models (Overwrite Workflow)."""
    def __init__(self, api_key, model_name):
        self.client = openai.OpenAI(api_key=api_key)
        self.model_name = model_name
        print(f"✅ Initialized OpenAI Client with model: {self.model_name}", file=sys.stderr)
    def get_full_file_rewrite(self, system_prompt, user_prompt):
        response = self.client.chat.completions.create(model=self.model_name, messages=[{"role": "system", "content": system_prompt}, {"role": "user", "content": user_prompt}])
        return response.choices[0].message.content
    def stream_patch_generation(self, system_prompt, user_prompt):
        stream = self.client.chat.completions.create(model=self.model_name, messages=[{"role": "system", "content": system_prompt}, {"role": "user", "content": user_prompt}], stream=True)
        for chunk in stream:
            content = chunk.choices[0].delta.content
            if content is not None: yield content
    def get_fixed_patch(self, fixer_prompt_messages):
        response = self.client.chat.completions.create(model=self.model_name, messages=fixer_prompt_messages)
        return response.choices[0].message.content

# --- File Management ---
class GitignoreManager:
    def __init__(self, start_path):
        self.start_path = os.path.abspath(start_path); self.matchers = {}
        for root, _, files in os.walk(self.start_path, topdown=True):
            if '.gitignore' in files:
                gitignore_path = os.path.join(root, '.gitignore'); base_dir = os.path.dirname(gitignore_path)
                try: self.matchers[base_dir] = parse_gitignore(gitignore_path, base_dir=base_dir)
                except Exception as e: print(f"⚠️ Warning: Could not parse {gitignore_path}: {e}", file=sys.stderr)
    def is_ignored(self, file_path):
        path_to_check = os.path.abspath(file_path); current_dir = os.path.dirname(path_to_check)
        while current_dir.startswith(self.start_path):
            if current_dir in self.matchers and self.matchers[current_dir](path_to_check): return True
            if current_dir == self.start_path: break
            current_dir = os.path.dirname(current_dir)
        return False

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

def find_source_files(start_path, exclude_patterns=None):
    source_files_map = {}; supported_extensions = (".ts", ".java", ".g4") # , ".py", ".js", ".html", ".css", ".md")
    ignore_manager = GitignoreManager(start_path)
    if exclude_patterns is None: exclude_patterns = []
    for root, dirs, files in os.walk(start_path, topdown=True):
        dirs[:] = [d for d in dirs if not ignore_manager.is_ignored(os.path.join(root, d))]
        for file in files:
            full_path = os.path.join(root, file); relative_path = os.path.relpath(full_path, start_path)
            if any(fnmatch.fnmatch(relative_path, pattern) for pattern in exclude_patterns): continue
            if ignore_manager.is_ignored(full_path): continue
            if file.endswith(supported_extensions):
                try:
                    with open(full_path, 'r', encoding='utf-8') as f: content = f.read()
                    # FIX: Add back missing newline logic
                    if content and not content.endswith('\n'):
                        print(f"✍️  Fixing missing newline in: {relative_path}", file=sys.stderr)
                        content += '\n'
                        with open(full_path, 'w', encoding='utf-8') as f_write: f_write.write(content)
                    source_files_map[relative_path] = content
                except Exception as e: print(f"Error reading file {full_path}: {e}", file=sys.stderr)
    return source_files_map

def create_context_prompt(source_files_map):
    if not source_files_map: return ""
    prompt = "Here is the source code from my project. Review it carefully.\n\n"
    for file_path, content in sorted(source_files_map.items()):
        prompt += f"--- FILE: {file_path} ---\n```\n{content}\n```\n\n"
    return prompt

# --- Core Application Logic ---
def _print_debug_output(title, content):
    border = "=" * 25; print(f"\n{border} DEBUG: {title} {border}", file=sys.stderr)
    # Don't print the full content if it's too large, just a summary
    if len(content) > 2000:
        print(content[:1000] + "\n\n... (content truncated) ...\n\n" + content[-1000:], file=sys.stderr)
    else:
        print(content, file=sys.stderr)
    print(f"{'=' * (52 + len(title))}\n", file=sys.stderr)

def _sanitize_ai_response(response_text: str) -> str:
    """More robustly removes markdown fences and leading/trailing whitespace."""
    if not response_text: return ""
    # Use simple replacement for robustness against different markdown styles
    return response_text.replace("```diff", "").replace("```", "").strip()

# --- Overwrite Workflow Functions ---
def _process_file_overwrite(ai_client, file_path, file_content, system_prompt, user_task_prompt, debug_mode=False, backup=False):
    print(f"Processing file: {file_path}", file=sys.stderr)
    full_user_prompt = (
        "You will be given the full content of a source file. "
        "Apply the following task to it and return the complete, rewritten file.\n\n"
        f"--- TASK ---\n{user_task_prompt}\n\n"
        f"--- ORIGINAL FILE: {file_path} ---\n"
        f"```\n{file_content}\n```"
    )
    if debug_mode: _print_debug_output(f"Prompt for {file_path}", f"SYSTEM: {system_prompt}\n\nUSER:\n{full_user_prompt}")
    for attempt in range(MAX_API_RETRIES):
        try:
            new_file_content_raw = ai_client.get_full_file_rewrite(system_prompt, full_user_prompt)
            if not new_file_content_raw or not new_file_content_raw.strip():
                print(f"⚠️ Warning: AI returned an empty response for {file_path}. Skipping.", file=sys.stderr); return False
            new_file_content = _sanitize_ai_response(new_file_content_raw)
            if debug_mode: _print_debug_output(f"Sanitized AI Response for {file_path}", new_file_content)

            if backup:
                backup_path = file_path + ".bak"
                print(f"   Creating backup: {backup_path}", file=sys.stderr)
                shutil.copy2(file_path, backup_path)

            with open(file_path, 'w', encoding='utf-8') as f: f.write(new_file_content)
            print(f"✅ Success: Overwrote {file_path}", file=sys.stderr)
            return True
        except (anthropic.APIStatusError, google_exceptions.GoogleAPICallError, openai.APIStatusError) as e:
            is_retryable, error_code = False, "N/A"
            if isinstance(e, (anthropic.APIStatusError, openai.APIStatusError)): error_code = e.status_code;
            if error_code in [529, 502, 503, 429]: is_retryable = True
            elif isinstance(e, google_exceptions.GoogleAPICallError): is_retryable = True
            if is_retryable and attempt < MAX_API_RETRIES - 1:
                delay = 2 * (2 ** attempt) + random.uniform(0, 1)
                print(f"⚠️ API Error ({error_code}) for {file_path}. Retrying in {delay:.2f} seconds...", file=sys.stderr); time.sleep(delay)
            else: print(f"❌ FATAL Error for {file_path}: {e}", file=sys.stderr); return False
    print(f"❌ All retry attempts failed for {file_path}.", file=sys.stderr); return False


# --- Patch Workflow Functions ---
def _get_ai_fix_for_patch(ai_client, filename, original_code, broken_patch, git_error, debug_mode=False):
    print(f"🤖 Asking {ai_client.__class__.__name__} to fix the patch for {filename}...", file=sys.stderr)
    system_prompt = ("You are an expert programmer specializing in fixing `git diff` patches...") # Truncated
    user_prompt = (f"--- ORIGINAL SOURCE CODE: {filename} ---\n{original_code}...") # Truncated
    fixer_prompt_messages = [{"role": "system", "content": system_prompt}, {"role": "user", "content": user_prompt}]
    if debug_mode: _print_debug_output("Fix-it Prompt", f"SYSTEM: {system_prompt}\n\nUSER: {user_prompt}")
    try:
        fixed_patch_raw = ai_client.get_fixed_patch(fixer_prompt_messages)
        if debug_mode and fixed_patch_raw: _print_debug_output("Fix-it Raw Response", fixed_patch_raw)
        return _sanitize_ai_response(fixed_patch_raw)
    except Exception as e: print(f"❌ Error during patch-fixing API call: {e}", file=sys.stderr); return None

def _manage_single_patch_application(ai_client, filename, patch_content, source_files_map, debug_mode=False):
    sanitized_content = _sanitize_ai_response(patch_content)
    if not sanitized_content: return True, None
    current_patch = sanitized_content
    for attempt in range(MAX_API_RETRIES):
        print(f"\n[{attempt + 1}/{MAX_API_RETRIES}] Applying patch for: {filename}", file=sys.stderr)
        patch_filename = None
        try:
            with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix=".patch", encoding='utf-8') as pf:
                pf.write(current_patch + "\n"); patch_filename = pf.name
            result = subprocess.run(['git', 'apply', '--reject', '--unidiff-zero', '--inaccurate-eof', patch_filename], capture_output=True, text=True, check=False)
            if result.returncode == 0:
                print(f"✅ Success: Patch applied cleanly for {filename}.", file=sys.stderr); os.remove(patch_filename); return True, None
            else:
                git_error = result.stderr
                print(f"❌ Attempt {attempt + 1} failed for {filename}.", file=sys.stderr)
                if attempt < MAX_API_RETRIES - 1:
                    original_code = source_files_map.get(filename)
                    if not original_code: print(f"   Cannot find original source for {filename} to attempt a fix.", file=sys.stderr); os.remove(patch_filename); return False, {"file_path": filename, "patch_content": current_patch, "temp_patch_path": "N/A"}
                    fixed_patch = _get_ai_fix_for_patch(ai_client, filename, original_code, current_patch, git_error, debug_mode)
                    os.remove(patch_filename)
                    if fixed_patch: print("✅ Received a potential fix. Retrying...", file=sys.stderr); current_patch = fixed_patch
                    else: print("❌ AI did not return a fix. Aborting retries for this file.", file=sys.stderr); break
                else:
                    print(f"   Max retries reached. The final failed patch is at: {patch_filename}", file=sys.stderr)
                    return False, {"file_path": filename, "patch_content": current_patch, "temp_patch_path": patch_filename}
        except Exception as e:
            return False, {"file_path": filename, "patch_content": current_patch, "temp_patch_path": patch_filename or "N/A"}
    return False, {"file_path": filename, "patch_content": current_patch, "temp_patch_path": patch_filename or "N/A"}

def process_stream_and_apply_patches(ai_client, system_prompt, user_prompt, source_files_map, debug_mode=False):
    max_retries = 4; base_delay = 3
    for attempt in range(max_retries):
        try:
            print(f"🤖 Calling {ai_client.__class__.__name__} and waiting for stream (Attempt {attempt + 1}/{max_retries})...", file=sys.stderr)
            success_count, failure_count = 0, 0; failed_patches_details = []
            stream = ai_client.stream_patch_generation(system_prompt, user_prompt)
            print("🤝 Stream opened. Processing patches as they arrive...", file=sys.stderr)

            # --- DEBUG MODE: Stream to console and buffer, then process ---
            if debug_mode:
                print("\n" + "="*20 + " DEBUG: Raw AI Response Stream " + "="*20, file=sys.stderr)
                buffered_chunks = []
                for text_chunk in stream:
                    sys.stderr.write(text_chunk)
                    sys.stderr.flush()
                    buffered_chunks.append(text_chunk)
                print("\n" + "="*60 + "\n", file=sys.stderr)

                full_response_text = "".join(buffered_chunks)
                patch_chunks = list(filter(None, full_response_text.split('--- a/')))
                for chunk in patch_chunks:
                    patch_text = "--- a/" + chunk
                    try:
                        filename = patch_text.splitlines()[0][len('--- a/'):].strip()
                        success, failure_info = _manage_single_patch_application(ai_client, filename, patch_text, source_files_map, debug_mode)
                        if success: success_count += 1
                        else:
                            failure_count += 1
                            if failure_info: failed_patches_details.append(failure_info)
                    except IndexError: failure_count += 1
                return success_count, failure_count, failed_patches_details

            # --- NORMAL MODE: Process stream line-by-line ---
            else:
                patch_lines_buffer = []
                for text_chunk in stream:
                    lines = text_chunk.splitlines(keepends=True)
                    for line in lines:
                        if line.startswith('--- a/'):
                            if patch_lines_buffer:
                                full_patch_text = "".join(patch_lines_buffer)
                                try:
                                    filename = full_patch_text.splitlines()[0][len('--- a/'):].strip()
                                    success, failure_info = _manage_single_patch_application(ai_client, filename, full_patch_text, source_files_map, debug_mode)
                                    if success: success_count += 1
                                    else:
                                        failure_count += 1
                                        if failure_info: failed_patches_details.append(failure_info)
                                except IndexError: failure_count += 1; print("Error parsing patch chunk, skipping.", file=sys.stderr)
                                patch_lines_buffer = []
                        patch_lines_buffer.append(line)
                if patch_lines_buffer:
                    final_patch_text = "".join(patch_lines_buffer)
                    try:
                        filename = final_patch_text.splitlines()[0][len('--- a/'):].strip()
                        success, failure_info = _manage_single_patch_application(ai_client, filename, final_patch_text, source_files_map, debug_mode)
                        if success: success_count += 1
                        else:
                            failure_count += 1
                            if failure_info: failed_patches_details.append(failure_info)
                    except IndexError: failure_count += 1; print("Error parsing final patch chunk, skipping.", file=sys.stderr)
                return success_count, failure_count, failed_patches_details

        except (anthropic.APIStatusError, google_exceptions.GoogleAPICallError, openai.APIStatusError) as e:
            is_retryable, error_code = False, "N/A"
            if isinstance(e, (anthropic.APIStatusError, openai.APIStatusError)): error_code = e.status_code;
            if error_code in [529, 502, 503, 429]: is_retryable = True
            elif isinstance(e, google_exceptions.GoogleAPICallError): is_retryable = True
            if is_retryable and attempt < max_retries - 1:
                delay = base_delay * (2 ** attempt) + random.uniform(0, 1)
                print(f"⚠️ API Error ({error_code}). Retrying in {delay:.2f} seconds...", file=sys.stderr); time.sleep(delay)
            else: print(f"❌ FATAL Error during API call: {e}", file=sys.stderr); return 0, 0, []
    print("❌ All retry attempts failed.", file=sys.stderr); return 0, 0, []

if __name__ == "__main__":
    if not shutil.which('git'): print("Error: 'git' command not found.", file=sys.stderr); sys.exit(1)

    parser = argparse.ArgumentParser(description="Applies AI-driven code modifications to a project.", formatter_class=argparse.RawTextHelpFormatter)
    parser.add_argument('--model', help="The AI model to use.", choices=MODEL_MAP.keys(), required=True)
    parser.add_argument('--workflow', help="The method for applying changes.", choices=['none', 'overwrite', 'patch'], default='none')
    parser.add_argument('--prompt', help="Instruction for the AI. If not provided, reads from stdin.")
    parser.add_argument('--exclude', nargs='*', default=[], help="Glob patterns of files to exclude.")
    parser.add_argument('--debug', action='store_true', help="Enable debug mode to print full prompts and responses.")
    parser.add_argument('--backup', action='store_true', help="Disable automatic backups for the 'overwrite' workflow.")
    args = parser.parse_args()

    # --- Initialize AI Client ---
    ai_client = None
    if args.model.startswith('openai'):
        api_key = os.environ.get("OPENAI_API_KEY");
        if not api_key: print("Error: OPENAI_API_KEY not set.", file=sys.stderr); sys.exit(1)
        ai_client = OpenAIClient(api_key=api_key, model_name=MODEL_MAP[args.model])
    elif args.model.startswith('claude'):
        api_key = os.environ.get("ANTHROPIC_API_KEY");
        if not api_key: print("Error: ANTHROPIC_API_KEY not set.", file=sys.stderr); sys.exit(1)
        ai_client = ClaudeClient(api_key=api_key, model_name=MODEL_MAP[args.model])
    elif args.model.startswith('gemini'):
        api_key = os.environ.get("GEMINI_API_KEY");
        if not api_key: print("Error: GEMINI_API_KEY not set.", file=sys.stderr); sys.exit(1)
        ai_client = GeminiClient(api_key=api_key, model_name=MODEL_MAP[args.model])

    # --- Get User Prompt ---
    user_prompt = args.prompt
    if not user_prompt:
        if not sys.stdin.isatty(): print("Reading prompt from stdin...", file=sys.stderr)
        else: print("Please enter your prompt (end with Ctrl-D on Linux/macOS or Ctrl-Z on Windows):", file=sys.stderr)
        user_prompt = sys.stdin.read()
    if not user_prompt.strip(): print("Error: Prompt is empty.", file=sys.stderr); sys.exit(1)

    # --- Main Execution ---
    print(f"\nScanning project in: {os.path.abspath('.')}", file=sys.stderr)
    source_files_map = find_source_files('.', args.exclude)
    if not source_files_map: print("No matching source files found.", file=sys.stderr); sys.exit(0)

    # -- Add to clipboard
    copy_to_clipboard(create_context_prompt(source_files_map));

    # =================================================================================
    # DUAL-MODE WORKFLOW: Selects workflow based on the --workflow flag
    # =================================================================================

    if args.workflow == 'patch':
        print("\n🚀 Starting multi-file patch workflow...", file=sys.stderr)
        system_prompt = (
            "You are an expert programmer. Your response MUST be ONLY a raw `git diff` patch, sent sequentially file by file. "
            "Pay VERY CLOSE attention to line numbers in `@@ -old,len +new,len @@` headers to ensure the patch applies cleanly. "
            "Do not include any text, explanations, or markdown code blocks."
        )
        context_prompt = create_context_prompt(source_files_map)
        full_user_prompt = f"{context_prompt}\nBased on the source code provided, please perform the following task.\n\n--- TASK ---\n{user_prompt}"
        if args.debug: _print_debug_output("Main Prompt for Patch Workflow", f"SYSTEM: {system_prompt}\n\nUSER:\n{full_user_prompt}")

        success, failed, failed_patches_info = process_stream_and_apply_patches(ai_client, system_prompt, full_user_prompt, source_files_map, args.debug)

        print("\n" + "="*40, file=sys.stderr); print("--- FINAL SUMMARY ---", file=sys.stderr)
        total_patches = success + failed
        if total_patches > 0: print(f"✅ Successful patches: {success}/{total_patches}\n❌ Failed patches: {failed}/{total_patches}", file=sys.stderr)
        else: print("No patches were generated or applied.", file=sys.stderr)
        if failed_patches_info:
            print("\n" + "="*40, file=sys.stderr); print("--- DETAILS FOR FAILED PATCHES ---", file=sys.stderr)
            for failure in failed_patches_info:
                file_path = failure['file_path']
                print(f"\n----------------------------------------\nFAILED PATCH FOR: {file_path}\n----------------------------------------", file=sys.stderr)
                print("\n[Current Git Diff of Original File]", file=sys.stderr)
                diff_result = subprocess.run(['git', 'diff', '--', file_path], capture_output=True, text=True, check=False)
                if diff_result.stdout: print(diff_result.stdout, file=sys.stderr)
                else: print("(No local changes to display for this file)", file=sys.stderr)
                print(f"\n[AI-Generated Patch Content (saved to {failure['temp_patch_path']})]", file=sys.stderr)
                print(failure['patch_content'], file=sys.stderr)
            print("\n" + "="*40, file=sys.stderr)

    elif args.workflow == 'overwrite': # Default workflow is 'overwrite'
        workflow_intro = "🚀 Starting one-by-one file overwrite workflow."
        if args.backup: workflow_intro += " Automatic backups (.bak) are enabled."
        else: workflow_intro += " WARNING: Automatic backups are disabled."
        print(f"\n{workflow_intro}", file=sys.stderr)

        system_prompt = (
            "You are an expert programming assistant. Your task is to rewrite a complete source file based on a user's request.\n"
            "STRICT RULES:\n1. You MUST return the ENTIRE, full and complete text of the modified file.\n"
            "2. Do NOT omit any code, even the parts that were not changed.\n"
            "3. Your output MUST ONLY be the raw source code for the rewritten file.\n"
            "4. Do NOT include any explanations, comments, apologies, or markdown code fences like ` ```java ` or ` ``` `."
        )
        total_success, total_failed = 0, 0
        file_list = sorted(source_files_map.items())
        for i, (file_path, file_content) in enumerate(file_list):
            print("-" * 40, file=sys.stderr)
            print(f"Processing file {i+1}/{len(file_list)}...", file=sys.stderr)
            if _process_file_overwrite(ai_client, file_path, file_content, system_prompt, user_prompt, args.debug, args.backup): total_success += 1
            else: total_failed += 1

        print("=" * 40, file=sys.stderr); print("--- FINAL SUMMARY ---", file=sys.stderr)
        total_files = total_success + total_failed
        if total_files > 0:
            print(f"✅ Files successfully overwritten: {total_success}/{total_files}", file=sys.stderr)
            print(f"❌ Files that failed processing:  {total_failed}/{total_files}", file=sys.stderr)
        else: print("No files were processed.", file=sys.stderr)
        if total_failed > 0: print("\nReview the errors above for failed files.", file=sys.stderr)
    else:
        print(f"✅ Concated files copied to clipboard: ", file=sys.stderr)
