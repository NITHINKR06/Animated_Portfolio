import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export function useDrawLine() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transform       = 'scaleX(0)';
    el.style.transformOrigin = 'center';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(el, { scaleX: [0, 1], duration: 1100, easing: 'cubicBezier(0.16, 1, 0.3, 1)' });
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
