/**
 * @component ProjectsScene
 * @description Scene 05: PROJECTS — Experimental Engineering Showcase
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 * Stylized in Obsidian × Burgundy × Champagne visual identity.
 *
 * Asymmetric editorial showcase for the 4 flagship engineering architectures:
 * 01. DriftGuard (Network Anomaly Intelligence)
 * 02. HAQMS (Distributed Healthcare System)
 * 03. WALRUS (AI Threat Intelligence)
 * 04. CHC Secure (Cryptographic Integrity Engine)
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { portfolioData } from '../../data';
import type { Project } from '../../data';
import { DriftGuardVisual } from './projects/DriftGuardVisual';
import { HAQMSVisual } from './projects/HAQMSVisual';
import { WalrusVisual } from './projects/WalrusVisual';
import { CHCSecureVisual } from './projects/CHCSecureVisual';
import { ProjectArchive } from './projects/ProjectArchive';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSceneProps {
  onProjectClick: (project: Project) => void;
}

export function ProjectsScene({ onProjectClick }: ProjectsSceneProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);

  const allProjects = portfolioData.projects;

  // The 4 Flagship Architectures
  const flagshipIds = ['driftguard', 'haqms', 'walrus', 'chc-secure'];
  const flagshipProjects = flagshipIds
    .map((id) => allProjects.find((p) => p.id === id))
    .filter(Boolean) as Project[];

  const [activeIndex, setActiveIndex] = useState(0);

  const currentProject = flagshipProjects[activeIndex] || flagshipProjects[0];

  // Visual component map
  const visualComponents: Record<string, React.ReactNode> = {
    driftguard: <DriftGuardVisual />,
    haqms: <HAQMSVisual />,
    walrus: <WalrusVisual />,
    'chc-secure': <CHCSecureVisual />,
  };

  // Concise editorial summaries and technical achievements (under 2 sentences)
  const editorialData: Record<
    string,
    {
      category: string;
      achievement: string;
      conciseSummary: string;
      metrics: string;
    }
  > = {
    driftguard: {
      category: 'NETWORK ANOMALY INTELLIGENCE',
      achievement: 'Cross-Dataset Generalization (CICIDS2017 · UNSW-NB15 · UGR16)',
      conciseSummary:
        'Tri-model ML ensemble fusing an Isolation Forest, Dense Autoencoder, and Bidirectional LSTM to detect novel zero-day network intrusions with real-time SHAP explainability.',
      metrics: '~2,380 FLOWS/SEC THROUGHPUT',
    },
    haqms: {
      category: 'DISTRIBUTED HEALTHCARE ARCHITECTURE',
      achievement: 'Sub-50ms WebSocket & Redis Pub/Sub Synchronization',
      conciseSummary:
        'A high-concurrency patient flow and triage orchestration engine with predictive wait-time forecasting and automated token routing to eliminate hospital outpatient bottlenecks.',
      metrics: 'DYNAMIC TRIAGE PRE-EMPTION',
    },
    walrus: {
      category: 'AI THREAT CLASSIFICATION PLATFORM',
      achievement: 'Zero-Shot NLP Inference (BART-Large-MNLI)',
      conciseSummary:
        'Zero-shot threat intelligence platform analyzing phishing URLs, smishing tokens, and malicious payloads alongside an interactive 2015–2035 fraud evolution spectrum.',
      metrics: 'TRI-LINGUAL (EN · HI · KN)',
    },
    'chc-secure': {
      category: 'CRYPTOGRAPHIC INTEGRITY ENGINE',
      achievement: 'Forward Security Guaranteed by Design',
      conciseSummary:
        'A blockchain-integrated file encryption platform deriving unique contextual seeds via HMAC-SHA256, guaranteeing zero cross-file vulnerability propagation.',
      metrics: 'IMMUTABLE AUDIT LEDGER',
    },
  };

  const currentMeta = editorialData[currentProject?.id] || {
    category: 'FLAGSHIP ARCHITECTURE',
    achievement: currentProject?.title || '',
    conciseSummary: currentProject?.description || '',
    metrics: 'PRODUCTION SPEC',
  };

  // GSAP ScrollTrigger intro reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation between the 4 flagship projects (1, 2, 3, 4 and Arrow keys)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + flagshipProjects.length) % flagshipProjects.length);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % flagshipProjects.length);
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (idx >= 0 && idx < flagshipProjects.length) {
          setActiveIndex(idx);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [flagshipProjects.length]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#08090B] text-[#F0EAE3] py-24 px-6 md:px-16 border-t border-[rgba(214,185,154,0.12)]"
    >
      {/* SECTION INTRO: MONUMENTAL EDITORIAL HEADLINE */}
      <div ref={headlineRef} className="mb-14 space-y-4">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#D6B99A] uppercase">
          <span className="w-2.5 h-2.5 bg-[#873653]" />
          <span>SCENE 05 // EXPERIMENTAL ENGINEERING SHOWCASE</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase text-[#F0EAE3] leading-[0.9] select-none">
            ENGINEERED <br />
            <span className="text-[#873653]">SYSTEMS</span>.
          </h2>

          <p className="font-mono text-xs sm:text-sm text-[#969099] max-w-lg leading-relaxed lg:pb-2">
            A curated collection of digital systems engineered for intrusion detection,
            distributed concurrency, zero-shot threat intelligence, and forward-secure cryptography.
          </p>
        </div>
      </div>

      {/* ARCHITECTURAL PROJECT NAVIGATION INDEX */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-[rgba(214,185,154,0.12)] py-4 mb-10">
        {/* Flagship Numbered Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {flagshipProjects.map((p, idx) => {
            const isSelected = activeIndex === idx;
            const shortName = p.title.split('-')[0].trim();

            return (
              <button
                key={p.id}
                onClick={() => setActiveIndex(idx)}
                className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-[#5A1832] border-[#873653] text-[#F0EAE3] shadow-[0_0_18px_rgba(135,54,83,0.35)]'
                    : 'bg-[#151116]/80 border-[rgba(214,185,154,0.08)] text-[#969099] hover:text-[#F0EAE3] hover:border-[rgba(214,185,154,0.2)]'
                }`}
                aria-label={`Project 0${idx + 1}: ${shortName}`}
              >
                <span
                  className={`font-semibold ${
                    isSelected ? 'text-[#D6B99A]' : 'text-[#873653]'
                  }`}
                >
                  0{idx + 1}
                </span>
                <span className="font-bold tracking-tight uppercase">{shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Stepper Controls & Keyboard Hint */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#969099]">
          <span className="hidden md:inline text-[11px] text-[#969099]">
            KEYS: [1] [2] [3] [4] / [←] [→]
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                setActiveIndex(
                  (prev) => (prev - 1 + flagshipProjects.length) % flagshipProjects.length
                )
              }
              className="w-9 h-9 rounded-xl border border-[rgba(214,185,154,0.12)] bg-[#151116] flex items-center justify-center text-[#969099] hover:text-[#F0EAE3] hover:border-[#873653] transition-colors"
              aria-label="Previous Architecture"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % flagshipProjects.length)
              }
              className="w-9 h-9 rounded-xl border border-[rgba(214,185,154,0.12)] bg-[#151116] flex items-center justify-center text-[#969099] hover:text-[#F0EAE3] hover:border-[#873653] transition-colors"
              aria-label="Next Architecture"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN ASYMMETRIC STAGE: COORDINATED ANIMATED TRANSITION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* VISUAL SHOWCASE AREA (~60% / 7 COLS) */}
          <div className="lg:col-span-7 w-full order-2 lg:order-1">
            {visualComponents[currentProject.id] || <DriftGuardVisual />}
          </div>

          {/* EDITORIAL CONTEXT & ACTIONS (~40% / 5 COLS) */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <div>
              {/* Category & Index Meta */}
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#D6B99A] uppercase tracking-wider mb-2">
                <span className="text-[#873653] font-bold">
                  0{activeIndex + 1} // 04
                </span>
                <span>•</span>
                <span>{currentMeta.category}</span>
              </div>

              {/* Monumental Project Name */}
              <h3 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-[#F0EAE3] uppercase tracking-tight leading-[0.95]">
                {currentProject.title.split('-')[0].trim()}
              </h3>

              {/* Main Technical Achievement Callout */}
              <div className="mt-3 flex items-center gap-2 font-mono text-xs text-[#873653] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#873653]" />
                <span>{currentMeta.achievement}</span>
              </div>
            </div>

            {/* Crisp 1-2 sentence description */}
            <p className="font-mono text-xs sm:text-sm text-[#F0EAE3]/90 leading-relaxed border-l-2 border-[#873653] pl-4">
              {currentMeta.conciseSummary}
            </p>

            {/* Core Stack Tags */}
            <div>
              <span className="font-mono text-[10px] text-[#969099] uppercase tracking-wider block mb-2">
                CORE ARCHITECTURE STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-[#151116] border border-[rgba(214,185,154,0.12)] font-mono text-[11px] text-[#F0EAE3]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Primary & Secondary Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Technical Inspection Trigger (Phase 02 Modal) */}
              <button
                onClick={() => onProjectClick(currentProject)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#5A1832] border border-[#873653] text-[#F0EAE3] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#873653] shadow-[0_0_20px_rgba(135,54,83,0.35)] transition-all"
              >
                <Maximize2 size={13} />
                <span>INSPECT TECHNICAL README</span>
              </button>

              {/* GitHub Action */}
              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-[rgba(214,185,154,0.18)] bg-[#151116] font-mono text-xs text-[#F0EAE3] hover:border-[#D6B99A] hover:text-[#D6B99A] transition-colors"
                >
                  <Github size={14} />
                  <span>GITHUB</span>
                  <ArrowUpRight size={12} />
                </a>
              )}

              {/* Live Demo Action if present */}
              {currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-[rgba(214,185,154,0.18)] bg-[#151116] font-mono text-xs text-[#D6B99A] hover:border-[#D6B99A] transition-colors"
                >
                  <Sparkles size={14} />
                  <span>LIVE DEMO</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* SECONDARY REPOSITORY ARCHIVE (COMPACT & EDITORIAL) */}
      <ProjectArchive
        projects={allProjects}
        onProjectClick={onProjectClick}
      />
    </section>
  );
}
