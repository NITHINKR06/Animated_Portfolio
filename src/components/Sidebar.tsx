import { useEffect, useState } from 'react';
import { Home, User, Code, Briefcase, GraduationCap, FolderOpen, Mail, Award } from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
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

  useEffect(() => {
    const onScroll = () => {
      const sections = navItems.map(item => item.href.slice(1));
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

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40"
      aria-label="Section Navigation"
    >
      <ul className="flex flex-col gap-3 p-2 rounded-2xl border border-white/10 bg-black/10 backdrop-blur-md">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeSection === item.href.slice(1);
          return (
            <li key={item.label} className="relative">
              <button
                type="button"
                onClick={() => handleClick(item.href)}
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
                className={
                  `group flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ` +
                  `${isActive ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'}`
                }
                aria-label={item.label}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`} />
              </button>

              {hovered === item.label && (
                <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 rounded-md bg-black/60 text-white text-sm whitespace-nowrap border border-white/10 backdrop-blur-md">
                  {item.label}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


