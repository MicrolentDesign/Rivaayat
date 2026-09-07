/* ============================================================================
   IMAGE PIPELINE
   Drop an original into media/ and this turns it into responsive WebP.

     media/hero/terrace.jpg          →  public/hero/terrace-960.webp
                                        public/hero/terrace-1440.webp
                                        public/hero/terrace-1920.webp
                                        public/hero/terrace-2560.webp
                                        public/hero/terrace.jpg   (fallback)

   Run: npm run images    — and it runs automatically before every build.

   Incremental: an output newer than its source is left alone, so running it
   on every build costs almost nothing after the first pass.
   ========================================================================== */
import sharp from 'sharp';
import { readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/* fileURLToPath, not URL.pathname: pathname percent-encodes, so any space in
   the project path ("Rivaayat New") becomes %20 and every fs call misses. */
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = path.join(ROOT, 'media');
const OUT = path.join(ROOT, 'public');

/* Widths per folder. Heroes go full-bleed so they need the big end; product
   shots sit in a grid column and never do. Generating widths a source cannot
   fill is just upscaling, so anything wider than the original is skipped. */
const PROFILES = {
  /* `portrait` makes the hero profile emit a second, phone-shaped crop from the
     same landscape master. A 16:9 frame cropped to a tall phone window keeps
     about a third of its width, so without this the choice is empty sky or a
     model cut in half. sharp's attention strategy picks the crop window by
     looking for the busiest region, which on a figure-against-landscape shot is
     the figure. Supplying your own `<name>-portrait.jpg` overrides it — a crop a
     human chose always wins. */
  hero:    { widths: [640, 960, 1440, 1920, 2560], quality: 78, fallbackWidth: 1600,
             portrait: { ratio: 4 / 5, widths: [480, 720, 960, 1200] } },
  /* Product cards, the PDP and quick view all render 3:4, so that is the
     shape the pipeline should hand them — cropping in the browser would
     download pixels only to throw them away. `crop` makes the main widths
     3:4 instead of the source ratio, attention-positioned like the hero's
     phone crop.

     Note what this costs: a 1678x937 landscape master can only yield a
     3:4 crop 702px wide (937 x 0.75). Plenty for a card at 2x, tight for a
     PDP main image. Product photography wants to be shot portrait. */
  product: { widths: [360, 480, 600, 702, 900, 1200], quality: 82, fallbackWidth: 702,
             crop: { ratio: 3 / 4 } },
  /* Category tiles render 4:5 portrait with an overlay title, so crop to that
     and let the attention strategy keep the garment. Drop files in
     media/category/ named for the slug: sherwani.png, shalwar-kameez.png,
     kurta.png, waistcoat.png. */
  category: { widths: [480, 720, 1000, 1280],     quality: 82, fallbackWidth: 1000,
              crop: { ratio: 4 / 5 } },

  /* Editorial band images. They render around 50vw inside a 4:3 or 4:5 box,
     so `cover` in CSS handles the shape and the pipeline leaves the framing
     alone — an automatic crop would fight whatever the photographer intended. */
  /* Journal cards and article headers, rendered 4:3 by CSS `cover` — the
     framing is left alone. Name the file after the post title: the resolver
     matches the slugified *title*, not the URL slug. */
  journal:  { widths: [640, 960, 1280, 1536],     quality: 80, fallbackWidth: 1280 },
  sections: { widths: [640, 960, 1280, 1536],     quality: 80, fallbackWidth: 1280 },
  default:  { widths: [640, 1024, 1600],          quality: 80, fallbackWidth: 1200 },
};

const RASTER = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);

/* Output paths are slugified so a URL never depends on how a file was named.
   "Made to measure.png" in a folder called "Sections" would otherwise ship as
   /Sections/Made%20to%20measure-960.webp — which works, but is fragile across
   CDNs and unpleasant to reference. Source filenames are left alone. */
const slug = (v) => v
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

