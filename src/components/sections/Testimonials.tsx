import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconLeft, IconRight } from '@/components/primitives/Icon';
import { Rating } from '@/components/primitives/Rating';

/* [CHA] testimonial carousel with a "Shop the X collection" tail link. */
const QUOTES = [
  { text: 'The lehenga took ninety-one days and arrived with a note listing everyone who touched it. I have worn it twice and it still feels like the first time.', name: 'Anjali M.', place: 'Bengaluru', to: '/shop/bridal', label: 'Shop bridal' },
  { text: 'I sent my measurements at midnight from Toronto with no expectations. The fit is better than anything I have had made in person.', name: 'Priya R.', place: 'Toronto', to: '/atelier#measure', label: 'Made to measure' },
  { text: 'My father wore his sherwani to two weddings and a funeral this year and it looks exactly as it did in March.', name: 'Karan S.', place: 'London', to: '/shop/menswear', label: 'Shop menswear' },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const q = QUOTES[i];
  const go = (d: number) => setI((n) => (n + d + QUOTES.length) % QUOTES.length);

  return (
    <section className="section-xl scheme-dark">
      <div className="container-reading" style={{ textAlign: 'center' }}>
        <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>What people write back</p>
        <Rating value={5} className="cluster" size={15} />
        <blockquote className="t-h2" style={{ margin: '1.5rem 0 0', color: 'var(--color-on-dark)', fontWeight: 200 }}>
          {q.text}
        </blockquote>
        <p className="eyebrow" style={{ marginTop: '1.75rem', color: 'var(--color-on-dark-muted)' }}>— {q.name}, {q.place}</p>
        <Link to={q.to} className="eyebrow link-quiet" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--color-on-dark)' }}>{q.label}</Link>

        <div className="cluster" style={{ justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem', color: 'var(--color-on-dark)' }}>
          <button className="icon-btn" onClick={() => go(-1)} aria-label="Previous testimonial"><IconLeft /></button>
          <span className="t-meta" style={{ color: 'var(--color-on-dark-muted)', minWidth: '3rem' }}>{i + 1} / {QUOTES.length}</span>
          <button className="icon-btn" onClick={() => go(1)} aria-label="Next testimonial"><IconRight /></button>
        </div>
      </div>
    </section>
  );
}
