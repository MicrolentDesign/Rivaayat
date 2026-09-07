import { srcSet, fallbackSrc, type ImageProfile } from '@/lib/image';
import { cx } from '@/lib/utils';

/* One image, responsive when it came off the pipeline and plain when it did
   not. `base` is a pipeline output path with no width or extension; `src` is a
   single file such as a generated placeholder. */
export function Img({ base, src, profile = 'default', sizes, alt, className, eager }: {
  base?: string;
  src?: string;
  profile?: ImageProfile;
  sizes: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const img = {
    alt,
    loading: eager ? ('eager' as const) : ('lazy' as const),
    decoding: 'async' as const,
  };

  if (!base) return <img src={src} className={className} {...img} />;

  return (
    <picture className={cx('img-wrap', className)}>
      <source type="image/webp" srcSet={srcSet(base, profile)} sizes={sizes} />
      <img src={fallbackSrc(base)} {...img} />
    </picture>
  );
}
