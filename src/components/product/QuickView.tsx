import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/data/types';
import { Price } from '@/components/primitives/Price';
import { Rating } from '@/components/primitives/Rating';
import { SwatchRow } from '@/components/primitives/Swatch';
import { Button } from '@/components/primitives/Button';
import { IconClose } from '@/components/primitives/Icon';
import { useCart } from '@/store/cart';
import { useBodyLock } from '@/lib/useBodyLock';
import { leadTimeCopy } from '@/lib/utils';

export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const add = useCart((s) => s.add);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  useBodyLock(!!product);

  useEffect(() => {
    if (product) { setColor(product.colors[0].name); setSize(''); }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!product) return null;

  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="drawer" role="dialog" aria-modal="true" aria-label={`${product.title} quick view`}>
        <div className="drawer__head">
          <p className="eyebrow">Quick view</p>
          <button className="icon-btn" onClick={onClose} aria-label="Close quick view"><IconClose /></button>
        </div>
        <div className="drawer__body stack-md">
          <div className="media media-product"><img src={product.images[0]} alt={product.title} /></div>
          <div className="stack-sm">
            <h2 className="t-h3">{product.title}</h2>
            <p className="t-sm" style={{ color: 'var(--color-ink-soft)' }}>{product.subtitle}</p>
            <Price price={product.price} compareAt={product.compareAt} from={product.priceFrom} />
            <Rating value={product.rating} count={product.reviewCount} />
          </div>
          <div className="stack-sm">
            <p className="field-label">Colour · {color}</p>
            <SwatchRow colors={product.colors} selected={color} onSelect={setColor} large />
          </div>
          <div className="stack-sm">
            <p className="field-label">{product.sizes.label}</p>
            <div className="cluster" style={{ gap: '0.5rem' }}>
              {product.sizes.values.map((s) => (
                <button key={s.value} className="variant-chip" aria-pressed={size === s.value}
                        disabled={!s.available} onClick={() => setSize(s.value)}>{s.value}</button>
              ))}
            </div>
          </div>
          <p className="t-meta">{leadTimeCopy(product.leadTimeDays)}</p>
        </div>
        <div className="drawer__foot stack-sm">
          <Button block disabled={!size}
                  onClick={() => { add({ productId: product.id, slug: product.slug, title: product.title, image: product.images[0], price: product.price, color, size, qty: 1 }); onClose(); }}>
            {size ? 'Add to bag' : 'Select a size'}
          </Button>
          <Link to={`/product/${product.slug}`} onClick={onClose}
                className="eyebrow link-quiet" style={{ display: 'block', textAlign: 'center', color: 'var(--color-ink)' }}>
            View full details
          </Link>
        </div>
      </div>
    </>
  );
}
