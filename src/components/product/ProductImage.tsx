import type { ProductShot } from '@/data/productImages';
import { srcSet, fallbackSrc } from '@/lib/image';
import { cx } from '@/lib/utils';

/* One product shot. Photographs come off the pipeline as a responsive WebP
   ladder already cropped to 3:4; placeholders are single SVGs and need none of
   that, so they skip the <picture> wrapper entirely. */
export function ProductImage({ shot, alt, sizes, className, eager }: {
  shot: ProductShot;
  alt: string;
  sizes: string;
  className?: string;
  eager?: boolean;
}) {
  const common = {
    alt,
    className: cx('product-shot', className),
    loading: eager ? ('eager' as const) : ('lazy' as const),
    decoding: 'async' as const,
  };

  if (shot.kind === 'placeholder') return <img src={shot.src} {...common} />;

  return (
    <picture className={cx('product-shot-wrap', className)}>
      <source type="image/webp" srcSet={srcSet(shot.base, 'product')} sizes={sizes} />
      <img src={fallbackSrc(shot.base)} {...common} className="product-shot" />
    </picture>
  );
}
