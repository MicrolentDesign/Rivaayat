/* [EOI] repeating editorial statement band. Duplicated track = seamless loop. */
export function Marquee({ text, items }: { text?: string; items?: string[] }) {
  const list = items ?? [text ?? ''];
  const Track = () => (
    <div className="marquee__track" aria-hidden="true">
      {list.map((t, i) => (
        <span key={i} className="cluster" style={{ gap: '3rem' }}>
          <span className="t-h3" style={{ whiteSpace: 'nowrap', fontWeight: 200, color: 'var(--color-ink-soft)' }}>{t}</span>
          <span aria-hidden="true" style={{ width: 5, height: 5, background: 'var(--color-accent)', borderRadius: '50%', flex: 'none' }} />
        </span>
      ))}
    </div>
  );
  return (
    <section className="marquee scheme-alabaster" style={{ paddingBlock: '1.75rem', borderBlock: '1px solid var(--color-line)' }}>
      <span className="sr-only">{list.join('. ')}</span>
      <Track /><Track />
    </section>
  );
}
