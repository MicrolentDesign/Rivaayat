import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getProduct } from '@/data/products';
import { MEASUREMENTS, outOfRange, toUnit, toInches, type Unit } from '@/data/measurements';
import { MeasurementDiagram } from '@/components/custom/MeasurementDiagram';
import { Button } from '@/components/primitives/Button';
import { Price } from '@/components/primitives/Price';
import { IconCheck, IconLeft } from '@/components/primitives/Icon';
import { inr, leadTimeCopy } from '@/lib/utils';

export function CustomFitPage() {
  const { slug = '' } = useParams();
  const product = getProduct(slug);
  const [unit, setUnit] = useState<Unit>('in');   // inch is the default everywhere
  const [values, setValues] = useState<Record<string, string>>({});
  const [active, setActive] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  if (!product) return <Navigate to="/shop/all" replace />;
  const points = MEASUREMENTS[product.category];

  /* Switching units converts what is already typed rather than clearing it. */
  const switchUnit = (next: Unit) => {
    if (next === unit) return;
    setValues((prev) => {
      const out: Record<string, string> = {};
      for (const [k, v] of Object.entries(prev)) {
        const n = parseFloat(v);
        out[k] = Number.isNaN(n) ? v : String(toUnit(toInches(n, unit), next));
      }
      return out;
    });
    setUnit(next);
  };

  const filled = points.filter((p) => values[p.key]?.trim());
  const invalid = points.filter((p) => {
    const n = parseFloat(values[p.key] ?? '');
    return !Number.isNaN(n) && outOfRange(p, n, unit);
  });
  const complete = filled.length === points.length && invalid.length === 0;

  if (points.length === 0) {
    return (
      <section className="container section-xl" style={{ textAlign: 'center' }}>
        <p className="eyebrow">Not ready yet</p>
        <h1 className="t-display" style={{ margin: '1rem 0' }}>This garment has no diagram yet.</h1>
        <p className="t-lead measure" style={{ margin: '0 auto 2rem' }}>
          The measurement diagram for {product.category.replace('-', ' ')} is still being drawn. Kurta is live —
          everything else follows once the shape is signed off.
        </p>
        <Link to={`/product/${product.slug}`} className="btn btn-secondary">Back to the piece</Link>
      </section>
    );
  }

  return (
    <>
      <div className="container" style={{ paddingTop: '1.5rem' }}>
        <Link to={`/product/${product.slug}`} className="eyebrow link-quiet cluster" style={{ gap: '0.5rem', color: 'var(--color-ink)' }}>
          <IconLeft size={15} /> {product.title}
        </Link>
      </div>

      <header className="container section" style={{ paddingBottom: 0 }}>
        <p className="eyebrow">Custom fitment · no surcharge</p>
        <h1 className="t-h1" style={{ margin: '0.75rem 0 0.75rem' }}>Your measurements</h1>
        <p className="t-lead measure">
          Six numbers is all a kurta takes. Touch a number on the drawing to see where the tape goes,
          or work down the list. A cutter reads every set before anything is cut.
        </p>
      </header>

      <section className="container section">
        <div className="fit">
          <MeasurementDiagram points={points} active={active} onActivate={setActive}
                              unit={unit} onUnit={switchUnit} />

          <div>
            <div className="fit-fields">
              {points.map((p, i) => {
                const raw = values[p.key] ?? '';
                const n = parseFloat(raw);
                const bad = !Number.isNaN(n) && outOfRange(p, n, unit);
                return (
                  <div key={p.key} className="fit-row" data-on={active === p.key}>
                    <span className="fit-row__n">{i + 1}</span>
                    <label htmlFor={`fit-${p.key}`}
                           onMouseEnter={() => setActive(p.key)}
                           onMouseLeave={() => setActive(null)}>
                      {p.label}
                      <span>{p.how}</span>
                    </label>
                    <span className="fit-row__in">
                      <input id={`fit-${p.key}`} type="text" inputMode="decimal"
                             value={raw} aria-invalid={bad}
                             placeholder="—"
                             onChange={(e) => setValues((v) => ({ ...v, [p.key]: e.target.value }))}
                             onFocus={() => setActive(p.key)}
                             onBlur={() => setActive(null)} />
                      <span className="fit-row__u">{unit}</span>
                    </span>
                  </div>
                );
              })}
            </div>

            {invalid.length > 0 && (
              <p className="field-error" style={{ marginTop: '0.85rem' }}>
                {invalid.map((p) => p.label).join(', ')} {invalid.length === 1 ? 'looks' : 'look'} outside
                the usual range. Check the number before sending — we would rather ask now than after cutting.
              </p>
            )}

            <div className="cluster" style={{ justifyContent: 'space-between', paddingTop: '1rem' }}>
              <span className="t-meta">{filled.length} of {points.length} filled</span>
              <span className="t-meta">Measuring in {unit === 'in' ? 'inches' : 'centimetres'}</span>
            </div>

            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-line)', paddingTop: '1.5rem' }}>
              <div className="cluster" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="t-sm" style={{ color: 'var(--color-ink)' }}>{product.title}</span>
                <Price price={product.price} from={product.priceFrom} />
              </div>
              <p className="t-meta" style={{ marginBottom: '1.25rem' }}>
                {leadTimeCopy(product.leadTimeDays)} · made to measure at no extra cost
              </p>

              {sent ? (
                <div className="cluster" style={{ gap: '0.6rem', color: 'var(--color-success)' }}>
                  <IconCheck size={18} />
                  <span className="t-sm">Sent. We will confirm within two working days.</span>
                </div>
              ) : (
                <Button block disabled={!complete} onClick={() => setSent(true)}>
                  {complete ? 'Send measurements' : `Fill all ${points.length} measurements`}
                </Button>
              )}
              <p className="t-meta" style={{ marginTop: '0.85rem' }}>
                Nothing is charged yet. We check the numbers, confirm {inr(product.price)} and the lead time,
                then send a payment link.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
