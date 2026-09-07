/* GitHub Pages serves static files only: a deep link like
   /Rivaayat/shop/kurta has no file behind it and returns 404 before the app
   ever boots. Pages does serve 404.html for unmatched paths, so shipping a
   copy of index.html under that name lets the SPA start and React Router read
   the URL it was actually asked for.

   Without this the site works only from its front door — every shared product
   link, every refresh on an inner page, breaks. */
import { copyFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dist = path.join(fileURLToPath(new URL('..', import.meta.url)), 'dist');
await copyFile(path.join(dist, 'index.html'), path.join(dist, '404.html'));

/* Belt and braces: the Actions-based Pages deploy does not run Jekyll, but a
   .nojekyll file costs nothing and guarantees no directory is skipped for
   starting with an underscore if the publish source is ever switched. */
await writeFile(path.join(dist, '.nojekyll'), '');

console.log('SPA fallback: dist/404.html + .nojekyll written');
