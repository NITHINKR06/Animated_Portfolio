import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  FolderGit2,
  Mail,
  Menu,
  X,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileNavProps {
  onResumeClick?: () => void;
}

const navItems = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Skills', href: '#skills', icon: Cpu },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Projects', href: '#projects', icon: FolderGit2 },
  { label: 'Certs', href: '#certification', icon: Award },
  { label: 'Contact', href: '#contact', icon: Mail },
];

export function MobileNav({ onResumeClick }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  const isOnServicesPage = location.pathname === '/services';

  // Smart show/hide on scroll & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only hide/show when menu is closed
      if (!isOpen) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 140) {
          // Scrolling down -> hide pill to maximize reading space
          setIsVisible(false);
        } else {
          // Scrolling up or paused -> reveal pill
          setIsVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;

      // Active section calculation
      const sectionIds = [
        'home',
        'about',
        'skills',
        'experience',
        'education',
        'projects',
        'certification',
        'contact',
      ];
      const scrollPos = currentScrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const scrollToTarget = (href: string) => {
    // 1. Dispatch custom event for Lenis
    window.dispatchEvent(
      new CustomEvent('lenis-scroll-to', {
        detail: { target: href, duration: 0.9 },
      }),
    );

    // 2. Direct DOM lookup and fallback scroll
    const targetId = href.startsWith('#') ? href.slice(1) : href;
    const el = document.getElementById(targetId) || document.querySelector(href);

    if (el) {
      try {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (err) {
        // Fallback
      }

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const targetY = el.getBoundingClientRect().top + scrollTop;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth',
      });
    } else if (href === '#home' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();

    if (isOnServicesPage) {
      // Cross-page navigation: Save pending target and navigate to /
      sessionStorage.setItem('pendingScrollTarget', href);
      navigate('/');
      setIsOpen(false);
      setIsVisible(true);
      return;
    }

    scrollToTarget(href);

    // Close menu with a brief delay so tap animation finishes smoothly
    setTimeout(() => {
      setIsOpen(false);
      setIsVisible(true);
    }, 80);
  };

  return (
    <>
      {/* Tap-outside backdrop when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Floating Navigation Pill / Expanded Menu */}
      <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-50">
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            y: isVisible || isOpen ? 0 : 90,
            opacity: isVisible || isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <motion.div
            animate={
              isOpen
                ? { width: '316px', height: 'auto', borderRadius: '22px' }
                : { width: '54px', height: '54px', borderRadius: '27px' }
            }
            className="bg-[#151116]/95 backdrop-blur-2xl border border-[rgba(214,185,154,0.22)] overflow-hidden shadow-[0_12px_45px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out"
          >
            {isOpen ? (
              <div className="p-4 flex flex-col gap-3">
                {/* 3-Column Navigation Grid with Anchor Tags */}
                <div className="grid grid-cols-3 gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = !isOnServicesPage && activeSection === item.href.slice(1);
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleClick(e, item.href)}
                        className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all active:scale-95 text-center select-none ${
                          isActive
                            ? 'bg-[#5A1832] border-[#873653] text-[#F0EAE3] shadow-[0_0_12px_rgba(135,54,83,0.5)]'
                            : 'bg-[#151116]/80 border-[rgba(214,185,154,0.1)] text-[#969099] hover:text-[#F0EAE3]'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-[10px] font-mono tracking-wider uppercase">
                          {item.label}
                        </span>
                      </a>
                    );
                  })}
                </div>

                {/* Quick Actions Row */}
                <div className="flex items-center gap-2 pt-2 border-t border-[rgba(214,185,154,0.12)]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      navigate(isOnServicesPage ? '/' : '/services');
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[rgba(214,185,154,0.18)] bg-[#1a151b] font-mono text-xs text-[#D6B99A] active:scale-95 transition-all"
                  >
                    <Sparkles size={13} />
                    <span>{isOnServicesPage ? 'PORTFOLIO' : 'SERVICES'}</span>
                  </button>

                  {onResumeClick && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        onResumeClick();
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#873653] bg-[#5A1832] font-mono text-xs text-[#F0EAE3] active:scale-95 transition-all"
                    >
                      <FileText size={13} />
                      <span>RESUME</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg border border-[rgba(214,185,154,0.12)] text-[#969099] hover:text-[#F0EAE3] active:scale-95 transition-all"
                    aria-label="Close menu"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full h-full flex items-center justify-center text-[#F0EAE3] hover:text-[#D6B99A] active:scale-90 transition-all"
                aria-label="Open Navigation Menu"
              >
                <Menu size={22} />
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
