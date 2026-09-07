/* The kurta technical flat, inlined so markers and guides can be drawn into the
   same coordinate space. Colours come from CSS variables rather than literals,
   so the drawing follows the section it sits in. The standalone export lives at
   public/flats/kurta.svg — keep the two in step. */

const LINE = 'var(--flat-line, var(--color-ink))';
const FILL = 'var(--flat-fill, var(--color-canvas))';
const LINING = 'var(--flat-lining, var(--color-bone))';

export function KurtaFlat() {
  return (
    <>
      <g fill={LINING} stroke="none">
        <path d="M303 24 H317 V74 H303 Z" />
        <path d="M158 640 C155 692 152 742 151 793 C160 796 171 795 179 791 C176 740 170 690 164 640 Z" />
        <path d="M462 640 C465 692 468 742 469 793 C460 796 449 795 441 791 C444 740 450 690 456 640 Z" />
      </g>

      <g fill={FILL} stroke={LINE} strokeWidth={2.6} strokeLinejoin="round" strokeLinecap="round">
        <path d="M262 74 C222 77 172 83 130 91 C123 97 120 106 119 118
                 C114 232 108 372 104 494 C103 502 106 508 113 509 L157 512
                 C164 505 167 498 168 489 C174 412 181 334 187 268
                 C179 388 166 512 158 640 C155 692 152 742 151 793
                 C232 807 388 807 469 793 C468 742 465 692 462 640
                 C454 512 441 388 433 268 C439 334 446 412 452 489
                 C453 498 456 505 463 512 L507 509 C514 508 517 502 516 494
                 C512 372 506 232 501 118 C500 106 497 97 490 91
                 C448 83 398 77 358 74 Q310 88 262 74 Z" />
        <path d="M262 74 C257 55 259 39 268 29 C280 26 292 24 304 23 L304 73 Q283 78 262 74 Z" />
        <path d="M358 74 C363 55 361 39 352 29 C340 26 328 24 316 23 L316 73 Q337 78 358 74 Z" />
      </g>

      <g fill="none" stroke={LINE} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round">
        <path d="M187 268 C181 334 174 412 168 489" />
        <path d="M433 268 C439 334 446 412 452 489" />
        <path d="M113 500 C130 505 146 507 162 506" />
        <path d="M507 500 C490 505 474 507 458 506" />
        <path d="M164 640 C170 690 176 740 179 791" />
        <path d="M456 640 C450 690 444 740 441 791" />
        <path d="M268 37 C280 33 292 31 304 30" />
        <path d="M352 37 C340 33 328 31 316 30" />
        <path d="M262 74 Q310 88 358 74" />
        <path d="M294 82 L294 232 Q294 246 310 246 Q326 246 326 232 L326 82" />
      </g>
    </>
  );
}

/** Flats are keyed by category so the diagram picks the right one. */
export const FLATS = {
  kurta: KurtaFlat,
  sherwani: null,
  'shalwar-kameez': null,
  waistcoat: null,
} as const;
