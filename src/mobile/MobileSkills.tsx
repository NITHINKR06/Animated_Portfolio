import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ExternalLink, Code2, Shield, Server, Wrench, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

// Map category names to aesthetic Lucide icons
const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Code2,
  Backend: Server,
  'DevOps & Cloud': Layers,
  Cloud: Layers,
  Tools: Wrench,
  Security: Shield,
};

export function MobileSkills() {
  const { skills } = portfolioData;
  const categories = ['All', ...skills.map((s) => s.category)];
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const displayedSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative w-full bg-[#08090B] text-[#F0EAE3] py-16 px-4 border-t border-[rgba(214,185,154,0.12)]"
    >
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#873653] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#D6B99A]/80">
            SYSTEM 03 · CAPABILITIES
          </span>
        </div>
        <h2 className="font-heading font-black text-3xl tracking-tight uppercase text-[#F0EAE3]">
          TECHNICAL <span className="text-[#873653]">SKILLS</span>.
        </h2>
        <p className="font-mono text-xs text-[#969099] mt-2 leading-relaxed">
          Full-stack architectures, cybersecurity tooling, and cloud infrastructure engineered for production.
        </p>
      </div>

      {/* Category Pills (Horizontal Scrollable) */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none mobile-horizontal-scroll">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const Icon = categoryIcons[cat] || Cpu;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`mobile-touch-target px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 border flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#873653] text-[#F0EAE3] border-[#873653] shadow-[0_0_12px_rgba(135,54,83,0.5)]'
                  : 'bg-[#121318]/80 text-[#969099] border-[rgba(214,185,154,0.12)] active:bg-[#1a1c24]'
              }`}
            >
              {cat !== 'All' && <Icon size={13} className={isActive ? 'text-[#D6B99A]' : 'text-[#969099]'} />}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Groups */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {displayedSkills.map((group) => {
              const GroupIcon = categoryIcons[group.category] || Cpu;

              return (
                <div
                  key={group.category}
                  className="mobile-card p-4 bg-[#0d0e12]/90 border border-[rgba(214,185,154,0.1)] rounded-2xl"
                >
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[rgba(214,185,154,0.08)]">
                    <GroupIcon size={14} className="text-[#873653]" />
                    <h3 className="font-mono text-xs font-semibold tracking-wider uppercase text-[#D6B99A]">
                      {group.category}
                    </h3>
                    <span className="ml-auto font-mono text-[10px] text-[#969099]/70">
                      {group.items.length} tools
                    </span>
                  </div>

                  {/* 2-column or 3-column Grid for fast scanning */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {group.items.map((skill) => (
                      <a
                        key={skill.name}
                        href={skill.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-skill-chip flex items-center justify-between p-2.5 rounded-xl bg-[#13141a] border border-[rgba(214,185,154,0.08)] active:border-[#873653] transition-all group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={skill.logo}
                            alt={skill.name}
                            className="w-5 h-5 object-contain flex-shrink-0"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback if logo fails to load
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <span className="font-mono text-xs text-[#F0EAE3] truncate">
                            {skill.name}
                          </span>
                        </div>
                        <ExternalLink
                          size={11}
                          className="text-[#969099] opacity-40 group-active:opacity-100 flex-shrink-0 ml-1"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
