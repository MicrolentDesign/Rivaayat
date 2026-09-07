import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartLine } from '@/data/types';

interface CartState {
  lines: CartLine[];
  open: boolean;
  wishlist: string[];
  add: (line: Omit<CartLine, 'key'>) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  toggleWish: (id: string) => void;
}

const lineKey = (l: Pick<CartLine, 'productId' | 'color' | 'size'>) => `${l.productId}|${l.color}|${l.size}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      wishlist: [],
      add: (line) =>
        set((s) => {
          const key = lineKey(line);
          const found = s.lines.find((l) => l.key === key);
          return {
            open: true,
            lines: found
              ? s.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + line.qty } : l))
              : [...s.lines, { ...line, key }],
          };
        }),
      remove: (key) => set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
      setQty: (key, qty) =>
        set((s) => ({
          lines: qty <= 0 ? s.lines.filter((l) => l.key !== key) : s.lines.map((l) => (l.key === key ? { ...l, qty } : l)),
        })),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
      toggleWish: (id) =>
        set((s) => ({ wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id] })),
    }),
    { name: 'rivaayat-cart', partialize: (s) => ({ lines: s.lines, wishlist: s.wishlist }) },
  ),
);

export const cartCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty, 0);
export const cartTotal = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty * l.price, 0);
