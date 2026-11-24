import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Layers,
  ChevronRight,
  Code2,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import type { Project } from '../data';

interface MobileProjectsProps {
  onProjectClick?: (project: Project) => void;
}

export function MobileProjects({ onProjectClick }: MobileProjectsProps) {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState<'all' | 'high'>('all');
  const [visibleCount, setVisibleCount] = useState<number>(4);

  const filteredProjects =
    filter === 'high' ? projects.filter((p) => p.priority === 'high') : projects;

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleFilterChange = (newFilter: 'all' | 'high') => {
    setFilter(newFilter);
    setVisibleCount(4); // Reset to first 4 on filter change
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, filteredProjects.length));
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-[#08090B] text-[#F0EAE3] py-16 px-4 border-t border-[rgba(214,185,154,0.12)]"
    >
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#873653] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#D6B99A]/80">
            SYSTEM 06 · DEPLOYMENTS
          </span>
        </div>
        <div className="flex items-end justify-between">
          <h2 className="font-heading font-black text-3xl tracking-tight uppercase text-[#F0EAE3]">
            FEATURED <span className="text-[#873653]">PROJECTS</span>.
          </h2>
        </div>
        <p className="font-mono text-xs text-[#969099] mt-2 leading-relaxed">
          Production systems, security analyzers, and high-concurrency microservices.
        </p>
      </div>

      {/* Filter Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => handleFilterChange('all')}
          className={`mobile-touch-target px-4 py-1.5 rounded-full text-xs font-mono border transition-all ${
            filter === 'all'
              ? 'bg-[#873653] text-[#F0EAE3] border-[#873653]'
              : 'bg-[#121318] text-[#969099] border-[rgba(214,185,154,0.12)]'
          }`}
        >
          All ({projects.length})
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange('high')}
          className={`mobile-touch-target px-4 py-1.5 rounded-full text-xs font-mono border transition-all ${
            filter === 'high'
              ? 'bg-[#873653] text-[#F0EAE3] border-[#873653]'
              : 'bg-[#121318] text-[#969099] border-[rgba(214,185,154,0.12)]'
          }`}
        >
          Flagship Only
        </button>
      </div>

      {/* Projects List (Progressive Loading - 4 at a time) */}
      <div className="space-y-6 mb-6">
        {visibleProjects.map((project, index) => {
          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (index % 4) * 0.06 }}
              className="mobile-card overflow-hidden bg-[#0d0e12]/95 border border-[rgba(214,185,154,0.14)] rounded-2xl shadow-lg"
            >
              {/* Optional Thumbnail Image */}
              {project.thumbnail && (
                <div className="relative w-full h-44 bg-[#14151b] overflow-hidden border-b border-[rgba(214,185,154,0.08)]">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover object-center opacity-85"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).parentElement?.classList.add('hidden');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-transparent" />
                  {project.priority === 'high' && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md font-mono text-[10px] uppercase font-bold tracking-wider bg-[#873653] text-[#F0EAE3] border border-[#D6B99A]/30">
                      Flagship
                    </span>
                  )}
                </div>
              )}

              <div className="p-5">
                {/* Status & Category */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6B99A]" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#D6B99A]">
                    {project.status || 'Active'}
                  </span>
                  {!project.thumbnail && project.priority === 'high' && (
                    <span className="ml-auto px-2 py-0.5 rounded font-mono text-[10px] uppercase bg-[#873653]/30 text-[#D6B99A] border border-[#873653]">
                      Flagship
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="font-heading font-bold text-xl text-[#F0EAE3] leading-snug mb-2.5">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="font-mono text-xs text-[#969099] line-clamp-3 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md font-mono text-[10px] bg-[#1a1b22] text-[#D6B99A]/90 border border-[rgba(214,185,154,0.1)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-1.5 py-0.5 rounded-md font-mono text-[10px] text-[#969099]">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-[rgba(214,185,154,0.08)]">
                  {onProjectClick && (
                    <button
                      type="button"
                      onClick={() => onProjectClick(project)}
                      className="mobile-touch-target flex-1 py-2 px-3 rounded-xl font-mono text-xs font-semibold bg-[#873653] text-[#F0EAE3] border border-[#873653] flex items-center justify-center gap-1.5 active:bg-[#6e2c43]"
                    >
                      <span>Read Specs</span>
                      <ChevronRight size={14} />
                    </button>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-touch-target px-3.5 py-2 rounded-xl font-mono text-xs bg-[#151720] text-[#F0EAE3] border border-[rgba(214,185,154,0.15)] flex items-center justify-center gap-1.5 active:bg-[#1f2230]"
                      aria-label="View Source Code"
                    >
                      <Github size={15} />
                      <span>Code</span>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-touch-target px-3 py-2 rounded-xl font-mono text-xs bg-[#151720] text-[#D6B99A] border border-[rgba(214,185,154,0.15)] flex items-center justify-center"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Progressive Load: 3-Dots Button */}
      {hasMore && (
        <button
          type="button"
          onClick={handleLoadMore}
          className="mobile-touch-target w-full py-3.5 px-4 rounded-xl font-mono text-xs font-semibold bg-[#121318] text-[#D6B99A] border border-[rgba(214,185,154,0.18)] active:bg-[#1a1b24] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <span className="tracking-widest font-black text-sm text-[#873653]">• • •</span>
          <span>
            Load More Projects ({visibleProjects.length} of {filteredProjects.length})
          </span>
        </button>
      )}
    </section>
  );
}
