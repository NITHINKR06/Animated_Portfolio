/**
 * @hook useScrollChoreography
 * @description Master GSAP ScrollTrigger Cinematic Orchestration
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollChoreography() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isDesktop = window.innerWidth >= 768;

    const ctx = gsap.context(() => {
      // ── Note: Scene 01 (Hero Master Pinned Choreography) is encapsulated inside Hero.tsx ──

      // ── Scene 02: About Layered Narrative Reveals ──
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        gsap.from('#about h2', {
          scrollTrigger: {
            trigger: aboutEl,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.8,
          },
          y: 50,
          opacity: 0.3,
          ease: 'power2.out',
        });

        const essays = document.querySelectorAll('#about .space-y-10 > div');
        essays.forEach((essay) => {
          gsap.from(essay, {
            scrollTrigger: {
              trigger: essay,
              start: 'top 90%',
              end: 'top 65%',
              scrub: 0.8,
            },
            y: 35,
            opacity: 0.4,
            ease: 'power1.out',
          });
        });
      }

      // ── Scene 03: Projects Pinned Horizontal Exhibition Journey ──
      if (isDesktop) {
        const track = document.querySelector('.projects-horizontal-track') as HTMLElement | null;
        const pinContainer = document.getElementById('projects-pin-container');

        if (track && pinContainer) {
          const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth + 160);

          gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: 'none',
            scrollTrigger: {
              trigger: pinContainer,
              start: 'top top',
              end: () => `+=${getScrollAmount()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      // ── Scene 04: Skills Spatial Cluster Elevations ──
      const skillClusters = document.querySelectorAll('#skills .space-y-16 > div');
      skillClusters.forEach((cluster) => {
        gsap.fromTo(
          cluster,
          { opacity: 0.5, y: 50, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: cluster,
              start: 'top 92%',
              end: 'top 60%',
              scrub: 0.8,
            },
            ease: 'power2.out',
          }
        );
      });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);
}
