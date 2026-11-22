/**
 * @component ProjectCarriageContent
 * @description Synchronized presentation panel for the active Vande Bharat coach
 * Displays the project's engineering identity, technical achievements, interactive visual window,
 * and the prominent "CONTINUE THE JOURNEY →" button on Coach 04.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Maximize2,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  Train,
} from 'lucide-react';
import type { Project } from '../../../data';
import { DriftGuardVisual } from '../projects/DriftGuardVisual';
import { HAQMSVisual } from '../projects/HAQMSVisual';
import { WalrusVisual } from '../projects/WalrusVisual';
import { CHCSecureVisual } from '../projects/CHCSecureVisual';

interface ProjectCarriageContentProps {
  coachIndex: number;
  project: Project;
  onProjectClick: (project: Project) => void;
  onContinueJourney: () => void;
}

export function ProjectCarriageContent({
  coachIndex,
  project,
  onProjectClick,
  onContinueJourney,
}: ProjectCarriageContentProps) {
  const isFinalCarriage = coachIndex === 4;

  const visualComponents: Record<string, React.ReactNode> = {
    driftguard: <DriftGuardVisual />,
    haqms: <HAQMSVisual />,
    walrus: <WalrusVisual />,
    'chc-secure': <CHCSecureVisual />,
  };

  const coachMetadata: Record<
    string,
    {
      badge: string;
      achievement: string;
      summary: string;
    }
  > = {
    driftguard: {
      badge: 'COACH 01 // ML NETWORK INTRUSION DETECTION',
      achievement: 'Cross-Dataset Generalization (~2,380 flows/sec)',
      summary:
        'Tri-model ML ensemble combining an Isolation Forest, Dense Autoencoder, and Bidirectional LSTM with weighted fusion to detect zero-day network anomalies in real-time.',
    },
    haqms: {
      badge: 'COACH 02 // DISTRIBUTED HEALTHCARE TRIAGE',
      achievement: 'Sub-50ms WebSocket & Redis Pub/Sub Synchronization',
      summary:
        'A high-concurrency patient flow and triage orchestration engine with predictive wait-time forecasting and automated token routing to eliminate hospital outpatient bottlenecks.',
    },
    walrus: {
      badge: 'COACH 03 // AI THREAT INTELLIGENCE PLATFORM',
      achievement: 'Zero-Shot NLP Inference (BART-Large-MNLI)',
      summary:
        'Zero-shot threat intelligence platform analyzing phishing URLs, smishing tokens, and malicious payloads alongside an interactive 2015–2035 fraud evolution spectrum.',
    },
    'chc-secure': {
      badge: 'COACH 04 // CRYPTOGRAPHIC INTEGRITY ENGINE',
      achievement: 'Contextual Hash Chain Forward Security',
      summary:
        'A blockchain-integrated file encryption platform deriving unique contextual seeds via HMAC-SHA256, guaranteeing zero cross-file vulnerability propagation.',
    },
  };

  const meta = coachMetadata[project.id] || {
    badge: `COACH 0${coachIndex} // FLAGSHIP ARCHITECTURE`,
    achievement: 'Production Engineering Spec',
    summary: project.description,
  };

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
    >
      {/* LEFT: Procedural Technical Visualization (~60% / 7 Cols) */}
      <div className="lg:col-span-7 w-full order-2 lg:order-1">
        {visualComponents[project.id] || <DriftGuardVisual />}
      </div>

      {/* RIGHT: Coach Editorial Specs & Actions (~40% / 5 Cols) */}
      <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
        <div>
          {/* Coach Designation Badge */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#D6B99A] uppercase tracking-wider mb-2">
            <Train size={13} className="text-[#873653]" />
            <span className="text-[#873653] font-bold">VANDE BHARAT //</span>
            <span>{meta.badge}</span>
          </div>

          {/* Project Title */}
          <h3 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-[#F0EAE3] uppercase tracking-tight leading-[0.95]">
            {project.title.split('-')[0].trim()}
          </h3>

          {/* Technical Achievement Tag */}
          <div className="mt-3 flex items-center gap-2 font-mono text-xs text-[#873653] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#873653]" />
            <span>{meta.achievement}</span>
          </div>
        </div>

        {/* Crisp Concise Description */}
        <p className="font-mono text-xs sm:text-sm text-[#F0EAE3]/90 leading-relaxed border-l-2 border-[#873653] pl-4">
          {meta.summary}
        </p>

        {/* Stack Tags */}
        <div>
          <span className="font-mono text-[10px] text-[#969099] uppercase tracking-wider block mb-2">
            CARRIAGE TECH ARCHITECTURE
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-[#151116] border border-[rgba(214,185,154,0.12)] font-mono text-[11px] text-[#F0EAE3]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onProjectClick(project)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#5A1832] border border-[#873653] text-[#F0EAE3] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#873653] shadow-[0_0_20px_rgba(135,54,83,0.35)] transition-all"
          >
            <Maximize2 size={13} />
            <span>INSPECT TECHNICAL README</span>
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-[rgba(214,185,154,0.18)] bg-[#151116] font-mono text-xs text-[#F0EAE3] hover:border-[#D6B99A] hover:text-[#D6B99A] transition-colors"
            >
              <Github size={14} />
              <span>GITHUB</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
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

        {/* THE FINAL CARRIAGE CONTINUATION BUTTON (Path B) */}
        {isFinalCarriage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-4 mt-4 border-t border-[rgba(214,185,154,0.15)]"
          >
            <button
              onClick={onContinueJourney}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#873653] to-[#5A1832] border-2 border-[#D6B99A]/50 text-[#F0EAE3] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:border-[#D6B99A] hover:shadow-[0_0_30px_rgba(214,185,154,0.3)] transition-all"
            >
              <span>CONTINUE THE JOURNEY</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1.5 transition-transform text-[#D6B99A]"
              />
            </button>
            <p className="font-mono text-[11px] text-[#969099] mt-2">
              Explore the complete 20+ engineering repository archive at the terminal platform.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
