/**
 * @component CinematicNav
 * @description Architectural HUD Navigation Bar for Cinematic Digital Portfolio
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Sparkles, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

interface CinematicNavProps {
  onResumeClick?: () => void;
}

const navScenes = [
  { id: 'home', num: '01', label: 'ARRIVAL', href: '#home' },
  { id: 'about', num: '02', label: 'IDENTITY', href: '#about' },
  { id: 'skills', num: '03', label: 'SYSTEM', href: '#skills' },
  { id: 'experience', num: '04', label: 'JOURNEY', href: '#experience' },
  { id: 'projects', num: '05', label: 'PROJECTS', href: '#projects' },
  { id: 'contact', num: '06', label: 'CONTACT', href: '#contact' },
];

export function CinematicNav({ onResumeClick }: CinematicNavProps) {
  const [activeScene, setActiveScene] = useState<string>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isServicesPage = location.pathname === '/services';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Determine active scene
      const sceneElements = navScenes.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      for (let i = sceneElements.length - 1; i >= 0; i--) {
        const item = sceneElements[i];
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveScene(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (isServicesPage) {
      navigate('/');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('lenis-scroll-to', { detail: { target: href } }));
      }, 300);
      return;
    }

    window.dispatchEvent(
      new CustomEvent('lenis-scroll-to', {
        detail: { target: href },
      }),
    );
  };

  return (
    <>
      {/* Top Hairline Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/10 pointer-events-none">
        <div
          className="h-full bg-signal transition-all duration-75 shadow-[0_0_8px_#FF3434]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main HUD Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-4 flex items-center justify-between bg-obsidian/75 backdrop-blur-md border-b border-white/10">
        {/* Brand Callout */}
        <button
          onClick={() => handleNavClick('#home')}
          className="flex items-center gap-3 text-left group"
        >
          <span className="w-2.5 h-2.5 bg-signal group-hover:scale-125 transition-transform" />
          <div className="font-heading font-black text-sm tracking-tight text-cream uppercase flex items-center gap-1.5">
            <span>NITHIN</span>
            <span className="text-signal">/</span>
            <span className="text-muted font-normal text-xs hidden sm:inline">DIGITAL FRONTIER</span>
          </div>
        </button>

        {/* Center Desktop Scene Index */}
        {!isServicesPage && (
          <nav className="hidden lg:flex items-center gap-1 font-mono text-[11px] text-muted">
            {navScenes.map((scene) => {
              const isActive = activeScene === scene.id;
              return (
                <button
                  key={scene.id}
                  onClick={() => handleNavClick(scene.href)}
                  className={`px-3 py-1.5 transition-colors relative flex items-center gap-1.5 ${
                    isActive ? 'text-cream font-bold' : 'hover:text-cream'
                  }`}
                >
                  <span className={isActive ? 'text-signal' : 'text-white/30'}>{scene.num}</span>
                  <span>{scene.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navActiveGlow"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-signal"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Services Link */}
          <button
            onClick={() => navigate(isServicesPage ? '/' : '/services')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border font-mono text-xs transition-colors ${
              isServicesPage
                ? 'border-signal bg-signal text-obsidian font-bold'
                : 'border-white/20 text-cream hover:border-signal hover:text-signal'
            }`}
          >
            <Sparkles size={12} className={isServicesPage ? 'text-obsidian' : 'text-signal'} />
            <span>{isServicesPage ? 'PORTFOLIO' : 'SERVICES'}</span>
          </button>

          {/* Resume Trigger */}
          {onResumeClick && (
            <button
              onClick={onResumeClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/20 bg-surface/80 text-cream font-mono text-xs hover:border-signal hover:text-signal transition-colors"
            >
              <FileText size={12} />
              <span>RESUME</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-cream hover:text-signal transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-obsidian/95 backdrop-blur-xl pt-24 px-6 pb-12 flex flex-col justify-between lg:hidden"
          >
            <div className="space-y-4 font-heading">
              <span className="font-mono text-[10px] text-signal uppercase tracking-widest block mb-4">
                [ INDEX CHRONOLOGY ]
              </span>
              {navScenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => handleNavClick(scene.href)}
                  className="w-full text-left py-2 border-b border-white/10 flex items-center justify-between text-2xl font-black uppercase text-cream hover:text-signal transition-colors"
                >
                  <span>{scene.label}</span>
                  <span className="font-mono text-xs text-signal font-normal">{scene.num}</span>
                </button>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/services');
                }}
                className="w-full text-left py-2 border-b border-white/10 flex items-center justify-between text-2xl font-black uppercase text-cream hover:text-signal transition-colors"
              >
                <span>SERVICES</span>
                <Sparkles size={16} className="text-signal" />
              </button>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-muted">
              {onResumeClick && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onResumeClick();
                  }}
                  className="px-4 py-2 border border-signal bg-signal/10 text-signal font-bold uppercase"
                >
                  VIEW RESUME
                </button>
              )}
              <span>REV 2026.4</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
