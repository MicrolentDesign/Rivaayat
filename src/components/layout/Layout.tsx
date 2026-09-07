import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';

export function Layout() {
  const { pathname } = useLocation();
  const overHero = pathname === '/';

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      {!overHero && <AnnouncementBar />}
      <Header overHero={overHero} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
