/**
 * @component ArrivalScene
 * @description Scene 01: ARRIVAL - Monumental opening sequence
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Terminal, Shield, Sparkles, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ArrivalSceneProps {
  onResumeClick?: () => void;
  onExploreClick?: () => void;
}

export function ArrivalScene({ onResumeClick, onExploreClick }: ArrivalSceneProps) {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Intro arrival reveal animation on mount
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(veilRef.current, {
        opacity: 0,
        duration: 1.4,
        pointerEvents: 'none',
      })
        .fromTo(
          '.arrival-meta-tag',
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.8 },
          '-=0.8',
        )
        .fromTo(
          '.arrival-char',
          { opacity: 0, y: 40, rotateX: 45, filter: 'blur(8px)' },
          { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', stagger: 0.06, duration: 1.1 },
          '-=0.6',
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5',
        )
        .fromTo(
          metadataRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4',
        );

      // Scroll-driven departure parallax: title splits and sinks into spatial depth
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -120,
        opacity: 0,
        scale: 0.92,
        filter: 'blur(10px)',
      });

      gsap.to(subtitleRef.current, {
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        y: -80,
        opacity: 0,
      });

      gsap.to(metadataRef.current, {
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'center top',
          scrub: 0.8,
        },
        opacity: 0,
        y: -40,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const handleScrollToIdentity = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const target = document.getElementById('about') || document.getElementById('identity');
    if (target) {
      window.dispatchEvent(
        new CustomEvent('lenis-scroll-to', {
          detail: { target: '#about' },
        }),
      );
    }
  };

  const nameChars = 'NITHIN'.split('');

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between px-6 md:px-16 pt-24 pb-12 overflow-hidden selection:bg-signal selection:text-obsidian"
    >
      {/* Starting Veil - Total Darkness to Cinematic Reveal */}
      <div
        ref={veilRef}
        className="fixed inset-0 z-50 bg-[#08090B] pointer-events-none transition-opacity"
      />

      {/* TOP HEADER // TECHNICAL MICRO-LABELS */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(214,185,154,0.12)] pb-4 font-mono text-[11px] uppercase tracking-wider text-[#969099]">
        <div className="flex items-center gap-3">
          <span className="arrival-meta-tag inline-flex items-center gap-2 text-[#F0EAE3]">
            <span className="w-2 h-2 rounded-full bg-[#873653] animate-pulse" />
            NODE // ACTIVE
          </span>
          <span className="arrival-meta-tag hidden sm:inline text-white/30">|</span>
          <span className="arrival-meta-tag hidden sm:inline">LOC: 13.2162° N, 74.9961° E</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="arrival-meta-tag hidden md:inline">
            CORE: FULL-STACK × CYBERSECURITY
          </span>
          <span className="arrival-meta-tag text-[#D6B99A] font-semibold">REV // 2026.4</span>
        </div>
      </div>

      {/* CENTERPIECE EDITORIAL MONOLITH */}
      <div className="relative z-10 my-auto py-12 max-w-6xl">
        {/* Monumental Name Display */}
        <h1
          ref={titleRef}
          className="font-heading font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tighter leading-[0.88] text-[#F0EAE3] uppercase select-none mb-4"
          aria-label="NITHIN"
        >
          {nameChars.map((char, index) => (
            <span
              key={index}
              className="arrival-char inline-block transition-transform duration-300 hover:text-[#D6B99A] hover:-translate-y-2"
            >
              {char}
            </span>
          ))}
          <span className="inline-block text-[#873653] text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] ml-1">
            .
          </span>
        </h1>

        {/* Subtitle & Concept Banner */}
        <div ref={subtitleRef} className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight text-[#F0EAE3]">
              DIGITAL <span className="text-[#873653] underline decoration-[#873653]/50 underline-offset-8">FRONTIER</span>
            </h2>
            <p className="mt-3 font-mono text-xs sm:text-sm text-[#969099] max-w-xl leading-relaxed">
              Full-Stack Developer & Cybersecurity Researcher engineering resilient architectures,
              machine learning intrusion systems, and experimental digital interfaces.
            </p>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleScrollToIdentity}
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#5A1832] border border-[#873653] text-[#F0EAE3] font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-[#873653] hover:shadow-[0_0_20px_rgba(135,54,83,0.35)]"
            >
              <span>EXPLORE WORLD</span>
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5 text-[#D6B99A]" />
            </button>

            {onResumeClick && (
              <button
                onClick={onResumeClick}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[rgba(214,185,154,0.18)] bg-[#151116] font-mono text-xs text-[#F0EAE3] hover:border-[#D6B99A] hover:text-[#D6B99A] transition-all duration-300"
              >
                <FileText size={14} className="text-[#D6B99A]" />
                <span>RESUME</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM TELEMETRY BAR & SCROLL CUE */}
      <div
        ref={metadataRef}
        className="relative z-10 w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-6 border-t border-[rgba(214,185,154,0.12)]"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-[11px] text-[#969099]">
          <div>
            <span className="block text-[#969099]/60 uppercase">DOMAIN</span>
            <span className="text-[#F0EAE3] font-medium">Offensive & Defensive</span>
          </div>
          <div>
            <span className="block text-[#969099]/60 uppercase">STACK</span>
            <span className="text-[#F0EAE3] font-medium">React · Python · Node · Go</span>
          </div>
          <div className="hidden sm:block">
            <span className="block text-[#969099]/60 uppercase">ENCRYPTION</span>
            <span className="text-[#873653] font-medium">SHA-256 Contextual</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={handleScrollToIdentity}
          className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#969099] hover:text-[#F0EAE3] transition-colors"
        >
          <span className="text-[10px] text-[#D6B99A] animate-pulse">[ SCROLL TO COMMENCE ]</span>
          <div className="w-8 h-8 rounded-full border border-[rgba(214,185,154,0.18)] flex items-center justify-center group-hover:border-[#873653] group-hover:bg-[#5A1832]/30 transition-colors">
            <ArrowDown size={12} className="text-[#D6B99A] group-hover:text-[#F0EAE3] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
