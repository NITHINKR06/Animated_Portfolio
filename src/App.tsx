import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';
const ThreeDBackground = lazy(() => import('./components/ThreeDBackground'));
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import Experience from './components/Experience';
import { Projects } from './components/Projects';
import Contact from './components/Contact';
import Certification from './components/Certification';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Services from './components/Services';
import About from './components/About';
const ResumeModal        = lazy(() => import('./components/ResumeModal'));
const ProjectDetailModal = lazy(() =>
  import('./components/ProjectDetailModal').then(m => ({ default: m.ProjectDetailModal }))
);
import { Sparkles } from 'lucide-react';
import { useLenis } from './hooks/useLenis';
import { Project } from './data/portfolio';

function PortfolioHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const isOnServicesPage = location.pathname === '/services';
  const isOnResumePage   = location.pathname === '/resume';

  // ── resume modal ─────────────────────────────────────
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(isOnResumePage);
  const openResume  = () => { setIsResumeOpen(true);  if (!isOnResumePage) navigate('/resume'); };
  const closeResume = () => { setIsResumeOpen(false); if (isOnResumePage)  navigate('/'); };

  // ── project modal — lifted from Projects.tsx ─────────
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Scroll to #projects then open modal after scroll settles
  const openProject = (project: Project) => {
    const section = document.getElementById('projects');
    if (!section) { setSelectedProject(project); return; }

    section.scrollIntoView({ behavior: 'smooth' });

    // Wait for scroll to finish (~800ms) then open modal
    setTimeout(() => setSelectedProject(project), 850);
  };

  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 bg-slate-900 z-0" />}>
        <ThreeDBackground />
      </Suspense>
      <Sidebar />
      <MobileNav />

      {/* Mobile Services Button */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? undefined : { duration: 0.6, delay: 0.5 }}
        className="lg:hidden fixed top-4 right-4 z-40"
      >
        <motion.button
          onClick={() => navigate('/services')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm shadow-lg backdrop-blur-md border transition-all ${
            isOnServicesPage
              ? 'bg-blue-600 text-white border-blue-400/50 shadow-blue-500/50'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
          aria-label="View Services"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { rotate: [0, 360] }}
            transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={18} className={isOnServicesPage ? 'text-white' : 'text-blue-400'} />
          </motion.div>
          <span>Services</span>
        </motion.button>
      </motion.div>

      <main>
        {/* Hero gets openProject so orbit icons can trigger modal */}
        <section id="home">
          <Hero onResumeClick={openResume} onProjectClick={openProject} />
        </section>

        <About />
        <Skills />
        <Experience />
        <Education />

        {/* Projects gets openProject so cards still work too */}
        <Projects onProjectClick={openProject} />

        <section id="certification"><Certification /></section>
        <Contact />

        {/* --- Persistent Footer Attribution --- */}
        <footer className="w-full py-6 text-center text-xs text-white/40 bg-[#0a0118] border-t border-white/5 relative z-10 flex flex-col items-center gap-1">
          <p>© {new Date().getFullYear()} Nithin K R. All rights reserved.</p>
          <p>
            Designed & Built by <a href="https://github.com/NITHINKR06" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-purple-400 transition-colors">NITHINKR06</a>
          </p>
        </footer>
      </main>

      {/* Resume modal */}
      <Suspense fallback={null}>
        <ResumeModal isOpen={isResumeOpen} onClose={closeResume} />
      </Suspense>

      {/* Project modal — single source of truth, lives here */}
      <Suspense fallback={null}>
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </Suspense>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading]         = useState<boolean>(true);
  const [hasValidToken, setHasValidToken] = useState<boolean>(false);

  useLenis();

  useEffect(() => {
    const existing = localStorage.getItem('portfolioToken');
    if (existing) { setHasValidToken(true); setIsLoading(false); }
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  const handleLoadingComplete = () => {
    const token = `portfolio_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('portfolioToken', token);
    setHasValidToken(true);
    setTimeout(() => setIsLoading(false), 50);
  };

  return (
    <>
      {hasValidToken && (
        <div className="relative">
          <Routes>
            <Route path="/"       element={<PortfolioHome />} />
            <Route path="/resume" element={<PortfolioHome />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </div>
      )}
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      {/* ── Portfolio attribution watermark — required by LICENSE ──────────── */}
      {/* Author: Nithin K R | https://github.com/NITHINKR06/Animated_Portfolio */}
      <span
        aria-hidden="true"
        data-portfolio-author="Nithin K R"
        data-portfolio-github="NITHINKR06"
        data-portfolio-origin="https://github.com/NITHINKR06/Animated_Portfolio"
        data-portfolio-license="Attribution required"
        style={{ display: 'none', visibility: 'hidden', position: 'absolute', pointerEvents: 'none' }}
      />
      {/* ───────────────────────────────────────────────────────────────────── */}
    </>
  );
}

export default App;