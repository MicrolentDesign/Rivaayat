import { useEffect, useState } from 'react';
import { ButtonLink } from '@/components/primitives/Button';
import { cx } from '@/lib/utils';

/* Hero slideshow — [CHA] eyebrow / ultra-light display line / uppercase CTA,
   over full-bleed imagery with the [CHA] --image-overlay scrim.           */
const SLIDES = [
  { image: '/img/hero-01.svg', eyebrow: 'Mehtab · Autumn Winter 2026', title: 'Cloth that remembers whose hands made it.', cta: 'Enter the collection', to: '/shop/sherwani' },
  { image: '/img/hero-02.svg', eyebrow: 'For the groom, by appointment', title: 'Ninety days. One sherwani. No shortcuts.', cta: 'Book a fitting', to: '/shop/sherwani' },
  { image: '/img/hero-03.svg', eyebrow: 'The Archive', title: 'One of one, and never remade.', cta: 'See what remains', to: '/shop/archive' },
];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section aria-roledescription="carousel" aria-label="Featured collections"
             style={{ position: 'relative', height: 'min(92svh, 52rem)', minHeight: '34rem', background: 'var(--color-bone)' }}>
      {SLIDES.map((s, n) => (
        <div key={s.image} aria-hidden={n !== i}
             style={{
               position: 'absolute', inset: 0, opacity: n === i ? 1 : 0,
               transition: 'opacity 1100ms var(--ease-brand)', pointerEvents: n === i ? 'auto' : 'none',
             }}>
          <div className="media scrim" style={{ position: 'absolute', inset: 0 }}>
            <img src={s.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                 loading={n === 0 ? 'eager' : 'lazy'} fetchPriority={n === 0 ? 'high' : 'low'} />
          </div>
          <div className="overlay-content overlay-bl">
            <div className="container" style={{ paddingInline: 0 }}>
              <div className="stack-md">
                <p className="eyebrow">{s.eyebrow}</p>
                {/* the measure cap lives on the h1 itself: `ch` resolves against
                    the element's own font, so putting it on a body-sized wrapper
                    would clamp the headline to a fifth of the intended width. */}
                <h1 className="t-hero" style={{ color: 'var(--color-canvas)', maxWidth: '17ch' }}>{s.title}</h1>
                <div><ButtonLink to={s.to} variant="overlay">{s.cta}</ButtonLink></div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* slide controls — hairline bars, [CHA] .page-btn */}
      <div className="container" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
        {SLIDES.map((s, n) => (
          <button key={s.image} onClick={() => setI(n)} aria-label={`Go to slide ${n + 1}`}
                  className={cx('hero-dot')}
                  style={{
                    width: n === i ? 42 : 22, height: 2, border: 0, cursor: 'pointer',
                    background: n === i ? 'var(--color-canvas)' : 'rgb(255 255 255 / 0.45)',
                    transition: 'width var(--dur-slow) var(--ease-brand), background-color var(--dur-base) var(--ease-out-quad)',
                  }} />
        ))}
      </div>
    </section>
  );
}
