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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    let tickerFn: ((time: number) => void) | null = null;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      // Keep GSAP's ScrollTrigger in sync with Lenis's smoothed scroll
      // position (standard Lenis + GSAP integration), so `scrub` timelines
      // track the actual smoothed scroll rather than the raw native one.
      lenis.on('scroll', ScrollTrigger.update);

      tickerFn = (time: number) => {
        lenis!.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }

    window.addEventListener('lenis-scroll-to', handleScrollTo as EventListener);

    return () => {
      window.removeEventListener('lenis-scroll-to', handleScrollTo as EventListener);
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        gsap.ticker.lagSmoothing(500, 33); // restore GSAP's defaults
      }
      if (lenis) lenis.destroy();
    };
  }, []);
}
