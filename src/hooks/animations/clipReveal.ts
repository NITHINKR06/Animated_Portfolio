import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export function useClipReveal(delay = 0) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.clipPath = 'inset(100% 0% 0% 0%)';
    el.style.opacity = '1';
    el.style.transform = 'translateY(8px)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(el, {
            clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
            translateY: [8, 0],
            duration: 900,
            delay,
            easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
