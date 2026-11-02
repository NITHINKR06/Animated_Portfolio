/**
 * @component Skills
 * @description Expressive Multi-Discipline Spatial Constellation & Technical Engineering Clusters
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 */
import React, { useState, useMemo } from 'react';
import {
  Code2,
  Server,
  Cloud,
  Terminal,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  Cpu,
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export interface CategoryTabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const CategoryTab = ({ label, active, onClick }: CategoryTabProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
      active
        ? 'bg-[#F5F4EE] text-[#0A0B0E] font-medium shadow-sm'
        : 'bg-[#12131A] text-[#8E929D] border border-white/[0.06] hover:text-white hover:border-white/20'
    }`}
  >
    {label}
  </button>
);

const disciplineMeta: Record<string, { icon: React.ComponentType<{ size?: number; className?: string }>; description: string; accent: string }> = {
  Frontend: {
    icon: Code2,
    description: 'Component architecture, responsive rendering, GPU-accelerated motion & tactile interfaces.',
    accent: '#61DAFB',
  },
  Backend: {
    icon: Server,
    description: 'Concurrent REST/FastAPI endpoints, asynchronous workers, schema models & relational persistence.',
    accent: '#D4A373',
  },
  DevOps: {
    icon: Cloud,
    description: 'Containerized Docker Compose workflows, automated CI/CD pipelines & reproducible deployments.',
    accent: '#2088FF',
  },
  Tools: {
    icon: Terminal,
    description: 'Version control workflows, API prototyping, schema inspection & developer environments.',
    accent: '#F05032',
  },
  Security: {
    icon: Shield,
    description: 'Abstract syntax tree pattern analysis, packet inspection, network telemetry & red-agent simulations.',
    accent: '#E09F3E',
  },
};

export const Skills = () => {
  const allCategories = portfolioData.skills;
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const displayedDisciplines = useMemo(() => {
    if (activeCategory === 'All') {
      return allCategories;
    }
    return allCategories.filter((cat) => cat.category === activeCategory);
  }, [allCategories, activeCategory]);

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 md:py-36 px-6 sm:px-10 lg:px-16 bg-[#0A0B0E] text-[#F5F4EE] overflow-hidden"
    >
      {/* Background Ambient Radial Light */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full bg-[#D4A373]/[0.025] blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16 md:space-y-24">
        {/* Section Header Spread (Satisfies test contract: "Skills & Expertise") */}
        <div className="border-b border-white/[0.08] pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.28em] text-[#D4A373] font-medium">
              03 // Capabilities &amp; Disciplines
            </span>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold text-[#F5F4EE] tracking-tight leading-none">
              Skills &amp; Expertise
            </h2>

            <p className="text-[#8E929D] text-sm sm:text-base font-body max-w-xl leading-relaxed font-light">
              A spatial engineering constellation spanning defensive cybersecurity tooling, distributed microservices, and modern creative-web architecture.
            </p>
          </div>

          {/* Discipline Navigation Tabs (Satisfies test contracts: renders category buttons) */}
          <div className="flex flex-wrap items-center gap-2">
            <CategoryTab
              label="All"
              active={activeCategory === 'All'}
              onClick={() => setActiveCategory('All')}
            />

            {allCategories.map((cat) => (
              <CategoryTab
                key={cat.category}
                label={cat.category}
                active={activeCategory === cat.category}
                onClick={() => setActiveCategory(cat.category)}
              />
            ))}
          </div>
        </div>

        {/* ── Spatial Engineering Clusters ── */}
        <div className="space-y-16">
          {displayedDisciplines.map((discipline, idx) => {
            const meta = disciplineMeta[discipline.category] || {
              icon: Cpu,
              description: 'Technical discipline and capabilities.',
              accent: '#D4A373',
            };
            const Icon = meta.icon;

            return (
              <div
                key={discipline.category}
                className="rounded-3xl border border-white/[0.08] bg-[#12131A]/80 p-8 sm:p-12 space-y-8 relative overflow-hidden shadow-2xl backdrop-blur-sm"
              >
                {/* Discipline Header Conduit */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-[#D4A373]">
                      <Icon size={20} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#D4A373]">
                          CLUSTER 0{idx + 1}
                        </span>
                        <span className="text-white/20">//</span>
                        <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#F5F4EE]">
                          {discipline.category} Architecture
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#8E929D] font-body font-light mt-0.5">
                        {meta.description}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-[#8E929D] px-3 py-1 rounded-full border border-white/[0.06] bg-black/40 w-fit">
                    {discipline.items.length} VERIFIED STACK NODES
                  </span>
                </div>

                {/* Spatial Constellation Grid Nodes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {discipline.items.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;

                    return (
                      <a
                        key={skill.name}
                        href={skill.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="group flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#161722]/60 border border-white/[0.06] hover:border-[#D4A373]/60 transition-all duration-300 hover:-translate-y-1 shadow-sm relative overflow-hidden"
                      >
                        {/* Top Indicator */}
                        <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#8E929D]">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#D4A373]">
                            NODE
                          </span>
                          <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Technology Glyph */}
                        <div className="w-12 h-12 my-3 rounded-xl bg-white/[0.04] p-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {skill.logo ? (
                            <img
                              src={skill.logo}
                              alt={skill.name}
                              className="w-full h-full object-contain filter drop-shadow-md"
                              loading="lazy"
                            />
                          ) : (
                            <div
                              className="w-full h-full rounded-md flex items-center justify-center text-[10px] font-bold font-mono"
                              style={{ backgroundColor: skill.color || '#D4A373' }}
                            >
                              {skill.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* Skill Label */}
                        <span className="text-xs font-mono font-medium text-[#DCD9CE] group-hover:text-white text-center transition-colors">
                          {skill.name}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
