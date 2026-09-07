export interface HeroSlide {
  /** output base from the image pipeline, no extension and no width —
   *  srcSet() in lib/image.ts expands it into the full WebP ladder */
  base: string;
  /** purpose-made portrait crop for phones — optional; without it the focal
   *  point below does the art direction instead */
  baseMobile?: string;
  /** shown until the photography lands, and if a file ever 404s */
  fallback: string;
  /** where the subject sits in the landscape master, as an object-position.
   *  A 16:9 frame cropped to a 390×640 phone shows barely a third of its
   *  width, so `center` would land on empty sky and cut the model out. */
  focal: string;
  alt: string;
  eyebrow: string;
  title: string;
  cta: string;
  to: string;
}

/* Focal points are measured from the supplied frames: the model stands
   right of centre in all three, furthest right in the hillside shot. */
export const heroSlides: HeroSlide[] = [
  {
    base: '/hero/terrace',
    baseMobile: '/hero/terrace-portrait',
    fallback: '/img/hero-01.svg',
    focal: '62% center',
    alt: 'A man in a cream kurta and printed Nehru jacket walking a stone terrace above a lake palace',
    eyebrow: 'Mehtab · Autumn Winter 2026',
    title: 'Cloth that remembers whose hands made it.',
    cta: 'Enter the collection',
    to: '/shop/kurta',
  },
  {
    base: '/hero/hillside',
    baseMobile: '/hero/hillside-portrait',
    fallback: '/img/hero-02.svg',
    focal: '66% center',
    alt: 'A man in a navy kurta and stole on a hillside above the sea at first light',
    eyebrow: 'Made to measure, no surcharge',
    title: 'Six numbers. One kurta. Cut to you.',
    cta: 'Start a custom order',
    to: '/custom',
  },
  {
    base: '/hero/grassland',
    baseMobile: '/hero/grassland-portrait',
    fallback: '/img/hero-03.svg',
    focal: '52% center',
    alt: 'A man in a hand-embroidered black jacket walking open grassland under a wide sky',
    eyebrow: 'The Archive',
    title: 'One of one, and never remade.',
    cta: 'See what remains',
    to: '/shop/waistcoat',
  },
];
