import { socialImages } from '@/data/products';
import { IconInstagram } from '@/components/primitives/Icon';

/* [CHA] "@bestswimwear / FOLLOW US" full-bleed image strip. */
export function SocialStrip() {
  return (
    <section className="section-lg">
      <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p className="eyebrow">As worn</p>
        <a href="https://instagram.com" className="t-h2 link-quiet cluster"
           style={{ justifyContent: 'center', gap: '0.6rem', marginTop: '0.75rem' }}>
          <IconInstagram size={22} /> @rivaayat.atelier
        </a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {socialImages.map((src, i) => (
          <a key={src} href="https://instagram.com" className="media media-square media-zoom group"
             aria-label={`Instagram post ${i + 1}`} style={{ display: i > 2 ? undefined : undefined }}>
            <img src={src} alt="" loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
}
