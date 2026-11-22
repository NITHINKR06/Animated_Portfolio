/**
 * @component ProjectsScene
 * @description Scene 05: THE PROJECT EXPRESS — Cinematic 3D Train Portfolio
 * Concept: A full-screen 3D dusk scene with Brunswick green-and-cream coaches on
 * a lit track. Each coach is a flagship project you board and explore.
 *
 * Easy-In / Easy-Out Architecture:
 * - When entering from above (Experience), the train begins at Station ready for departure.
 * - Scrolling down steps through: Station → Locomotive → Coach 01 → Coach 02 → Coach 03 → Coach 04.
 * - Scrolling down past the final coach smoothly glides the viewport out to Scene 06 (Contact).
 * - Scrolling up past Station smoothly glides the viewport out to Scene 04 (Experience).
 * - Inside a coach, wheel scrolls the aisle interior. Pressing ESC or clicking "Back to platform" returns to trackside.
 * - Dedicated "↑ Back to Experience" and "↓ Continue to Contact" floating controls provide 1-click easy exit.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Layers } from 'lucide-react';

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
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const [totalStopsCount, setTotalStopsCount] = useState<number>(6);
  const [isInsideCabin, setIsInsideCabin] = useState<boolean>(false);

  // Smooth scroll transitions
  const scrollToPreviousSection = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent('lenis-scroll-to', {
        detail: { target: '#experience' },
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
        detail: { target: '#contact' },
      })
    );
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Jump to specific stop inside the train scene
  const jumpToTrainStop = useCallback((index: number) => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument) return;
    const buttons = iframe.contentDocument.querySelectorAll<HTMLButtonElement>('#rail button');
    if (buttons[index]) {
      buttons[index].click();
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

  // Setup the Easy-In / Easy-Out Scroll Bridge on the iframe
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

    // ── Track stop changes & cabin state via DOM mutation observer ──
    const railNav = iframeDoc.getElementById('rail');
    const backBtn = iframeDoc.getElementById('back');

    const updateCurrentState = () => {
      if (!iframeDoc) return;
      const buttons = iframeDoc.querySelectorAll('#rail button');
      setTotalStopsCount(buttons.length || 6);

      let current = 0;
      buttons.forEach((btn, idx) => {
        if (btn.classList.contains('on')) current = idx;
      });
      setActiveStopIndex(current);

      const inside = backBtn ? backBtn.classList.contains('on') : false;
      setIsInsideCabin(inside);
    };

    updateCurrentState();

    let observer: MutationObserver | null = null;
    if (railNav) {
      observer = new MutationObserver(updateCurrentState);
      observer.observe(railNav, { attributes: true, subtree: true, attributeFilter: ['class'] });
      if (backBtn) {
        observer.observe(backBtn, { attributes: true, attributeFilter: ['class'] });
      }
    }

    // ── Easy-In / Easy-Out Wheel Boundary Interceptor ───────────────
    let accumulatedDeltaDown = 0;
    let accumulatedDeltaUp = 0;
    let lastStopChangeTime = Date.now();
    let prevStop = 0;
    let isGliding = false;

    const handleWheel = (e: WheelEvent) => {
      if (isGliding) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }

      const buttons = iframeDoc?.querySelectorAll('#rail button') || [];
      const totalStops = buttons.length;
      if (totalStops === 0) return;

      let activeIdx = 0;
      buttons.forEach((btn, idx) => {
        if (btn.classList.contains('on')) activeIdx = idx;
      });

      // Track when the active stop changes so we don't accidentally skip coaches
      if (activeIdx !== prevStop) {
        prevStop = activeIdx;
        lastStopChangeTime = Date.now();
        accumulatedDeltaDown = 0;
        accumulatedDeltaUp = 0;
      }

      // If user is inside a coach exploring the interior, do not exit section
      const inside = iframeDoc?.getElementById('back')?.classList.contains('on') ?? false;
      if (inside) return;

      const isFirstStop = activeIdx <= 0;
      const isLastStop = activeIdx >= totalStops - 1;

      // ── BOUNDARY 1: Scrolling DOWN at the last coach → Smooth exit to Contact ──
      if (isLastStop && e.deltaY > 0) {
        // Enforce a deliberate 500ms viewing pause on the last coach before exit
        if (Date.now() - lastStopChangeTime < 500) {
          e.stopImmediatePropagation();
          e.preventDefault();
          return;
        }

        accumulatedDeltaDown += e.deltaY;
        e.stopImmediatePropagation();
        e.preventDefault();

        if (accumulatedDeltaDown > 40) {
          accumulatedDeltaDown = 0;
          isGliding = true;
          scrollToNextSection();
          setTimeout(() => {
            isGliding = false;
          }, 1200);
        }
        return;
      } else {
        accumulatedDeltaDown = 0;
      }

      // ── BOUNDARY 2: Scrolling UP at the Station → Smooth exit to Experience ────
      if (isFirstStop && e.deltaY < 0) {
        if (Date.now() - lastStopChangeTime < 500) {
          e.stopImmediatePropagation();
          e.preventDefault();
          return;
        }

        accumulatedDeltaUp += Math.abs(e.deltaY);
        e.stopImmediatePropagation();
        e.preventDefault();

        if (accumulatedDeltaUp > 40) {
          accumulatedDeltaUp = 0;
          isGliding = true;
          scrollToPreviousSection();
          setTimeout(() => {
            isGliding = false;
          }, 1200);
        }
        return;
      } else {
        accumulatedDeltaUp = 0;
      }

      // Between stops: let Portfolio Express move the train normally!
    };

    // ── Touch swipe support ──────────────────────────────────────────
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

      if (activeIdx >= totalStops - 1 && deltaY > 45) {
        isGliding = true;
        scrollToNextSection();
        setTimeout(() => {
          isGliding = false;
        }, 1200);
      } else if (activeIdx <= 0 && deltaY < -45) {
        isGliding = true;
        scrollToPreviousSection();
        setTimeout(() => {
          isGliding = false;
        }, 1200);
      }
    };

    // ── Keyboard support (Arrow keys / Page keys at boundaries) ─────
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
        e.preventDefault();
        e.stopImmediatePropagation();
        scrollToNextSection();
      } else if (activeIdx <= 0 && (e.key === 'ArrowUp' || e.key === 'PageUp')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        scrollToPreviousSection();
      }
    };

    // Register in the capturing phase so our boundary check runs first
    iframeWin.addEventListener('wheel', handleWheel, { capture: true, passive: false });
    iframeWin.addEventListener('touchstart', handleTouchStart, { capture: true, passive: true });
    iframeWin.addEventListener('touchend', handleTouchEnd, { capture: true, passive: true });
    iframeWin.addEventListener('keydown', handleKeyDown, { capture: true, passive: false });

    return () => {
      observer?.disconnect();
      iframeWin?.removeEventListener('wheel', handleWheel, { capture: true } as EventListenerOptions);
      iframeWin?.removeEventListener('touchstart', handleTouchStart, { capture: true } as EventListenerOptions);
      iframeWin?.removeEventListener('touchend', handleTouchEnd, { capture: true } as EventListenerOptions);
      iframeWin?.removeEventListener('keydown', handleKeyDown, { capture: true } as EventListenerOptions);
    };
  }, [iframeLoaded, sendProjectData, scrollToNextSection, scrollToPreviousSection]);

  // Detect scroll direction when entering the projects section
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let lastScrollY = window.scrollY;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const currentY = window.scrollY;
          const scrollingDown = currentY > lastScrollY;
          lastScrollY = currentY;

          // If scrolling down from Experience, ensure train is at Station
          if (scrollingDown && activeStopIndex > 1) {
            // keep current or reset to station
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [activeStopIndex]);

  const handleReturnToTrain = () => {
    setShowTerminalArchive(false);
  };

  const isAtFirstStop = activeStopIndex <= 0;
  const isAtLastStop = activeStopIndex >= totalStopsCount - 1;

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

            {/* ── TOP BAR: Easy-Out Up to Experience ────────────────── */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex items-center gap-3">
              <button
                type="button"
                onClick={scrollToPreviousSection}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(217,176,97,0.45)] bg-[rgba(12,18,16,0.7)] backdrop-blur-md text-[#f3e9d2] text-xs font-semibold tracking-wider hover:bg-[rgba(217,176,97,0.18)] hover:border-[#d9b061] transition-all duration-300 shadow-md ${
                  isAtFirstStop ? 'ring-1 ring-[rgba(217,176,97,0.6)] animate-pulse' : 'opacity-75 hover:opacity-100'
                }`}
                style={{ fontFamily: '"Instrument Sans", system-ui, sans-serif' }}
                title="Scroll or click to return to Experience"
              >
                <ChevronUp size={14} className="text-[#d9b061]" />
                <span>{isAtFirstStop ? '↑ Scroll Up for Experience' : '↑ Back to Experience'}</span>
              </button>
            </div>

            {/* ── The Express Scene iframe (100vh, full display) ───── */}
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
              }}
              allow="autoplay"
            />

            {/* ── BOTTOM BAR: Easy-Out Down to Contact + Archive Button ─ */}
            <div className="absolute bottom-5 left-0 right-0 z-20 pointer-events-none px-6 flex items-center justify-between">
              {/* Bottom Left: Easy-Out Down to Contact */}
              <div className="pointer-events-auto">
                <button
                  type="button"
                  onClick={scrollToNextSection}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(217,176,97,0.45)] bg-[rgba(12,18,16,0.75)] backdrop-blur-md text-[#f3e9d2] text-xs font-semibold tracking-wider hover:bg-[rgba(217,176,97,0.18)] hover:border-[#d9b061] transition-all duration-300 shadow-md ${
                    isAtLastStop ? 'ring-2 ring-[#d9b061] bg-[rgba(217,176,97,0.15)] animate-pulse' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ fontFamily: '"Instrument Sans", system-ui, sans-serif' }}
                  title="Scroll or click to continue to Contact"
                >
                  <ChevronDown size={14} className="text-[#d9b061]" />
                  <span>{isAtLastStop ? '↓ Scroll Down for Contact' : '↓ Next: Contact'}</span>
                </button>
              </div>

              {/* Bottom Center: Quick Coach Jump Buttons (desktop) */}
              <div className="hidden md:flex pointer-events-auto items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(217,176,97,0.25)] bg-[rgba(12,18,16,0.6)] backdrop-blur-md text-[11px] font-mono">
                {Array.from({ length: totalStopsCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => jumpToTrainStop(i)}
                    className={`px-2 py-0.5 rounded-full transition-all duration-200 ${
                      activeStopIndex === i
                        ? 'bg-[#d9b061] text-[#0b1030] font-bold shadow-sm'
                        : 'text-[#c9bda3] hover:text-[#f3e9d2] hover:bg-white/10'
                    }`}
                    title={i === 0 ? 'Station' : i === 1 ? 'Locomotive' : `Coach 0${i - 1}`}
                  >
                    {i === 0 ? 'Station' : i === 1 ? 'Loco' : `0${i - 1}`}
                  </button>
                ))}
              </div>

              {/* Bottom Right: Terminal Archive for 20+ repos */}
              <div className="pointer-events-auto">
                <button
                  type="button"
                  onClick={() => setShowTerminalArchive(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(217,176,97,0.5)] bg-[rgba(12,18,16,0.75)] backdrop-blur-md text-[#f3e9d2] text-xs font-semibold tracking-wide hover:bg-[rgba(217,176,97,0.18)] hover:border-[#d9b061] transition-all duration-300 shadow-lg"
                  style={{ fontFamily: '"Instrument Sans", system-ui, sans-serif' }}
                >
                  <Layers size={13} className="text-[#d9b061]" />
                  <span>All 20+ Repositories</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
