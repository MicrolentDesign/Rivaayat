import { Link } from 'react-router-dom';

export function Wordmark({ size = 22, sub = true }: { size?: number; sub?: boolean }) {
  return (
    <Link to="/" aria-label="Rivaayat — home" style={{ display: 'inline-block', textAlign: 'center' }}>
      <span className="wordmark" style={{ fontSize: size, display: 'block', paddingLeft: '0.14em' }}>Rivaayat</span>
      {sub && <span className="wordmark__sub" style={{ display: 'block', marginTop: 5, paddingLeft: '0.42em' }}>Atelier · Est. 1974</span>}
    </Link>
  );
}
