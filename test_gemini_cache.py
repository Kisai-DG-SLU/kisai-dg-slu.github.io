import os
from google import genai
from google.genai import types

def test_cache():
    api_key = os.environ.get("GEMINI_API_KEY")
    client = genai.Client(api_key=api_key, http_options={'api_version': 'v1alpha'})
    model = "gemini-3-flash-preview"
    
    # 1. Définition de l'outil
    tool = types.Tool(function_declarations=[
        types.FunctionDeclaration(
            name="get_weather",
            description="Get weather",
            parameters=types.Schema(
                type="OBJECT",
                properties={"location": types.Schema(type="STRING")},
                required=["location"]
            )
        )
    ])
    
    print(f"Testing {model} with caching and tools...")
    
    # 2. Création du cache
    try:
        cache = client.caches.create(
            model=model,
            config=types.CreateCachedContentConfig(
                display_name="test_cache_tools",
                contents=[types.Content(role="user", parts=[types.Part(text="Context: I am a weather assistant.")])],
                tools=[tool],
                ttl="3600s",
            )
        )
        print(f"✅ Cache created: {cache.name}")
        
        # 3. Chat avec le cache
        chat = client.chats.create(
            model=model,
            config=types.GenerateContentConfig(cached_content=cache.name)
        )
        
        response = chat.send_message("What is the weather in Paris?")
        print(f"✅ Response received: {response.candidates[0].content.parts[0].function_call.name if response.candidates[0].content.parts[0].function_call else response.text}")
        
        # Cleanup
        client.caches.delete(name=cache.name)
        print("✅ Cache cleaned up.")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_cache()
