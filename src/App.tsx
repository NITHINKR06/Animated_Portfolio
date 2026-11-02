import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  LoadingScreen,
  Hero,
  Skills,
  Education,
  Experience,
  Projects,
  Contact,
  Certification,
  Sidebar,
  MobileNav,
  Services,
  About,
} from './components';
const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal })),
);
const ProjectDetailModal = lazy(() =>
  import('./components/ProjectDetailModal').then((m) => ({ default: m.ProjectDetailModal })),
);
import { useLenis, useScrollChoreography } from './hooks';
import type { Project } from './data';

function PortfolioHome() {
  const navigate = useNavigate();
  const location = useLocation();

  useScrollChoreography();

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

  // ── project modal — single source of truth ─────────
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <>
      <div className="fixed inset-0 z-0 bg-[#0A0B0E]" />
      <Sidebar />
      <MobileNav />

      <main className="relative z-10">
        <Hero onResumeClick={openResume} onProjectClick={openProject} />
        <About />
        <Projects onProjectClick={openProject} />
        <Skills />
        <Experience />
        <Education />
        <Certification />
        <Contact />

        {/* --- Persistent Footer Attribution --- */}
        <footer className="w-full py-8 text-center text-xs text-[#8E929D] border-t border-white/[0.06] bg-[#0A0B0E] relative z-10 flex flex-col items-center gap-1.5">
          <p>© {new Date().getFullYear()} Nithin K R. All rights reserved.</p>
          <p>
            Designed &amp; Built with Architectural Rigor by{' '}
            <a
              href="https://github.com/NITHINKR06"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F4EE] hover:text-[#D4A373] transition-colors font-medium"
            >
              NITHINKR06
            </a>
          </p>
        </footer>
      </main>

      {/* Resume modal */}
      <Suspense fallback={null}>
        <ResumeModal isOpen={isResumeOpen} onClose={closeResume} />
      </Suspense>

      {/* Project modal — single source of truth, lives here */}
      <Suspense fallback={null}>
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </Suspense>
    </>
  );
}

function App() {
  useLenis();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <div className="relative">
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/resume" element={<PortfolioHome />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </div>
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
