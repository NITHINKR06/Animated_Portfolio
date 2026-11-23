/**
 * @component ProjectsScene
 * @description Scene 05: THE PROJECT EXPRESS — Cinematic 3D Train Portfolio
 * Concept: A full-screen 3D dusk scene with Brunswick green-and-cream coaches on
 * a lit track. Each coach is a flagship project you board and explore.
 *
 * Automatic Viewport Docking & Friction-Based Smooth Transitions:
 * - Automatic Viewport Dock: As you scroll into the Projects section, it automatically
 *   maps and smoothly docks to 100% fill the viewport without swinging or requiring manual clicks.
 * - Always-Interactive: The 3D scene responds immediately to scroll and clicks without delay.
 * - Friction-Based Exit: At the end of the train, scrolling down encounters smooth, tactile friction.
 *   Deliberate continued scrolling smoothly and slowly glides the viewport into Contact (not sudden speed).
 * - Symmetrical Return: Scrolling back up to Station similarly holds with smooth friction before
 *   slowly and gracefully gliding up to Experience.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';

import { portfolioData } from '../../data';
import type { Project } from '../../data';
import { TerminalArchivePanel } from './train/TerminalArchivePanel';

interface ProjectsSceneProps {
  onProjectClick: (project: Project) => void;
}

export function ProjectsScene({ onProjectClick }: ProjectsSceneProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const allProjects = portfolioData.projects;

  const [showTerminalArchive, setShowTerminalArchive] = useState<boolean>(false);
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);

  // Animation and boundary flags
  const isGlidingRef = useRef<boolean>(false);
  const isDockingRef = useRef<boolean>(false);
  const lastDockTimeRef = useRef<number>(0);
  const stopArrivedTimeRef = useRef<number>(0);
  const prevStopRef = useRef<number>(0);
  const frictionDownRef = useRef<number>(0);
  const frictionUpRef = useRef<number>(0);
  const frictionDecayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Slow, smooth cinematic scroll transitions (duration: 2.2s for luxurious friction glide)
  const scrollToPreviousSection = useCallback(() => {
    isGlidingRef.current = true;
    window.dispatchEvent(
      new CustomEvent('lenis-scroll-to', {
        detail: { target: '#education', duration: 2.2 },
      })
    );
    const prevEl = document.getElementById('education');
    if (prevEl) {
      prevEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      isGlidingRef.current = false;
    }, 2500);
  }, []);

  const scrollToNextSection = useCallback(() => {
    isGlidingRef.current = true;
    window.dispatchEvent(
      new CustomEvent('lenis-scroll-to', {
        detail: { target: '#certification', duration: 2.2 },
      })
    );
    const nextEl = document.getElementById('certification');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      isGlidingRef.current = false;
    }, 2500);
  }, []);

  // Automatic Viewport Docking: Automatically map & dock #projects to 100% of viewport
  const dockToProjects = useCallback((duration = 0.9) => {
    if (isGlidingRef.current || isDockingRef.current) return;
    const now = Date.now();
    if (now - lastDockTimeRef.current < 1200) return;

    isDockingRef.current = true;
    lastDockTimeRef.current = now;

    window.dispatchEvent(
      new CustomEvent('lenis-scroll-to', {
        detail: { target: '#projects', duration },
      })
    );

    const container = containerRef.current;
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setTimeout(() => {
      isDockingRef.current = false;
    }, duration * 1000 + 200);
  }, []);

  // Send project data to the iframe once it loads
  const sendProjectData = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;

    const expressProjects = allProjects.slice(0, 6).map((p) => ({
      title: p.title.replace(/^.*? - /, '').trim() || p.title,
      subtitle: p.description.split('.')[0].slice(0, 60),
      year: '2025',
      accent: '#4fa3c7',
      description: p.description,
      data: [
        ['Status', p.status === 'completed' ? 'Production' : 'Active Build'],
        ['Priority', (p.priority ?? 'high').toUpperCase()],
        ['Stack', (p.technologies?.length ?? 0).toString() + ' technologies'],
        ['Core', p.technologies?.[0] ?? 'Full Stack'],
      ],
      skills: p.technologies?.slice(0, 5) ?? [],
      tools: p.technologies?.slice(0, 4) ?? [],
      images: [],
      link: p.githubUrl || p.liveUrl || 'https://github.com/NITHINKR06',
    }));

    iframe.contentWindow.postMessage(
      {
        type: 'portfolio-data',
        profile: {
          name: portfolioData.personal.name,
          role: portfolioData.personal.title,
        },
        projects: expressProjects,
        allProjects: allProjects,
      },
      '*'
    );
  }, [allProjects]);

  // Listen for messages from the iframe (project clicks, etc.)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'project-click') {
        if (event.data.project) {
          const p = event.data.project;
          const matched = allProjects.find((item) => item.id === p.id || item.title === p.title) || p;
          onProjectClick(matched);
        } else if (typeof event.data.index === 'number') {
          const idx = event.data.index;
          if (idx >= 0 && idx < allProjects.length) {
            onProjectClick(allProjects[idx]);
          }
        }
      }
      if (event.data?.type === 'explore-archive') {
        setShowTerminalArchive(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [allProjects, onProjectClick]);

  // ── Automatic Viewport Docking Monitor ────────────────────────────
  // When scrolling into Projects from above or below, automatically snap/dock it into full viewport
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleWindowScroll = () => {
      if (isGlidingRef.current || isDockingRef.current) return;
      const container = containerRef.current;
      if (!container) return;

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;

      // When scrolling down from Experience: as soon as ~30% enters, dock automatically to full viewport
      if (scrollingDown && rect.top > 30 && rect.top < vh * 0.7) {
        dockToProjects(0.9);
      }
      // When scrolling up from Contact: as soon as ~30% enters, dock automatically to full viewport
      else if (!scrollingDown && rect.bottom < vh - 30 && rect.bottom > vh * 0.3) {
        dockToProjects(0.9);
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [dockToProjects]);

  // ── Setup the Scroll & Friction Bridge on the iframe ───────────────
  useEffect(() => {
    if (!iframeLoaded) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    let iframeWin: Window | null = null;
    let iframeDoc: Document | null = null;

    try {
      iframeWin = iframe.contentWindow;
      iframeDoc = iframe.contentDocument;
    } catch {
      return;
    }

    if (!iframeWin || !iframeDoc) return;

    sendProjectData();

    // ── Friction accumulator & boundary resistance ─────────────────
    const FRICTION_THRESHOLD = 160; // Deliberate smooth resistance to overcome

    const handleWheel = (e: WheelEvent) => {
      if (isGlidingRef.current) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }

      // ── Modal Protection: If project details ticket modal is open ─
      // The user is reading project details! NEVER exit section or scroll train!
      const isTicketOpen = iframeDoc?.getElementById('ticket')?.classList.contains('on') ?? false;
      if (isTicketOpen) return;

      // ── Interior Protection: If user is inside a coach exploring aisle ─
      const inside = iframeDoc?.getElementById('back')?.classList.contains('on') ?? false;
      if (inside) return;

      // ── In-Flight Protection: Only if screen is genuinely outside viewport ─
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        // If still entering from Experience above (>80px down): keep page moving to dock
        if (rect.top > 80) {
          e.stopImmediatePropagation();
          dockToProjects(0.8);
          return;
        }
        // If still entering from Contact below: keep page moving to dock
        if (rect.bottom < 80) {
          e.stopImmediatePropagation();
          dockToProjects(0.8);
          return;
        }
      }

      const buttons = iframeDoc?.querySelectorAll('#rail button') || [];
      const totalStops = buttons.length;
      if (totalStops === 0) return;

      let activeIdx = 0;
      buttons.forEach((btn, idx) => {
        if (btn.classList.contains('on')) activeIdx = idx;
      });

      if (activeIdx !== prevStopRef.current) {
        prevStopRef.current = activeIdx;
        frictionDownRef.current = 0;
        frictionUpRef.current = 0;
        stopArrivedTimeRef.current = Date.now();
      }

      const isFirstStop = activeIdx <= 0;
      const isLastStop = activeIdx >= totalStops - 1;

      // ── BOUNDARY 1: Scrolling DOWN at final Coach 05 → Hold & Smooth Friction into Contact ──
      if (isLastStop && e.deltaY > 0) {
        e.stopImmediatePropagation();
        e.preventDefault();

        // Deliberate pause hold on Coach 05: let user inspect the coach, passengers, and sign
        const timeOnCoach05 = Date.now() - stopArrivedTimeRef.current;
        if (timeOnCoach05 < 2500) {
          frictionDownRef.current = 0;
          return;
        }

        // After the 2.5s hold, deliberate scrolling accumulates smooth exit friction
        frictionDownRef.current += Math.min(e.deltaY, 25);

        if (frictionDecayTimerRef.current) clearTimeout(frictionDecayTimerRef.current);
        frictionDecayTimerRef.current = setTimeout(() => {
          frictionDownRef.current = 0;
        }, 500);

        // Once deliberate scrolling overcomes the friction barrier, glide smoothly to Contact
        if (frictionDownRef.current >= FRICTION_THRESHOLD) {
          frictionDownRef.current = 0;
          scrollToNextSection();
        }
        return;
      } else {
        frictionDownRef.current = 0;
      }

      // ── BOUNDARY 2: Scrolling UP at Station → Hold & Smooth Friction into Experience ────
      if (isFirstStop && e.deltaY < 0) {
        e.stopImmediatePropagation();
        e.preventDefault();

        const timeOnStation = Date.now() - stopArrivedTimeRef.current;
        if (timeOnStation < 2500) {
          frictionUpRef.current = 0;
          return;
        }

        frictionUpRef.current += Math.min(Math.abs(e.deltaY), 25);

        if (frictionDecayTimerRef.current) clearTimeout(frictionDecayTimerRef.current);
        frictionDecayTimerRef.current = setTimeout(() => {
          frictionUpRef.current = 0;
        }, 500);

        // Once deliberate scrolling overcomes the friction barrier, glide smoothly to Experience
        if (frictionUpRef.current >= FRICTION_THRESHOLD) {
          frictionUpRef.current = 0;
          scrollToPreviousSection();
        }
        return;
      } else {
        frictionUpRef.current = 0;
      }

      // Between stops: train scrolls normally!
    };

    // ── Touch swipe support with smooth friction ────────────────────
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isGlidingRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY; // > 0: swipe up (scroll down)

      const isTicketOpen = iframeDoc?.getElementById('ticket')?.classList.contains('on') ?? false;
      if (isTicketOpen) return;

      const inside = iframeDoc?.getElementById('back')?.classList.contains('on') ?? false;
      if (inside) return;

      const buttons = iframeDoc?.querySelectorAll('#rail button') || [];
      const totalStops = buttons.length;
      if (totalStops === 0) return;

      let activeIdx = 0;
      buttons.forEach((btn, idx) => {
        if (btn.classList.contains('on')) activeIdx = idx;
      });

      if (activeIdx >= totalStops - 1 && deltaY > 70) {
        const timeOnCoach05 = Date.now() - stopArrivedTimeRef.current;
        if (timeOnCoach05 < 2500) return;
        scrollToNextSection();
      } else if (activeIdx <= 0 && deltaY < -70) {
        const timeOnStation = Date.now() - stopArrivedTimeRef.current;
        if (timeOnStation < 2500) return;
        scrollToPreviousSection();
      }
    };

    // ── Keyboard support (Arrow / Page keys at boundaries) ───────────
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGlidingRef.current) return;

      const isTicketOpen = iframeDoc?.getElementById('ticket')?.classList.contains('on') ?? false;
      if (isTicketOpen) return;

      const inside = iframeDoc?.getElementById('back')?.classList.contains('on') ?? false;
      if (inside) return;

      const buttons = iframeDoc?.querySelectorAll('#rail button') || [];
      const totalStops = buttons.length;
      if (totalStops === 0) return;

      let activeIdx = 0;
      buttons.forEach((btn, idx) => {
        if (btn.classList.contains('on')) activeIdx = idx;
      });

      if (activeIdx >= totalStops - 1 && (e.key === 'ArrowDown' || e.key === 'PageDown')) {
        const timeOnCoach05 = Date.now() - stopArrivedTimeRef.current;
        if (timeOnCoach05 < 2500) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        scrollToNextSection();
      } else if (activeIdx <= 0 && (e.key === 'ArrowUp' || e.key === 'PageUp')) {
        const timeOnStation = Date.now() - stopArrivedTimeRef.current;
        if (timeOnStation < 2500) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        scrollToPreviousSection();
      }
    };

    // Register capturing phase to handle boundaries cleanly
    iframeWin.addEventListener('wheel', handleWheel, { capture: true, passive: false });
    iframeWin.addEventListener('touchstart', handleTouchStart, { capture: true, passive: true });
    iframeWin.addEventListener('touchend', handleTouchEnd, { capture: true, passive: true });
    iframeWin.addEventListener('keydown', handleKeyDown, { capture: true, passive: false });

    return () => {
      if (frictionDecayTimerRef.current) clearTimeout(frictionDecayTimerRef.current);
      iframeWin?.removeEventListener('wheel', handleWheel, { capture: true } as EventListenerOptions);
      iframeWin?.removeEventListener('touchstart', handleTouchStart, { capture: true } as EventListenerOptions);
      iframeWin?.removeEventListener('touchend', handleTouchEnd, { capture: true } as EventListenerOptions);
      iframeWin?.removeEventListener('keydown', handleKeyDown, { capture: true } as EventListenerOptions);
    };
  }, [iframeLoaded, sendProjectData, scrollToNextSection, scrollToPreviousSection, dockToProjects]);

  const handleReturnToTrain = () => {
    setShowTerminalArchive(false);
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-[#0b1030] text-[#f3e9d2] overflow-hidden"
    >
      <h2 className="sr-only">The Project Express — Cinematic 3D Train Portfolio</h2>

      <AnimatePresence mode="wait">
        {showTerminalArchive ? (
          <motion.div
            key="terminal-archive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen w-full flex flex-col justify-center py-6 px-4 sm:px-8 lg:px-12 bg-[#08090B]"
          >
            <TerminalArchivePanel
              projects={allProjects}
              onProjectClick={onProjectClick}
              onReturnToTrain={handleReturnToTrain}
            />
          </motion.div>
        ) : (
          <motion.div
            key="express-iframe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-screen min-h-[600px]"
          >
            {/* Loading overlay — fades out when iframe loads */}
            <AnimatePresence>
              {!iframeLoaded && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 z-30 flex items-center justify-center bg-[#0b1030]"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  <span className="text-lg text-[#c9bda3] font-semibold animate-pulse">
                    The train is on its way…
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── The Express Scene iframe (100vh, full display) ───── */}
            {/* Pointer events are always active so clicks & scrolls work immediately without needing to click the page first */}
            <iframe
              ref={iframeRef}
              src="/Portfolio Express.html"
              title="Portfolio Express – Project Showcase"
              onLoad={() => setIframeLoaded(true)}
              className="w-full h-full border-0 block pointer-events-auto"
              style={{
                height: '100vh',
                minHeight: '600px',
                background: '#0b1030',
              }}
              allow="autoplay"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
