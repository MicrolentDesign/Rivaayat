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

## Product photography is routed by filename prefix

Drop a shot in `media/product/` and its **prefix** decides the category:

| Prefix | Category |
|---|---|
| `S…` | Sherwani |
| `SK…` | Shalwar Kameez |
| `K…` | Kurta |
| `WC…` | Waistcoat |

**Longest prefix wins**, which is the whole reason it is written that way:
`SK1.png` is a shalwar kameez, not a sherwani, even though both start with `S`.

Numbering is natural-sorted, so `S2` comes before `S10`.

### How they are dealt out

Shots go to the products in that category **in catalogue order, and no file is
ever used twice**:

- one photo, three products → the first product gets it, the other two keep
  their generated placeholder
- four photos, three products → each gets a main shot, then the first also
  gets a hover shot (two per card is the maximum)

Adding files and re-running `npm run images` is the whole update. Nothing in
`src/` needs editing — `src/data/productImages.ts` reads the generated
manifest.

### Shoot product portrait

Product cards, the PDP and quick view all render **3:4 portrait**, so the
pipeline crops to 3:4 (attention-positioned). A landscape master survives that,
but at a cost: a 1678 × 937 frame can only yield a 3:4 crop **702px wide**.
Fine for a card at 2×, tight for a PDP main image on a retina screen.

Portrait originals at 1200 × 1600 or larger avoid the crop and the ceiling
entirely.

## Folders set the profile

| Folder | Widths | Crop | For |
|---|---|---|---|
| `hero/` | 640 – 2560 | none, plus a 4:5 phone crop | full-bleed, needs the big end |
| `product/` | 360 – 1200 | **3:4** | cards, PDP, quick view |
| `category/` | 480 – 1280 | **4:5** | garment tiles — see its own README |
| `Sections/` | 640 – 1536 | none | editorial bands |
| anything else | 640 – 1600 | none | journal, misc |

Folder matching is case-insensitive, so `Sections/` and `sections/` behave the
same.

Widths wider than the original are skipped — upscaling adds bytes and no
detail.

## What to export

- **Long edge 2560px** for heroes, **1600px** for product. Bigger is wasted:
  nothing on the site renders larger, and the pipeline will not upscale.
- **JPEG or PNG, quality high.** Don't pre-compress — you would be throwing
  away detail the WebP encoder could have used. Compress once, here.
- **sRGB.** A wide-gamut file will look flat in some browsers.

## Hero phone crops are automatic

The hero is full-bleed and nearly full-height. A 16:9 frame cropped to a
390 × 640 phone keeps barely a third of its width, so a landscape master on its
own shows either empty sky or a model cut in half.

You don't have to do anything about it. For every file in `hero/`, the pipeline
also emits a **4:5 portrait crop**, chosen with sharp's attention strategy —
it picks the window over the busiest region of the frame, which on a
figure-against-landscape shot is the figure.

```
media/hero/terrace.jpg  →  public/hero/terrace-{640…2560}.webp        (landscape)
                           public/hero/terrace-portrait-{480…1200}.webp (phones)
                           public/hero/terrace.jpg, terrace-portrait.jpg
```

**To override it**, drop your own `hero/terrace-portrait.jpg` beside the master.
A crop a human chose always beats an automatic one — keep the model, keep enough
landscape to place him, and leave the lower-left third reasonably plain, because
the headline sits there. The pipeline detects the manual file and skips
generating its own.

`focal` in `src/data/hero.ts` is the third line of defence: a per-slide
`object-position` used when a crop still has to happen in the browser.

## Generated files are not committed

`public/hero/`, `public/product/` and `public/images.json` are ignored — they
are derivatives, rebuilt from these originals on every build. The originals
here **are** committed: without them nothing can be regenerated.
