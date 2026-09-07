import { Link } from 'react-router-dom';
import { journal } from '@/data/products';
import { Reveal } from '@/components/primitives/Reveal';
import { formatDate } from '@/lib/utils';

export function JournalPage() {
  const [lead, ...rest] = journal;
  return (
    <>
      <header className="scheme-alabaster" style={{ paddingBlock: 'clamp(2.5rem, 6vw, 4.5rem)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="eyebrow">The Journal</p>
          <h1 className="t-display" style={{ marginTop: '0.75rem' }}>From the workroom</h1>
        </div>
      </header>

      <section className="container section-lg">
        <Reveal>
          <Link to={`/journal/${lead.slug}`} className="group split" style={{ display: 'grid', marginBottom: 'var(--section-y-lg)' }}>
            <div className="media media-editorial media-zoom"><img src={lead.image} alt="" /></div>
            <div className="stack-sm" style={{ alignSelf: 'center' }}>
              <p className="t-meta">{formatDate(lead.date)} · {lead.author} · {lead.readMinutes} min</p>
              <h2 className="t-display">{lead.title}</h2>
              <p className="t-lead measure">{lead.excerpt}</p>
              <p className="eyebrow link-quiet" style={{ color: 'var(--color-ink)', marginTop: '0.75rem' }}>Read the entry</p>
            </div>
          </Link>
        </Reveal>

        <div className="grid-tiles">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link to={`/journal/${p.slug}`} className="group stack-md" style={{ display: 'block' }}>
                <div className="media media-editorial media-zoom"><img src={p.image} alt="" loading="lazy" /></div>
                <div className="stack-xs">
                  <p className="t-meta">{formatDate(p.date)} · {p.readMinutes} min</p>
                  <h3 className="t-h3">{p.title}</h3>
                  <p className="t-sm" style={{ color: 'var(--color-ink-soft)' }}>{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
