import type { CategorySlug } from './types';

/* Explicit role overrides for pipeline images.

   Filename prefixes route a photograph to a category, but they say nothing
   about what it is *for*. This is where a specific file is claimed for a
   specific job, so it stops competing for a product slot.

   Anything listed here is removed from that category's product pool, which
   is the point: a tile and a card showing the same garment on one page is
   the thing we are avoiding. */

/** Category tile art taken from a product-folder image. */
export const TILE_FROM_PRODUCT: Partial<Record<CategorySlug, string>> = {
  'shalwar-kameez': '/product/sk3',
};

/** Every base claimed for a non-product role, flattened for pool filtering. */
export const CLAIMED_BASES = new Set<string>(Object.values(TILE_FROM_PRODUCT));
