import { useRef } from 'react';
import { animate } from 'animejs';

export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect   = el.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) * strength;
    const dy     = (e.clientY - cy) * strength;
    animate(el, { translateX: dx, translateY: dy, duration: 300, easing: 'easeOutCubic' });
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    animate(el, { translateX: 0, translateY: 0, duration: 500, easing: 'spring(1, 80, 14, 0)' });
  };

  return { ref, onMouseMove, onMouseLeave };
}
