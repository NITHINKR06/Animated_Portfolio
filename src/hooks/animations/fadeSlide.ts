import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export function useFadeSlide(delay = 0, direction: 'up' | 'left' | 'right' = 'up') {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromX = direction === 'left' ? -40 : direction === 'right' ? 40 : 0;
    const fromY = direction === 'up' ? 50 : 0;

    el.style.opacity = '0';
    el.style.transform = `translateX(${fromX}px) translateY(${fromY}px)`;
    el.style.willChange = 'transform, opacity';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(el, {
            opacity: [0, 1],
            translateX: [fromX, 0],
            translateY: [fromY, 0],
            duration: 750,
            delay,
            easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction]);

  return ref;
}
