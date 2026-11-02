/**
 * @component MobileNav
 * @description Floating Mobile Navigation Bubble
 * Stylized in Obsidian × Burgundy × Champagne visual direction.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Cpu,
  Compass,
  FolderGit2,
  Mail,
  Menu,
  X,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileNavProps {
  onResumeClick?: () => void;
}

const navItems = [
  { label: 'Arrival', href: '#home', icon: Home },
  { label: 'Identity', href: '#about', icon: User },
  { label: 'System', href: '#skills', icon: Cpu },
  { label: 'Journey', href: '#experience', icon: Compass },
  { label: 'Projects', href: '#projects', icon: FolderGit2 },
  { label: 'Contact', href: '#contact', icon: Mail },
];

export function MobileNav({ onResumeClick }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  const isOnServicesPage = location.pathname === '/services';

  useEffect(() => {
    const onScroll = () => {
      const sectionIds = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight * 0.4;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsOpen(false);
    if (isOnServicesPage) {
      navigate('/');
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('lenis-scroll-to', {
            detail: { target: href },
          }),
        );
      }, 300);
      return;
    }

    window.dispatchEvent(
      new CustomEvent('lenis-scroll-to', {
        detail: { target: href },
      }),
    );
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <motion.div
          animate={
            isOpen
              ? { width: '310px', height: 'auto', borderRadius: '20px' }
              : { width: '54px', height: '54px', borderRadius: '27px' }
          }
          className="bg-[#151116]/95 backdrop-blur-2xl border border-[rgba(214,185,154,0.18)] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out"
        >
          {isOpen ? (
            <div className="p-4 flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleClick(item.href)}
                      className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-colors ${
                        isActive
                          ? 'bg-[#5A1832] border-[#873653] text-[#F0EAE3]'
                          : 'bg-[#151116]/60 border-[rgba(214,185,154,0.08)] text-[#969099] hover:text-[#F0EAE3]'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-[10px] font-mono tracking-wider uppercase">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Actions Row */}
              <div className="flex items-center gap-2 pt-2 border-t border-[rgba(214,185,154,0.1)]">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate(isOnServicesPage ? '/' : '/services');
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[rgba(214,185,154,0.15)] bg-[#151116] font-mono text-xs text-[#D6B99A]"
                >
                  <Sparkles size={13} />
                  <span>{isOnServicesPage ? 'PORTFOLIO' : 'SERVICES'}</span>
                </button>

                {onResumeClick && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onResumeClick();
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-[#873653] bg-[#5A1832] font-mono text-xs text-[#F0EAE3]"
                  >
                    <FileText size={13} />
                    <span>RESUME</span>
                  </button>
                )}

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg border border-[rgba(214,185,154,0.1)] text-[#969099] hover:text-[#F0EAE3]"
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="w-full h-full flex items-center justify-center text-[#F0EAE3] hover:text-[#D6B99A] transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
