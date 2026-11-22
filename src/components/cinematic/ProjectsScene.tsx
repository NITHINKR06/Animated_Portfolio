/**
 * @component ProjectsScene
 * @description Scene 05: THE PROJECT EXPRESS — Cinematic 3D Train Portfolio
 * Concept: A full-screen 3D dusk scene with Brunswick green-and-cream coaches on
 * a lit track. Each coach is a flagship project you board and explore.
 *
 * Easy-In / Easy-Out Architecture with Visibility Gating & Boundary Deliberation:
 * - Visibility Gate: Pointer/wheel interaction on the train only engages when the
 *   section is fully docked in the viewport. When scrolling through Experience above,
 *   hovering over the peeking section will NOT hijack scroll or prematurely advance the train.
 * - Deliberate Boundary Hold: Reaching the final coach or returning to Station enforces
 *   a 1.8-second viewing hold. Scrolling during this pause remains on the current stop.
 *   Only after this noticeable pause, and upon deliberate continued scroll, does the viewport
 *   slowly and gracefully glide to Contact (or back up to Experience).
 * - Inside a coach, wheel scrolls the aisle interior. Pressing ESC or clicking "Back to platform" returns to trackside.
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
  const [isDocked, setIsDocked] = useState<boolean>(false);

  // Slow, smooth cinematic scroll transitions (duration: 1.8s)
  const scrollToPreviousSection = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent('lenis-scroll-to', {
        detail: { target: '#experience', duration: 1.8 },
      })
    );
    const expEl = document.getElementById('experience');
    if (expEl) {
      expEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const scrollToNextSection = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent('lenis-scroll-to', {
        detail: { target: '#contact', duration: 1.8 },
      })
    );
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      },
      '*'
    );
  }, [allProjects]);

  // Listen for messages from the iframe (project clicks, etc.)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'project-click') {
        const idx = event.data.index;
        if (idx >= 0 && idx < allProjects.length) {
          onProjectClick(allProjects[idx]);
        }
      }
      if (event.data?.type === 'explore-archive') {
        setShowTerminalArchive(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [allProjects, onProjectClick]);

  // ── Visibility Gate: Monitor whether Projects is actively docked in viewport ──
  useEffect(() => {
    const checkDocked = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      // Docked when top is within header zone (<= 60px) and bottom covers viewport
      const docked = rect.top <= 60 && rect.bottom >= window.innerHeight - 60;
      setIsDocked(docked);
    };

    window.addEventListener('scroll', checkDocked, { passive: true });
    window.addEventListener('resize', checkDocked, { passive: true });
    checkDocked();

    return () => {
      window.removeEventListener('scroll', checkDocked);
      window.removeEventListener('resize', checkDocked);
    };
  }, []);

  // ── Setup the Easy-In / Easy-Out Scroll Bridge on the iframe ──
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

    // ── Boundary Deliberate Hold & Scroll Interceptor ───────────────
    const BOUNDARY_HOLD_MS = 1800; // 1.8 seconds noticeable hold at boundaries
    let accumulatedDeltaDown = 0;
    let accumulatedDeltaUp = 0;
    let lastCoachArrivedTime = 0;
    let stationArrivedTime = Date.now();
    let prevStop = 0;
    let isGliding = false;

    const handleWheel = (e: WheelEvent) => {
      if (isGliding) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }

      // ── Visibility Gate: If not docked, do not hijack or move train ──
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        // If projects top is below viewport (user is still looking at Experience):
        if (rect.top > 60) {
          e.stopImmediatePropagation();
          window.scrollBy({ top: e.deltaY, behavior: 'auto' });
          return;
        }
        // If projects bottom is above viewport bottom (user is looking at Contact):
        if (rect.bottom < window.innerHeight - 60) {
          e.stopImmediatePropagation();
          window.scrollBy({ top: e.deltaY, behavior: 'auto' });
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

      // Track when the active stop changes
      if (activeIdx !== prevStop) {
        prevStop = activeIdx;
        accumulatedDeltaDown = 0;
        accumulatedDeltaUp = 0;

        if (activeIdx >= totalStops - 1) {
          lastCoachArrivedTime = Date.now();
        } else if (activeIdx <= 0) {
          stationArrivedTime = Date.now();
        }
      }

      // If user is inside a coach exploring the interior, do not exit section
      const inside = iframeDoc?.getElementById('back')?.classList.contains('on') ?? false;
      if (inside) return;

      const isFirstStop = activeIdx <= 0;
      const isLastStop = activeIdx >= totalStops - 1;

      // ── BOUNDARY 1: Scrolling DOWN at the last coach → Deliberate 1.8s hold then Contact ──
      if (isLastStop && e.deltaY > 0) {
        // Enforce the 1.8-second hold on the last coach before allowing exit
        const timeAtLastCoach = Date.now() - lastCoachArrivedTime;
        if (timeAtLastCoach < BOUNDARY_HOLD_MS) {
          e.stopImmediatePropagation();
          e.preventDefault();
          return;
        }

        accumulatedDeltaDown += e.deltaY;
        e.stopImmediatePropagation();
        e.preventDefault();

        // Require deliberate continued scroll effort after the hold
        if (accumulatedDeltaDown >= 75) {
          accumulatedDeltaDown = 0;
          isGliding = true;
          scrollToNextSection();
          setTimeout(() => {
            isGliding = false;
          }, 2200);
        }
        return;
      } else {
        accumulatedDeltaDown = 0;
      }

      // ── BOUNDARY 2: Scrolling UP at the Station → Deliberate 1.8s hold then Experience ──
      if (isFirstStop && e.deltaY < 0) {
        // Enforce the 1.8-second hold at Station before allowing exit
        const timeAtStation = Date.now() - stationArrivedTime;
        if (timeAtStation < BOUNDARY_HOLD_MS) {
          e.stopImmediatePropagation();
          e.preventDefault();
          return;
        }

        accumulatedDeltaUp += Math.abs(e.deltaY);
        e.stopImmediatePropagation();
        e.preventDefault();

        // Require deliberate continued scroll effort after the hold
        if (accumulatedDeltaUp >= 75) {
          accumulatedDeltaUp = 0;
          isGliding = true;
          scrollToPreviousSection();
          setTimeout(() => {
            isGliding = false;
          }, 2200);
        }
        return;
      } else {
        accumulatedDeltaUp = 0;
      }

      // Between stops: let Portfolio Express move the train normally!
    };

    // ── Touch swipe support with boundary hold ──────────────────────
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isGliding) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY; // > 0: swipe up (scroll down)

      const buttons = iframeDoc?.querySelectorAll('#rail button') || [];
      const totalStops = buttons.length;
      if (totalStops === 0) return;

      let activeIdx = 0;
      buttons.forEach((btn, idx) => {
        if (btn.classList.contains('on')) activeIdx = idx;
      });

      const inside = iframeDoc?.getElementById('back')?.classList.contains('on') ?? false;
      if (inside) return;

      if (activeIdx >= totalStops - 1 && deltaY > 50) {
        if (Date.now() - lastCoachArrivedTime < BOUNDARY_HOLD_MS) return;
        isGliding = true;
        scrollToNextSection();
        setTimeout(() => {
          isGliding = false;
        }, 2200);
      } else if (activeIdx <= 0 && deltaY < -50) {
        if (Date.now() - stationArrivedTime < BOUNDARY_HOLD_MS) return;
        isGliding = true;
        scrollToPreviousSection();
        setTimeout(() => {
          isGliding = false;
        }, 2200);
      }
    };

    // ── Keyboard support (Arrow / Page keys at boundaries with hold) ──
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGliding) return;
      const buttons = iframeDoc?.querySelectorAll('#rail button') || [];
      const totalStops = buttons.length;
      if (totalStops === 0) return;

      let activeIdx = 0;
      buttons.forEach((btn, idx) => {
        if (btn.classList.contains('on')) activeIdx = idx;
      });

      const inside = iframeDoc?.getElementById('back')?.classList.contains('on') ?? false;
      if (inside) return;

      if (activeIdx >= totalStops - 1 && (e.key === 'ArrowDown' || e.key === 'PageDown')) {
        if (Date.now() - lastCoachArrivedTime < BOUNDARY_HOLD_MS) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        scrollToNextSection();
      } else if (activeIdx <= 0 && (e.key === 'ArrowUp' || e.key === 'PageUp')) {
        if (Date.now() - stationArrivedTime < BOUNDARY_HOLD_MS) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        scrollToPreviousSection();
      }
    };

    // Register in the capturing phase so our checks run before the iframe's internal wheel
    iframeWin.addEventListener('wheel', handleWheel, { capture: true, passive: false });
    iframeWin.addEventListener('touchstart', handleTouchStart, { capture: true, passive: true });
    iframeWin.addEventListener('touchend', handleTouchEnd, { capture: true, passive: true });
    iframeWin.addEventListener('keydown', handleKeyDown, { capture: true, passive: false });

    return () => {
      iframeWin?.removeEventListener('wheel', handleWheel, { capture: true } as EventListenerOptions);
      iframeWin?.removeEventListener('touchstart', handleTouchStart, { capture: true } as EventListenerOptions);
      iframeWin?.removeEventListener('touchend', handleTouchEnd, { capture: true } as EventListenerOptions);
      iframeWin?.removeEventListener('keydown', handleKeyDown, { capture: true } as EventListenerOptions);
    };
  }, [iframeLoaded, sendProjectData, scrollToNextSection, scrollToPreviousSection]);

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
            {/* Pointer events are only active when Projects is docked in view */}
            <iframe
              ref={iframeRef}
              src="/Portfolio Express.html"
              title="Portfolio Express – Project Showcase"
              onLoad={() => setIframeLoaded(true)}
              className="w-full h-full border-0 block"
              style={{
                height: '100vh',
                minHeight: '600px',
                background: '#0b1030',
                pointerEvents: isDocked ? 'auto' : 'none',
              }}
              allow="autoplay"
            />

            {/* ── Terminal Archive for 20+ repos (bottom right) ───── */}
            <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">
              <button
                type="button"
                onClick={() => setShowTerminalArchive(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(217,176,97,0.5)] bg-[rgba(12,18,16,0.75)] backdrop-blur-md text-[#f3e9d2] text-xs font-semibold tracking-wide hover:bg-[rgba(217,176,97,0.18)] hover:border-[#d9b061] transition-all duration-300 shadow-lg"
                style={{ fontFamily: '"Instrument Sans", system-ui, sans-serif' }}
              >
                <Layers size={14} className="text-[#d9b061]" />
                <span>All 20+ Repositories</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
