// src/hooks/useScrollAnimations.ts
// Premium scroll animations — clip-path reveals, blur-in text,
// magnetic hover, parallax depth, spring physics entrance.
// No reverse-on-scroll-back — that's bad UX. Animate in once, stay.

import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

/* ─────────────────────────────────────────────────────────────
   1. CLIP-PATH REVEAL
   Text/element reveals upward from behind a clip mask.
   Feels like content is being uncovered — used by Apple, Linear.
   Usage: ref={useClipReveal()} on any element
───────────────────────────────────────────────────────────── */
export function useClipReveal(delay = 0) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial state — hidden below clip
    el.style.clipPath  = 'inset(100% 0% 0% 0%)';
    el.style.opacity   = '1';
    el.style.transform = 'translateY(8px)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(el, {
            clipPath:   ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
            translateY: [8, 0],
            duration:   900,
            delay,
            easing:     'cubicBezier(0.16, 1, 0.3, 1)',
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   2. BLUR-IN TEXT REVEAL
   Each word blurs in from filter:blur(12px) scale(0.9) to clear.
   Cinematic, used by high-end product pages.
   Usage: ref={useBlurReveal(text)} on a <p> or <h2>
───────────────────────────────────────────────────────────── */
export function useBlurReveal(text: string, delay = 0) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !text) return;

    el.innerHTML = text
      .split(' ')
      .map(
        (w) =>
          `<span style="display:inline-block;margin-right:0.28em;opacity:0;filter:blur(12px);transform:scale(0.88) translateY(10px);will-change:transform,filter,opacity">${w}</span>`
      )
      .join('');

    const spans = el.querySelectorAll<HTMLElement>('span');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(spans, {
            opacity:    [0, 1],
            filter:     ['blur(12px)', 'blur(0px)'],
            scale:      [0.88, 1],
            translateY: [10, 0],
            duration:   700,
            delay:      stagger(60, { start: delay }),
            easing:     'cubicBezier(0.16, 1, 0.3, 1)',
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, delay]);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   3. LETTER SPLIT REVEAL (headings only)
   Characters fly in with spring — staggered left to right.
   More dramatic than word-split, reserved for big section headings.
───────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────
   4. SPRING STAGGER GRID
   Cards spring in with scale+translateY stagger.
   Each card has slight rotation that springs to 0.
   Premium feel — used by Vercel, Resend, etc.
───────────────────────────────────────────────────────────── */
export function useSpringGrid() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = Array.from(el.children) as HTMLElement[];

    items.forEach((c, i) => {
      c.style.opacity   = '0';
      c.style.transform = `translateY(80px) scale(0.9) rotate(${i % 2 === 0 ? '2deg' : '-2deg'})`;
      c.style.willChange = 'transform, opacity';
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(items, {
            opacity:    [0, 1],
            translateY: [80, 0],
            scale:      [0.9, 1],
            rotate:     (el, i: number) => [`${i % 2 === 0 ? 2 : -2}deg`, '0deg'],
            duration:   900,
            delay:      stagger(90),
            easing:     'spring(1, 80, 14, 0)',
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   5. FADE-SLIDE UP (generic blocks)
   Simple, clean, fast. For supporting content.
───────────────────────────────────────────────────────────── */
export function useFadeSlide(delay = 0, direction: 'up' | 'left' | 'right' = 'up') {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromX = direction === 'left' ? -40 : direction === 'right' ? 40 : 0;
    const fromY = direction === 'up' ? 50 : 0;

    el.style.opacity   = '0';
    el.style.transform = `translateX(${fromX}px) translateY(${fromY}px)`;
    el.style.willChange = 'transform, opacity';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(el, {
            opacity:    [0, 1],
            translateX: [fromX, 0],
            translateY: [fromY, 0],
            duration:   750,
            delay,
            easing:     'cubicBezier(0.16, 1, 0.3, 1)',
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction]);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   6. COUNTER (resets when fully out of view, counts again)
───────────────────────────────────────────────────────────── */
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
        // Reset fully when completely off screen
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

/* ─────────────────────────────────────────────────────────────
   7. MAGNETIC BUTTON HOOK
   Button subtly follows cursor — premium micro-interaction.
   Usage: spread {...magneticProps} onto a button element.
───────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────
   8. DRAW LINE — scaleX 0→1 from center
───────────────────────────────────────────────────────────── */
export function useDrawLine() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transform       = 'scaleX(0)';
    el.style.transformOrigin = 'center';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(el, { scaleX: [0, 1], duration: 1100, easing: 'cubicBezier(0.16, 1, 0.3, 1)' });
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   9. PARALLAX (background elements move slower than scroll)
   Returns a ref and uses scroll event for smooth parallax.
───────────────────────────────────────────────────────────── */
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