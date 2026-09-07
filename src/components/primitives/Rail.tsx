import { useRef, useState, useEffect, type ReactNode } from 'react';
import { IconLeft, IconRight } from './Icon';
import { cx } from '@/lib/utils';

/** Snap-scrolling horizontal rail with hairline arrow controls — the [CHA] carousel. */
export function Rail({ children, narrow, className }: { children: ReactNode; narrow?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = () => {
    const el = ref.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  };
  useEffect(() => { measure(); }, []);

  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className={className}>
      <div ref={ref} onScroll={measure} className={cx('rail', narrow && 'rail-narrow')}>{children}</div>
      <div className="cluster" style={{ justifyContent: 'flex-end', marginTop: '1.25rem', gap: '0.5rem' }}>
        <button className="icon-btn icon-btn-outlined" onClick={() => nudge(-1)} disabled={edges.start} aria-label="Previous"><IconLeft /></button>
        <button className="icon-btn icon-btn-outlined" onClick={() => nudge(1)} disabled={edges.end} aria-label="Next"><IconRight /></button>
      </div>
    </div>
  );
}
