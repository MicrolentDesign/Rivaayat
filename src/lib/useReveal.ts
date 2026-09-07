import { useEffect, useRef } from 'react';

/** Adds data-visible on first intersection — the [CHA] `.has-motion` entrance.
 *
 *  Two deliberate safeguards, because a reveal that never fires leaves real
 *  content at opacity 0:
 *   1. anything already in (or near) the viewport on mount shows immediately,
 *      so deep links and restored scroll positions never land on blank bands;
 *   2. a timeout backstop reveals the element even if the observer never
 *      delivers (hidden ancestor, detached subtree, unsupported API).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.setAttribute('data-visible', 'true');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      show();
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1 && rect.bottom > 0) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { show(); io.disconnect(); } },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);

    const backstop = window.setTimeout(() => { show(); io.disconnect(); }, 4000);
    return () => { io.disconnect(); window.clearTimeout(backstop); };
  }, [threshold]);

  return ref;
}
