import type { CategorySlug } from './types';

/** A guide line drawn on the flat while its field is active. */
export interface Guide { x1: number; y1: number; x2: number; y2: number }

export interface MeasurePoint {
  key: string;
  label: string;
  /** how to take it — shown under the label, not in a tooltip */
  how: string;
  /** marker position on the 620×860 flat grid */
  x: number;
  y: number;
  /** sane range in inches; anything outside is a typo, not a body */
  min: number;
  max: number;
  guide?: Guide;
}

/* Trimmed from the first nine to the six a kurta is actually cut from.
   Dropped, and why:
     Hip    — the kurta is cut A-line below the waist, so the hem is set by
              length and sweep, not by the wearer's seat.
     Bicep  — the cutter derives sleeve width from chest on a garment this
              loose; asking for it invites a wrong number for no gain.
     Cuff   — standard to the size unless the customer asks otherwise, and
              a wrist measurement taken at home is the least reliable of
              the nine.
   Any of the three can come back: add the entry, give it a marker, done. */
export const MEASUREMENTS: Record<CategorySlug, MeasurePoint[]> = {
  kurta: [
    { key: 'chest',    label: 'Chest',         how: 'Around the fullest part, under the arms', x: 398, y: 250, min: 28, max: 60,
      guide: { x1: 187, y1: 250, x2: 433, y2: 250 } },
    { key: 'shoulder', label: 'Shoulder',      how: 'Seam to seam, straight across the back',  x: 404, y: 88,  min: 13, max: 24,
      guide: { x1: 130, y1: 91, x2: 490, y2: 91 } },
    { key: 'length',   label: 'Kurta length',  how: 'Shoulder seam straight down to the hem',  x: 300, y: 706, min: 30, max: 56,
      guide: { x1: 310, y1: 88, x2: 310, y2: 800 } },
    { key: 'sleeve',   label: 'Sleeve length', how: 'Shoulder seam to the edge of the cuff',   x: 143, y: 300, min: 18, max: 30,
      guide: { x1: 125, y1: 91, x2: 108, y2: 500 } },
    { key: 'neck',     label: 'Neck',          how: 'Around the base of the neck, one finger loose', x: 352, y: 50, min: 12, max: 22,
      guide: { x1: 262, y1: 74, x2: 358, y2: 74 } },
    { key: 'waist',    label: 'Waist',         how: 'Around the natural waist, not the trouser line', x: 390, y: 400, min: 24, max: 56,
      guide: { x1: 172, y1: 400, x2: 448, y2: 400 } },
  ],
  /* The other three garments reuse this shape. Marker coordinates are keyed to
     each flat's own drawing, so they wait on the artwork. */
  sherwani: [],
  'shalwar-kameez': [],
  waistcoat: [],
};

export type Unit = 'in' | 'cm';

export const IN_TO_CM = 2.54;
export const toUnit = (inches: number, unit: Unit) =>
  unit === 'in' ? inches : Math.round(inches * IN_TO_CM * 10) / 10;
export const toInches = (value: number, unit: Unit) =>
  unit === 'in' ? value : Math.round((value / IN_TO_CM) * 10) / 10;

/** Range check runs in inches, whatever the customer is typing in. */
export function outOfRange(p: MeasurePoint, value: number, unit: Unit) {
  const inches = toInches(value, unit);
  return inches < p.min || inches > p.max;
}
