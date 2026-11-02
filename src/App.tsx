import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  LoadingScreen,
  Services,
  DigitalWorldCanvas,
  ArrivalScene,
  IdentityScene,
  SystemScene,
  JourneyScene,
  ProjectsScene,
  ContactScene,
  Sidebar,
  MobileNav,
} from './components';
const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal })),
);
const ProjectDetailModal = lazy(() =>
  import('./components/ProjectDetailModal').then((m) => ({ default: m.ProjectDetailModal })),
);
import { useLenis } from './hooks';
import type { Project } from './data';

function PortfolioHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnResumePage = location.pathname === '/resume';

  // ── resume modal ─────────────────────────────────────
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(isOnResumePage);
  const openResume = () => {
    setIsResumeOpen(true);
    if (!isOnResumePage) navigate('/resume');
  };
  const closeResume = () => {
    setIsResumeOpen(false);
    if (isOnResumePage) navigate('/');
  };

  // ── project modal ────────────────────────────────────
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <>
      {/* ── Persistent Continuous Three.js Digital World ──── */}
      <DigitalWorldCanvas />

      {/* ── Restored Vertical Left Sidebar & Mobile Navigation ── */}
      <Sidebar onResumeClick={openResume} />
      <MobileNav onResumeClick={openResume} />

      {/* ── Main Cinematic Experiential Pipeline ──────────── */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* SCENE 01: ARRIVAL */}
        <ArrivalScene onResumeClick={openResume} />

        {/* SCENE 02: IDENTITY */}
        <IdentityScene />

        {/* SCENE 03: SYSTEM */}
        <SystemScene />

        {/* SCENE 04: JOURNEY */}
        <JourneyScene />

        {/* SCENE 05: PROJECTS */}
        <ProjectsScene onProjectClick={openProject} />

        {/* SCENE 06: CONTACT */}
        <ContactScene onResumeClick={openResume} />
      </main>

      {/* ── Modals & Drawers ──────────────────────────────── */}
      <Suspense fallback={null}>
        <ResumeModal isOpen={isResumeOpen} onClose={closeResume} />
      </Suspense>

      <Suspense fallback={null}>
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </Suspense>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasValidToken, setHasValidToken] = useState<boolean>(false);

  useLenis();

  useEffect(() => {
    const existing = localStorage.getItem('portfolioToken');
    if (existing) {
      setHasValidToken(true);
      setIsLoading(false);
    }
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
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
            <Route path="/" element={<PortfolioHome />} />
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
        style={{
          display: 'none',
          visibility: 'hidden',
          position: 'absolute',
          pointerEvents: 'none',
        }}
      />
      {/* ───────────────────────────────────────────────────────────────────── */}
    </>
  );
}

export { App };
