import { Link } from 'react-router-dom';
import { journal } from '@/data/products';
import { SectionHead } from '@/components/primitives/SectionHead';
import { Reveal } from '@/components/primitives/Reveal';
import { formatDate } from '@/lib/utils';

/* [CHA] "Blog posts" three-up. */
export function JournalGrid() {
  return (
    <section className="section-lg">
      <div className="container">
        <SectionHead eyebrow="The Journal" title="From the workroom" link="/journal" linkLabel="All entries" />
        <div className="grid-tiles">
          {journal.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link to={`/journal/${p.slug}`} className="group stack-md" style={{ display: 'block' }}>
                <div className="media media-editorial media-zoom"><img src={p.image} alt="" loading="lazy" /></div>
                <div className="stack-xs">
                  <p className="t-meta">{formatDate(p.date)} · {p.readMinutes} min read</p>
                  <h3 className="t-h3">{p.title}</h3>
                  <p className="t-sm" style={{ color: 'var(--color-ink-soft)' }}>{p.excerpt}</p>
                  <p className="eyebrow link-quiet" style={{ color: 'var(--color-ink)', marginTop: '0.5rem' }}>Read more</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
