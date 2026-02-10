#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# TEXTURE COMPRESSION SCRIPT
# This is likely your REAL problem - 22 texture files!
# ═══════════════════════════════════════════════════════════════

set -e

echo "🎨 COMPRESSING TEXTURES..."
echo "════════════════════════════════════════════════════════════"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if sharp is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found${NC}"
    exit 1
fi

# Check for texture files
TEXTURE_DIR="public/models"
TEXTURE_COUNT=$(find "$TEXTURE_DIR" -name "knight-ultra*.jpg" -o -name "knight-ultra*.png" | wc -l | xargs)

echo -e "${YELLOW}Found $TEXTURE_COUNT texture files${NC}"
echo ""

if [ "$TEXTURE_COUNT" -eq 0 ]; then
    echo "No textures to compress"
    exit 0
fi

# ═══════════════════════════════════════════════════════════════
# CREATE COMPRESSION SCRIPT
# ═══════════════════════════════════════════════════════════════
cat > /tmp/compress-textures.js << 'EOF'
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TEXTURE_DIR = 'public/models';
const OUTPUT_DIR = 'public/models/compressed';

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function compressTexture(inputPath) {
    const filename = path.basename(inputPath);
    const ext = path.extname(inputPath);
    const basename = path.basename(inputPath, ext);

    // Output as WebP (better compression)
    const outputPath = path.join(OUTPUT_DIR, `${basename}.webp`);

    try {
        const originalSize = fs.statSync(inputPath).size;

        await sharp(inputPath)
            .resize(1024, 1024, { // Max 1024x1024
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({ quality: 80 }) // 80% quality
            .toFile(outputPath);

        const compressedSize = fs.statSync(outputPath).size;
        const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);

        console.log(`✓ ${filename}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(compressedSize / 1024 / 1024).toFixed(2)}MB (-${reduction}%)`);
    } catch (err) {
        console.error(`✗ Failed to compress ${filename}:`, err.message);
    }
}

async function main() {
    const files = fs.readdirSync(TEXTURE_DIR)
        .filter(f => /knight-ultra.*\.(jpg|png)$/i.test(f))
        .map(f => path.join(TEXTURE_DIR, f));

    console.log(`\nCompressing ${files.length} textures...\n`);

    for (const file of files) {
        await compressTexture(file);
    }

    console.log('\n✅ Texture compression complete!');
    console.log(`\nCompressed textures saved to: ${OUTPUT_DIR}`);
}

main();
EOF

# ═══════════════════════════════════════════════════════════════
# INSTALL SHARP IF NEEDED
# ═══════════════════════════════════════════════════════════════
echo "Checking for sharp package..."
if ! npm list sharp &> /dev/null; then
    echo -e "${YELLOW}Installing sharp...${NC}"
    npm install sharp
fi

# ═══════════════════════════════════════════════════════════════
# RUN COMPRESSION
# ═══════════════════════════════════════════════════════════════
echo ""
node /tmp/compress-textures.js

echo ""
echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}📊 RESULTS${NC}"
echo "════════════════════════════════════════════════════════════"
echo ""

# Show before/after
ORIGINAL_TOTAL=$(find "$TEXTURE_DIR" -name "knight-ultra*.jpg" -o -name "knight-ultra*.png" -exec du -c {} + | tail -1 | cut -f1)
COMPRESSED_TOTAL=$(find "$TEXTURE_DIR/compressed" -name "*.webp" -exec du -c {} + | tail -1 | cut -f1)

if [ -n "$ORIGINAL_TOTAL" ] && [ -n "$COMPRESSED_TOTAL" ]; then
    ORIGINAL_MB=$(echo "scale=2; $ORIGINAL_TOTAL / 1024" | bc)
    COMPRESSED_MB=$(echo "scale=2; $COMPRESSED_TOTAL / 1024" | bc)

    echo "Original textures:   ${ORIGINAL_MB}MB"
    echo "Compressed textures: ${COMPRESSED_MB}MB"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo -e "${BLUE}💡 NEXT STEPS${NC}"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "The textures are compressed, but they're EXTERNAL files."
echo "Your knight-ultra.glb references them."
echo ""
echo "TWO OPTIONS:"
echo ""
echo "Option 1: Use the compressed textures with knight-ultra.glb"
echo "  - Copy compressed/*.webp to public/models/"
echo "  - Requires updating texture references in the GLB"
echo ""
echo "Option 2: BETTER - Re-export model with embedded compressed textures"
echo "  - Open knight.glb in Blender"
echo "  - In Shader Editor, replace each texture with compressed version"
echo "  - File → Export → glTF 2.0 → Check 'Pack Resources'"
echo "  - Save as knight-final.glb"
echo ""
echo "Option 3: EASIEST - Just use knight-ultra.glb (4.3MB is already good!)"
echo ""
