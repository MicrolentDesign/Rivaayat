/* Helpers for the responsive images produced by scripts/optimise-images.mjs.

   The pipeline writes public/images.json, but the components do not read it at
   runtime — that would mean a network round trip before the hero can even start
   loading. Instead these build the srcset from the naming convention, which is
   fixed and known at author time. */

export type ImageProfile = 'hero' | 'product' | 'default';

const WIDTHS: Record<ImageProfile, number[]> = {
  hero: [640, 960, 1440, 1920, 2560],
  product: [480, 720, 1080, 1440],
  default: [640, 1024, 1600],
};

/** `/hero/terrace` → `/hero/terrace-640.webp 640w, /hero/terrace-960.webp 960w, …` */
export function srcSet(base: string, profile: ImageProfile = 'default') {
  return WIDTHS[profile].map((w) => `${base}-${w}.webp ${w}w`).join(', ');
}

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
