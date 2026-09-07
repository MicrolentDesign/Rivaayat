import { Link } from 'react-router-dom';
import { Reveal } from '@/components/primitives/Reveal';
import { Img } from '@/components/primitives/Img';
import { SIZES } from '@/lib/image';

/* [CHA] three-up promo cards ("Summer shop / The dream bikini / Gift Cards").
   `base` is pipeline output; `src` is the generated placeholder a card falls
   back to until its photograph lands. */
const CARDS = [
  {
    base: '/sections/made-to-measure',
    src: '/img/editorial-01.svg',
    alt: 'A tailor taking a chest measurement over a linen kurta',
    title: 'Made to measure',
    body: 'Send us six numbers, or come in and we will take them. Six weeks either way.',
    cta: 'Start a commission',
    to: '/custom',
  },
  {
    base: '/sections/everyday-handloom',
    src: '/img/editorial-02.svg',
    alt: 'Handwoven khadi cloth folded on a wooden table',
    title: 'Everyday handloom',
    body: 'Khadi and chanderi kurtas you can wear on a Tuesday. From ₹8,900.',
    cta: 'Shop everyday',
    to: '/shop/kurta',
  },
  {
    base: '/sections/gift-card',
    src: '/img/editorial-03.svg',
    alt: 'A Rivaayat gift card in a muslin envelope',
    title: 'The gift card',
    body: 'For the wedding you were invited to and the outfit nobody can choose for them.',
    cta: 'Buy a gift card',
    to: '/gift-cards',
  },
];

export function PromoTrio() {
  return (
    <section className="section-lg">
      <div className="container">
        <div className="grid-tiles">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <Link to={c.to} className="group stack-md" style={{ display: 'block' }}>
                <div className="media media-editorial media-zoom">
                  <Img base={c.base} src={c.src} profile="sections" sizes={SIZES.third} alt={c.alt} />
                </div>
                <div className="stack-xs">
                  <h3 className="t-h3">{c.title}</h3>
                  <p className="t-sm" style={{ color: 'var(--color-ink-soft)' }}>{c.body}</p>
                  <p className="eyebrow link-quiet" style={{ color: 'var(--color-ink)', marginTop: '0.5rem' }}>{c.cta}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
