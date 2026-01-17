import os
import sys
from google import genai
from google.genai import types

MODEL_NAME = "gemini-3-flash-preview" # Modèle spécifié par l'utilisateur

def get_tools_definition():
    return [
        types.Tool(google_search=types.GoogleSearch()),
        types.Tool(function_declarations=[
            types.FunctionDeclaration(
                name="list_directory",
                description="Lists the names of files and subdirectories directly within a specified directory path.",
                parameters=types.Schema(
                    type="OBJECT",
                    properties={
                        "dir_path": types.Schema(type="STRING", description="The path to the directory to list"),
                        "ignore": types.Schema(type="ARRAY", items=types.Schema(type="STRING"), description="List of glob patterns to ignore")
                    },
                    required=["dir_path"]
                )
            ),
            types.FunctionDeclaration(
                name="read_file",
                description="Reads and returns the content of a specified file.",
                parameters=types.Schema(
                    type="OBJECT",
                    properties={
                        "file_path": types.Schema(type="STRING", description="The path to the file to read."),
                        "offset": types.Schema(type="NUMBER"),
                        "limit": types.Schema(type="NUMBER")
                    },
                    required=["file_path"]
                )
            ),
            types.FunctionDeclaration(
                name="search_file_content",
                description="FAST, optimized search powered by ripgrep.",
                parameters=types.Schema(
                    type="OBJECT",
                    properties={
                        "pattern": types.Schema(type="STRING"),
                        "dir_path": types.Schema(type="STRING"),
                        "include": types.Schema(type="STRING")
                    },
                    required=["pattern"]
                )
            ),
            types.FunctionDeclaration(
                name="glob",
                description="Efficiently finds files matching specific glob patterns.",
                parameters=types.Schema(
                    type="OBJECT",
                    properties={
                        "pattern": types.Schema(type="STRING"),
                        "dir_path": types.Schema(type="STRING")
                    },
                    required=["pattern"]
                )
            ),
            types.FunctionDeclaration(
                name="replace",
                description="Replaces text within a file.",
                parameters=types.Schema(
                    type="OBJECT",
                    properties={
                        "file_path": types.Schema(type="STRING"),
                        "old_string": types.Schema(type="STRING"),
                        "new_string": types.Schema(type="STRING"),
                        "instruction": types.Schema(type="STRING")
                    },
                    required=["file_path", "old_string", "new_string", "instruction"]
                )
            ),
            types.FunctionDeclaration(
                name="write_file",
                description="Writes content to a specified file.",
                parameters=types.Schema(
                    type="OBJECT",
                    properties={
                        "file_path": types.Schema(type="STRING"),
                        "content": types.Schema(type="STRING")
                    },
                    required=["file_path", "content"]
                )
            ),
            types.FunctionDeclaration(
                name="run_shell_command",
                description="Executes a given shell command.",
                parameters=types.Schema(
                    type="OBJECT",
                    properties={
                        "command": types.Schema(type="STRING"),
                        "description": types.Schema(type="STRING")
                    },
                    required=["command"]
                )
            ),
            types.FunctionDeclaration(
                name="web_fetch",
                description="Processes content from URL(s).",
                parameters=types.Schema(
                    type="OBJECT",
                    properties={
                        "prompt": types.Schema(type="STRING")
                    },
                    required=["prompt"]
                )
            )
        ])
    ]

def get_context_files():
    files = []
    # Global Brain
    gc = os.path.expanduser("~/.gemini/GEMINI.md")
    if os.path.exists(gc): files.append(gc)
    
    # Project Context
    if os.path.isdir("specs"):
        for f in [f for f in os.listdir("specs") if f.endswith(".md")]:
            files.append(os.path.join("specs", f))
    
    # Local Brain
    if os.path.exists("GEMINI.md"): files.append("GEMINI.md")
    
    return sorted(list(set(files)))

def sync():
    api_key = os.environ.get("GEMINI_API_KEY")
    client = genai.Client(api_key=api_key, http_options={'api_version': 'v1alpha'})
    
    files = get_context_files()
    # On commence par les instructions système comme préambule du cache
    content = "SYSTEM_INSTRUCTION: You are an interactive CLI agent specializing in software engineering. Adhere to project conventions. French communication, English code.\n\n"
    content += "PROJECT_CONTEXT:\n"
    for f in files:
        try:
            with open(f, "r") as fd:
                content += f"\n--- {os.path.basename(f)} ---\n{fd.read()}\n"
        except: pass

    cache_file = ".gemini_cache_id"
    
    # Forcer la création si demandé ou si absent
    print(f"🏗️  Creating Full Cache with Tools ({MODEL_NAME})...")
    try:
        cache = client.caches.create(
            model=MODEL_NAME,
            config=types.CreateCachedContentConfig(
                display_name="sophia_full_context_v2",
                contents=[types.Content(role="user", parts=[types.Part(text=content)])],
                tools=get_tools_definition(),
                ttl="86400s",
            )
        )
        with open(cache_file, "w") as f:
            f.write(cache.name)
        print(f"✨ Cache synchronized: {cache.name}")
    except Exception as e:
        print(f"❌ Error creating cache: {e}")

if __name__ == "__main__":
    sync()