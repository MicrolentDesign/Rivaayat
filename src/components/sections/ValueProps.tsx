import { IconNeedle, IconRuler, IconTruck, IconReturn, IconLeaf, IconGlobe } from '@/components/primitives/Icon';
import { Reveal } from '@/components/primitives/Reveal';
import type { ComponentType } from 'react';

/* [CHA] "Our values" three-column text band, extended to a six-cell service grid. */
const ITEMS: { Icon: ComponentType<{ size?: number }>; title: string; body: string }[] = [
  { Icon: IconNeedle, title: 'Made by seventy-one families', body: 'We name the karigar on every order card. They are paid per piece, not per hour.' },
  { Icon: IconRuler,  title: 'Made to measure, standard', body: 'Six measurements for a kurta, no surcharge. Chest sizing is available if you prefer it.' },
  { Icon: IconTruck,  title: 'Shipped in muslin, worldwide', body: 'Every piece travels in a hand-stitched bag. Free above ₹25,000.' },
  { Icon: IconReturn, title: 'Thirty days to change your mind', body: 'Unworn, tags on. Made-to-measure pieces are altered free instead.' },
  { Icon: IconLeaf,   title: 'Natural fibres only', body: 'Silk, cotton, wool, linen. No polyester, including in the linings.' },
  { Icon: IconGlobe,  title: 'Duties handled at checkout', body: 'What you see is the landed price. Nothing to pay on arrival.' },
];

export function ValueProps() {
  return (
    <section className="section-lg scheme-alabaster">
      <div className="container">
        <div style={{ display: 'grid', gap: '2.5rem clamp(1.5rem, 4vw, 3.5rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 17rem), 1fr))' }}>
          {ITEMS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={(i % 3) * 80}>
              <div className="stack-sm">
                <span style={{ color: 'var(--color-accent)' }}><Icon size={22} /></span>
                <h3 className="t-h4">{title}</h3>
                <p className="t-sm" style={{ color: 'var(--color-ink-soft)' }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
