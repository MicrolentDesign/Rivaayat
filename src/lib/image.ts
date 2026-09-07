/* Helpers for the responsive images produced by scripts/optimise-images.mjs.

   Widths come from the generated manifest rather than the profile defaults,
   because the pipeline never upscales: a 1680px master fills the 640/960/1440
   rungs and not 1920 or 2560. Advertising a rung that does not exist means a
   retina screen requests it, gets a 404, and the whole <picture> fails. The
   manifest is imported, not fetched — a network round trip before the hero
   could start loading would defeat the point of the exercise. */

import { IMAGE_WIDTHS } from '@/data/image-manifest';

export type ImageProfile = 'hero' | 'product' | 'default';

const FALLBACK_WIDTHS: Record<ImageProfile, number[]> = {
  hero: [640, 960, 1440, 1920, 2560],
  product: [480, 720, 1080, 1440],
  default: [640, 1024, 1600],
};

/** `/hero/H3` → `/hero/H3-640.webp 640w, /hero/H3-960.webp 960w, …` */
export function srcSet(base: string, profile: ImageProfile = 'default') {
  const widths = IMAGE_WIDTHS[base] ?? FALLBACK_WIDTHS[profile];
  return widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
}

/** True once the pipeline has actually produced this image. */
export const hasImage = (base: string) => base in IMAGE_WIDTHS;

/** The JPEG the pipeline leaves beside the WebP set, for browsers without it. */
export const fallbackSrc = (base: string) => `${base}.jpg`;

/* `sizes` tells the browser how wide the image will render *before* layout, so
   it can pick a width off the srcset. Getting it wrong is the most common way a
   correct srcset still downloads the wrong file. */
export const SIZES = {
  /** full-bleed, edge to edge at every breakpoint */
  full: '100vw',
  /** the product grid: 2 up on phones, 3 on tablets, 4 on desktop */
  productGrid: '(min-width: 1280px) 23vw, (min-width: 768px) 31vw, 48vw',
  /** half-width editorial split */
  half: '(min-width: 900px) 50vw, 100vw',
  /** a third, as in the three-up card rows */
  third: '(min-width: 900px) 31vw, (min-width: 600px) 48vw, 100vw',
} as const;
