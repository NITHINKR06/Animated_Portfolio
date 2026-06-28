import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export function useLetterReveal(text: string, delay = 0) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !text) return;

    el.innerHTML = text
      .split('')
      .map((c) =>
        `<span style="display:inline-block;opacity:0;transform:translateY(60px) rotate(4deg);will-change:transform,opacity">${
          c === ' ' ? '&nbsp;' : c
        }</span>`
      )
      .join('');

    const spans = el.querySelectorAll<HTMLElement>('span');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(spans, {
            opacity:    [0, 1],
            translateY: [60, 0],
            rotate:     [4, 0],
            duration:   800,
            delay:      stagger(35, { start: delay }),
            easing:     'spring(1, 90, 12, 0)',
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, delay]);

  return ref;
}
