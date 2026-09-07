import { Link } from 'react-router-dom';
import { cx } from '@/lib/utils';

/* The logo. Renders as live text rather than an image so it stays crisp at
   every size, inherits the surface's colour over imagery, and is selectable
   and readable by screen readers. `public/logo/` holds file exports for
   anything off-site — email signatures, print, socials. */
export function Wordmark({
  size = 'md', sub = false, inherit = false, as = 'link',
}: {
  size?: 'sm' | 'md' | 'lg';
  /** the ATELIER · EST. 1974 lockup line — off by default; the supplied logo is the wordmark alone */
  sub?: boolean;
  /** take the surface's contrast colour instead of brand green */
  inherit?: boolean;
  as?: 'link' | 'plain';
}) {
  const mark = (
    <>
      <span className={cx('wordmark', size === 'lg' && 'wordmark--lg', size === 'sm' && 'wordmark--sm',
                          inherit && 'wordmark--inherit')}
            style={{ display: 'block' }}>
        Rivaayat
      </span>
      {sub && <span className="wordmark__sub" style={{ display: 'block', marginTop: '0.5em' }}>Atelier · Est. 1974</span>}
    </>
  );

  if (as === 'plain') return <span style={{ display: 'inline-block' }}>{mark}</span>;
  return (
    <Link to="/" aria-label="Rivaayat — home" style={{ display: 'inline-block' }}>
      {mark}
    </Link>
  );
}
