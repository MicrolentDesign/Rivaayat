import type { Product } from '@/data/types';
import { ProductCard } from './ProductCard';
import { Reveal } from '@/components/primitives/Reveal';
import { cx } from '@/lib/utils';

export function ProductGrid({ products, columns = 4, onQuickView, className }:
  { products: Product[]; columns?: 3 | 4; onQuickView?: (p: Product) => void; className?: string }) {
  return (
    <div className={cx(columns === 3 ? 'grid-products-3' : 'grid-products', className)}>
      {products.map((p, i) => (
        <Reveal key={p.id} delay={(i % columns) * 70}>
          <ProductCard product={p} onQuickView={onQuickView} />
        </Reveal>
      ))}
    </div>
  );
}
