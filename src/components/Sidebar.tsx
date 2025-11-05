import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code, Briefcase, GraduationCap, FolderOpen, Mail, Award, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isRoute?: boolean;
};

const navItems: NavItem[] = [
  { label: 'Services', href: '/services', icon: Sparkles, isRoute: true },
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Skills', href: '#skills', icon: Code },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Projects', href: '#projects', icon: FolderOpen },
  { label: 'Certification', href: '#certification', icon: Award },
  // { label: 'Contact', href: '#contact', icon: Mail },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('home');
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const sections = navItems.filter(item => !item.isRoute).map(item => item.href.slice(1));
      const current = sections.find(sectionId => {
        const el = document.getElementById(sectionId);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (item: NavItem) => {
    if (item.isRoute) {
      navigate(item.href);
    } else {
      const el = document.querySelector(item.href);
      if (el) {
        (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -50, y: '-50%' }}
      animate={{ opacity: 1, x: 0, y: '-50%' }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="hidden lg:flex fixed left-6 top-1/2 z-40"
      aria-label="Section Navigation"
    >
      <ul className="flex flex-col gap-3 p-2 rounded-2xl border border-white/10 bg-black/10 backdrop-blur-md">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isServices = item.label === 'Services';
          const isOnServicesPage = location.pathname === '/services';
          const isActive = isServices ? isOnServicesPage : activeSection === item.href.slice(1);
          
          return (
            <motion.li
              key={item.label}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <motion.button
                type="button"
                onClick={() => handleClick(item)}
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
                className={
                  `group flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ` +
                  `${isServices 
                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400/40 shadow-lg shadow-blue-500/20' 
                    : isActive 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`
                }
                aria-label={item.label}
                whileHover={{ scale: 1.1, x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={
                    isServices 
                      ? { rotate: [0, 360], scale: [1, 1.1, 1] } 
                      : isActive 
                        ? { rotate: [0, 360] } 
                        : { rotate: 0 }
                  }
                  transition={
                    isServices 
                      ? { duration: 2, repeat: Infinity, ease: "easeInOut" } 
                      : { duration: 0.6, ease: "easeInOut" }
                  }
                >
                  <Icon className={`h-5 w-5 ${isServices ? 'text-blue-400' : isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`} />
                </motion.div>
              </motion.button>

              {hovered === item.label && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className={`pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 rounded-md text-white text-sm whitespace-nowrap border backdrop-blur-md ${
                    isServices 
                      ? 'bg-blue-600/80 border-blue-400/50' 
                      : 'bg-black/60 border-white/10'
                  }`}
                >
                  {item.label}
                </motion.div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
}


