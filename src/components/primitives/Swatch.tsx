import type { ColorOption } from '@/data/types';
import { cx } from '@/lib/utils';

export function Swatch({ color, selected, large, onClick }:
  { color: ColorOption; selected?: boolean; large?: boolean; onClick?: () => void }) {
  const bg = color.hex2
    ? `linear-gradient(135deg, ${color.hex} 0 50%, ${color.hex2} 50% 100%)`
    : color.hex;
  return (
    <button type="button" onClick={onClick} aria-pressed={!!selected} title={color.name}
            aria-label={color.name}
            className={cx('swatch', large && 'swatch-lg')} style={{ background: bg }} />
  );
}

export function SwatchRow({ colors, selected, onSelect, large }:
  { colors: ColorOption[]; selected?: string; onSelect?: (name: string) => void; large?: boolean }) {
  return (
    <div className="cluster" style={{ gap: '0.5rem' }}>
      {colors.map((c) => (
        <Swatch key={c.name} color={c} large={large} selected={selected === c.name} onClick={() => onSelect?.(c.name)} />
      ))}
    </div>
  );
}
