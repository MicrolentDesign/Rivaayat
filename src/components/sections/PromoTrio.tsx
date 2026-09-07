import { Link } from 'react-router-dom';
import { Reveal } from '@/components/primitives/Reveal';

/* [CHA] three-up promo cards ("Summer shop / The dream bikini / Gift Cards"). */
const CARDS = [
  { image: '/img/editorial-01.svg', title: 'Made to measure', body: 'Send us nine numbers, or come in and we will take them. Six weeks either way.', cta: 'Start a commission', to: '/atelier#measure' },
  { image: '/img/editorial-02.svg', title: 'Everyday handloom', body: 'Khadi and chanderi kurtas you can wear on a Tuesday. From ₹8,900.', cta: 'Shop everyday', to: '/shop/everyday' },
  { image: '/img/editorial-03.svg', title: 'The gift card', body: 'For the wedding you were invited to and the outfit nobody can choose for them.', cta: 'Buy a gift card', to: '/gift-cards' },
];

export function PromoTrio() {
  return (
    <section className="section-lg">
      <div className="container">
        <div className="grid-tiles">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <Link to={c.to} className="group stack-md" style={{ display: 'block' }}>
                <div className="media media-editorial media-zoom"><img src={c.image} alt="" loading="lazy" /></div>
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
