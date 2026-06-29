import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export function useBlurReveal(text: string, delay = 0) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !text) return;

    el.innerHTML = text
      .split(' ')
      .map(
        (w) =>
          `<span style="display:inline-block;margin-right:0.28em;opacity:0;filter:blur(12px);transform:scale(0.88) translateY(10px);will-change:transform,filter,opacity">${w}</span>`,
      )
      .join('');

    const spans = el.querySelectorAll<HTMLElement>('span');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(spans, {
            opacity: [0, 1],
            filter: ['blur(12px)', 'blur(0px)'],
            scale: [0.88, 1],
            translateY: [10, 0],
            duration: 700,
            delay: stagger(60, { start: delay }),
            easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, delay]);

  return ref;
}
