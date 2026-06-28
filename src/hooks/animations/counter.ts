import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export function useCounter(value: string) {
  const ref     = useRef<HTMLSpanElement>(null);
  const running = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/\d+/);
    if (!match) { el.textContent = value; return; }

    const end        = parseInt(match[0]);
    const suffix     = value.replace(/\d+/, '');
    el.textContent   = `0${suffix}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running.current) {
          running.current = true;
          const obj = { val: 0 };
          animate(obj, {
            val:      end,
            duration: 2000,
            easing:   'easeOutExpo',
            onUpdate: () => { el.textContent = `${Math.round(obj.val)}${suffix}`; },
            onComplete: () => { running.current = false; },
          });
        }
        if (!entry.isIntersecting && entry.intersectionRatio === 0) {
          el.textContent = `0${suffix}`;
          running.current = false;
        }
      },
      { threshold: [0, 0.6] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return ref;
}
