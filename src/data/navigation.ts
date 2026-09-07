import { categories } from './products';

/* The nav carries six entries, but only four of them are product categories.
   "New Arrivals" is a view over the `new` label and "Custom Orders" is the
   made-to-measure service, so neither belongs in categories[]. Keeping that
   distinction here stops a non-category leaking into filters and breadcrumbs. */
export interface NavEntry {
  to: string;
  label: string;
  /** true when this resolves to a CategorySlug rather than a view or a page */
  isCategory: boolean;
}

/* Six primary entries plus a centred wordmark plus the right-hand group does
   not fit on one row at 1400px, so Custom Orders sits in the secondary group.
   It is a service rather than a garment, which is also where it belongs. */
export const primaryNav: NavEntry[] = [
  { to: '/shop/new', label: 'New Arrivals', isCategory: false },
  ...categories.map((c) => ({ to: `/shop/${c.slug}`, label: c.name, isCategory: true })),
];

export const secondaryNav: NavEntry[] = [
  { to: '/custom', label: 'Custom Orders', isCategory: false },
  { to: '/atelier', label: 'The Atelier', isCategory: false },
  { to: '/journal', label: 'Journal', isCategory: false },
];

/** Everything, in order — for the mobile drawer, which has room for all of it. */
export const allNav: NavEntry[] = [...primaryNav, ...secondaryNav];
