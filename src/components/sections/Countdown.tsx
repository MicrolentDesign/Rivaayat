import { useEffect, useState } from 'react';
import { ButtonLink } from '@/components/primitives/Button';

/* [CHA] countdown band. Repurposed from "flash sale" to an atelier deadline —
   the same component, a tone that suits couture rather than clearance.     */
function useCountdown(target: Date) {
  const [left, setLeft] = useState(() => target.getTime() - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(target.getTime() - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  const s = Math.max(0, Math.floor(left / 1000));
  return {
    days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60), secs: s % 60,
  };
}

export function Countdown() {
  const [target] = useState(() => new Date(Date.now() + 1000 * 60 * 60 * 24 * 23 + 1000 * 60 * 47));
  const t = useCountdown(target);
  const cells = [['Days', t.days], ['Hours', t.hours], ['Min', t.mins], ['Sec', t.secs]] as const;

  return (
    <section className="section-lg scheme-clay">
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="eyebrow">The winter wedding calendar</p>
        <h2 className="t-display" style={{ margin: '0.75rem 0 0.5rem' }}>Closes for new commissions in</h2>
        <p className="t-lead measure" style={{ margin: '0 auto' }}>
          Bridal takes ninety days on the frame. To wear it in December, the order has to be in before this clock runs out.
        </p>
        <div className="cluster" style={{ justifyContent: 'center', gap: 'clamp(1.5rem, 5vw, 3.5rem)', margin: '2.5rem 0' }}>
          {cells.map(([label, value]) => (
            <div key={label}>
              <p className="t-display" style={{ fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                {String(value).padStart(2, '0')}
              </p>
              <p className="eyebrow" style={{ marginTop: '0.6rem' }}>{label}</p>
            </div>
          ))}
        </div>
        <ButtonLink to="/atelier#appointment">Book a bridal appointment</ButtonLink>
      </div>
    </section>
  );
}
