#!/bin/bash
echo "Optimizing audio..."
ffmpeg -i public/audio/background.mp3 -b:a 64k public/audio/background-opt.mp3 -y
mv public/audio/background-opt.mp3 public/audio/background.mp3

echo "Optimizing PNGs and GIFs to WebP..."
cd src/assets
for file in *.png; do
  if [ -f "$file" ]; then
    echo "Converting $file..."
    ffmpeg -i "$file" -c:v libwebp -quality 80 "${file%.png}.webp" -y
    rm "$file"
  fi
done

for file in *.gif; do
  if [ -f "$file" ]; then
    echo "Converting $file..."
    ffmpeg -i "$file" -c:v libwebp_anim -loop 0 -lossless 0 -qscale 80 "${file%.gif}.webp" -y
    rm "$file"
  fi
done

echo "Done!"
