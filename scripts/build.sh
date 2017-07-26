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
themer -c themer-colors-default -t scripts/themer-previews.js -o tmp
themer -c themer-colors-night-sky -t scripts/themer-previews.js -o tmp
themer -c themer-colors-one -t scripts/themer-previews.js -o tmp
themer -c themer-colors-polar-ice -t scripts/themer-previews.js -o tmp
mv -f tmp/themer-previews.js dist/color-set-previews
rmdir tmp
