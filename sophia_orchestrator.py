import os
import sys
import subprocess
import re
import hashlib
from google import genai
from google.genai import types

# --- CONFIGURATION ---
MODEL_NAME = "gemini-3-flash-preview"
CACHE_TTL_HOURS = 24
STOP_COMMAND = "STOP TOTAL"

def get_api_key():
    return os.environ.get("GEMINI_API_KEY")

# --- IMPLEMENTATION DES OUTILS (ENGINEERING SUITE) ---

def run_shell_command(command: str) -> str:
    """Executes a shell command."""
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=120)
        return f"STDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}"
    except Exception as e: return f"Error: {str(e)}"

def read_file(file_path: str, offset: int = 0, limit: int = None) -> str:
    """Reads a file with pagination."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            lines = f.readlines()
            if limit: return "".join(lines[offset:offset+limit])
            return "".join(lines[offset:])
    except Exception as e: return f"Error: {str(e)}"

def write_file(file_path: str, content: str) -> str:
    """Writes content to a file."""
    try:
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, "w", encoding="utf-8") as f: f.write(content)
        return f"File {file_path} written."
    except Exception as e: return f"Error: {str(e)}"

def list_directory(dir_path: str = ".", ignore: list = None) -> str:
    """Lists directory content."""
    try:
        files = os.listdir(dir_path)
        if ignore: files = [f for f in files if f not in ignore]
        return "\n".join(files)
    except Exception as e: return f"Error: {str(e)}"

def glob_tool(pattern: str, dir_path: str = ".") -> str:
    """Finds files matching specific glob patterns."""
    import glob
    try:
        results = glob.glob(os.path.join(dir_path, pattern), recursive=True)
        return "\n".join(results)
    except Exception as e: return f"Error: {str(e)}"

def search_file_content(pattern: str, dir_path: str = ".", include: str = None) -> str:
    """Search for a pattern in files using ripgrep or grep."""
    try:
        cmd = ["rg", "--vimgrep", pattern, dir_path]
        if include: cmd.extend(["-g", include])
        result = subprocess.run(cmd, capture_output=True, text=True)
        return result.stdout if result.stdout else "No matches."
    except:
        cmd = f"grep -rE \"{pattern}\" {dir_path}"
        res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return res.stdout

def replace(file_path: str, old_string: str, new_string: str, instruction: str = None) -> str:
    """Replaces text within a file."""
    try:
        with open(file_path, "r", encoding="utf-8") as f: content = f.read()
        if old_string not in content: return "Error: old_string not found."
        new_content = content.replace(old_string, new_string, 1)
        with open(file_path, "w", encoding="utf-8") as f: f.write(new_content)
        return f"Replaced in {file_path}."
    except Exception as e: return f"Error: {str(e)}"

# --- DEFINITIONS DES TOOLS ---

def get_tools_definition():
    return [
        types.Tool(google_search=types.GoogleSearch()),
        types.Tool(function_declarations=[
            types.FunctionDeclaration(
                name="run_shell_command",
                description="Executes a shell command.",
                parameters=types.Schema(type="OBJECT", properties={"command": types.Schema(type="STRING")}, required=["command"])
            ),
            types.FunctionDeclaration(
                name="read_file",
                description="Reads a file.",
                parameters=types.Schema(type="OBJECT", properties={"file_path": types.Schema(type="STRING"), "offset": types.Schema(type="INTEGER"), "limit": types.Schema(type="INTEGER")}, required=["file_path"])
            ),
            types.FunctionDeclaration(
                name="write_file",
                description="Writes a file.",
                parameters=types.Schema(type="OBJECT", properties={"file_path": types.Schema(type="STRING"), "content": types.Schema(type="STRING")}, required=["file_path", "content"])
            ),
            types.FunctionDeclaration(
                name="list_directory",
                description="Lists directory content.",
                parameters=types.Schema(type="OBJECT", properties={"dir_path": types.Schema(type="STRING")}, required=["dir_path"])
            ),
            types.FunctionDeclaration(
                name="glob",
                description="Glob search.",
                parameters=types.Schema(type="OBJECT", properties={"pattern": types.Schema(type="STRING"), "dir_path": types.Schema(type="STRING")}, required=["pattern"])
            ),
            types.FunctionDeclaration(
                name="search_file_content",
                description="Search content.",
                parameters=types.Schema(type="OBJECT", properties={"pattern": types.Schema(type="STRING"), "dir_path": types.Schema(type="STRING")}, required=["pattern"])
            ),
            types.FunctionDeclaration(
                name="replace",
                description="Replace text.",
                parameters=types.Schema(type="OBJECT", properties={"file_path": types.Schema(type="STRING"), "old_string": types.Schema(type="STRING"), "new_string": types.Schema(type="STRING")}, required=["file_path", "old_string", "new_string"])
            )
        ])
    ]

# --- CLI HELPERS ---

def expand_at_references(text):
    pattern = r"@([\w\.\/\-\_]+)"
    matches = re.findall(pattern, text)
    for match in matches:
        if os.path.exists(match):
            try:
                with open(match, "r") as f: content = f.read()
                text = text.replace(f"@{match}", f"\n--- {match} ---\n{content}\n")
                print(f"📎 Included: {match}")
            except: pass
    return text

# --- CACHE MGMT ---

def get_context_files():
    files = []
    gc = os.path.expanduser("~/.gemini/GEMINI.md")
    if os.path.exists(gc): files.append(gc)
    if os.path.isdir("specs"):
        for f in [f for f in os.listdir("specs") if f.endswith(".md")]: files.append(os.path.join("specs", f))
    if os.path.exists("GEMINI.md"): files.append("GEMINI.md")
    return sorted(list(set(files)))

def manage_cache(client, context_files):
    context_content = "PROJECT CONTEXT:\n"
    for f in context_files:
        try:
            with open(f, "r") as fd: context_content += f"\n--- {os.path.basename(f)} ---\n{fd.read()}\n"
        except: pass
    
    cache_file = ".gemini_cache_id"
    if os.path.exists(cache_file):
        with open(cache_file, "r") as f:
            cid = f.read().strip()
            try:
                if client.caches.get(name=cid).model.endswith(MODEL_NAME):
                    print(f"✅ Cache active ({MODEL_NAME})")
                    return cid
            except: pass

    print(f"🏗️ Creating Ultimate Cache ({MODEL_NAME})...")
    cache = client.caches.create(
        model=MODEL_NAME,
        config=types.CreateCachedContentConfig(
            display_name="sophia_ultimate_cache",
            contents=[types.Content(role="user", parts=[types.Part(text=context_content)])],
            tools=get_tools_definition(),
            ttl=f"{CACHE_TTL_HOURS * 3600}s",
        )
    )
    with open(cache_file, "w") as f: f.write(cache.name)
    return cache.name

# --- MAIN LOOP ---

def chat_loop(client, cache_id, agent_path):
    functions = {
        "run_shell_command": run_shell_command, "read_file": read_file, "write_file": write_file,
        "list_directory": list_directory, "glob": glob_tool, "search_file_content": search_file_content, "replace": replace
    }
    
    chat = client.chats.create(model=MODEL_NAME, config=types.GenerateContentConfig(cached_content=cache_id))
    
    if agent_path and os.path.exists(agent_path):
        with open(agent_path, "r") as f: role = f.read()
        print(f"🎭 Agent: {os.path.basename(agent_path)}")
        chat.send_message(f"IDENTITY:\n{role}\n\nConfirm with 'Ready.'")

    print(f"\n🤖 SOPHIA v10.0 (The Ultimate Sophia) - READY\n")

    while True:
        try:
            inp = input("👉 Damien > ")
            if not inp.strip(): continue
            
            # CLI Commands
            if inp.startswith("/"):
                if inp == "/help":
                    print("Commands: /cache list, /cache delete <id>, /cache purge, @file, STOP TOTAL")
                elif inp == "/cache list":
                    for c in client.caches.list(): print(f"- {c.name} ({c.display_name})")
                elif inp.startswith("/cache delete "):
                    cid = inp.split(" ")[2]
                    client.caches.delete(name=cid)
                    print(f"✅ Deleted {cid}")
                elif inp == "/cache purge":
                    for c in client.caches.list():
                        if c.name != cache_id: client.caches.delete(name=c.name)
                    print("✅ Purged all ghost caches.")
                continue

            if inp.upper() == STOP_COMMAND: break
            
            processed_inp = expand_at_references(inp)
            response = chat.send_message(processed_inp)
            
            while response.candidates and response.candidates[0].content.parts and response.candidates[0].content.parts[0].function_call:
                fc = response.candidates[0].content.parts[0].function_call
                print(f"🛠️  Tool: {fc.name}")
                res = functions[fc.name](**fc.args) if fc.name in functions else "Error: Tool not found."
                response = chat.send_message(types.Part(function_response=types.FunctionResponse(name=fc.name, response={"result": res})))

            if response.text: print(f"\n🤖 Sophia > {response.text}\n")
            u = response.usage_metadata
            if u: print(f"\033[2m[Tokens - Msg: {u.prompt_token_count} | Resp: {u.candidates_token_count} | Cache: {u.cached_content_token_count or 0}]\033[0m")
        except KeyboardInterrupt: break
        except Exception as e: print(f"❌ Error: {e}")

if __name__ == "__main__":
    api_key = get_api_key()
    client = genai.Client(api_key=api_key, http_options={'api_version': 'v1alpha'})
    agent = sys.argv[1] if len(sys.argv) > 1 else None
    cid = manage_cache(client, get_context_files())
    chat_loop(client, cid, agent)