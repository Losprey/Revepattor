#!/bin/bash
# ==================== MEALNEST BUILD SCRIPT ====================
# Usage: bash build.sh [release]
#
# Requirements: npm install (installs esbuild for minification)
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

MODE="development"
[ "$1" = "release" ] && MODE="release"
echo ""
echo "🔧 Mode: $MODE"
echo ""

mkdir -p dist

# 2. Bundle CSS (4 files → 1)
echo "📄 Bundling CSS..."
cat css/base.css css/components.css css/sections.css css/refinements.css > dist/styles.concat.css
CSS_RAW=$(wc -c < dist/styles.concat.css)

if [ "$MODE" = "release" ]; then
  npx esbuild dist/styles.concat.css --minify --outfile=dist/styles.min.css 2>/dev/null
  CSS_FILE="dist/styles.min.css"
  CSS_SIZE=$(du -h "$CSS_FILE" | cut -f1)
  CSS_SAVED=$(( (CSS_RAW - $(wc -c < "$CSS_FILE")) * 100 / CSS_RAW ))
  rm -f dist/styles.concat.css
  echo "   ✅ CSS bundle: $CSS_FILE ($CSS_SIZE, -${CSS_SAVED}%)"
else
  mv dist/styles.concat.css dist/styles.css
  CSS_FILE="dist/styles.css"
  CSS_SIZE=$(du -h "$CSS_FILE" | cut -f1)
  echo "   ✅ CSS bundle: $CSS_FILE ($CSS_SIZE)"
fi

# 3. Bundle JS (16 files + board.js → 1)
echo "📜 Bundling JavaScript..."
JS_ORDER=(
  js/i18n.js
  js/core.js
  js/data.js
  js/ui.js
  js/nutrition.js
  js/ai.js
  js/push.js
  js/onboarding.js
  js/recipes.js
  js/dashboard.js
  js/planner.js
  js/shopping.js
  js/tasks.js
  js/cooking.js
  js/features.js
  js/init.js
  board.js
)
cat "${JS_ORDER[@]}" > dist/app.concat.js
JS_RAW=$(wc -c < dist/app.concat.js)

if [ "$MODE" = "release" ]; then
  npx esbuild dist/app.concat.js --minify --outfile=dist/app.min.js 2>/dev/null
  JS_FILE="dist/app.min.js"
  JS_SIZE=$(du -h "$JS_FILE" | cut -f1)
  JS_SAVED=$(( (JS_RAW - $(wc -c < "$JS_FILE")) * 100 / JS_RAW ))
  rm -f dist/app.concat.js
  echo "   ✅ JS bundle: $JS_FILE ($JS_SIZE, -${JS_SAVED}%)"
else
  mv dist/app.concat.js dist/app.js
  JS_FILE="dist/app.js"
  JS_SIZE=$(du -h "$JS_FILE" | cut -f1)
  echo "   ✅ JS bundle: $JS_FILE ($JS_SIZE)"
fi

# 4. Bump SW cache version (release only)
if [ "$MODE" = "release" ]; then
  echo ""
  echo "🔁 Bumping SW cache version..."
  node -e "
  const fs = require('fs');
  let sw = fs.readFileSync('sw.js', 'utf8');
  sw = sw.replace(/CACHE = 'mealnest-v\d+'/, function(m) {
    const n = parseInt(m.match(/\d+/)[0]) + 1;
    const r = \"CACHE = 'mealnest-v\" + n + \"'\";
    console.log('   ✅ ' + m + ' → ' + r);
    return r;
  });
  fs.writeFileSync('sw.js', sw, 'utf8');
  "
fi

# 5. Stats
echo ""
echo "📊 Bundle stats ($MODE):"
echo "   JS:  $JS_FILE ($JS_SIZE)"
echo "   CSS: $CSS_FILE ($CSS_SIZE)"
echo ""
echo "✅ Done!"
