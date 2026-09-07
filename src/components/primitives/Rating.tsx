import { IconStar } from './Icon';
import { cx } from '@/lib/utils';

export function Rating({ value, count, size = 13, className }: { value: number; count?: number; size?: number; className?: string }) {
  return (
    <div className={cx('cluster', className)} style={{ gap: '0.4rem' }}>
      <span className="cluster" style={{ gap: '2px', color: 'var(--color-accent)' }}
            aria-label={`Rated ${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => <IconStar key={i} size={size} filled={i <= Math.round(value)} />)}
      </span>
      {count !== undefined && <span className="t-meta">({count})</span>}
    </div>
  );
}
