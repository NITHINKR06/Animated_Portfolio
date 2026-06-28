import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export function useSpringGrid() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = Array.from(el.children) as HTMLElement[];

    items.forEach((c, i) => {
      c.style.opacity   = '0';
      c.style.transform = `translateY(80px) scale(0.9) rotate(${i % 2 === 0 ? '2deg' : '-2deg'})`;
      c.style.willChange = 'transform, opacity';
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(items, {
            opacity:    [0, 1],
            translateY: [80, 0],
            scale:      [0.9, 1],
            rotate:     (el, i: number) => [`${i % 2 === 0 ? 2 : -2}deg`, '0deg'],
            duration:   900,
            delay:      stagger(90),
            easing:     'spring(1, 80, 14, 0)',
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
