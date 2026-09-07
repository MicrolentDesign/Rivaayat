import { ButtonLink } from '@/components/primitives/Button';
import { Reveal } from '@/components/primitives/Reveal';
import { cx } from '@/lib/utils';

/* [CHA] image + text feature block; [EOI] "Made to wander" long-copy editorial.
   `flip` puts the image on the right at ≥900px and keeps it first on mobile,
   which is the reading order both references use.                          */
export function EditorialSplit({ image, eyebrow, title, body, cta, to, flip, scheme = 'scheme-default', tall }: {
  image: string; eyebrow: string; title: string; body: string[]; cta?: string; to?: string;
  flip?: boolean; scheme?: string; tall?: boolean;
}) {
  return (
    <section className={cx('section-lg', scheme)}>
      <div className="container">
        <div className="split">
          <Reveal className={cx('split__media', flip && 'split__media--flip')}>
            <div className={cx('media media-zoom', tall ? 'media-portrait' : 'media-editorial')}>
              <img src={image} alt="" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={110} className="split__copy">
            <div className="stack-md">
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="t-display">{title}</h2>
              {body.map((p, i) => <p key={i} className="t-lead measure">{p}</p>)}
              {cta && to && <div style={{ paddingTop: '0.5rem' }}><ButtonLink to={to} variant="secondary">{cta}</ButtonLink></div>}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
