import type { Product } from '@/data/types';
import { Rail } from '@/components/primitives/Rail';
import { SectionHead } from '@/components/primitives/SectionHead';
import { ProductCard } from '@/components/product/ProductCard';
import { cx } from '@/lib/utils';

/* [CHA] "Trending Styles" product carousel with prev/next controls. */
export function FeaturedRail({ eyebrow, title, products, link, linkLabel, onQuickView, scheme }: {
  eyebrow: string; title: string; products: Product[];
  link?: string; linkLabel?: string; onQuickView?: (p: Product) => void; scheme?: string;
}) {
  return (
    <section className={cx('section-lg', scheme)}>
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} link={link} linkLabel={linkLabel} />
        <Rail>
          {products.map((p) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} />)}
        </Rail>
      </div>
    </section>
  );
}
