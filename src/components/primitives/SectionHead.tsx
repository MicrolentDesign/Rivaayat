import { Link } from 'react-router-dom';
import { cx } from '@/lib/utils';
import type { ReactNode } from 'react';

/** The eyebrow + title (+ link) cluster that opens every band on both references. */
export function SectionHead({ eyebrow, title, intro, link, linkLabel, center, className, children }: {
  eyebrow?: string; title?: ReactNode; intro?: ReactNode;
  link?: string; linkLabel?: string; center?: boolean; className?: string; children?: ReactNode;
}) {
  return (
    <header className={cx('section-head', center && 'section-head--center', className)}>
      <div className="section-head__group" style={center ? { alignItems: 'center' } : undefined}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <h2 className="t-h1">{title}</h2>}
        {intro && <p className={cx('t-lead', center ? 'measure' : 'measure-tight')}>{intro}</p>}
      </div>
      {children}
      {link && linkLabel && (
        <Link to={link} className="eyebrow link-quiet" style={{ color: 'var(--color-ink)', paddingBottom: 2 }}>
          {linkLabel}
        </Link>
      )}
    </header>
  );
}
