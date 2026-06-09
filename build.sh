#!/bin/bash
# ==================== MEALNEST BUILD SCRIPT ====================
# Usage: bash build.sh [release]
#   release — also minifies app.js and bumps SW cache version
#
set -e

echo "🏗️  Mealnest Build"
echo "=================="

# 1. Generate PNG icons from SVG
echo ""
echo "📦 Icons: icon.svg → PNGs"
if command -v rsvg-convert &>/dev/null; then
  for size in 48 180 192 512; do
    rsvg-convert icon.svg -o "icon-${size}.png" -w $size -h $size
    echo "   ✅ icon-${size}.png ($(du -h "icon-${size}.png" | cut -f1))"
  done
else
  echo "   ⚠️  rsvg-convert not found. Install librsvg."
fi

# 2. Build mode
if [ "$1" = "release" ]; then
  echo ""
  echo "🔧 Release mode"
  
  # 2a. Minify app.js
  echo "   Minifying app.js..."
  if command -v node &>/dev/null; then
    node -e "
    const fs = require('fs');
    let code = fs.readFileSync('app.js', 'utf8');
    const orig = code.length;
    // Strip single-line comments
    code = code.replace(/\\/\\/[^\\n]*\\n/g, '\\n');
    // Strip block comments (careful with regex)
    code = code.replace(/\\/\\*[\\s\\S]*?\\*\\//g, '');
    // Collapse multiple blank lines
    code = code.replace(/\\n{3,}/g, '\\n\\n');
    // Remove trailing whitespace
    code = code.replace(/[ \\t]+\\n/g, '\\n');
    fs.writeFileSync('app.js.min', code, 'utf8');
    const saved = ((orig - code.length)/orig*100).toFixed(1);
    console.log('   ✅ app.js: ' + (orig/1024).toFixed(0) + 'KB → ' + (code.length/1024).toFixed(0) + 'KB (-' + saved + '%)');
    "
  fi
  
  # 2b. Bump SW cache version
  echo "   Bumping SW cache version..."
  if command -v node &>/dev/null; then
    node -e "
    const fs = require('fs');
    let sw = fs.readFileSync('sw.js', 'utf8');
    sw = sw.replace(/CACHE = 'mealnest-v\\d+'/, function(m) {
      const n = parseInt(m.match(/\\d+/)[0]) + 1;
      const r = \"CACHE = 'mealnest-v\" + n + \"'\";
      console.log('   ✅ ' + m + ' → ' + r);
      return r;
    });
    fs.writeFileSync('sw.js', sw, 'utf8');
    "
  fi
else
  echo ""
  echo "ℹ️  Run 'bash build.sh release' for full build (minify + cache bump)"
fi

# 3. Stats
echo ""
echo "📊 Bundle size:"
if command -v du &>/dev/null; then
  for f in app.js styles.css index.html icon.svg icon-192.png icon-512.png recipes-default.json sw.js manifest.json; do
    if [ -f "$f" ]; then
      echo "   $(du -h "$f" | cut -f1)	$f"
    fi
  done
  echo "   ---"
  echo "   $(du -h app.js styles.css index.html manifest.json icon.svg icon-192.png icon-512.png recipes-default.json sw.js 2>/dev/null | tail -1 | cut -f1)	total (core assets)"
fi
echo ""
echo "✅ Done"
