/**
 * @component EducationScene
 * @description Scene 05: ACADEMIC RESEARCH — Educational Path & Foundations
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 * Stylized in Obsidian × Burgundy × Champagne visual direction.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen, ShieldCheck, Award } from 'lucide-react';
import { portfolioData } from '../../data';

export function EducationScene() {
  const { education } = portfolioData;

  return (
    <section
      id="education"
      className="relative min-h-screen w-full bg-[#08090B] text-[#F0EAE3] py-24 px-6 md:px-16 border-t border-[rgba(214,185,154,0.12)]"
    >
      {/* SECTION IDENTIFIER HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 max-w-6xl mx-auto">
        <div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-[#F0EAE3]">
            EDUCATIONAL <span className="text-[#873653]">JOURNEY</span>.
          </h2>
        </div>
        <p className="font-mono text-xs sm:text-sm text-[#969099] max-w-md">
          Advanced cybersecurity research, network protocol analysis, and computer science engineering foundations.
        </p>
      </div>

      {/* EDUCATION CARDS GRID */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {education.map((edu, index) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative border border-[rgba(214,185,154,0.12)] bg-[#151116] overflow-hidden flex flex-col justify-between hover:border-[#873653]/60 hover:shadow-[0_0_30px_rgba(135,54,83,0.2)] transition-all duration-300"
          >
            {/* Campus Background Image Banner */}
            {edu.image && (
              <div className="relative h-48 w-full overflow-hidden bg-black/40 border-b border-[rgba(214,185,154,0.1)]">
                <img
                  src={edu.image}
                  alt={edu.institution}
                  className="w-full h-full object-cover object-center grayscale contrast-125 opacity-40 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151116] via-[#151116]/40 to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#08090B]/80 backdrop-blur-md border border-[rgba(214,185,154,0.15)] font-mono text-[11px] text-[#D6B99A] flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#873653]" />
                  <span>{edu.period}</span>
                </div>
              </div>
            )}

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#D6B99A] uppercase tracking-wider mb-2">
                  <GraduationCap size={14} className="text-[#873653]" />
                  <span>{edu.degree}</span>
                </div>

                <h3 className="font-heading font-bold text-2xl text-[#F0EAE3] tracking-tight uppercase group-hover:text-[#873653] transition-colors mb-4">
                  {edu.institution}
                </h3>

                <p className="font-mono text-xs text-[#969099] leading-relaxed mb-6 border-l border-[rgba(214,185,154,0.15)] pl-3">
                  {edu.description}
                </p>
              </div>

              {/* Research & Discipline Highlights */}
              <div className="pt-4 border-t border-[rgba(214,185,154,0.1)] flex flex-wrap gap-2">
                {index === 0 ? (
                  <>
                    <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] font-mono text-[10px] text-[#F0EAE3]/80">
                      Ethical Hacking
                    </span>
                    <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] font-mono text-[10px] text-[#F0EAE3]/80">
                      Network Security
                    </span>
                    <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] font-mono text-[10px] text-[#F0EAE3]/80">
                      Cryptographic Protocols
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] font-mono text-[10px] text-[#F0EAE3]/80">
                      Full Stack Systems
                    </span>
                    <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] font-mono text-[10px] text-[#F0EAE3]/80">
                      Algorithms & Data Structures
                    </span>
                    <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] font-mono text-[10px] text-[#F0EAE3]/80">
                      Distributed Databases
                    </span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
