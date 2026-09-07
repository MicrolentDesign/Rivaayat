import { useCart } from '@/store/cart';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ButtonLink } from '@/components/primitives/Button';

export function WishlistPage() {
  const wishlist = useCart((s) => s.wishlist);
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <section className="container section-lg">
      <header style={{ textAlign: 'center', marginBottom: 'var(--section-y)' }}>
        <p className="eyebrow">Saved</p>
        <h1 className="t-display" style={{ marginTop: '0.75rem' }}>Your wishlist</h1>
      </header>
      {saved.length === 0 ? (
        <div className="stack-md" style={{ textAlign: 'center', paddingBlock: '3rem' }}>
          <p className="t-lead">Nothing saved yet.</p>
          <div><ButtonLink to="/shop/all" variant="secondary">Browse the collection</ButtonLink></div>
        </div>
      ) : <ProductGrid products={saved} columns={4} />}
    </section>
  );
}
