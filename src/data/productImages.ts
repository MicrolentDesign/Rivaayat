import { PRODUCT_IMAGES } from './image-manifest';
import { CLAIMED_BASES } from './imageRoles';
import { products } from './products';
import type { Product } from './types';

/* Resolves which photograph belongs to which product.

   Photography is routed to a category by filename prefix (S / K / SK / WC —
   see scripts/optimise-images.mjs) and then dealt out to the products in that
   category, round-robin, **never reusing a file**:

     one photo, three products   → the first product gets it, the other two
                                   keep their generated placeholder
     five photos, three products → each gets a main shot, then the first two
                                   also get a hover shot

   Adding files to media/product/ and re-running `npm run images` is the whole
   update — nothing here needs editing. */

export type ProductShot =
  | { kind: 'photo'; base: string }
  | { kind: 'placeholder'; src: string };

/** At most two shots per card: the main image and the hover cross-fade. */
const MAX_SHOTS = 2;

const assigned = new Map<string, string[]>();

for (const [category, allShots] of Object.entries(PRODUCT_IMAGES)) {
  /* Skip files claimed for another role — a tile photograph should not also
     turn up on a card two rows away. */
  const pool = allShots.filter((base) => !CLAIMED_BASES.has(base));
  /* Labelled pieces get photographed first. The homepage rails are built from
     the `new` and `bestseller` labels, so a category with fewer photos than
     products would otherwise leave a placeholder in the shop window while the
     real photography sat on a piece nobody lands on. Catalogue order breaks
     ties, so the result is still deterministic. */
  const inCategory = products
    .filter((p) => p.category === category)
    .map((p, i) => ({ p, i, promoted: p.labels.length > 0 ? 0 : 1 }))
    .sort((a, b) => a.promoted - b.promoted || a.i - b.i)
    .map(({ p }) => p);
  if (inCategory.length === 0) continue;

  pool.forEach((base, i) => {
    const product = inCategory[i % inCategory.length];
    const shots = assigned.get(product.id) ?? [];
    if (shots.length < MAX_SHOTS) {
      shots.push(base);
      assigned.set(product.id, shots);
    }
  });
}

export function shotsFor(product: Product): ProductShot[] {
  const photos = assigned.get(product.id);
  if (photos?.length) return photos.map((base) => ({ kind: 'photo', base }) as const);
  return product.images.map((src) => ({ kind: 'placeholder', src }) as const);
}

/** True where real photography has landed — useful for a "shot" filter later. */
export const hasPhotography = (product: Product) => assigned.has(product.id);
