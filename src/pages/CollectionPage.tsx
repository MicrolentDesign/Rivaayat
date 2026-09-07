import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '@/data/types';
import { products, categories, collections } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { QuickView } from '@/components/product/QuickView';
import { IconFilter, IconClose, IconCheck } from '@/components/primitives/Icon';
import { Button } from '@/components/primitives/Button';
import { useBodyLock } from '@/lib/useBodyLock';
import { cx } from '@/lib/utils';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
const SORTS: [Sort, string][] = [
  ['featured', 'Featured'], ['newest', 'Newest'], ['price-asc', 'Price: low to high'],
  ['price-desc', 'Price: high to low'], ['rating', 'Best rated'],
];
const PRICE_BANDS: [string, number, number][] = [
  ['Under ₹25,000', 0, 25000], ['₹25,000 – ₹50,000', 25000, 50000],
  ['₹50,000 – ₹1,00,000', 50000, 100000], ['Above ₹1,00,000', 100000, Infinity],
];

export function CollectionPage() {
  const { slug = 'all' } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const [quick, setQuick] = useState<Product | null>(null);
  const [sort, setSort] = useState<Sort>('featured');
  const [bands, setBands] = useState<string[]>([]);
  const [cols, setCols] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  useBodyLock(filtersOpen);

  const list = useMemo(() => {
    let out = slug === 'all' ? [...products] : products.filter((p) => p.category === slug);
    if (bands.length) {
      out = out.filter((p) => bands.some((b) => {
        const band = PRICE_BANDS.find(([l]) => l === b)!;
        return p.price >= band[1] && p.price < band[2];
      }));
    }
    if (cols.length) out = out.filter((p) => cols.includes(p.collection));
    switch (sort) {
      case 'price-asc':  out.sort((a, b) => a.price - b.price); break;
      case 'price-desc': out.sort((a, b) => b.price - a.price); break;
      case 'rating':     out.sort((a, b) => b.rating - a.rating); break;
      case 'newest':     out.sort((a, b) => Number(b.labels.includes('new')) - Number(a.labels.includes('new'))); break;
      default: break;
    }
    return out;
  }, [slug, sort, bands, cols]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const clearAll = () => { setBands([]); setCols([]); };
  const activeCount = bands.length + cols.length;

  const FilterPanel = () => (
    <div className="stack-lg">
      <fieldset className="filter-group">
        <legend className="field-label">Price</legend>
        <ul className="stack-xs" style={{ marginTop: '0.75rem' }}>
          {PRICE_BANDS.map(([label]) => (
            <li key={label}>
              <label className="cluster t-sm" style={{ gap: '0.65rem', cursor: 'pointer' }}>
                <input type="checkbox" className="checkbox" checked={bands.includes(label)}
                       onChange={() => toggle(bands, setBands, label)} />
                {label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="filter-group">
        <legend className="field-label">Collection</legend>
        <ul className="stack-xs" style={{ marginTop: '0.75rem' }}>
          {collections.map((c) => (
            <li key={c}>
              <label className="cluster t-sm" style={{ gap: '0.65rem', cursor: 'pointer' }}>
                <input type="checkbox" className="checkbox" checked={cols.includes(c)}
                       onChange={() => toggle(cols, setCols, c)} />
                {c}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="filter-group">
        <legend className="field-label">Category</legend>
        <ul className="stack-xs" style={{ marginTop: '0.75rem' }}>
          <li><Link to="/shop/all" className={cx('t-sm cluster', slug === 'all' && 'is-active')} style={{ gap: '0.5rem', color: slug === 'all' ? 'var(--color-ink)' : undefined }}>
            {slug === 'all' && <IconCheck size={14} />} All pieces
          </Link></li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link to={`/shop/${c.slug}`} className="t-sm cluster" style={{ gap: '0.5rem', color: slug === c.slug ? 'var(--color-ink)' : undefined }}>
                {slug === c.slug && <IconCheck size={14} />} {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </fieldset>

      {activeCount > 0 && <button className="eyebrow link-quiet" onClick={clearAll} style={{ color: 'var(--color-accent)' }}>Clear all filters</button>}
    </div>
  );

  return (
    <>
      {/* collection header — [EOI] centred title over a tinted band */}
      <header className="scheme-alabaster" style={{ paddingBlock: 'clamp(2.5rem, 6vw, 4.5rem)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <nav className="eyebrow" aria-label="Breadcrumb" style={{ marginBottom: '1rem' }}>
            <Link to="/" className="link-quiet">Home</Link> <span aria-hidden="true">/</span> {category?.name ?? 'All pieces'}
          </nav>
          <h1 className="t-display">{category?.name ?? 'The full collection'}</h1>
          <p className="t-lead measure" style={{ margin: '1rem auto 0' }}>
            {category?.tagline ?? 'Everything currently made, in stock or on the frame.'}
          </p>
        </div>
      </header>

      {/* toolbar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 'var(--z-sticky)', background: 'var(--color-canvas)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="container cluster" style={{ justifyContent: 'space-between', paddingBlock: '0.85rem' }}>
          <button className="eyebrow cluster hide-lg" style={{ gap: '0.5rem', color: 'var(--color-ink)' }} onClick={() => setFiltersOpen(true)}>
            <IconFilter size={16} /> Filter{activeCount > 0 && ` (${activeCount})`}
          </button>
          <p className="eyebrow show-lg">{list.length} {list.length === 1 ? 'piece' : 'pieces'}</p>
          <div className="cluster" style={{ gap: '0.75rem' }}>
            <label className="eyebrow" htmlFor="sort">Sort</label>
            <select id="sort" className="select" value={sort} onChange={(e) => setSort(e.target.value as Sort)}
                    style={{ width: 'auto', padding: '0.5rem 2.5rem 0.5rem 0.75rem', fontSize: 'var(--text-xs)' }}>
              {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="collection-layout">
          <aside className="collection-filters show-md" aria-label="Filters"><FilterPanel /></aside>
          <div>
            {list.length === 0 ? (
              <div className="stack-md" style={{ textAlign: 'center', paddingBlock: '5rem' }}>
                <h2 className="t-h3">Nothing matches those filters</h2>
                <p className="t-sm" style={{ color: 'var(--color-ink-muted)' }}>Try widening the price range.</p>
                <div><Button variant="secondary" onClick={clearAll}>Clear filters</Button></div>
              </div>
            ) : (
              <ProductGrid products={list} columns={3} onQuickView={setQuick} />
            )}
          </div>
        </div>
      </div>

      {filtersOpen && (
        <>
          <div className="backdrop" onClick={() => setFiltersOpen(false)} />
          <div className="drawer drawer-left" role="dialog" aria-modal="true" aria-label="Filters">
            <div className="drawer__head">
              <p className="eyebrow">Filter</p>
              <button className="icon-btn" onClick={() => setFiltersOpen(false)} aria-label="Close filters"><IconClose /></button>
            </div>
            <div className="drawer__body"><FilterPanel /></div>
            <div className="drawer__foot">
              <Button block onClick={() => setFiltersOpen(false)}>Show {list.length} pieces</Button>
            </div>
          </div>
        </>
      )}

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}