async function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'README.md') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (RASTER.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const newerThan = async (a, b) => {
  try { return (await stat(a)).mtimeMs >= (await stat(b)).mtimeMs; }
  catch { return false; }
};

const kb = (n) => `${Math.round(n / 1024)} KB`;

async function run() {
  const files = await walk(SRC);
  if (files.length === 0) {
    console.log('No originals in media/ yet — nothing to do.');
    console.log('Drop photography into media/hero/ or media/product/ and run this again.');
    return;
  }

  const manifest = {};
  let wrote = 0, skipped = 0, srcBytes = 0, outBytes = 0;

  for (const file of files) {
    const rel = path.relative(SRC, file);
    const srcDir = path.dirname(rel);
    const dir = srcDir.split(path.sep).map(slug).join(path.sep);
    const name = slug(path.basename(rel, path.extname(rel)));
    /* Folder name picks the profile, case-insensitively — "Sections" and
       "sections" should not behave differently. */
    const folder = dir.split(path.sep)[0];
    const profile = PROFILES[folder] ?? PROFILES.default;
    const outDir = path.join(OUT, dir);
    await mkdir(outDir, { recursive: true });

    const meta = await sharp(file).metadata();
    const srcWidth = meta.width ?? 0;
    srcBytes += (await stat(file)).size;

    /* Never upscale. With a crop, the ceiling is what the crop can yield —
       a 1678x937 master cropped to 3:4 tops out at 702px, not 1678. */
    const maxWidth = profile.crop
      ? Math.floor(Math.min(srcWidth, (meta.height ?? 0) * profile.crop.ratio))
      : srcWidth;
    const widths = profile.widths.filter((w) => w <= maxWidth);
    if (widths.length === 0) widths.push(maxWidth);

    const entry = { widths: [], fallback: `/${path.join(dir, `${name}.jpg`)}`, width: srcWidth, height: meta.height ?? 0 };

    for (const w of widths) {
      const dest = path.join(outDir, `${name}-${w}.webp`);
      entry.widths.push({ w, src: `/${path.join(dir, `${name}-${w}.webp`)}` });
      if (await newerThan(dest, file)) { skipped++; outBytes += (await stat(dest)).size; continue; }
      const resize = profile.crop
        ? { width: w, height: Math.round(w / profile.crop.ratio), fit: 'cover', position: sharp.strategy.attention }
        : { width: w, withoutEnlargement: true };
      await sharp(file).resize(resize).webp({ quality: profile.quality, effort: 5 }).toFile(dest);
      wrote++;
      outBytes += (await stat(dest)).size;
    }

    // one JPEG so a browser without WebP still gets a picture
    const fallback = path.join(outDir, `${name}.jpg`);
    if (!(await newerThan(fallback, file))) {
      const fw = Math.min(profile.fallbackWidth, maxWidth);
      const fResize = profile.crop
        ? { width: fw, height: Math.round(fw / profile.crop.ratio), fit: 'cover', position: sharp.strategy.attention }
        : { width: fw, withoutEnlargement: true };
      await sharp(file).resize(fResize).jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(fallback);
      wrote++;
    }

    /* auto portrait crop, unless this file IS one or a manual one exists */
    let portraitNote = '';
    if (profile.portrait && !name.endsWith('-portrait')) {
      const manual = files.some((f) => {
        const b = path.basename(f, path.extname(f));
        return path.dirname(path.relative(SRC, f)) === dir && b === `${name}-portrait`;
      });
      if (manual) {
        portraitNote = ' (manual portrait supplied)';
      } else {
        const pWidths = profile.portrait.widths.filter((w) => w <= srcWidth);
        for (const w of pWidths) {
          const h = Math.round(w / profile.portrait.ratio);
          const dest = path.join(outDir, `${name}-portrait-${w}.webp`);
          if (await newerThan(dest, file)) { skipped++; outBytes += (await stat(dest)).size; continue; }
          await sharp(file)
            .resize({ width: w, height: h, fit: 'cover', position: sharp.strategy.attention })
            .webp({ quality: profile.quality, effort: 5 })
            .toFile(dest);
          wrote++;
          outBytes += (await stat(dest)).size;
        }
        const pFallback = path.join(outDir, `${name}-portrait.jpg`);
        if (!(await newerThan(pFallback, file))) {
          const w = Math.min(1200, srcWidth);
          await sharp(file)
            .resize({ width: w, height: Math.round(w / profile.portrait.ratio), fit: 'cover', position: sharp.strategy.attention })
            .jpeg({ quality: 80, progressive: true, mozjpeg: true })
            .toFile(pFallback);
          wrote++;
        }
        /* Register the crop in the manifest under its own base. Without this
           srcSet() falls back to the profile's default widths and advertises
           rungs the crop never produced — a phone at a high DPR asks for one,
           takes a 404, and the hero drops to its placeholder. */
        manifest[`${dir}/${name}-portrait`] = {
          widths: pWidths.map((w) => ({ w, src: `/${path.join(dir, `${name}-portrait-${w}.webp`)}` })),
          fallback: `/${path.join(dir, `${name}-portrait.jpg`)}`,
          width: 0, height: 0,
        };
        portraitNote = ` + ${pWidths.length} portrait`;
      }
    }

    manifest[`${dir}/${name}`.replace(/^\.\//, '')] = entry;
    const renamed = slug(path.basename(rel, path.extname(rel))) !== path.basename(rel, path.extname(rel)).toLowerCase()
      || srcDir !== dir;
    console.log(`  ${rel}  ${srcWidth}px  →  ${widths.length} webp + jpg${portraitNote}`
      + (renamed ? `   [/${dir}/${name}]` : ''));
  }

  await writeFile(path.join(OUT, 'images.json'), JSON.stringify(manifest, null, 2));

  /* Also emit a typed manifest for the app to import. srcSet() must advertise
     only widths that were actually written: a 1680px source cannot fill the
     2560 rung, and a retina desktop asking for it would 404 and take the whole
     <picture> down with it. Imported, not fetched — a runtime round trip
     before the hero can start loading would defeat the point. */
  /* Product images are routed to a category by filename prefix. Longest
     prefix wins, which is the whole reason this is ordered: SK1 must land in
     shalwar-kameez, not sherwani, and both start with S. */
  const PREFIXES = [
    ['SK', 'shalwar-kameez'],
    ['WC', 'waistcoat'],
    ['K',  'kurta'],
    ['S',  'sherwani'],
  ];
  /* Natural sort, so S10 follows S9 instead of S1. */
  const natural = (a, b) => a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' });

  const byCategory = {};
  for (const key of Object.keys(manifest)) {
    if (!key.startsWith('product/')) continue;
    const name = key.slice('product/'.length);
    const hit = PREFIXES.find(([p]) => name.toUpperCase().startsWith(p));
    if (!hit) { console.warn(`  ! ${name} matches no category prefix (S / K / SK / WC) — skipped`); continue; }
    (byCategory[hit[1]] ??= []).push(name);
  }
  for (const list of Object.values(byCategory)) list.sort(natural);

  /* Category tiles: media/category/<slug>.<ext> */
  /* Journal art: media/journal/<post title>.<ext>, keyed by slugified title. */
  const journalArt = {};
  for (const key of Object.keys(manifest)) {
    if (!key.startsWith('journal/')) continue;
    journalArt[key.slice('journal/'.length)] = `/${key}`;
  }
  const journalLines = Object.entries(journalArt)
    .map(([k, base]) => `  '${k}': '${base}',`)
    .join('\n');

  const categoryTiles = {};
  for (const key of Object.keys(manifest)) {
    if (!key.startsWith('category/')) continue;
    categoryTiles[key.slice('category/'.length).toLowerCase()] = `/${key}`;
  }
  const categoryLines = Object.entries(categoryTiles)
    .map(([slug, base]) => `  '${slug}': '${base}',`)
    .join('\n');

  const productLines = Object.entries(byCategory)
    .map(([cat, names]) => `  '${cat}': [${names.map((n) => `'/product/${n}'`).join(', ')}],`)
    .join('\n');

  const lines = Object.entries(manifest)
    .map(([k, v]) => `  '/${k}': [${v.widths.map((w) => w.w).join(', ')}],`)
    .join('\n');
  await writeFile(
    path.join(ROOT, 'src', 'data', 'image-manifest.ts'),
    `/* GENERATED by scripts/optimise-images.mjs — do not edit.\n`
    + `   Maps each image base path to the widths that exist on disk. */\n\n`
    + `export const IMAGE_WIDTHS: Record<string, number[]> = {\n${lines}\n};\n\n`
    + `/* Product photography grouped by category, from the filename prefix:\n`
    + `   S* sherwani  ·  K* kurta  ·  SK* shalwar kameez  ·  WC* waistcoat\n`
    + `   Sorted naturally, so S2 comes before S10. */\n`
    + `export const PRODUCT_IMAGES: Record<string, string[]> = {\n${productLines}\n};\n\n`
    + `/* Category tile art, from media/category/<slug>.<ext>. Optional — a\n`
    + `   category without one falls back to a product photograph. */\n`
    + `export const CATEGORY_IMAGES: Record<string, string> = {\n${categoryLines}\n};\n\n`
    + `/* Journal art, keyed by the slugified post *title* — name the file after\n`
    + `   the headline and it lands on the right entry. */\n`
    + `export const JOURNAL_IMAGES: Record<string, string> = {\n${journalLines}\n};\n`,
  );

  if (Object.keys(byCategory).length) {
    console.log('\nProduct images by category:');
    for (const [cat, names] of Object.entries(byCategory)) console.log(`  ${cat.padEnd(16)} ${names.join(', ')}`);
  }

  console.log(`\n${wrote} written, ${skipped} already current.`);
  console.log(`Originals ${kb(srcBytes)} → generated ${kb(outBytes)} across all widths.`);
  console.log('Manifest: public/images.json');
}

run().catch((e) => { console.error(e); process.exit(1); });
