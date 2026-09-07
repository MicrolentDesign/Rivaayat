import type { Product, Category, JournalPost } from './types';

const img = (n: string) => `/img/${n}.svg`;

export const categories: Category[] = [
  { slug: 'bridal',      name: 'Bridal',       tagline: 'Lehengas, ghararas and the pieces a family keeps.', image: img('cat-bridal'),      count: 4 },
  { slug: 'festive',     name: 'Festive',      tagline: 'For the nights that ask for gold thread.',          image: img('cat-festive'),     count: 4 },
  { slug: 'menswear',    name: 'Menswear',     tagline: 'Sherwanis and kurtas cut close to the body.',       image: img('cat-menswear'),    count: 2 },
  { slug: 'everyday',    name: 'Everyday',     tagline: 'Handloom you can wear on a Tuesday.',               image: img('cat-everyday'),    count: 1 },
  { slug: 'accessories', name: 'Accessories',  tagline: 'Dupattas, stoles and the finishing hand.',          image: img('cat-accessories'), count: 2 },
  { slug: 'archive',     name: 'The Archive',  tagline: 'One of one. Never remade.',                         image: img('cat-archive'),     count: 1 },
];

const CARE = [
  'Dry clean only, by a specialist familiar with hand embroidery',
  'Store folded in muslin, never on a hanger',
  'Keep away from direct sunlight and perfume',
];

