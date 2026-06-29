/**
 * useLenis — Smooth scroll hook
 * Part of the Animated 3D Portfolio by Nithin K R
 *
 * @author  Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required — see LICENSE
 * @source  https://github.com/NITHINKR06/Animated_Portfolio
 */
import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const handleScrollTo = (event: Event) => {
      const customEvent = event as CustomEvent<{ target: string }>;
      const target = customEvent.detail?.target;
      if (!target) return;

      if (isMobile) {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    };

    let lenis: Lenis | null = null;
    let rafId: number;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    window.addEventListener('lenis-scroll-to', handleScrollTo as EventListener);

    return () => {
      window.removeEventListener('lenis-scroll-to', handleScrollTo as EventListener);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);
}
