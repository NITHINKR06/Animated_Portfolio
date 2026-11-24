/**
 * @component ProjectArchive
 * @description Compact Editorial Repository Archive for all 20+ Engineering Projects
 * Visually secondary to the 4 flagship projects, providing fast search, filtering, GitHub access, and modal inspection.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Github, ExternalLink, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { Project } from '../../../data';

interface ProjectArchiveProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

type ArchiveFilter = 'all' | 'security' | 'web' | 'systems';

export function ProjectArchive({ projects, onProjectClick }: ProjectArchiveProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ArchiveFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Search matching
      const matchesSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Filter category matching
      if (activeFilter === 'all') return true;
      if (activeFilter === 'security') {
        const titleLower = p.title.toLowerCase();
        const techJoined = p.technologies.join(' ').toLowerCase();
        return (
          titleLower.includes('defense') ||
          titleLower.includes('attack') ||
          titleLower.includes('packet') ||
          titleLower.includes('scanner') ||
          titleLower.includes('security') ||
          titleLower.includes('cipher') ||
          titleLower.includes('hash') ||
          titleLower.includes('hardening') ||
          techJoined.includes('security') ||
          techJoined.includes('sha') ||
          p.id.includes('cyb') ||
          p.id.includes('kali')
        );
      }
      if (activeFilter === 'systems') {
        return (
          p.technologies.some((t) =>
            ['Python', 'C++', 'Docker', 'Linux', 'Go', 'FastAPI', 'Redis', 'PostgreSQL'].includes(t)
          ) || p.id.includes('driftguard')
        );
      }
      if (activeFilter === 'web') {
        return p.technologies.some((t) =>
          ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS'].includes(t)
        );
      }
      return true;
    });
  }, [projects, activeFilter, searchQuery]);

  return (
    <div className="mt-20 pt-10 border-t border-[rgba(214,185,154,0.12)]">
      {/* Archive Header / Toggle Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#873653] mb-1">
            <span>[ SYSTEM REPOSITORY INDEX ]</span>
          </div>
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#F0EAE3] uppercase tracking-tight">
            THE COMPLETE ARCHIVE <span className="text-[#D6B99A]">({projects.length} ARTIFACTS)</span>
          </h3>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(214,185,154,0.18)] bg-[#151116] font-mono text-xs text-[#F0EAE3] hover:border-[#873653] hover:text-[#D6B99A] transition-colors self-start sm:self-auto"
        >
          <span>{isOpen ? 'COLLAPSE ARCHIVE' : 'EXPAND COMPLETE CATALOG'}</span>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden mt-8 space-y-6"
          >
            {/* Filter Bar & Quick Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(214,185,154,0.1)] pb-4">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {[
                  { id: 'all', label: `ALL (${projects.length})` },
                  { id: 'security', label: 'SECURITY & RECON' },
                  { id: 'systems', label: 'SYSTEMS & ML' },
                  { id: 'web', label: 'FULL STACK & APPS' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id as ArchiveFilter)}
                    className={`px-3 py-1.5 rounded-lg border font-mono text-xs uppercase transition-all ${
                      activeFilter === f.id
                        ? 'bg-[#5A1832] border-[#873653] text-[#F0EAE3] font-bold shadow-[0_0_12px_rgba(135,54,83,0.35)]'
                        : 'bg-[#151116] border-[rgba(214,185,154,0.08)] text-[#969099] hover:text-[#F0EAE3]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative max-w-xs w-full">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#969099]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search repository or stack..."
                  className="w-full bg-[#151116] border border-[rgba(214,185,154,0.12)] rounded-lg pl-9 pr-3 py-2 font-mono text-xs text-[#F0EAE3] focus:border-[#873653] focus:outline-none"
                />
              </div>
            </div>

            {/* Compact Editorial Table / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredProjects.map((p, idx) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-[#151116]/80 border border-[rgba(214,185,154,0.1)] flex flex-col justify-between hover:border-[#873653]/60 transition-all group"
                >
                  <div>
                    {/* Header: ID + Status */}
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#969099] mb-2">
                      <span className="text-[#D6B99A]">#{String(idx + 1).padStart(2, '0')}</span>
                      <span className="text-[#873653] uppercase font-semibold">
                        {p.status || 'COMPLETED'}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-heading font-bold text-base text-[#F0EAE3] uppercase mb-1.5 group-hover:text-[#D6B99A] transition-colors leading-snug">
                      {p.title.split('-')[0].trim()}
                    </h4>

                    {/* One-line concise summary */}
                    <p className="font-mono text-xs text-[#969099] line-clamp-2 leading-relaxed mb-3">
                      {p.description}
                    </p>
                  </div>

                  {/* Tech stack tags */}
                  <div className="pt-2 border-t border-[rgba(214,185,154,0.08)]">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-[#0A0B0E] border border-[rgba(214,185,154,0.08)] font-mono text-[9px] text-[#F0EAE3]/80"
                        >
                          {t}
                        </span>
                      ))}
                      {p.technologies.length > 3 && (
                        <span className="px-1.5 py-0.5 font-mono text-[9px] text-[#969099]">
                          +{p.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => onProjectClick(p)}
                        className="font-mono text-xs text-[#D6B99A] hover:text-[#F0EAE3] inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>INSPECT SPEC</span>
                        <ArrowRight size={11} />
                      </button>

                      <div className="flex items-center gap-2 text-[#969099]">
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded hover:text-[#F0EAE3] transition-colors"
                            aria-label={`GitHub Repository for ${p.title}`}
                          >
                            <Github size={14} />
                          </a>
                        )}
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded hover:text-[#D6B99A] transition-colors"
                            aria-label={`Live Demo for ${p.title}`}
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
              <div className="p-8 text-center font-mono text-xs text-[#969099] border border-[rgba(214,185,154,0.1)] rounded-xl">
                No matching repositories found for "{searchQuery}".
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
