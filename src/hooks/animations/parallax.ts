import { useEffect, useRef } from 'react';

export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect     = el.getBoundingClientRect();
      const centerY  = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset   = centerY * speed;
      el.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return ref;
}
