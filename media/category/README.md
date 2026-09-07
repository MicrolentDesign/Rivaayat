# Category tile art (optional)

Name a file for the category slug and it becomes that garment's tile in
"Shop by garment", the header mega-menu, and the Custom Orders picker:

```
media/category/sherwani.png
media/category/shalwar-kameez.png
media/category/kurta.png
media/category/waistcoat.png
```

Cropped to **4:5** by the pipeline (attention-positioned), since the tiles are
portrait with an overlay title across the lower half. Leave the bottom third
reasonably plain — the garment name and piece count sit there in white.

## Or claim a product-folder image instead

If a shot already lives in `media/product/` and you want it on the tile rather
than on a card, list it in `src/data/imageRoles.ts`:

```ts
export const TILE_FROM_PRODUCT = {
  'shalwar-kameez': '/product/SK3',
};
```

Anything claimed there is **withdrawn from that category's product pool**, so it
cannot also appear on a card. `SK3` is set up this way.

## Without these files

The tiles fall back to the **last product photograph** in that category, so
they carry photography either way. The catch: when a category has fewer photos
than products, only the labelled pieces get photographed — and the labelled
pieces are exactly what the homepage rails show. So a tile can repeat a card
further up the same page.

Four files here removes that entirely.
