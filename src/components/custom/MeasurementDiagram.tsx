import { KurtaFlat } from './GarmentFlat';
import type { MeasurePoint, Unit } from '@/data/measurements';

/** The flat plus its numbered markers, guide lines, and the unit toggle. */
export function MeasurementDiagram({ points, active, onActivate, unit, onUnit }: {
  points: MeasurePoint[];
  active: string | null;
  onActivate: (key: string | null) => void;
  unit: Unit;
  onUnit: (u: Unit) => void;
}) {
  return (
    <div className="fit-stage">
      <svg viewBox="0 0 620 860" className="fit-flat"
           role="img" aria-label="Kurta front view with numbered measurement points">
        <KurtaFlat />

        {points.map((p) => p.guide && (
          <line key={p.key} x1={p.guide.x1} y1={p.guide.y1} x2={p.guide.x2} y2={p.guide.y2}
                className="fit-guide" data-on={active === p.key} />
        ))}

        {points.map((p, i) => (
          <g key={p.key} className="fit-marker" data-on={active === p.key}
             role="button" tabIndex={0}
             aria-label={`${i + 1}. ${p.label}. ${p.how}`}
             onMouseEnter={() => onActivate(p.key)}
             onMouseLeave={() => onActivate(null)}
             onFocus={() => onActivate(p.key)}
             onBlur={() => onActivate(null)}
             onClick={() => document.getElementById(`fit-${p.key}`)?.focus()}
             onKeyDown={(e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                 e.preventDefault();
                 document.getElementById(`fit-${p.key}`)?.focus();
               }
             }}>
            <circle cx={p.x} cy={p.y} r={14} />
            <text x={p.x} y={p.y + 1}>{i + 1}</text>
          </g>
        ))}
      </svg>

      <div className="fit-units" role="group" aria-label="Measurement units">
        <button type="button" aria-pressed={unit === 'in'} onClick={() => onUnit('in')}>Inch</button>
        <button type="button" aria-pressed={unit === 'cm'} onClick={() => onUnit('cm')}>cm</button>
      </div>
    </div>
  );
}
