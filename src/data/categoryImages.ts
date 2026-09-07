import { CATEGORY_IMAGES, PRODUCT_IMAGES } from './image-manifest';
import type { ImageProfile } from '@/lib/image';
import { categories } from './products';
import { TILE_FROM_PRODUCT } from './imageRoles';

/* Art for the "Shop by garment" tiles, in order of preference:

     1. an explicit claim in imageRoles.ts — a product-folder photograph
        dedicated to the tile, and withdrawn from the product pool
     2. media/category/<slug>.png   — purpose-shot tile art, cropped 4:5
     3. the LAST product photo in that category — a fallback that can repeat a
        card on the same page when photos are scarce
     4. the generated placeholder that ships with the catalogue

   So the tiles carry photography the moment any product shots exist, and
   improve without a code change the moment tile art is dropped in. */

export interface TileArt {
  base?: string;
  src?: string;
  profile: ImageProfile;
}

export function categoryArt(slug: string): TileArt {
  const claimed = TILE_FROM_PRODUCT[slug as keyof typeof TILE_FROM_PRODUCT];
  if (claimed) return { base: claimed, profile: 'product' };

  const own = CATEGORY_IMAGES[slug];
  if (own) return { base: own, profile: 'category' };

  const pool = PRODUCT_IMAGES[slug];
  if (pool?.length) return { base: pool[pool.length - 1], profile: 'product' };

  return { src: categories.find((c) => c.slug === slug)?.image, profile: 'default' };
}
