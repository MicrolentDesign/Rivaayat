import { Link } from 'react-router-dom';
import { Reveal } from '@/components/primitives/Reveal';

/* [CHA] the dual promo tiles that sit directly under the hero
   ("SHOP TOPS / SHOP BOTTOMS"). */
const TILES = [
  { image: '/img/cat-bridal.svg', eyebrow: 'For the wedding', title: 'Bridal', to: '/shop/bridal', cta: 'Shop bridal' },
  { image: '/img/cat-menswear.svg', eyebrow: 'For the groom', title: 'Menswear', to: '/shop/menswear', cta: 'Shop menswear' },
];

export function LookbookDuo() {
  return (
    <section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))', gap: 2 }}>
        {TILES.map((t, i) => (
          <Reveal key={t.to} delay={i * 100}>
            <Link to={t.to} className="group" style={{ display: 'block', position: 'relative' }}>
              <div className="media media-portrait media-zoom scrim-even" style={{ aspectRatio: '5 / 4' }}>
                <img src={t.image} alt="" loading="lazy" />
              </div>
              <div className="overlay-content overlay-cc">
                <p className="eyebrow">{t.eyebrow}</p>
                <h2 className="t-display" style={{ color: 'var(--color-canvas)', margin: '0.5rem 0 1.5rem' }}>{t.title}</h2>
                <span className="btn btn-overlay">{t.cta}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
