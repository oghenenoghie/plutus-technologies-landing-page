"""Turn capture.js output into the WebP files /docs serves: at most 1600 px wide, quality 80.

    python3 to-webp.py out/ ../../public/docs/screens

Needs Pillow. If a file's size changes, update SIZES in src/lib/docs.ts (npm test checks them).
"""

import sys
from pathlib import Path

from PIL import Image

src, dst = Path(sys.argv[1]), Path(sys.argv[2])
dst.mkdir(parents=True, exist_ok=True)
for png in sorted(src.glob("*.png")):
    image = Image.open(png).convert("RGB")
    width = min(1600, image.width)
    image = image.resize((width, round(image.height * width / image.width)), Image.LANCZOS)
    out = dst / f"{png.stem}.webp"
    image.save(out, "WEBP", quality=80, method=6)
    print(f"{out.name}: {image.width}x{image.height}, {out.stat().st_size // 1024} KB")
