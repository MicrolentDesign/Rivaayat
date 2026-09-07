import { inr, discountPct, cx } from '@/lib/utils';

export function Price({ price, compareAt, from, className }:
  { price: number; compareAt?: number; from?: boolean; className?: string }) {
  const off = discountPct(price, compareAt);
  return (
    <span className={cx('price', className)}>
      {from && <span className="price-from">From</span>}
      <span className={off ? 'price-sale' : undefined}>{inr(price)}</span>
      {off > 0 && <><span className="price-was">{inr(compareAt!)}</span><span className="price-from">{off}% off</span></>}
    </span>
  );
}
