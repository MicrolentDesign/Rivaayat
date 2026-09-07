import { Link } from 'react-router-dom';
import type { Product } from '@/data/types';
import { Price } from '@/components/primitives/Price';
import { Rating } from '@/components/primitives/Rating';
import { SwatchRow } from '@/components/primitives/Swatch';
import { IconHeart } from '@/components/primitives/Icon';
import { useCart } from '@/store/cart';
import { cx, discountPct } from '@/lib/utils';

const LABEL_TEXT: Record<string, string> = {
  new: 'New', bestseller: 'Bestseller', 'made-to-order': 'Made to order',
  'sold-out': 'Sold out', archive: 'One of one',
};

export function ProductCard({ product, onQuickView, showSwatches = true, className }:
  { product: Product; onQuickView?: (p: Product) => void; showSwatches?: boolean; className?: string }) {
  const wishlist = useCart((s) => s.wishlist);
  const toggleWish = useCart((s) => s.toggleWish);
  const wished = wishlist.includes(product.id);
  const off = discountPct(product.price, product.compareAt);

  return (
    <article className={cx('product-card group', className)}>
      {/* One positioning context for the image and its three overlays. The
          media is a link, so the wishlist and quick-view buttons have to be
          siblings of it rather than children — nesting a button inside an
          anchor is invalid and breaks keyboard activation. */}
      <div className="product-card__frame">
        <Link to={`/product/${product.slug}`} className="product-card__media" aria-label={product.title}>
          <img src={product.images[0]} alt={product.title} loading="lazy" width={900} height={1200} />
          {product.images[1] && <img src={product.images[1]} alt="" aria-hidden="true" loading="lazy" width={900} height={1200} />}
        </Link>

        <div className="product-card__labels">
          {off > 0 && <span className="badge badge-sale">{off}% off</span>}
          {product.labels.map((l) => (
            <span key={l} className={cx('badge', l === 'archive' ? 'badge-solid' : l === 'sold-out' && 'badge-sold')}>
              {LABEL_TEXT[l]}
            </span>
          ))}
        </div>

        <button type="button" className="product-card__wish icon-btn" data-active={wished}
                onClick={() => toggleWish(product.id)}
                aria-pressed={wished} aria-label={wished ? `Remove ${product.title} from saved` : `Save ${product.title}`}
                style={{ background: 'var(--color-canvas)', color: wished ? 'var(--color-accent)' : 'var(--color-ink)' }}>
          <IconHeart size={17} fill={wished ? 'currentColor' : 'none'} />
        </button>

        {onQuickView && (
          <div className="product-card__quickbuy">
            <button type="button" className="btn btn-overlay btn-sm btn-block"
                    onClick={() => onQuickView(product)}>
              Quick view
            </button>
          </div>
        )}
      </div>

      <div className="product-card__body">
        <Link to={`/product/${product.slug}`}><h3 className="product-card__title link-quiet">{product.title}</h3></Link>
        <Price price={product.price} compareAt={product.compareAt} from={product.priceFrom} />
        <div className="cluster" style={{ justifyContent: 'space-between', marginTop: '0.25rem' }}>
          {showSwatches && product.colors.length > 1
            ? <SwatchRow colors={product.colors} />
            : <span className="t-meta">{product.fabric.split(',')[0]}</span>}
          <Rating value={product.rating} count={product.reviewCount} size={12} />
        </div>
      </div>
    </article>
  );
}
