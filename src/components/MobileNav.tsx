import { motion } from 'framer-motion';
import { Home, User, Code, Briefcase, GraduationCap, FolderOpen, Award, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'About', href: '#about', icon: User },
    { label: 'Skills', href: '#skills', icon: Code },
    { label: 'Experience', href: '#experience', icon: Briefcase },
    { label: 'Education', href: '#education', icon: GraduationCap },
    { label: 'Projects', href: '#projects', icon: FolderOpen },
    { label: 'Certification', href: '#certification', icon: Award },
];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const onScroll = () => {
            const sections = navItems.map(item => item.href.slice(1));
            const current = sections.find(sectionId => {
                const el = document.getElementById(sectionId);
                if (!el) return false;
                const rect = el.getBoundingClientRect();
                return rect.top <= 150 && rect.bottom >= 150;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleClick = (href: string) => {
        setIsOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                className="relative flex items-center justify-center"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
            >
                {/* Navigation Bubble */}
                <motion.div
                    animate={isOpen ? { width: '280px', height: 'auto', borderRadius: '24px' } : { width: '56px', height: '56px', borderRadius: '28px' }}
                    className="bg-black/60 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 ease-out"
                >
                    {isOpen ? (
                        <div className="p-4 grid grid-cols-4 gap-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.href.slice(1);
                                return (
                                    <button
                                        key={item.label}
                                        onClick={() => handleClick(item.href)}
                                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${isActive ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span className="text-[10px] font-medium">{item.label}</span>
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex flex-col items-center gap-1 p-2 rounded-xl text-red-400"
                            >
                                <X size={20} />
                                <span className="text-[10px] font-medium">Close</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsOpen(true)}
                            className="w-14 h-14 flex items-center justify-center text-white"
                            aria-label="Open Navigation"
                        >
                            <Menu size={24} />
                        </button>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
