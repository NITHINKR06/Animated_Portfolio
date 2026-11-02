/**
 * @component Hero
 * @description Master Pinned Cinematic Stage with Multi-Phase Scroll Storytelling & Sculpture Bridge
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 */
import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, FileText, Github, Linkedin, Mail, ChevronDown, FastForward } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';
import { MetallicSculpture } from './MetallicSculpture';
import type { Project } from '../data';

gsap.registerPlugin(ScrollTrigger);

const INTRO_KEY = 'portfolio_intro_seen';

interface HeroProps {
  onResumeClick?: () => void;
  onProjectClick?: (project: Project) => void;
}

export const Hero = ({ onResumeClick }: HeroProps) => {
  const { personal } = portfolioData;
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const entranceTlRef = useRef<gsap.core.Timeline | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Skip in jsdom/test environments
    if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)) {
      return;
    }

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let introAlreadySeen = false;
    try {
      introAlreadySeen = sessionStorage.getItem(INTRO_KEY) === 'true';
    } catch {
      introAlreadySeen = false;
    }

    const shouldPlayIntro = !introAlreadySeen && !prefersReducedMotion;
    setIsPlayingIntro(shouldPlayIntro);

    const ctx = gsap.context(() => {
      // ── 1. Opening Entrance Timeline (Plays once per session, ~2.8s) ──
      const entranceTl = gsap.timeline({
        paused: !shouldPlayIntro,
        onComplete: () => {
          setIsPlayingIntro(false);
          try {
            sessionStorage.setItem(INTRO_KEY, 'true');
          } catch {
            // ignore
          }
        },
      });
      entranceTlRef.current = entranceTl;

      if (shouldPlayIntro) {
        // Start from intentional pre-intro masked state
        entranceTl
          .fromTo(
            '.hero-metadata-bar',
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
          )
          .fromTo(
            '.hero-badge-wrap',
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
          )
          .fromTo(
            '.hero-name-line',
            { yPercent: 120 },
            { yPercent: 0, duration: 0.95, stagger: 0.12, ease: 'power3.out' },
            '-=0.4'
          )
          .fromTo(
            '.hero-bio',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
            '-=0.5'
          )
          .fromTo(
            '.hero-action-item',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo(
            '.hero-social-bar',
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: 'power1.out' },
            '-=0.3'
          )
          .fromTo(
            '.hero-sculpture-spatial-wrap',
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' },
            0.1
          )
          .fromTo(
            '.hero-orbital-ring',
            { opacity: 0, scale: 0.6 },
            { opacity: 1, scale: 1, duration: 1.2, stagger: 0.15, ease: 'power2.out' },
            0.2
          );

        entranceTl.play();
      } else {
        // Immediate static settling
        gsap.set(
          [
            '.hero-metadata-bar',
            '.hero-badge-wrap',
            '.hero-bio',
            '.hero-action-item',
            '.hero-social-bar',
            '.hero-sculpture-spatial-wrap',
            '.hero-orbital-ring',
          ],
          { opacity: 1, y: 0, x: 0, scale: 1 }
        );
        gsap.set('.hero-name-line', { yPercent: 0 });
      }

      // ── 2. Master Pinned Scroll-Scrubbed Choreography ──
      const isDesktop = window.innerWidth >= 1024;
      const pinTrigger = pinContainerRef.current;
      const heroStage = heroRef.current;

      if (pinTrigger && heroStage && !prefersReducedMotion) {
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinTrigger,
            start: 'top top',
            end: '+=200%',
            pin: heroStage,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
            },
          },
        });

        // ── Phase A (0.00 -> 0.25): Identity & Depth Initiation ──
        masterTl
          .to('.hero-badge-wrap, .hero-bio', {
            y: -35,
            opacity: 0.35,
            ease: 'power1.out',
            duration: 0.25,
          }, 0)
          .to('.hero-action-item, .hero-social-bar', {
            y: 30,
            opacity: 0.3,
            ease: 'power1.out',
            duration: 0.25,
          }, 0)
          .to('.hero-bg-atmosphere', {
            scale: 1.2,
            opacity: 0.08,
            ease: 'power1.out',
            duration: 0.25,
          }, 0);

        // ── Phase B (0.25 -> 0.75): Monumental Composition Transformation ──
        // 1. Name decomposition & watermark shift
        masterTl
          .to('.hero-name-primary', {
            x: isDesktop ? -110 : -40,
            scale: 1.2,
            opacity: 0.08,
            ease: 'power2.inOut',
            duration: 0.5,
          }, 0.25)
          .to('.hero-name-secondary', {
            x: isDesktop ? -60 : -20,
            y: 35,
            scale: 1.15,
            opacity: 0.12,
            ease: 'power2.inOut',
            duration: 0.5,
          }, 0.25)
          // 2. Supporting text completely peels away
          .to('.hero-badge-wrap, .hero-bio, .hero-action-item, .hero-social-bar', {
            opacity: 0,
            y: -50,
            ease: 'power2.in',
            duration: 0.3,
          }, 0.25)
          // 3. Center sculpture sweeps across into DEAD CENTER stage
          .to('.hero-sculpture-spatial-wrap', {
            x: isDesktop ? '-27vw' : '0vw',
            y: isDesktop ? '2vh' : '0vh',
            scale: isDesktop ? 1.32 : 1.15,
            ease: 'power2.inOut',
            duration: 0.5,
          }, 0.25)
          // 4. Orbital rings expand massively around center sculpture
          .to('.hero-orbital-ring-1', {
            scale: 1.7,
            opacity: 0.35,
            ease: 'power2.inOut',
            duration: 0.5,
          }, 0.25)
          .to('.hero-orbital-ring-2', {
            scale: 2.1,
            opacity: 0.25,
            ease: 'power2.inOut',
            duration: 0.5,
          }, 0.25)
          // 5. Center architectural label reveals flanking the sculpture
          .fromTo(
            '.hero-center-telemetry',
            { opacity: 0, scale: 0.9, y: 20 },
            { opacity: 1, scale: 1, y: 0, ease: 'power2.out', duration: 0.3 },
            0.38
          )
          .to(
            '.hero-center-telemetry',
            { opacity: 0, y: -20, ease: 'power2.in', duration: 0.2 },
            0.68
          );

        // ── Phase C (0.75 -> 1.00): Transition & Bridge into About ──
        // 1. Sculpture glides toward top-left / background anchor position
        masterTl
          .to('.hero-sculpture-spatial-wrap', {
            x: isDesktop ? '-50vw' : '-10vw',
            y: isDesktop ? '-14vh' : '-8vh',
            scale: isDesktop ? 0.95 : 0.85,
            ease: 'power2.inOut',
            duration: 0.25,
          }, 0.75)
          .to('.hero-orbital-ring', {
            opacity: 0.15,
            scale: 1.4,
            ease: 'power2.inOut',
            duration: 0.25,
          }, 0.75)
          // 2. Name completely dissolves
          .to('.hero-name-primary, .hero-name-secondary', {
            opacity: 0,
            y: -40,
            ease: 'power2.in',
            duration: 0.2,
          }, 0.75)
          // 3. Incoming Manifesto Chapter reveals from bottom to prime the About section
          .fromTo(
            '.hero-manifesto-bridge',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.25 },
            0.75
          );
      }
    }, pinContainerRef);

    return () => ctx.revert();
  }, []);

  const skipIntro = () => {
    if (entranceTlRef.current) {
      entranceTlRef.current.progress(1);
    }
    setIsPlayingIntro(false);
    try {
      sessionStorage.setItem(INTRO_KEY, 'true');
    } catch {
      // ignore
    }
  };

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero-pin-container" ref={pinContainerRef} className="relative w-full">
      <section
        ref={heroRef}
        id="hero"
        className="w-full h-screen relative overflow-hidden bg-[#0A0B0E] text-[#F5F4EE] flex flex-col justify-between pt-16 pb-10 px-6 sm:px-10 lg:px-16 select-none"
      >
        {/* Background Radial Atmosphere */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="hero-bg-atmosphere absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[#D4A373]/[0.045] blur-[160px] transition-transform duration-700" />
          <div className="absolute bottom-12 left-12 w-[500px] h-[500px] rounded-full bg-white/[0.015] blur-[150px]" />
          {/* Subtle architectural watermark grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:48px_48px] opacity-40 pointer-events-none" />
        </div>

        {/* ── Top Header Metadata Strip ── */}
        <div className="hero-metadata-bar w-full max-w-7xl mx-auto flex items-center justify-between border-b border-white/[0.08] pb-3.5 z-30">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/[0.18] bg-[#161722] shadow-sm">
              <img
                src="/NITHINKR06.webp"
                alt="Nithin K R"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#8E929D]">
                Portfolio &amp; Works / 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isPlayingIntro && (
              <button
                type="button"
                onClick={skipIntro}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D4A373]/30 bg-[#D4A373]/10 hover:bg-[#D4A373]/20 text-[#D4A373] text-[11px] font-mono tracking-wider uppercase transition-colors cursor-pointer"
              >
                <FastForward size={12} />
                <span>Skip Intro</span>
              </button>
            )}

            <div className="flex items-center gap-2.5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#DCD9CE]">
                Available for Engineering Roles
              </span>
            </div>
          </div>
        </div>

        {/* ── Middle Stage Layer: Spatial Sculpture Centerpiece ── */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-4 sm:pr-12 lg:pr-20 z-10 overflow-visible">
          <div className="hero-sculpture-spatial-wrap relative w-[420px] sm:w-[560px] lg:w-[720px] h-[420px] sm:h-[560px] lg:h-[720px] flex items-center justify-center">
            {/* Concentric Telemetry & Orbital Rings */}
            <div className="hero-orbital-ring hero-orbital-ring-1 absolute inset-0 m-auto w-[340px] sm:w-[460px] lg:w-[560px] h-[340px] sm:h-[460px] lg:h-[560px] rounded-full border border-white/[0.06] pointer-events-none select-none transition-transform duration-300" />
            <div className="hero-orbital-ring hero-orbital-ring-2 absolute inset-0 m-auto w-[260px] sm:w-[360px] lg:w-[440px] h-[260px] sm:h-[360px] lg:h-[440px] rounded-full border border-[#D4A373]/[0.15] border-dashed pointer-events-none select-none transition-transform duration-300 animate-[spin_60s_linear_infinite]" />

            {/* The Active Three.js / Canvas2D Generative Sculpture */}
            <MetallicSculpture scrollProgress={scrollProgress} />
          </div>
        </div>

        {/* ── Mid-Scrub Center Stage Telemetry Badge (Active during Phase B) ── */}
        <div className="hero-center-telemetry absolute inset-0 m-auto w-fit h-fit z-20 pointer-events-none flex flex-col items-center justify-center text-center px-4 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A373]/40 bg-black/60 backdrop-blur-md text-xs font-mono text-[#D4A373] tracking-[0.24em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-ping" />
            <span>Core Architecture // Disciplined Rigor</span>
          </div>
        </div>

        {/* ── Left Typographic Statements & Action Conduits ── */}
        <div className="w-full max-w-7xl mx-auto my-auto z-20 relative pointer-events-auto">
          <div className="max-w-2xl space-y-7 text-left">
            <div className="space-y-3">
              <div className="hero-badge-wrap overflow-hidden">
                <span className="inline-block text-xs font-mono uppercase tracking-[0.28em] text-[#D4A373] font-medium">
                  System Architect &amp; Security Researcher
                </span>
              </div>

              {/* Monumental Name with Masked Stagger */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-[#F5F4EE] leading-[0.94]">
                <div className="overflow-hidden py-1">
                  <span className="hero-name-line hero-name-primary block">NITHIN</span>
                </div>
                <div className="overflow-hidden py-1">
                  <span className="hero-name-line hero-name-secondary block font-serif italic font-light text-[#D4A373]">
                    K R
                  </span>
                </div>
                <span className="sr-only">{personal.name}</span>
              </h1>
            </div>

            <p className="hero-bio text-base sm:text-lg text-[#DCD9CE] font-body leading-relaxed max-w-xl font-light">
              {personal.bio}
            </p>

            {/* Action Conduits & CTAs */}
            <div className="hero-actions flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#projects"
                className="hero-action-item inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5F4EE] text-[#0A0B0E] font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#D4A373] hover:text-[#0A0B0E] transition-all duration-200 shadow-lg shadow-white/5 cursor-pointer"
              >
                <span>Explore Selected Works</span>
                <ArrowUpRight size={15} />
              </a>

              <button
                type="button"
                onClick={() => {
                  if (onResumeClick) onResumeClick();
                  else window.open('/NithinKR.pdf', '_blank', 'noopener,noreferrer');
                }}
                className="hero-action-item inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#D4A373]/50 text-[#F5F4EE] font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                <FileText size={14} className="text-[#D4A373]" />
                <span>View Resume</span>
              </button>

              <a
                href={`mailto:${personal.email}`}
                className="hero-action-item inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#D4A373]/50 text-[#F5F4EE] font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                <Mail size={14} className="text-[#D4A373]" />
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Metadata & Social Connectivity */}
            <div className="hero-social-bar flex items-center gap-6 pt-3 border-t border-white/[0.07] text-xs font-mono text-[#8E929D]">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Github size={15} />
                <span>GITHUB</span>
              </a>

              <span className="text-white/20">/</span>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Linkedin size={15} />
                <span>LINKEDIN</span>
              </a>

              <span className="text-white/20">/</span>

              <span className="text-[#8E929D]">{personal.location}</span>
            </div>
          </div>
        </div>

        {/* ── Phase C Transitional Manifesto Bridge (Reveals toward end of pinned scrub) ── */}
        <div className="hero-manifesto-bridge absolute left-6 sm:left-10 lg:left-16 bottom-20 sm:bottom-28 max-w-3xl z-20 pointer-events-none opacity-0">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4A373]">
              01 // Architectural Philosophy &amp; Manifesto
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-[#F5F4EE] tracking-tight leading-[1.06]">
            Engineering Resilient Systems <br />
            <span className="font-serif italic font-light text-[#D4A373]">
              with Computational Rigor.
            </span>
          </h2>
        </div>

        {/* ── Scroll Transition Anchor & Progress Bar ── */}
        <div className="hero-footer-bar w-full max-w-7xl mx-auto flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono text-[#8E929D] z-30">
          <div className="flex items-center gap-3">
            <span className="text-[#D4A373] font-bold">01</span>
            <span>//</span>
            <span>SCROLL TO TRANSFORM</span>
            <div className="hidden sm:block w-24 h-1 rounded-full bg-white/[0.1] overflow-hidden ml-2">
              <div
                className="h-full bg-[#D4A373] transition-all duration-75 ease-out"
                style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
              />
            </div>
          </div>

          <button
            onClick={scrollToNext}
            type="button"
            aria-label="Scroll to next section"
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
          >
            <span>ABOUT MANIFESTO</span>
            <ChevronDown size={14} className="animate-bounce text-[#D4A373]" />
          </button>
        </div>
      </section>
    </div>
  );
};
