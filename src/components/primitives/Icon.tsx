/* Hairline icon set — 1px strokes to match the system's hairline language. */
import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { size?: number };

const Base = ({ size = 20, children, ...rest }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    {children}
  </svg>
);

export const IconSearch  = (p: P) => <Base {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></Base>;
export const IconUser    = (p: P) => <Base {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Base>;
export const IconBag     = (p: P) => <Base {...p}><path d="M5 7h14l1 14H4L5 7Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /></Base>;
export const IconHeart   = (p: P) => <Base {...p}><path d="M12 20s-7-4.5-7-9.5A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.5C19 15.5 12 20 12 20Z" /></Base>;
export const IconClose   = (p: P) => <Base {...p}><path d="M6 6l12 12M18 6L6 18" /></Base>;
export const IconMenu    = (p: P) => <Base {...p}><path d="M3 7h18M3 12h18M3 17h18" /></Base>;
export const IconLeft    = (p: P) => <Base {...p}><path d="M15 5l-7 7 7 7" /></Base>;
export const IconRight   = (p: P) => <Base {...p}><path d="M9 5l7 7-7 7" /></Base>;
export const IconDown    = (p: P) => <Base {...p}><path d="M5 9l7 7 7-7" /></Base>;
export const IconUp      = (p: P) => <Base {...p}><path d="M19 15l-7-7-7 7" /></Base>;
export const IconPlus    = (p: P) => <Base {...p}><path d="M12 5v14M5 12h14" /></Base>;
export const IconMinus   = (p: P) => <Base {...p}><path d="M5 12h14" /></Base>;
export const IconCheck   = (p: P) => <Base {...p}><path d="M4 12.5l5 5L20 6.5" /></Base>;
export const IconFilter  = (p: P) => <Base {...p}><path d="M3 6h18M6 12h12M10 18h4" /></Base>;
export const IconGlobe   = (p: P) => <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" /></Base>;
export const IconTruck   = (p: P) => <Base {...p}><path d="M2 7h11v9H2zM13 10h4l3 3v3h-7z" /><circle cx="6" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></Base>;
export const IconReturn  = (p: P) => <Base {...p}><path d="M4 10h11a5 5 0 0 1 0 10H8" /><path d="M8 6l-4 4 4 4" /></Base>;
export const IconRuler   = (p: P) => <Base {...p}><rect x="2" y="8" width="20" height="8" /><path d="M7 8v3M12 8v4M17 8v3" /></Base>;
export const IconNeedle  = (p: P) => <Base {...p}><path d="M20 4L9 15" /><path d="M9 15l-4 5 5-4" /><circle cx="19" cy="5" r="1.6" /></Base>;
export const IconLeaf    = (p: P) => <Base {...p}><path d="M20 4C10 4 4 9 4 16v4" /><path d="M4 16c10 2 16-4 16-12" /></Base>;
export const IconStar    = ({ size = 14, filled = true, ...rest }: P & { filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}
       stroke="currentColor" strokeWidth={1.25} aria-hidden="true" {...rest}>
    <path d="M12 3l2.6 5.6 6 .8-4.4 4.2 1.1 6.1L12 16.8 6.7 19.7l1.1-6.1L3.4 9.4l6-.8L12 3Z" />
  </svg>
);
export const IconInstagram = (p: P) => <Base {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" /></Base>;
export const IconPinterest = (p: P) => <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 20l2-8" /><path d="M8.6 10.6c0-2 1.6-3.6 3.7-3.6s3.4 1.3 3.4 3.3c0 2.3-1.3 4-3 4-.8 0-1.5-.5-1.3-1.3" /></Base>;
export const IconMail    = (p: P) => <Base {...p}><rect x="3" y="5" width="18" height="14" /><path d="M3 6l9 7 9-7" /></Base>;
