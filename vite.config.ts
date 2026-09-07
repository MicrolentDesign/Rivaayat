import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

/* GitHub Pages serves this repo as a *project* page, so the site lives under
   /Rivaayat/ rather than at a domain root. `base` only applies to the build —
   dev stays at http://localhost:5180/ so local browsing is unchanged.

   Deploying to a root domain later means setting BASE to '/' and dropping the
   router basename; nothing else references it, because every public path goes
   through asset() in src/lib/image.ts. */
const BASE = '/Rivaayat/';

export default defineConfig(({ command, isPreview }) => ({
  /* `isPreview` matters: preview serves the built output, so it needs the same
     base as the build. Without it the server mounts at / and answers requests
     for /Rivaayat/assets/*.js with the SPA fallback HTML, so the bundle never
     evaluates and the page renders blank — which looks exactly like a broken
     build rather than a mis-served one. */
  base: command === 'build' || isPreview ? BASE : '/',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: { port: 5180, open: false },
  build: { outDir: 'dist', assetsDir: 'assets' },
}));
