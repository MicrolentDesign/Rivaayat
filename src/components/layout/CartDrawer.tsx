import { Link } from 'react-router-dom';
import { useCart, cartTotal, cartCount } from '@/store/cart';
import { useBodyLock } from '@/lib/useBodyLock';
import { IconClose, IconPlus, IconMinus, IconTruck } from '@/components/primitives/Icon';
import { Button, ButtonLink } from '@/components/primitives/Button';
import { inr } from '@/lib/utils';

const FREE_SHIPPING = 25000;

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove } = useCart();
  useBodyLock(open);
  if (!open) return null;

  const total = cartTotal(lines);
  const toFree = Math.max(0, FREE_SHIPPING - total);
  const pct = Math.min(100, (total / FREE_SHIPPING) * 100);

  return (
    <>
      <div className="backdrop" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
        <div className="drawer__head">
          <p className="eyebrow">Your bag ({cartCount(lines)})</p>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close bag"><IconClose /></button>
        </div>

        {lines.length > 0 && (
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-line)', background: 'var(--color-alabaster)' }}>
            <p className="t-meta cluster" style={{ gap: '0.5rem', marginBottom: '0.6rem' }}>
              <IconTruck size={16} />
              {toFree > 0 ? <>Add <strong style={{ color: 'var(--color-ink)' }}>{inr(toFree)}</strong> for complimentary shipping</> : 'Complimentary shipping unlocked'}
            </p>
            <div style={{ height: 2, background: 'var(--color-line)' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'var(--color-accent)', transition: 'width var(--dur-slow) var(--ease-brand)' }} />
            </div>
          </div>
        )}

        <div className="drawer__body">
          {lines.length === 0 ? (
            <div className="stack-md" style={{ textAlign: 'center', paddingTop: '3rem' }}>
              <p className="t-h3">Your bag is empty</p>
              <p className="t-sm" style={{ color: 'var(--color-ink-muted)' }}>Nothing chosen yet.</p>
              <ButtonLink to="/shop/all" variant="secondary" onClick={() => setOpen(false)}>Browse the collection</ButtonLink>
            </div>
          ) : (
            <ul className="stack-lg">
              {lines.map((l) => (
                <li key={l.key} style={{ display: 'grid', gridTemplateColumns: '5.5rem 1fr', gap: '1rem' }}>
                  <Link to={`/product/${l.slug}`} onClick={() => setOpen(false)} className="media media-product">
                    <img src={l.image} alt={l.title} />
                  </Link>
                  <div className="stack-xs">
                    <div className="cluster" style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                      <Link to={`/product/${l.slug}`} onClick={() => setOpen(false)} className="t-sm" style={{ color: 'var(--color-ink)' }}>{l.title}</Link>
                      <span className="t-sm">{inr(l.price * l.qty)}</span>
                    </div>
                    <p className="t-meta">{l.color} · {l.size}</p>
                    <div className="cluster" style={{ justifyContent: 'space-between', marginTop: '0.4rem' }}>
                      <div className="cluster" style={{ gap: 0, border: '1px solid var(--color-line)' }}>
                        <button className="icon-btn" style={{ width: '2rem', height: '2rem' }} onClick={() => setQty(l.key, l.qty - 1)} aria-label="Decrease quantity"><IconMinus size={14} /></button>
                        <span className="t-sm" style={{ minWidth: '1.75rem', textAlign: 'center' }}>{l.qty}</span>
                        <button className="icon-btn" style={{ width: '2rem', height: '2rem' }} onClick={() => setQty(l.key, l.qty + 1)} aria-label="Increase quantity"><IconPlus size={14} /></button>
                      </div>
                      <button className="t-meta link-quiet" onClick={() => remove(l.key)}>Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="drawer__foot stack-sm">
            <div className="cluster" style={{ justifyContent: 'space-between' }}>
              <span className="eyebrow">Subtotal</span>
              <span className="t-h4">{inr(total)}</span>
            </div>
            <p className="t-meta">Taxes and duties calculated at checkout.</p>
            <Button block onClick={() => setOpen(false)}>Proceed to checkout</Button>
            <button className="eyebrow link-quiet" onClick={() => setOpen(false)} style={{ display: 'block', width: '100%', textAlign: 'center', paddingTop: '0.25rem' }}>
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
