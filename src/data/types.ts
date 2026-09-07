export type Money = number; // paise-free: whole INR

export interface ColorOption {
  name: string;
  hex: string;
  /** second hex renders a two-tone swatch for shot-silk / dual-dye fabrics */
  hex2?: string;
}

export interface ProductVariantAxis {
  label: string;
  values: { value: string; available: boolean }[];
}

export type ProductLabel = 'new' | 'bestseller' | 'made-to-order' | 'sold-out' | 'archive';

export interface Product {
  id: string;
  slug: string;
  title: string;
  /** short descriptor shown under the title on PDP */
  subtitle: string;
  category: CategorySlug;
  collection: string;
  price: Money;
  compareAt?: Money;
  /** true when price is a starting point (multiple made-to-measure tiers) */
  priceFrom?: boolean;
  images: string[];
  colors: ColorOption[];
  sizes: ProductVariantAxis;
  labels: ProductLabel[];
  rating: number;
  reviewCount: number;
  fabric: string;
  craft: string;
  origin: string;
  care: string[];
  includes: string[];
  description: string;
  leadTimeDays: number;
  inStock: boolean;
}

export type CategorySlug =
  | 'sherwani' | 'shalwar-kameez' | 'kurta' | 'waistcoat';

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
  count: number;
}

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  readMinutes: number;
}

export interface CartLine {
  key: string;
  productId: string;
  slug: string;
  title: string;
  image: string;
  price: Money;
  color: string;
  size: string;
  qty: number;
}
