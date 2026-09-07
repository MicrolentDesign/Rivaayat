import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { SectionHead } from '@/components/primitives/SectionHead';
import { Reveal } from '@/components/primitives/Reveal';

/* [EOI] "Shop the look" tiles + [CHA] overlay-titled category blocks. */
export function CategoryTiles({ limit = 4 }: { limit?: number }) {
  return (
    <section className="section-lg">
      <div className="container">
        <SectionHead eyebrow="Shop by garment" title="Four ways in" link="/shop/all" linkLabel="View everything" />
        <div className="grid-tiles-4">
          {categories.slice(0, limit).map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 90}>
              <Link to={`/shop/${c.slug}`} className="group" style={{ display: 'block', position: 'relative' }}>
                <div className="media media-portrait media-zoom scrim"><img src={c.image} alt="" loading="lazy" /></div>
                <div className="overlay-content overlay-bl" style={{ padding: '1.5rem' }}>
                  <p className="eyebrow" style={{ marginBottom: '0.4rem' }}>{c.count} pieces</p>
                  <h3 className="t-h2" style={{ color: 'var(--color-canvas)' }}>{c.name}</h3>
                  <p className="t-sm" style={{ color: 'rgb(255 255 255 / 0.82)', maxWidth: '26ch', marginTop: '0.35rem' }}>{c.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
