import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';
const ThreeDBackground = lazy(() => import('./components/ThreeDBackground'));
// import AnimatedBackground from './components/AnimatedBackground';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import Experience from './components/Experience';
import { Projects } from './components/Projects';
import Contact from './components/Contact';
import Certification from './components/Certification';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';

import LearningPath from './components/LearningPath';
import Services from './components/Services';
const ResumeModal = lazy(() => import('./components/ResumeModal'));
import { Sparkles } from 'lucide-react';
import { useLenis } from './hooks/useLenis';
import { PageTransition } from './components/PageTransition';
import { SectionReveal } from './components/SectionReveal';

function PortfolioHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnServicesPage = location.pathname === '/services';
  const isOnResumePage = location.pathname === '/resume';
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(isOnResumePage);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useLenis();

  const openResume = () => {
    setIsResumeOpen(true);
    if (!isOnResumePage) {
      navigate('/resume');
    }
  };

  const closeResume = () => {
    setIsResumeOpen(false);
    if (isOnResumePage) {
      navigate('/');
    }
  };

  return (
    <>
      {/* <AnimatedBackground /> */}
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
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm shadow-lg backdrop-blur-md border transition-all ${isOnServicesPage
            ? 'bg-blue-600 text-white border-blue-400/50 shadow-blue-500/50'
            : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
          aria-label="View Services"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { rotate: [0, 360] }}
            transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={18} className={isOnServicesPage ? 'text-white' : 'text-blue-400'} />
          </motion.div>
          <span>Services</span>
        </motion.button>
      </motion.div>

      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: '0%',
        }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600"
        aria-hidden="true"
      />

      <main>
        <section id="home">
          <Hero onResumeClick={openResume} />
        </section>

        <section id="about" className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <SectionReveal>
              <div className="glass-card p-8 rounded-2xl">
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
              </div>
            </SectionReveal>
          </div>
        </section>

        <Skills />

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mx-auto max-w-4xl"
          style={{ transformOrigin: 'center' }}
        />

        <Experience />

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mx-auto max-w-4xl"
          style={{ transformOrigin: 'center' }}
        />

        <Education />

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mx-auto max-w-4xl"
          style={{ transformOrigin: 'center' }}
        />

        <Projects />
        <section id="certification" className="">
          <Certification />
        </section>
        <Contact />
      </main>

      <Suspense fallback={null}>
        <ResumeModal isOpen={isResumeOpen} onClose={closeResume} />
      </Suspense>
    </>
  );
}

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasValidToken, setHasValidToken] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkToken = () => {
      const existingToken = localStorage.getItem('portfolioToken');
      if (existingToken) {
        setHasValidToken(true);
        setIsLoading(false);
      } else {
        setHasValidToken(false);
      }
    };

    checkToken();
  }, []);

  const handleLoadingComplete = () => {
    const token = `portfolio_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('portfolioToken', token);
    setHasValidToken(true);
    // Small delay to ensure home page is rendered before hiding loading screen
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  };

  return (
    <>
      {/* Render home page immediately when token is valid, even if still loading */}
      {hasValidToken && (
        <div className="relative">
          <PageTransition>
            <Routes>
              <Route path="/" element={<PortfolioHome />} />
              <Route path="/resume" element={<PortfolioHome />} />
              <Route path="/learning-path/*" element={<LearningPath />} />
              <Route path="/services" element={<Services />} />
            </Routes>
          </PageTransition>
        </div>
      )}

      {/* Loading screen on top with high z-index */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            key="loading"
            onComplete={handleLoadingComplete}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
