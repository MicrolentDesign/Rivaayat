import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Wordmark } from './Wordmark';
import { IconSearch, IconUser, IconBag, IconMenu, IconClose, IconHeart } from '@/components/primitives/Icon';
import { useCart, cartCount } from '@/store/cart';
import { useScrolled } from '@/lib/useScrolled';
import { useBodyLock } from '@/lib/useBodyLock';
import { categories } from '@/data/products';
import { primaryNav as NAV, secondaryNav as NAV_RIGHT, allNav } from '@/data/navigation';
import { cx } from '@/lib/utils';

export function Header({ overHero = false }: { overHero?: boolean }) {
  const scrolled = useScrolled(60);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const lines = useCart((s) => s.lines);
  const wishlist = useCart((s) => s.wishlist);
  const setOpen = useCart((s) => s.setOpen);
  const count = cartCount(lines);
  const transparent = overHero && !scrolled && !megaOpen;
  useBodyLock(menuOpen);

  return (
    <>
      <header className={cx('header', overHero && !scrolled && 'header--over')}
              data-transparent={transparent}
              style={overHero ? { position: 'fixed', top: 0, left: 0, right: 0 } : undefined}
              onMouseLeave={() => setMegaOpen(false)}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '1rem', minHeight: '4.75rem' }}>
          {/* left nav */}
          <nav aria-label="Collections" className="cluster" style={{ gap: '1.35rem', flexWrap: 'nowrap' }}>
            <button className="icon-btn hide-lg" onClick={() => setMenuOpen(true)} aria-label="Open menu"><IconMenu /></button>
            <span className="show-lg cluster" style={{ gap: '1.35rem', flexWrap: 'nowrap' }}>
              {NAV.map((n) => (
                <NavLink key={n.to} to={n.to} className="nav-link"
                         onMouseEnter={() => setMegaOpen(n.isCategory)}>
                  {n.label}
                </NavLink>
              ))}
            </span>
          </nav>

          <Wordmark size={20} />

          {/* right */}
          <div className="cluster" style={{ justifyContent: 'flex-end', gap: '0.25rem' }}>
            <span className="show-lg cluster" style={{ gap: '1.35rem', marginRight: '0.75rem', flexWrap: 'nowrap' }}>
              {NAV_RIGHT.map((n) => <NavLink key={n.to} to={n.to} className="nav-link">{n.label}</NavLink>)}
            </span>
            <Link to="/shop/all" className="icon-btn" aria-label="Search"><IconSearch /></Link>
            <Link to="/account" className="icon-btn show-lg" aria-label="Account"><IconUser /></Link>
            <Link to="/wishlist" className="icon-btn show-lg" aria-label={`Wishlist, ${wishlist.length} saved`} style={{ position: 'relative' }}>
              <IconHeart />
              {wishlist.length > 0 && <Dot n={wishlist.length} />}
            </Link>
            <button className="icon-btn" onClick={() => setOpen(true)} aria-label={`Bag, ${count} items`} style={{ position: 'relative' }}>
              <IconBag />
              {count > 0 && <Dot n={count} />}
            </button>
          </div>
        </div>

        {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
      </header>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}

const Dot = ({ n }: { n: number }) => (
  <span aria-hidden="true" style={{
    position: 'absolute', top: 4, right: 2, minWidth: 16, height: 16, padding: '0 4px',
    display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-pill)',
    background: 'var(--color-accent)', color: '#fff', fontSize: 9, fontWeight: 600, lineHeight: 1,
  }}>{n}</span>
);

function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="mega" onMouseLeave={onClose}>
      <div className="container section" style={{ paddingBlock: '2.5rem' }}>
        <div className="grid-tiles-4">
          {categories.slice(0, 4).map((c) => (
            <Link key={c.slug} to={`/shop/${c.slug}`} className="group stack-sm" onClick={onClose}>
              <div className="media media-portrait media-zoom"><img src={c.image} alt="" /></div>
              <div>
                <h3 className="t-h4">{c.name}</h3>
                <p className="t-meta">{c.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="drawer drawer-left" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="drawer__head">
          <Wordmark size={17} sub={false} />
          <button className="icon-btn" onClick={onClose} aria-label="Close menu"><IconClose /></button>
        </div>
        <nav className="drawer__body">
          <ul className="stack">
            {allNav.map((n) => (
              <li key={n.to} style={{ borderBottom: '1px solid var(--color-line)' }}>
                <Link to={n.to} onClick={onClose}
                      className="t-h3" style={{ display: 'block', padding: '1rem 0' }}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="drawer__foot cluster" style={{ justifyContent: 'space-between' }}>
          <Link to="/account" onClick={onClose} className="eyebrow">Account</Link>
          <Link to="/wishlist" onClick={onClose} className="eyebrow">Wishlist</Link>
        </div>
      </div>
    </>
  );
}
