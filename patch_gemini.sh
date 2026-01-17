#!/bin/bash
TARGET="/usr/local/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/geminiChat.js"
TAG="// @sophia-patched-v11.1"

if grep -q "$TAG" "$TARGET"; then exit 0; fi

# 1. Ajout import fs avec alias unique
sed -i '' '1i\
import * as sophiaFs from "fs";\
' "$TARGET"

# 2. Patch Tokens
sed -i '' '/this.chatRecordingService.recordMessageTokens(chunk.usageMetadata);/i \
                if (chunk.usageMetadata && chunk.usageMetadata.promptTokenCount !== undefined) { \
                    const u = chunk.usageMetadata; \
                    process.stdout.write(`\\n\\x1b[2m[Tokens - Msg: ${u.promptTokenCount} | Resp: ${u.candidatesTokenCount || 0} | Cache: ${u.cachedContentTokenCount || 0}]\\x1b[0m\\n`); \
                }
' "$TARGET"

# 3. Patch Cache (Injection sécurisée de config)
# On cherche la ligne currentGenerateContentConfig et on remplace le bloc
sed -i '' 's/const config = {/const sophiaCacheId = sophiaFs.existsSync(".gemini_cache_id") ? sophiaFs.readFileSync(".gemini_cache_id", "utf8").trim() : null; const config = {/g' "$TARGET"
sed -i '' 's/systemInstruction: this.systemInstruction,/...(sophiaCacheId ? { cachedContent: sophiaCacheId } : { systemInstruction: this.systemInstruction, tools: this.tools }),/g' "$TARGET"
sed -i '' '/tools: this.tools,/d' "$TARGET"

echo "$TAG" | cat - "$TARGET" > "$TARGET.tmp" && mv "$TARGET.tmp" "$TARGET"
echo "✨ Patch v11.1 Applied (Safe FS)."
