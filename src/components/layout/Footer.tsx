import { Link } from 'react-router-dom';
import { Wordmark } from './Wordmark';
import { IconInstagram, IconPinterest, IconMail, IconRight } from '@/components/primitives/Icon';

const COLUMNS = [
  { title: 'Shop', links: [['New Arrivals', '/shop/new'], ['Sherwani', '/shop/sherwani'], ['Shalwar Kameez', '/shop/shalwar-kameez'], ['Kurta', '/shop/kurta'], ['Waistcoat', '/shop/waistcoat'], ['Custom Orders', '/custom']] },
  { title: 'Atelier', links: [['Our story', '/atelier'], ['The artisans', '/atelier#artisans'], ['Made to measure', '/atelier#measure'], ['Journal', '/journal'], ['Book an appointment', '/atelier#appointment']] },
  { title: 'Care', links: [['Size guide', '/size-guide'], ['Shipping', '/shipping'], ['Returns & exchange', '/returns'], ['Garment care', '/care'], ['Contact', '/contact']] },
];

export function Footer() {
  return (
    <footer className="scheme-dark">
      {/* newsletter band */}
      <div style={{ borderBottom: '1px solid var(--color-on-dark-line)' }}>
        <div className="container section-lg">
          <div style={{ display: 'grid', gap: '2.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))', alignItems: 'end' }}>
            <div className="stack-sm">
              <p className="eyebrow">The Letter</p>
              <h2 className="t-h2" style={{ maxWidth: '18ch' }}>Notes from the workroom, once a month.</h2>
              <p className="t-sm measure-tight" style={{ color: 'var(--color-on-dark-muted)' }}>
                New pieces, the occasional archive release, and what our artisans are working on. No noise.
              </p>
            </div>
            <form className="stack-sm" onSubmit={(e) => e.preventDefault()}>
              <label className="field-label" htmlFor="nl" style={{ color: 'var(--color-on-dark-muted)' }}>Email address</label>
              <div className="cluster" style={{ gap: 0, flexWrap: 'nowrap' }}>
                <input id="nl" type="email" required placeholder="you@example.com"
                       className="input input-underline"
                       style={{ color: 'var(--color-on-dark)', borderBottomColor: 'var(--color-on-dark-line)' }} />
                <button type="submit" className="icon-btn" aria-label="Subscribe"
                        style={{ color: 'var(--color-on-dark)', borderBottom: '1px solid var(--color-on-dark-line)', height: '3.1rem' }}>
                  <IconRight />
                </button>
              </div>
              <p className="t-meta" style={{ color: 'var(--color-on-dark-muted)' }}>
                By subscribing you agree to our <Link to="/privacy" className="link" style={{ color: 'inherit' }}>privacy policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* link columns */}
      <div className="container section-lg">
        <div style={{ display: 'grid', gap: '2.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 13rem), 1fr))' }}>
          <div className="stack-md" style={{ gridColumn: 'span 1' }}>
            <Wordmark sub />
            <p className="t-sm" style={{ color: 'var(--color-on-dark-muted)', maxWidth: '30ch' }}>
              A menswear couture house working with seventy-one artisan families across eight Indian states.
            </p>
            <div className="cluster" style={{ gap: '0.5rem', color: 'var(--color-on-dark)' }}>
              <a href="https://instagram.com" className="icon-btn" aria-label="Instagram"><IconInstagram /></a>
              <a href="https://pinterest.com" className="icon-btn" aria-label="Pinterest"><IconPinterest /></a>
              <a href="mailto:atelier@rivaayat.com" className="icon-btn" aria-label="Email"><IconMail /></a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} className="stack-sm" aria-label={col.title}>
              <p className="eyebrow" style={{ color: 'var(--color-on-dark)' }}>{col.title}</p>
              <ul className="stack-xs" style={{ marginTop: '0.5rem' }}>
                {col.links.map(([label, to]) => (
                  <li key={to}>
                    <Link to={to} className="t-sm link-quiet" style={{ color: 'var(--color-on-dark-muted)' }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* legal strip */}
      <div style={{ borderTop: '1px solid var(--color-on-dark-line)' }}>
        <div className="container cluster" style={{ justifyContent: 'space-between', paddingBlock: '1.5rem', gap: '1rem' }}>
          <p className="t-meta" style={{ color: 'var(--color-on-dark-muted)' }}>
            © {new Date().getFullYear()} Rivaayat Atelier Pvt. Ltd. All rights reserved.
          </p>
          <div className="cluster" style={{ gap: '1.5rem' }}>
            {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Accessibility', '/accessibility']].map(([l, to]) => (
              <Link key={to} to={to} className="t-meta link-quiet" style={{ color: 'var(--color-on-dark-muted)' }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
