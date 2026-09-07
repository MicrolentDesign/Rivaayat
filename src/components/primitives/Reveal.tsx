import type { ElementType, ReactNode } from 'react';
import { useReveal } from '@/lib/useReveal';
import { cx } from '@/lib/utils';

export function Reveal({ as: Tag = 'div', delay = 0, className, children }:
  { as?: ElementType; delay?: number; className?: string; children: ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag ref={ref} className={cx('reveal', className)} style={{ ['--reveal-delay' as string]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
