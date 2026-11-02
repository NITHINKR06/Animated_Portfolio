/**
 * @component Sidebar
 * @description Premium Editorial Right-Aligned Vertical Navigation Dock
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 */
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Home,
  User,
  FolderOpen,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  isRoute?: boolean;
};

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Projects', href: '#projects', icon: FolderOpen },
  { label: 'Skills', href: '#skills', icon: Code },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Certification', href: '#certification', icon: Award },
  { label: 'Services', href: '/services', icon: Sparkles, isRoute: true },
];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState('home');
  const [hovered, setHovered] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const sectionIds = navItems.filter((item) => !item.isRoute).map((item) => item.href.slice(1));

    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, {
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0.1,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (item: NavItem) => {
    if (item.isRoute) {
      navigate(item.href);
    } else {
      window.dispatchEvent(
        new CustomEvent('lenis-scroll-to', {
          detail: { target: item.href },
        }),
      );
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40"
      aria-label="Section Navigation"
    >
      <ul className="flex flex-col gap-2 p-1.5 rounded-full bg-[#111218]/75 border border-white/[0.08] backdrop-blur-xl shadow-2xl">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isServices = item.label === 'Services';
          const isOnServicesPage = location.pathname === '/services';
          const isActive = isServices
            ? isOnServicesPage
            : activeSection === item.href.slice(1);

          return (
            <motion.li
              key={item.label}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.04 }}
            >
              <motion.button
                type="button"
                onClick={() => handleClick(item)}
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#F5F4EE] text-[#0B0C10] shadow-md shadow-white/10 font-medium'
                    : isServices
                      ? 'text-amber-400 hover:text-white hover:bg-white/[0.08]'
                      : 'text-stone-400 hover:text-stone-100 hover:bg-white/[0.06]'
                }`}
                aria-label={item.label}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              >
                <Icon
                  size={15}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? 'text-[#0B0C10]'
                      : isServices
                        ? 'text-amber-400 group-hover:text-white'
                        : 'text-stone-400 group-hover:text-stone-100'
                  }`}
                />

                {/* Subtle active pip with smooth spring gliding */}
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-pip"
                    className="absolute -left-1.5 w-1 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                    transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>

              {/* Minimal Editorial Tooltip on Hover (Left of Dock) */}
              {hovered === item.label && (
                <motion.div
                  initial={{ opacity: 0, x: 8, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2.5 py-1 rounded-md text-[11px] font-sans tracking-widest uppercase whitespace-nowrap bg-[#161720]/95 text-stone-200 border border-white/[0.1] backdrop-blur-xl shadow-xl flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-400" />
                  <span>{item.label}</span>
                </motion.div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
