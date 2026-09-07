# Originals

Drop full-size photography in here. Never reference anything in this folder
from the site — it is the source, not the output.

```
media/hero/terrace.jpg          →  public/hero/terrace-{640,960,1440,1920,2560}.webp
                                   public/hero/terrace.jpg   (fallback)
media/product/mehr-front.jpg    →  public/product/mehr-front-{480,720,1080,1440}.webp
                                   public/product/mehr-front.jpg
```

```bash
npm run images
```

It also runs automatically before every `npm run build`, and it is incremental —
an output newer than its source is left alone, so re-running costs nothing.

## Folders set the profile

| Folder | Widths | Quality | For |
|---|---|---|---|
| `hero/` | 640 – 2560 | 78 | full-bleed, so it needs the big end |
| `product/` | 480 – 1440 | 82 | sits in a grid column, never full-bleed |
| anything else | 640 – 1600 | 80 | editorial, journal, tiles |

Widths wider than the original are skipped — upscaling adds bytes and no
detail.

## What to export

- **Long edge 2560px** for heroes, **1600px** for product. Bigger is wasted:
  nothing on the site renders larger, and the pipeline will not upscale.
- **JPEG or PNG, quality high.** Don't pre-compress — you would be throwing
  away detail the WebP encoder could have used. Compress once, here.
- **sRGB.** A wide-gamut file will look flat in some browsers.

## Hero images need a second crop

The hero is full-bleed and nearly full-height. A 16:9 frame cropped to a
390 × 640 phone keeps barely a third of its width, so a landscape master alone
either shows empty sky or cuts the model out.

Export each hero twice:

| File | Ratio | Used |
|---|---|---|
| `hero/terrace.jpg` | 16:9 landscape | tablet and desktop |
| `hero/terrace-portrait.jpg` | 4:5 or 3:4 portrait | under 768px |

For the portrait crop, keep the model and enough landscape to place him — and
leave the lower-left third reasonably plain, because the headline sits there.

Until a portrait file exists the hero falls back to a per-slide focal point
(`focal` in `src/data/hero.ts`), which pulls the crop onto the model. That
works, but a crop a human chose is always better.

## Generated files are not committed

`public/hero/`, `public/product/` and `public/images.json` are ignored — they
are derivatives, rebuilt from these originals on every build. The originals
here **are** committed: without them nothing can be regenerated.
