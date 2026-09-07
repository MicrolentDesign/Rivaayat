export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ');

export const inr = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export const discountPct = (price: number, compareAt?: number) =>
  compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : 0;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export const leadTimeCopy = (days: number) =>
  days === 0 ? 'Ships within 48 hours' : days <= 7 ? `Ships in ${days} days` : `Made to order · ${Math.round(days / 7)} weeks`;
