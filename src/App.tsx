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
// import LearningPath from './components/LearningPath';
import Services from './components/Services';
const ResumeModal = lazy(() => import('./components/ResumeModal'));
const ProjectDetailModal = lazy(() =>
  import('./components/ProjectDetailModal').then(m => ({ default: m.ProjectDetailModal }))
);
import { Sparkles } from 'lucide-react';
import { portfolioData } from './data/portfolio';

function PortfolioHome() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const isOnServicesPage = location.pathname === '/services';
  const isOnResumePage   = location.pathname === '/resume';

  // Detect /projects/:id in URL
  const projectMatch  = location.pathname.match(/^\/projects\/(.+)$/);
  const openProjectId = projectMatch ? projectMatch[1] : null;
  const openProject   = openProjectId
    ? portfolioData.projects.find(p => p.id === openProjectId) ?? null
    : null;

  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(isOnResumePage);

  const openResume  = () => { setIsResumeOpen(true);  if (!isOnResumePage)   navigate('/resume'); };
  const closeResume = () => { setIsResumeOpen(false); if (isOnResumePage)    navigate('/'); };
  const closeProject = () => navigate(-1);

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
        className="lg:hidden fixed top-4 right-4 z-50"
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
        <section id="home"><Hero onResumeClick={openResume} /></section>

        <section id="about" className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About <span className="text-gradient">Me</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm a passionate Full Stack Developer with a love for creating beautiful,
                functional, and user-friendly applications. With expertise in modern web
                technologies, I bring ideas to life through clean code and innovative solutions.
                Currently pursuing my Master's in Cyber Security while continuously learning
                and adapting to new technologies in the ever-evolving world of software development.
              </p>
            </motion.div>
          </div>
        </section>

        <Skills />
        <Experience />
        <Education />
        <Projects />
        <section id="certification"><Certification /></section>
        <Contact />
      </main>

      <Suspense fallback={null}>
        <ResumeModal isOpen={isResumeOpen} onClose={closeResume} />
      </Suspense>

      {/* Project modal — floats over portfolio at /projects/:id */}
      <Suspense fallback={null}>
        <ProjectDetailModal project={openProject} onClose={closeProject} />
      </Suspense>
    </>
  );
}

function App(): JSX.Element {
  const [isLoading, setIsLoading]         = useState<boolean>(true);
  const [hasValidToken, setHasValidToken] = useState<boolean>(false);

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
            <Route path="/"             element={<PortfolioHome />} />
            <Route path="/resume"       element={<PortfolioHome />} />
            <Route path="/projects/:id" element={<PortfolioHome />} />
            {/* <Route path="/learning-path/*" element={<LearningPath />} /> */}
            <Route path="/services"     element={<Services />} />
          </Routes>
        </div>
      )}
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" onComplete={handleLoadingComplete} />}
      </AnimatePresence>
    </>
  );
}

export default App;