export const products: Product[] = [
  {
    id: 'p-001', slug: 'noor-anarkali', title: 'Noor Anarkali',
    subtitle: 'Hand-embroidered silk anarkali with a twelve-panel flare',
    category: 'festive', collection: 'Mehtab · AW26',
    price: 48500, priceFrom: true,
    images: [img('anarkali-noor'), img('anarkali-noor-alt')],
    colors: [{ name: 'Saffron Dusk', hex: '#C08A2E' }, { name: 'Henna', hex: '#9C4A21' }, { name: 'Ivory', hex: '#F2EDE4' }],
    sizes: { label: 'Size', values: [{ value: 'XS', available: true }, { value: 'S', available: true }, { value: 'M', available: true }, { value: 'L', available: true }, { value: 'XL', available: false }, { value: 'Made to measure', available: true }] },
    labels: ['new', 'made-to-order'], rating: 4.9, reviewCount: 38,
    fabric: 'Mulberry silk, 22 momme', craft: 'Zardozi and dori work', origin: 'Lucknow, Uttar Pradesh',
    care: CARE, includes: ['Anarkali kurta', 'Churidar', 'Organza dupatta'],
    description: 'Twelve panels fall from a fitted yoke into a full circle at the hem. The zardozi runs only where the light catches it — the neckline, the cuffs, and a single band above the border. Six weeks on the frame, three artisans, one piece.',
    leadTimeDays: 42, inStock: true,
  },
  {
    id: 'p-002', slug: 'sanjh-lehenga', title: 'Sanjh Lehenga',
    subtitle: 'Raw silk bridal lehenga with a hand-cut jaali border',
    category: 'bridal', collection: 'Mehtab · AW26',
    price: 186000, priceFrom: true,
    images: [img('lehenga-sanjh'), img('lehenga-sanjh-alt')],
    colors: [{ name: 'Plum Shadow', hex: '#5C3B4A' }, { name: 'Rosewood', hex: '#A8676B' }],
    sizes: { label: 'Size', values: [{ value: 'XS', available: true }, { value: 'S', available: true }, { value: 'M', available: true }, { value: 'L', available: true }, { value: 'Made to measure', available: true }] },
    labels: ['made-to-order', 'bestseller'], rating: 5.0, reviewCount: 12,
    fabric: 'Raw silk with tissue lining', craft: 'Jaali cutwork, sequin and bead', origin: 'Jaipur, Rajasthan',
    care: CARE, includes: ['Lehenga skirt', 'Blouse', 'Tissue dupatta', 'Muslin storage bag'],
    description: 'The border is cut by hand, not punched — every arch in the jaali is a little different, which is how you know a person made it. Nine metres of ghera, weighted at the hem so it moves the way it should when you walk.',
    leadTimeDays: 90, inStock: true,
  },
  {
    id: 'p-003', slug: 'mehr-sherwani', title: 'Mehr Sherwani',
    subtitle: 'Indigo wool-silk sherwani with tonal zari piping',
    category: 'menswear', collection: 'Mehtab · AW26',
    price: 74000,
    images: [img('sherwani-mehr'), img('sherwani-mehr-alt')],
    colors: [{ name: 'Deep Indigo', hex: '#2B3A4A' }, { name: 'Slate', hex: '#4A443C' }],
    sizes: { label: 'Size', values: [{ value: '38', available: true }, { value: '40', available: true }, { value: '42', available: true }, { value: '44', available: true }, { value: '46', available: false }] },
    labels: ['bestseller'], rating: 4.8, reviewCount: 27,
    fabric: 'Wool-silk blend, 340gsm', craft: 'Tonal zari piping, hand-set buttons', origin: 'Delhi',
    care: CARE, includes: ['Sherwani', 'Churidar', 'Stole'],
    description: 'Cut close through the chest and released at the hip, so it reads as a coat rather than a costume. The zari is the same colour as the cloth — you only find it when you are close enough to shake a hand.',
    leadTimeDays: 21, inStock: true,
  },
  {
    id: 'p-004', slug: 'raahat-kurta', title: 'Raahat Kurta',
    subtitle: 'Handloom khadi kurta, unlined and unhurried',
    category: 'everyday', collection: 'Everyday Handloom',
    price: 8900, compareAt: 11500,
    images: [img('kurta-raahat'), img('kurta-raahat-alt')],
    colors: [{ name: 'Moss', hex: '#4F5B44' }, { name: 'Undyed', hex: '#F2EDE4' }, { name: 'Ink', hex: '#1A1714' }],
    sizes: { label: 'Size', values: [{ value: 'XS', available: true }, { value: 'S', available: true }, { value: 'M', available: true }, { value: 'L', available: true }, { value: 'XL', available: true }, { value: 'XXL', available: true }] },
    labels: [], rating: 4.7, reviewCount: 156,
    fabric: 'Handspun khadi cotton', craft: 'Pit-loom woven, hand-finished seams', origin: 'Kutch, Gujarat',
    care: ['Machine wash cold, gentle cycle', 'Line dry in shade', 'Warm iron while slightly damp'],
    includes: ['Kurta'],
    description: 'Khadi off a pit loom, which means it breathes and it creases and it gets better for both. The side seams are finished by hand so there is nothing to scratch. It will shrink about two percent on the first wash; we cut for that.',
    leadTimeDays: 4, inStock: true,
  },
  {
    id: 'p-005', slug: 'zohra-saree', title: 'Zohra Saree',
    subtitle: 'Banarasi tissue saree with a real-zari pallu',
    category: 'festive', collection: 'Mehtab · AW26',
    price: 96000,
    images: [img('saree-zohra'), img('saree-zohra-alt')],
    colors: [{ name: 'Marigold', hex: '#C08A2E' }, { name: 'Champagne', hex: '#E7DFD2' }],
    sizes: { label: 'Length', values: [{ value: '5.5 m', available: true }, { value: '6.3 m with blouse piece', available: true }] },
    labels: ['new'], rating: 4.9, reviewCount: 21,
    fabric: 'Katan silk with tissue ground', craft: 'Kadhwa weave, real gold-tested zari', origin: 'Varanasi, Uttar Pradesh',
    care: CARE, includes: ['Saree', 'Unstitched blouse piece', 'Fall stitched'],
    description: 'Woven kadhwa, so each motif is worked in separately and there are no floats to cut on the reverse. Four months on the loom. The zari is tested — you can have it assayed and it will hold.',
    leadTimeDays: 7, inStock: true,
  },
  {
    id: 'p-006', slug: 'gulnaz-sharara', title: 'Gulnaz Sharara',
    subtitle: 'Chanderi sharara set with mukaish scatter',
    category: 'festive', collection: 'Shab · Resort',
    price: 42000, compareAt: 52000,
    images: [img('sharara-gulnaz'), img('sharara-gulnaz-alt')],
    colors: [{ name: 'Terracotta', hex: '#9C4A21' }, { name: 'Bone', hex: '#F2EDE4' }],
    sizes: { label: 'Size', values: [{ value: 'XS', available: true }, { value: 'S', available: false }, { value: 'M', available: true }, { value: 'L', available: true }, { value: 'XL', available: true }] },
    labels: ['bestseller'], rating: 4.6, reviewCount: 64,
    fabric: 'Handwoven chanderi', craft: 'Mukaish badla scatter', origin: 'Chanderi, Madhya Pradesh',
    care: CARE, includes: ['Kurta', 'Sharara', 'Dupatta'],
    description: 'Chanderi is half silk, half cotton, and it holds a shape without weight. The mukaish is scattered rather than patterned, which is the older way of doing it — the badla is pushed through the weave and folded back by hand.',
    leadTimeDays: 14, inStock: true,
  },
  {
    id: 'p-007', slug: 'shabnam-dupatta', title: 'Shabnam Dupatta',
    subtitle: 'Organza dupatta with a hand-rolled scallop edge',
    category: 'accessories', collection: 'Everyday Handloom',
    price: 14500,
    images: [img('dupatta-shabnam'), img('dupatta-shabnam-alt')],
    colors: [{ name: 'Sea Glass', hex: '#3F5C58' }, { name: 'Ivory', hex: '#FAF8F4' }, { name: 'Henna', hex: '#9C4A21' }],
    sizes: { label: 'Size', values: [{ value: '2.5 m', available: true }] },
    labels: [], rating: 4.8, reviewCount: 89,
    fabric: 'Silk organza', craft: 'Hand-rolled scallop, pearl finish', origin: 'Bengaluru, Karnataka',
    care: CARE, includes: ['Dupatta'],
    description: 'Every scallop on the edge is rolled and stitched by hand — roughly eleven hours around the full perimeter. Sheer enough to read a page through, stiff enough to hold a pleat on the shoulder.',
    leadTimeDays: 5, inStock: true,
  },
  {
    id: 'p-008', slug: 'parvaaz-jacket', title: 'Parvaaz Jacket',
    subtitle: 'Quilted kantha jacket over vintage cotton',
    category: 'accessories', collection: 'Shab · Resort',
    price: 26500,
    images: [img('jacket-parvaaz'), img('jacket-parvaaz-alt')],
    colors: [{ name: 'Indigo', hex: '#2B3A4A', hex2: '#4A443C' }, { name: 'Rust', hex: '#9C4A21', hex2: '#C08A2E' }],
    sizes: { label: 'Size', values: [{ value: 'S/M', available: true }, { value: 'L/XL', available: true }] },
    labels: ['new'], rating: 4.9, reviewCount: 41,
    fabric: 'Reclaimed cotton, three layers', craft: 'Running-stitch kantha quilting', origin: 'Bolpur, West Bengal',
    care: ['Gentle hand wash, cold', 'Dry flat in shade', 'Do not bleach'],
    includes: ['Jacket'],
    description: 'Three layers of cotton that had a life before this one, held together by a running stitch that goes from edge to edge. Reversible. No two are the same because no two sets of sarees ever are.',
    leadTimeDays: 10, inStock: true,
  },
  {
    id: 'p-009', slug: 'noorjahan-kaftan', title: 'Noorjahan Kaftan',
    subtitle: 'Floor-length georgette kaftan with a beaded yoke',
    category: 'festive', collection: 'Shab · Resort',
    price: 31000,
    images: [img('kaftan-noorjahan'), img('kaftan-noorjahan-alt')],
    colors: [{ name: 'Mauve', hex: '#5C3B4A' }, { name: 'Blush', hex: '#A8676B' }],
    sizes: { label: 'Size', values: [{ value: 'One size', available: true }] },
    labels: [], rating: 4.5, reviewCount: 33,
    fabric: 'Silk georgette', craft: 'Glass-bead yoke, French seams', origin: 'Mumbai, Maharashtra',
    care: CARE, includes: ['Kaftan', 'Detachable belt'],
    description: 'One size, cut generously, with the whole shape decided by where you put the belt. The yoke carries about four thousand glass beads set in a fanned pattern that stops precisely at the collarbone.',
    leadTimeDays: 12, inStock: true,
  },
  {
    id: 'p-010', slug: 'meher-blouse', title: 'Meher Blouse',
    subtitle: 'Structured raw-silk blouse, cut to your measure',
    category: 'bridal', collection: 'Mehtab · AW26',
    price: 18500,
    images: [img('blouse-meher'), img('blouse-meher-alt')],
    colors: [{ name: 'Antique Gold', hex: '#C08A2E' }, { name: 'Henna', hex: '#9C4A21' }, { name: 'Ink', hex: '#1A1714' }],
    sizes: { label: 'Size', values: [{ value: 'XS', available: true }, { value: 'S', available: true }, { value: 'M', available: true }, { value: 'L', available: true }, { value: 'Made to measure', available: true }] },
    labels: ['made-to-order'], rating: 4.7, reviewCount: 52,
    fabric: 'Raw silk with cotton canvas interlining', craft: 'Boned, hand-finished bindings', origin: 'Jaipur, Rajasthan',
    care: CARE, includes: ['Blouse'],
    description: 'Boned through the side panels and interlined with cotton canvas so it holds without digging. Made to your measurements; send us the numbers or book a fitting and we will take them.',
    leadTimeDays: 30, inStock: true,
  },
  {
    id: 'p-011', slug: 'firdaus-stole', title: 'Firdaus Stole',
    subtitle: 'Pashmina-blend stole with a woven ikat field',
    category: 'accessories', collection: 'Everyday Handloom',
    price: 22000,
    images: [img('stole-firdaus'), img('stole-firdaus-alt')],
    colors: [{ name: 'Moss', hex: '#4F5B44' }, { name: 'Sea Glass', hex: '#3F5C58' }],
    sizes: { label: 'Size', values: [{ value: '70 × 200 cm', available: true }] },
    labels: [], rating: 4.9, reviewCount: 74,
    fabric: 'Pashmina-silk blend', craft: 'Resist-dyed ikat, handwoven', origin: 'Srinagar, Kashmir',
    care: CARE, includes: ['Stole'],
    description: 'The yarn is dyed before it is woven, so the pattern arrives slightly out of register — that soft edge is the point of ikat and the reason it cannot be printed convincingly.',
    leadTimeDays: 6, inStock: true,
  },
  {
    id: 'p-012', slug: 'aftab-gharara', title: 'Aftab Gharara',
    subtitle: 'Archive gharara in tissue and old zari — one piece only',
    category: 'archive', collection: 'The Archive',
    price: 145000,
    images: [img('gharara-aftab'), img('gharara-aftab-alt')],
    colors: [{ name: 'Burnished Copper', hex: '#9C4A21', hex2: '#C08A2E' }],
    sizes: { label: 'Size', values: [{ value: 'M', available: true }, { value: 'L', available: false }] },
    labels: ['archive'], rating: 5.0, reviewCount: 4,
    fabric: 'Tissue silk with reclaimed zari', craft: 'Kamdani over a knife-pleated knee', origin: 'Hyderabad, Telangana',
    care: CARE, includes: ['Kurta', 'Gharara', 'Dupatta', 'Certificate of provenance'],
    description: 'Built around a length of zari-worked tissue found in a Hyderabad trunk, dated to the 1940s. The old cloth sets the knee; everything above and below was made to meet it. There is one. There will not be another.',
    leadTimeDays: 0, inStock: true,
  },
];

