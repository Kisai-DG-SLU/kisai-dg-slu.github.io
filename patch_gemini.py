import os

TARGET = "/usr/local/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/geminiChat.js"
TAG = "// @sophia-patched-v10.7"

def patch():
    if not os.path.exists(TARGET): return
    with open(TARGET, "r") as f: content = f.read()
    if TAG in content: return

    # 1. Import fs
    if "import fs from 'fs';" not in content:
        content = "import fs from 'fs';\n" + content

    # 2. Patch Cache
    old_config = "            const config = {\n                ...currentGenerateContentConfig,\n                // TODO(12622): Ensure we don't overrwrite these when they are\n                // passed via config.\n                systemInstruction: this.systemInstruction,\n                tools: this.tools,\n                abortSignal,\n            }"
    
    new_config = "            // --- SOPHIA CACHE PATCH ---\n            let sophiaCacheId = null;
            try {
                if (fs.existsSync('.gemini_cache_id')) {
                    sophiaCacheId = fs.readFileSync('.gemini_cache_id', 'utf8').trim();
                }
            } catch (e) {}
            const config = {\n                ...currentGenerateContentConfig,\n                ...(sophiaCacheId ? { cachedContent: sophiaCacheId } : {\n                    systemInstruction: this.systemInstruction,\n                    tools: this.tools,\n                }),\n                abortSignal,\n            }"
    
    if old_config in content:
        content = content.replace(old_config, new_config)

    # 3. Patch Tokens
    old_tokens = "            if (chunk.usageMetadata) {\n                this.chatRecordingService.recordMessageTokens(chunk.usageMetadata);"
    
    new_tokens = "            if (chunk.usageMetadata) {\n                // --- SOPHIA TOKEN DISPLAY ---\n                const u = chunk.usageMetadata;
                if (u.promptTokenCount !== undefined) {
                    process.stdout.write(`\n\x1b[2m[Tokens - Msg: ${u.promptTokenCount} | Resp: ${u.candidatesTokenCount || 0} | Cache: ${u.cachedContentTokenCount || 0}]\x1b[0m\n`);
                }
                this.chatRecordingService.recordMessageTokens(chunk.usageMetadata);"

    if old_tokens in content:
        content = content.replace(old_tokens, new_tokens)

    # 4. Finalize
    content = TAG + "\n" + content
    with open(TARGET, "w") as f: f.write(content)
    print("✅ Patch v10.7 Applied.")

if __name__ == "__main__": patch()