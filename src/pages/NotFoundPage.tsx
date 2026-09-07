import { ButtonLink } from '@/components/primitives/Button';

export function NotFoundPage() {
  return (
    <section className="container section-xl" style={{ textAlign: 'center' }}>
      <p className="eyebrow">404</p>
      <h1 className="t-display" style={{ margin: '1rem 0' }}>This page was never made.</h1>
      <p className="t-lead measure" style={{ margin: '0 auto 2rem' }}>
        Which, in a house that makes everything to order, is at least on brand.
      </p>
      <ButtonLink to="/">Return home</ButtonLink>
    </section>
  );
}
