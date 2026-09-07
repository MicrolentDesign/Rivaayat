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
  hero:    { widths: [640, 960, 1440, 1920, 2560], quality: 78, fallbackWidth: 1600 },
  product: { widths: [480, 720, 1080, 1440],       quality: 82, fallbackWidth: 1080 },
  default: { widths: [640, 1024, 1600],            quality: 80, fallbackWidth: 1200 },
};

const RASTER = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);

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
    const dir = path.dirname(rel);
    const name = path.basename(rel, path.extname(rel));
    const profile = PROFILES[dir.split(path.sep)[0]] ?? PROFILES.default;
    const outDir = path.join(OUT, dir);
    await mkdir(outDir, { recursive: true });

    const meta = await sharp(file).metadata();
    const srcWidth = meta.width ?? 0;
    srcBytes += (await stat(file)).size;

    // never upscale; keep one width at or above the source so nothing is lost
    const widths = profile.widths.filter((w) => w <= srcWidth);
    if (widths.length === 0) widths.push(srcWidth);

    const entry = { widths: [], fallback: `/${path.join(dir, `${name}.jpg`)}`, width: srcWidth, height: meta.height ?? 0 };

    for (const w of widths) {
      const dest = path.join(outDir, `${name}-${w}.webp`);
      entry.widths.push({ w, src: `/${path.join(dir, `${name}-${w}.webp`)}` });
      if (await newerThan(dest, file)) { skipped++; outBytes += (await stat(dest)).size; continue; }
      await sharp(file)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: profile.quality, effort: 5 })
        .toFile(dest);
      wrote++;
      outBytes += (await stat(dest)).size;
    }

    // one JPEG so a browser without WebP still gets a picture
    const fallback = path.join(outDir, `${name}.jpg`);
    if (!(await newerThan(fallback, file))) {
      await sharp(file)
        .resize({ width: Math.min(profile.fallbackWidth, srcWidth), withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true, mozjpeg: true })
        .toFile(fallback);
      wrote++;
    }

    manifest[`${dir}/${name}`.replace(/^\.\//, '')] = entry;
    console.log(`  ${rel}  ${srcWidth}px  →  ${widths.length} webp + jpg`);
  }

  await writeFile(path.join(OUT, 'images.json'), JSON.stringify(manifest, null, 2));

  console.log(`\n${wrote} written, ${skipped} already current.`);
  console.log(`Originals ${kb(srcBytes)} → generated ${kb(outBytes)} across all widths.`);
  console.log('Manifest: public/images.json');
}

run().catch((e) => { console.error(e); process.exit(1); });