export const journal: JournalPost[] = [
  { slug: 'four-months-on-a-loom', title: 'Four months on a loom in Varanasi', excerpt: 'What actually happens between the first thread and a finished kadhwa pallu — and why the wait is the product.', date: '2026-08-14', author: 'Ira Sengupta', image: img('journal-01'), readMinutes: 7 },
  { slug: 'reading-a-jaali-border', title: 'How to read a jaali border', excerpt: 'Hand-cut or punched? Six things to look for before you pay bridal money for either.', date: '2026-07-02', author: 'Devika Rao', image: img('journal-02'), readMinutes: 5 },
  { slug: 'the-case-for-made-to-measure', title: 'The case for made-to-measure', excerpt: 'Standard sizing was designed for standard bodies. Almost nobody has one.', date: '2026-05-28', author: 'Ira Sengupta', image: img('journal-03'), readMinutes: 6 },
];

export const socialImages = [
  img('social-01'), img('social-02'), img('social-03'),
  img('social-04'), img('social-05'), img('social-06'),
];

/* ── selectors ─────────────────────────────────────────────── */
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const byCategory = (c: string) => (c === 'all' ? products : products.filter((p) => p.category === c));
export const featured = (n = 8) => products.slice(0, n);
export const newArrivals = () => products.filter((p) => p.labels.includes('new'));
export const bestsellers = () => products.filter((p) => p.labels.includes('bestseller'));
export const related = (p: Product, n = 4) =>
  products.filter((x) => x.id !== p.id && (x.category === p.category || x.collection === p.collection)).slice(0, n);
/** Dedupes by id while preserving order — rails often concatenate
    overlapping selectors (new + featured) and React needs unique keys. */
export const uniqueById = <T extends { id: string }>(list: T[]) =>
  list.filter((p, i, a) => a.findIndex((x) => x.id === p.id) === i);

export const collections = [...new Set(products.map((p) => p.collection))];
export const fabrics = [...new Set(products.map((p) => p.fabric.split(',')[0].trim()))];
