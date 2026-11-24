/**
 * @component TerminalArchivePanel
 * @description Cinematic Sliding Panel for the Complete Repository Archive
 * Concept: Architectural Terminal Station / Extended Carriage Destination
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Github, ExternalLink, ArrowRight, ArrowLeft, Terminal, Filter } from 'lucide-react';
import type { Project } from '../../../data';

interface TerminalArchivePanelProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onReturnToTrain: () => void;
}

type CategoryFilter = 'all' | 'security' | 'distributed' | 'ai';

export function TerminalArchivePanel({
  projects,
  onProjectClick,
  onReturnToTrain,
}: TerminalArchivePanelProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === '' ||
        p.title.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (activeFilter === 'all') return true;
      if (activeFilter === 'security') {
        const titleLower = p.title.toLowerCase();
        return (
          titleLower.includes('defense') ||
          titleLower.includes('attack') ||
          titleLower.includes('packet') ||
          titleLower.includes('scanner') ||
          titleLower.includes('security') ||
          titleLower.includes('cipher') ||
          titleLower.includes('hash') ||
          titleLower.includes('hardening') ||
          p.id.includes('cyb') ||
          p.id.includes('kali')
        );
      }
      if (activeFilter === 'distributed') {
        return (
          p.technologies.some((t) =>
            ['Node.js', 'Next.js', 'PostgreSQL', 'Redis', 'Docker', 'Socket.IO', 'Prisma'].includes(t)
          ) || p.id.includes('haqms')
        );
      }
      if (activeFilter === 'ai') {
        return (
          p.technologies.some((t) =>
            ['Python', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'LSTM', 'SHAP'].includes(t)
          ) || p.id.includes('driftguard') || p.id.includes('walrus')
        );
      }
      return true;
    });
  }, [projects, activeFilter, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-2xl bg-[#0D0B0E] border border-[rgba(214,185,154,0.18)] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.85)] z-20 space-y-8"
    >
      {/* Top Bar: Return to Train & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(214,185,154,0.12)] pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#873653] mb-1.5">
            <Terminal size={14} />
            <span>TERMINAL DESTINATION // CENTRAL REPOSITORY CATALOG</span>
          </div>
          <h3 className="font-heading font-black text-3xl sm:text-4xl text-[#F0EAE3] uppercase tracking-tight">
            THE COMPLETE ARCHIVE <span className="text-[#D6B99A]">({projects.length} REPOSITORIES)</span>
          </h3>
        </div>

        <button
          onClick={onReturnToTrain}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#873653] bg-[#5A1832] font-mono text-xs font-bold text-[#F0EAE3] hover:bg-[#873653] shadow-[0_0_15px_rgba(135,54,83,0.35)] transition-all self-start sm:self-auto"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO VANDE BHARAT EXPRESS</span>
        </button>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {[
            { id: 'all', label: `ALL WORK (${projects.length})` },
            { id: 'security', label: 'CYBERSECURITY & RECON' },
            { id: 'distributed', label: 'DISTRIBUTED & CLOUD' },
            { id: 'ai', label: 'AI & ML INTRUSION' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as CategoryFilter)}
              className={`px-3.5 py-1.5 rounded-lg border font-mono text-xs uppercase transition-all ${
                activeFilter === cat.id
                  ? 'bg-[#5A1832] border-[#873653] text-[#F0EAE3] font-bold shadow-[0_0_12px_rgba(135,54,83,0.35)]'
                  : 'bg-[#151116] border-[rgba(214,185,154,0.08)] text-[#969099] hover:text-[#F0EAE3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative max-w-xs w-full">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#969099]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search repository or stack..."
            className="w-full bg-[#151116] border border-[rgba(214,185,154,0.14)] rounded-xl pl-9 pr-4 py-2 font-mono text-xs text-[#F0EAE3] focus:border-[#873653] focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="p-5 rounded-xl bg-[#151116]/90 border border-[rgba(214,185,154,0.1)] flex flex-col justify-between hover:border-[#873653]/60 transition-all group"
          >
            <div>
              {/* Header: Number + Status */}
              <div className="flex items-center justify-between font-mono text-[10px] text-[#969099] mb-2">
                <span className="text-[#D6B99A]">#{String(idx + 1).padStart(2, '0')}</span>
                <span className="text-[#873653] uppercase font-semibold">
                  {project.status || 'COMPLETED'}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-heading font-bold text-base text-[#F0EAE3] uppercase mb-1.5 group-hover:text-[#D6B99A] transition-colors leading-snug">
                {project.title.split('-')[0].trim()}
              </h4>

              {/* Concise summary */}
              <p className="font-mono text-xs text-[#969099] line-clamp-2 leading-relaxed mb-4">
                {project.description}
              </p>
            </div>

            {/* Tech Chips & Actions */}
            <div className="pt-3 border-t border-[rgba(214,185,154,0.08)]">
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {project.technologies.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-[#0A0B0E] border border-[rgba(214,185,154,0.08)] font-mono text-[9px] text-[#F0EAE3]/80"
                  >
                    {t}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-1.5 py-0.5 font-mono text-[9px] text-[#969099]">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => onProjectClick(project)}
                  className="font-mono text-xs text-[#D6B99A] hover:text-[#F0EAE3] inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>INSPECT SPEC</span>
                  <ArrowRight size={11} />
                </button>

                <div className="flex items-center gap-2 text-[#969099]">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:text-[#F0EAE3] transition-colors"
                      aria-label={`GitHub for ${project.title}`}
                    >
                      <Github size={14} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:text-[#D6B99A] transition-colors"
                      aria-label={`Live Demo for ${project.title}`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center font-mono text-xs text-[#969099] border border-[rgba(214,185,154,0.1)] rounded-xl">
          No repositories found matching "{searchQuery}".
        </div>
      )}
    </motion.div>
  );
}
