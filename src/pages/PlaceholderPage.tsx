import { Link, useLocation } from 'react-router-dom';
import { ButtonLink } from '@/components/primitives/Button';

/* Pages whose place in the information architecture is settled but whose
   content is not written yet. Without this they all fell through to the 404,
   so a footer full of legitimate links read as a broken site. Each one says
   what it will be and offers a way onward. Delete an entry here the moment
   its real page ships. */
const PLANNED: Record<string, { title: string; blurb: string }> = {
  '/account':       { title: 'Your account',    blurb: 'Order history, saved measurements and addresses. Until this is live, we confirm every order by email.' },
  '/size-guide':    { title: 'Size guide',      blurb: 'Chest sizing against our own blocks, and how to take the six measurements a kurta needs.' },
  '/shipping':      { title: 'Shipping',        blurb: 'Complimentary worldwide above ₹25,000, otherwise ₹1,200 flat. Duties are settled at checkout, so nothing is owed on arrival.' },
  '/returns':       { title: 'Returns & exchange', blurb: 'Thirty days on unworn pieces with tags attached. Made-to-measure pieces are altered free instead of returned.' },
  '/care':          { title: 'Garment care',    blurb: 'How to store, press and clean hand embroidery, fibre by fibre.' },
  '/contact':       { title: 'Contact',         blurb: 'The atelier is in Jaipur. Until this page is live, write to atelier@rivaayat.com.' },
  '/gift-cards':    { title: 'Gift cards',      blurb: 'For the wedding you were invited to and the outfit nobody can choose for them.' },
  '/privacy':       { title: 'Privacy',         blurb: 'What we collect, why, and how long we keep it.' },
  '/terms':         { title: 'Terms',           blurb: 'Terms of sale, including how made-to-measure commissions are handled.' },
  '/accessibility': { title: 'Accessibility',   blurb: 'Where this site meets WCAG 2.1 AA, and where it does not yet.' },
};

export const PLANNED_PATHS = Object.keys(PLANNED);

export function PlaceholderPage() {
  const { pathname } = useLocation();
  const page = PLANNED[pathname];

  return (
    <section className="container section-xl" style={{ textAlign: 'center' }}>
      <p className="eyebrow">Being written</p>
      <h1 className="t-display" style={{ margin: '1rem 0' }}>{page?.title ?? 'This page is on the way'}</h1>
      <p className="t-lead measure" style={{ margin: '0 auto 2rem' }}>
        {page?.blurb ?? 'It is not written yet. Everything else on the site works.'}
      </p>
      <div className="cluster" style={{ justifyContent: 'center', gap: '0.75rem' }}>
        <ButtonLink to="/shop/all">Browse the collection</ButtonLink>
        <Link to="/atelier" className="btn btn-secondary">The atelier</Link>
      </div>
    </section>
  );
}
