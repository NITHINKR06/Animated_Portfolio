/**
 * @component ExperienceScene
 * @description Scene 04: PROFESSIONAL PATH — Spatial Work Experience
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 * Stylized in Obsidian × Burgundy × Champagne visual direction.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building2, Terminal, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../../data';

export function ExperienceScene() {
  const { experience } = portfolioData;

  return (
    <section
      id="experience"
      className="relative min-h-screen w-full bg-[#08090B] text-[#F0EAE3] py-24 px-6 md:px-16 border-t border-[rgba(214,185,154,0.12)]"
    >
      {/* SECTION IDENTIFIER HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 max-w-6xl mx-auto">
        <div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-[#F0EAE3]">
            WORK <span className="text-[#873653]">EXPERIENCE</span>.
          </h2>
        </div>
        <p className="font-mono text-xs sm:text-sm text-[#969099] max-w-md">
          Engineering scalable web architectures, real-time microservices, and AI-driven platforms across startup environments.
        </p>
      </div>

      {/* TIMELINE SPATIAL RAIL */}
      <div className="relative max-w-5xl mx-auto">
        {/* Central Vertical Burgundy Laser Guide */}
        <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#873653] via-[#5A1832]/60 to-transparent pointer-events-none" />

        <div className="space-y-14">
          {experience.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={`${exp.company}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className={`relative flex flex-col md:flex-row gap-8 items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Central Waypoint Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-[#873653] bg-[#08090B] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(135,54,83,0.5)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D6B99A]" />
                </div>

                {/* Content Card (Left or Right on desktop) */}
                <div
                  className="ml-12 md:ml-0 md:w-[45%] border border-[rgba(214,185,154,0.12)] p-6 sm:p-8 bg-[#151116] transition-all duration-300 group hover:border-[#873653]/60 hover:shadow-[0_0_25px_rgba(135,54,83,0.18)]"
                >
                  {/* Category & Period Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(214,185,154,0.1)] pb-3 mb-4 font-mono text-[11px]">
                    <span className="text-[#D6B99A] font-semibold tracking-wider flex items-center gap-1.5">
                      <Building2 size={13} className="text-[#873653]" />
                      {exp.company}
                    </span>
                    <span className="text-[#969099] flex items-center gap-1.5">
                      <Calendar size={12} className="text-[#873653]" />
                      {exp.period}
                    </span>
                  </div>

                  {/* Title & Position */}
                  <h3 className="font-heading font-bold text-2xl text-[#F0EAE3] tracking-tight uppercase group-hover:text-[#873653] transition-colors">
                    {exp.position}
                  </h3>

                  {/* Location telemetry */}
                  {exp.location && (
                    <div className="font-mono text-[11px] text-[#969099] flex items-center gap-1.5 mt-1.5 mb-4">
                      <MapPin size={12} className="text-[#873653]" />
                      <span>{exp.location}</span>
                    </div>
                  )}

                  {/* Description Details */}
                  <div className="space-y-2.5 mb-6 font-mono text-xs text-[#969099] leading-relaxed">
                    {exp.description.map((desc, dIdx) => (
                      <p key={dIdx} className="border-l border-[rgba(214,185,154,0.15)] pl-3">
                        {desc}
                      </p>
                    ))}
                  </div>

                  {/* Achievements if any */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mb-4 pt-3 border-t border-[rgba(214,185,154,0.1)]">
                      <div className="font-mono text-[10px] tracking-wider uppercase text-[#D6B99A] mb-2 flex items-center gap-1.5">
                        <CheckCircle2 size={11} className="text-[#873653]" /> Key Achievements
                      </div>
                      <div className="space-y-1">
                        {exp.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="font-mono text-[11px] text-[#F0EAE3]/70">
                            • {ach}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack badges */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-[rgba(214,185,154,0.1)]">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] font-mono text-[10px] text-[#F0EAE3]/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Counterbalance Spacer for 50/50 Desktop Alignment */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
