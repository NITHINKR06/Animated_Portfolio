// src/hooks/useScrollAnimations.ts
// Drop this file in src/hooks/ and import from Services.tsx

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

/* ─────────────────────────────────────────────────────────────
   Core hook — fires animateIn when entering, animateOut when leaving
───────────────────────────────────────────────────────────── */
export function useReversibleScroll<T extends HTMLElement>(
  animateIn:  (el: T) => void,
  animateOut: (el: T) => void,
  options?: IntersectionObserverInit
) {
  const ref      = useRef<T>(null);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasBeenVisible.current = true;
          animateIn(el);
        } else if (hasBeenVisible.current) {
          animateOut(el);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   FadeUp — slides up on enter, slides down on exit
───────────────────────────────────────────────────────────── */
export function useFadeUp(delay = 0) {
  const ref = useRef<HTMLElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // set initial hidden state
    el.style.opacity   = '0';
    el.style.transform = 'translateY(50px)';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible.current) {
          visible.current = true;
          animate(el, {
            opacity:    [0, 1],
            translateY: [50, 0],
            duration:   700,
            delay,
            easing:     'easeOutExpo',
          });
        } else if (!entry.isIntersecting && visible.current) {
          visible.current = false;
          animate(el, {
            opacity:    [1, 0],
            translateY: [0, 50],
            duration:   400,
            easing:     'easeInCubic',
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   StaggerGrid — children stagger in on enter, stagger out on exit
───────────────────────────────────────────────────────────── */
export function useStaggerGrid() {
  const ref     = useRef<HTMLElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = Array.from(el.children) as HTMLElement[];

    // set initial state
    items.forEach(c => {
      c.style.opacity   = '0';
      c.style.transform = 'translateY(60px) scale(0.95)';
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible.current) {
          visible.current = true;
          animate(items, {
            opacity:    [0, 1],
            translateY: [60, 0],
            scale:      [0.95, 1],
            duration:   600,
            delay:      stagger(80),
            easing:     'easeOutExpo',
          });
        } else if (!entry.isIntersecting && visible.current) {
          visible.current = false;
          // reverse — stagger from last to first
          animate([...items].reverse(), {
            opacity:    [1, 0],
            translateY: [0, 60],
            scale:      [1, 0.95],
            duration:   350,
            delay:      stagger(50),
            easing:     'easeInCubic',
          });
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   AnimatedHeading — letters fly in on enter, fly out on exit
───────────────────────────────────────────────────────────── */
export function useAnimatedHeading(text: string) {
  const ref     = useRef<HTMLElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !text) return;

    el.innerHTML = text
      .split('')
      .map(c =>
        `<span class="inline-block" style="opacity:0;transform:translateY(40px)">${
          c === ' ' ? '&nbsp;' : c
        }</span>`
      )
      .join('');

    const spans = el.querySelectorAll<HTMLElement>('span');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible.current) {
          visible.current = true;
          animate(spans, {
            opacity:    [0, 1],
            translateY: [40, 0],
            duration:   600,
            delay:      stagger(28),
            easing:     'easeOutExpo',
          });
        } else if (!entry.isIntersecting && visible.current) {
          visible.current = false;
          animate([...spans].reverse(), {
            opacity:    [1, 0],
            translateY: [0, -30],
            duration:   300,
            delay:      stagger(15),
            easing:     'easeInCubic',
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   AnimatedPara — words fade in on enter, fade out on exit
───────────────────────────────────────────────────────────── */
export function useAnimatedPara(text: string, delay = 0) {
  const ref     = useRef<HTMLElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !text) return;

    el.innerHTML = text
      .split(' ')
      .map(w =>
        `<span class="inline-block mr-[0.25em]" style="opacity:0;transform:translateY(20px)">${w}</span>`
      )
      .join('');

    const spans = el.querySelectorAll<HTMLElement>('span');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible.current) {
          visible.current = true;
          animate(spans, {
            opacity:    [0, 1],
            translateY: [20, 0],
            duration:   500,
            delay:      stagger(20, { start: delay }),
            easing:     'easeOutCubic',
          });
        } else if (!entry.isIntersecting && visible.current) {
          visible.current = false;
          animate([...spans].reverse(), {
            opacity:    [1, 0],
            translateY: [0, 15],
            duration:   250,
            delay:      stagger(10),
            easing:     'easeInCubic',
          });
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
   DrawLine — scaleX 0→1 on enter, 1→0 on exit
───────────────────────────────────────────────────────────── */
export function useDrawLine() {
  const ref     = useRef<HTMLElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transform      = 'scaleX(0)';
    el.style.transformOrigin = 'center';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible.current) {
          visible.current = true;
          animate(el, { scaleX: [0, 1], duration: 900, easing: 'easeOutExpo' });
        } else if (!entry.isIntersecting && visible.current) {
          visible.current = false;
          animate(el, { scaleX: [1, 0], duration: 400, easing: 'easeInCubic' });
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
   CountUp — counts up on enter, resets on exit
───────────────────────────────────────────────────────────── */
export function useCountUp(value: string) {
  const ref     = useRef<HTMLSpanElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const numericMatch = value.match(/\d+/);
    if (!numericMatch) { el.textContent = value; return; }

    const end        = parseInt(numericMatch[0]);
    const nonNumeric = value.replace(/\d+/, '');
    el.textContent   = `0${nonNumeric}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible.current) {
          visible.current = true;
          const obj = { val: 0 };
          animate(obj, {
            val:      end,
            duration: 1800,
            easing:   'easeOutExpo',
            onUpdate: () => { el.textContent = `${Math.round(obj.val)}${nonNumeric}`; },
          });
        } else if (!entry.isIntersecting && visible.current) {
          visible.current     = false;
          el.textContent      = `0${nonNumeric}`;
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return ref;
}
