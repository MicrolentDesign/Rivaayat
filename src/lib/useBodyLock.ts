import { useEffect } from 'react';

export function useBodyLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.setAttribute('data-scroll-locked', '');
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.removeAttribute('data-scroll-locked');
      document.body.style.paddingRight = prev;
    };
  }, [active]);
}
