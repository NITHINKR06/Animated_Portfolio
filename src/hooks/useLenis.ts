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
    // Disable Lenis on small screens to avoid heavy scroll
    // smoothing on mobile devices.
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const handleScrollTo = (event: Event) => {
      const customEvent = event as CustomEvent<{ target: string }>;
      const target = customEvent.detail?.target;
      if (!target) return;
      lenis.scrollTo(target, { duration: 1.2 });
    };

    window.addEventListener('lenis-scroll-to', handleScrollTo as EventListener);

    return () => {
      window.removeEventListener('lenis-scroll-to', handleScrollTo as EventListener);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
