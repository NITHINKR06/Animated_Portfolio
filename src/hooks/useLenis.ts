import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const handleScrollTo = (event: Event) => {
      const customEvent = event as CustomEvent<{ target: string }>;
      const target = customEvent.detail?.target;
      if (!target) return;
      lenis.scrollTo(target, { duration: 1.2 });
    };

    window.addEventListener('lenis-scroll-to', handleScrollTo as EventListener);

    return () => {
      window.removeEventListener('lenis-scroll-to', handleScrollTo as EventListener);
      lenis.destroy();
    };
  }, []);
}
