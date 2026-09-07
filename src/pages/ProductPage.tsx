import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getProduct, related } from '@/data/products';
import { Price } from '@/components/primitives/Price';
import { Rating } from '@/components/primitives/Rating';
import { SwatchRow } from '@/components/primitives/Swatch';
import { Button } from '@/components/primitives/Button';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SectionHead } from '@/components/primitives/SectionHead';
import { IconHeart, IconTruck, IconReturn, IconRuler, IconNeedle, IconDown } from '@/components/primitives/Icon';
import { useCart } from '@/store/cart';
import { leadTimeCopy, cx } from '@/lib/utils';

export function ProductPage() {
  const { slug = '' } = useParams();
  const product = getProduct(slug);
  const add = useCart((s) => s.add);
  const wishlist = useCart((s) => s.wishlist);
  const toggleWish = useCart((s) => s.toggleWish);

  const [color, setColor] = useState(product?.colors[0].name ?? '');
  const [size, setSize] = useState('');
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) return <Navigate to="/shop/all" replace />;
  const wished = wishlist.includes(product.id);
  const gallery = [...product.images, ...product.images];  // stand-in for a full shot list

  return (
    <>
      <div className="container" style={{ paddingTop: '1.5rem' }}>
        <nav className="eyebrow" aria-label="Breadcrumb">
          <Link to="/" className="link-quiet">Home</Link> <span aria-hidden="true">/</span>{' '}
          <Link to={`/shop/${product.category}`} className="link-quiet" style={{ textTransform: 'capitalize' }}>{product.category}</Link>{' '}
          <span aria-hidden="true">/</span> {product.title}
        </nav>
      </div>

      <section className="container section">
        <div className="pdp">
          {/* gallery — sticky stacked column on desktop, swipe rail on mobile */}
          <div className="pdp__gallery">
            <div className="pdp__thumbs show-md">
              {gallery.map((src, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`View image ${i + 1}`}
                        className={cx('media')} data-selected={i === active}
                        style={{ aspectRatio: 'var(--ratio-product)', border: i === active ? '1px solid var(--color-ink)' : '1px solid transparent' }}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
            <div className="pdp__main media media-product"><img src={gallery[active]} alt={product.title} /></div>
          </div>

          {/* buy column */}
          <div className="pdp__buy">
            <div className="stack-md">
              <div className="stack-xs">
                <p className="eyebrow">{product.collection}</p>
                <h1 className="t-h1" style={{ marginTop: '0.5rem' }}>{product.title}</h1>
                <p className="t-lead">{product.subtitle}</p>
              </div>

              <div className="cluster" style={{ justifyContent: 'space-between' }}>
                <Price price={product.price} compareAt={product.compareAt} from={product.priceFrom} className="t-h4" />
                <Rating value={product.rating} count={product.reviewCount} />
              </div>
              <p className="t-meta">Inclusive of all taxes · {leadTimeCopy(product.leadTimeDays)}</p>

              <hr />

              <div className="stack-sm">
                <p className="field-label">Colour · <span style={{ color: 'var(--color-ink)' }}>{color}</span></p>
                <SwatchRow colors={product.colors} selected={color} onSelect={setColor} large />
              </div>

              <div className="stack-sm">
                <div className="cluster" style={{ justifyContent: 'space-between' }}>
                  <p className="field-label" style={{ marginBottom: 0 }}>{product.sizes.label}</p>
                  <Link to="/size-guide" className="eyebrow link-quiet cluster" style={{ gap: '0.4rem', color: 'var(--color-ink)' }}>
                    <IconRuler size={15} /> Size guide
                  </Link>
                </div>
                <div className="cluster" style={{ gap: '0.5rem' }}>
                  {product.sizes.values.map((s) => (
                    <button key={s.value} className="variant-chip" aria-pressed={size === s.value}
                            disabled={!s.available} onClick={() => setSize(s.value)}>{s.value}</button>
                  ))}
                </div>
                {!size && <p className="field-hint">Select a size to continue.</p>}
              </div>

              <div className="cluster" style={{ gap: '0.75rem', flexWrap: 'nowrap' }}>
                <div className="cluster" style={{ gap: 0, border: '1px solid var(--color-line)', flex: 'none' }}>
                  <button className="icon-btn" style={{ width: '2.75rem', height: '3.1rem' }} onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
                  <span className="t-sm" style={{ minWidth: '2rem', textAlign: 'center' }}>{qty}</span>
                  <button className="icon-btn" style={{ width: '2.75rem', height: '3.1rem' }} onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
                </div>
                <Button block disabled={!size}
                        onClick={() => add({ productId: product.id, slug: product.slug, title: product.title, image: product.images[0], price: product.price, color, size, qty })}>
                  {size ? 'Add to bag' : 'Select a size'}
                </Button>
                <button className="icon-btn icon-btn-outlined" onClick={() => toggleWish(product.id)}
                        aria-pressed={wished} aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'}
                        style={{ width: '3.1rem', height: '3.1rem', flex: 'none', color: wished ? 'var(--color-accent)' : undefined }}>
                  <IconHeart fill={wished ? 'currentColor' : 'none'} />
                </button>
              </div>

              <Link to="/atelier#measure" className="btn btn-secondary btn-block">Request made to measure</Link>

              {/* service strip */}
              <ul className="stack-xs" style={{ paddingTop: '0.5rem' }}>
                {[[IconTruck, 'Complimentary shipping above ₹25,000, worldwide'],
                  [IconReturn, '30-day returns · free alterations on made-to-measure'],
                  [IconNeedle, `${product.craft} · ${product.origin}`]].map(([Icon, text], i) => {
                  const I = Icon as typeof IconTruck;
                  return (
                    <li key={i} className="cluster t-sm" style={{ gap: '0.65rem', color: 'var(--color-ink-soft)' }}>
                      <span style={{ color: 'var(--color-accent)', flex: 'none' }}><I size={17} /></span>{text as string}
                    </li>
                  );
                })}
              </ul>

              <hr />

              {/* accordions */}
              <div>
                <Accordion title="The piece" defaultOpen>
                  <p className="t-sm">{product.description}</p>
                </Accordion>
                <Accordion title="Fabric & craft">
                  <dl className="pdp__spec">
                    {[['Fabric', product.fabric], ['Craft', product.craft], ['Made in', product.origin],
                      ['Set includes', product.includes.join(' · ')], ['Lead time', leadTimeCopy(product.leadTimeDays)]].map(([k, v]) => (
                      <div key={k}><dt className="eyebrow">{k}</dt><dd className="t-sm" style={{ margin: 0 }}>{v}</dd></div>
                    ))}
                  </dl>
                </Accordion>
                <Accordion title="Care">
                  <ul className="stack-xs">
                    {product.care.map((c) => <li key={c} className="t-sm" style={{ paddingLeft: '1rem', position: 'relative' }}>
                      <span aria-hidden="true" style={{ position: 'absolute', left: 0 }}>—</span>{c}
                    </li>)}
                  </ul>
                </Accordion>
                <Accordion title="Shipping & returns">
                  <p className="t-sm">Dispatched from Jaipur. Complimentary worldwide shipping above ₹25,000, otherwise ₹1,200 flat. Duties are calculated and settled at checkout, so nothing is owed on arrival. Unworn pieces can be returned within 30 days with tags attached; made-to-measure pieces are altered free of charge instead of returned.</p>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-lg scheme-alabaster">
        <div className="container">
          <SectionHead eyebrow="Completes the look" title="You may also like" link={`/shop/${product.category}`} linkLabel="More like this" />
          <ProductGrid products={related(product)} columns={4} />
        </div>
      </section>
    </>
  );
}

function Accordion({ title, children, defaultOpen }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="accordion">
      <summary className="cluster" style={{ justifyContent: 'space-between', paddingBlock: '1.15rem' }}>
        <span className="eyebrow" style={{ color: 'var(--color-ink)' }}>{title}</span>
        <IconDown size={16} className="accordion__chev" />
      </summary>
      <div style={{ paddingBottom: '1.35rem' }}>{children}</div>
    </details>
  );
}
