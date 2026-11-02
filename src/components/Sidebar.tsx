/**
 * @component Sidebar
 * @description Restored vertical navigation on the left for the Animated Portfolio
 * Stylized in Obsidian × Burgundy × Champagne visual direction.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Home,
  User,
  Cpu,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Award,
  Sparkles,
  FileText,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  onResumeClick?: () => void;
}

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  isRoute?: boolean;
  isAction?: boolean;
};

const navItems: NavItem[] = [
  { label: 'Services', href: '/services', icon: Sparkles, isRoute: true },
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Skills', href: '#skills', icon: Cpu },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Projects', href: '#projects', icon: FolderOpen },
  { label: 'Certification', href: '#certification', icon: Award },
  { label: 'Resume', href: '#resume', icon: FileText, isAction: true },
];

export function Sidebar({ onResumeClick }: SidebarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [hovered, setHovered] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();

  const isOnServicesPage = location.pathname === '/services';

  useEffect(() => {
    const onScroll = () => {
      const sectionIds = [
        'home',
        'about',
        'skills',
        'experience',
        'education',
        'projects',
        'certification',
      ];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (item: NavItem) => {
    if (item.isAction) {
      if (onResumeClick) onResumeClick();
      return;
    }

    if (item.isRoute) {
      navigate(item.href);
      return;
    }

    if (isOnServicesPage) {
      navigate('/');
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('lenis-scroll-to', {
            detail: { target: item.href },
          }),
        );
      }, 300);
      return;
    }

    window.dispatchEvent(
      new CustomEvent('lenis-scroll-to', {
        detail: { target: item.href },
      }),
    );
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -40, y: '-50%' }}
      animate={{ opacity: 1, x: 0, y: '-50%' }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40"
      aria-label="Section Navigation"
    >
      <ul className="flex flex-col gap-2.5 p-2 rounded-2xl bg-[#151116]/90 backdrop-blur-xl border border-[rgba(214,185,154,0.12)] shadow-[0_18px_50px_rgba(0,0,0,0.5)]">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isServices = item.label === 'Services';
          const isResume = item.label === 'Resume';
          const isActive = isServices
            ? isOnServicesPage
            : isResume
              ? false
              : activeSection === item.href.slice(1);

          return (
            <motion.li
              key={item.label}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
            >
              <motion.button
                type="button"
                onClick={() => handleClick(item)}
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-[#5A1832] border-[#873653] shadow-[0_0_20px_rgba(135,54,83,0.45)] text-[#F0EAE3]'
                    : isServices && isOnServicesPage
                      ? 'bg-[#5A1832] border-[#873653] text-[#D6B99A]'
                      : 'bg-[#151116]/60 border-[rgba(214,185,154,0.08)] text-[#969099] hover:text-[#F0EAE3] hover:border-[rgba(214,185,154,0.25)] hover:bg-[#5A1832]/25'
                }`}
                aria-label={item.label}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.08, x: 2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarActivePill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#873653]/40 to-[#5A1832] -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <Icon
                  size={18}
                  className={`transition-colors ${
                    isActive
                      ? 'text-[#F0EAE3]'
                      : isServices
                        ? 'text-[#D6B99A] group-hover:text-[#F0EAE3]'
                        : isResume
                          ? 'text-[#D6B99A]/80 group-hover:text-[#D6B99A]'
                          : 'group-hover:text-[#F0EAE3]'
                  }`}
                />
              </motion.button>

              {/* Burgundy & Champagne Tooltip */}
              {hovered === item.label && (
                <motion.div
                  initial={{ opacity: 0, x: -6, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -6, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3.5 px-3 py-1.5 rounded-lg bg-[#151116] border border-[rgba(214,185,154,0.2)] text-[#F0EAE3] font-mono text-xs whitespace-nowrap shadow-xl"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#873653]" />
                    <span>{item.label}</span>
                  </div>
                </motion.div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
