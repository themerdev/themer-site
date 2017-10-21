#!/bin/bash
set -euo pipefail

mkdir -p dist

# now config
cp now.json dist/

# Main site files
cp apps.jpg dist/
cp basicGrid.min.css dist/
cp cli.jpg dist/
cp favicon.png dist/
cp index.css dist/
cp index.html dist/
cp intro.mp4 dist/
cp logo.png dist/
cp themes.jpg dist/
cp wallpaper.jpg dist/

# Generate preview files
themer -c themer-colors-default -t themer-preview-swatch -t themer-preview-code -o tmp
themer -c themer-colors-night-sky -t themer-preview-swatch -t themer-preview-code -o tmp
themer -c themer-colors-one -t themer-preview-swatch -t themer-preview-code -o tmp
themer -c themer-colors-polar-ice -t themer-preview-swatch -t themer-preview-code -o tmp
themer -c themer-colors-lucid -t themer-preview-swatch -t themer-preview-code -o tmp
themer -c themer-colors-finger-paint -t themer-preview-swatch -t themer-preview-code -o tmp
themer -c themer-colors-solarized -t themer-preview-swatch -t themer-preview-code -o tmp
mv -f tmp/themer-preview-swatch dist/
mv -f tmp/themer-preview-code dist/
rmdir tmp
