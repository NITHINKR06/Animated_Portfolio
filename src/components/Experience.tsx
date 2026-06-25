/**
 * @component Experience
 * @description Experience section of the Animated 3D Portfolio
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 *
 * Part of a personal portfolio. Content and design belong to Nithin K R.
 * Code structure may be studied; redistribution as personal portfolio
 * without attribution violates the project license.
 */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, ChevronRight, Code2, Award, CheckCircle2 } from "lucide-react";
import { portfolioData } from "../data/portfolio";
import { SectionReveal } from "./SectionReveal";

const Experience = () => {
  const { experience } = portfolioData;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!experience || experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-24 px-4 min-h-screen relative bg-slate-950/10">
      <div className="relative max-w-5xl mx-auto z-10">
        
        {/* Header */}
        <SectionReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <Briefcase size={16} className="text-purple-400" />
              <span className="text-purple-300 font-medium text-xs tracking-wider uppercase">Professional Path</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Work <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A record of my professional roles, key contributions, and engineering milestones.
            </p>
          </div>
        </SectionReveal>

        {/* Modern Dark Log Cards List */}
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-md shadow-xl overflow-hidden group hover:border-purple-500/20 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/5"
            >
              {/* Soft Ambient Background Glows */}
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

              {/* Columns */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                
                {/* LEFT COLUMN: Metadata & Date */}
                <div className="md:border-r md:border-white/5 md:pr-6 flex flex-col justify-start">
                  <h4 className="text-xl font-bold text-white tracking-tight">{exp.period}</h4>
                  
                  {exp.location && (
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                      <MapPin size={14} className="text-purple-400" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN: Position, Company & Description details */}
                <div className="md:col-span-3 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{exp.position}</h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
                      <Briefcase size={12} className="text-purple-400" />
                      {exp.company}
                    </span>
                  </div>

                  {/* Sliced Description bullet points */}
                  <div className="space-y-3">
                    {exp.description.slice(0, 2).map((desc, i) => (
                      <div key={i} className="flex items-start gap-3 group/item">
                        <ChevronRight
                          size={16}
                          className="text-purple-400 shrink-0 mt-0.5"
                        />
                        <p className="text-gray-300 group-hover/item:text-white transition-colors duration-200 leading-relaxed text-sm">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Expand button */}
                  {exp.description.length > 2 || (exp.responsibilities && exp.responsibilities.length > 0) || (exp.achievements && exp.achievements.length > 0) ? (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-gray-300 hover:text-white border border-white/10 hover:border-purple-500/25 transition-all duration-300"
                    >
                      <span>{expandedIndex === index ? "Show Less" : "Show More"}</span>
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={14} />
                      </motion.div>
                    </button>
                  ) : null}

                  {/* Collapsible details panel */}
                  <AnimatePresence initial={false}>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        {/* Remainder of the description */}
                        {exp.description.length > 2 && (
                          <div className="space-y-3 pt-3">
                            {exp.description.slice(2).map((desc, i) => (
                              <div key={i} className="flex items-start gap-3 group/item">
                                <ChevronRight
                                  size={16}
                                  className="text-purple-400 shrink-0 mt-0.5"
                                />
                                <p className="text-gray-300 group-hover/item:text-white transition-colors duration-200 leading-relaxed text-sm">
                                  {desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Responsibilities */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div className="mt-6 pt-6 border-t border-white/5">
                            <h4 className="text-sm font-semibold text-purple-300 flex items-center gap-2 mb-3">
                              <CheckCircle2 size={16} className="text-purple-400" /> Key Responsibilities
                            </h4>
                            <ul className="space-y-2.5 pl-2">
                              {exp.responsibilities.map((resp, i) => (
                                <li key={i} className="text-gray-400 text-sm flex items-start gap-2.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                                  <span className="leading-relaxed">{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Achievements */}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="mt-6 pt-6 border-t border-white/5">
                            <h4 className="text-sm font-semibold text-pink-300 flex items-center gap-2 mb-3">
                              <Award size={16} className="text-pink-400" /> Key Achievements
                            </h4>
                            <ul className="space-y-2.5 pl-2">
                              {exp.achievements.map((ach, i) => (
                                <li key={i} className="text-gray-400 text-sm flex items-start gap-2.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 shrink-0" />
                                  <span className="leading-relaxed">{ach}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Technologies */}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="mt-6 pt-6 border-t border-white/5">
                            <h4 className="text-sm font-semibold text-gray-400 flex items-center gap-2 mb-3">
                              <Code2 size={14} className="text-pink-400" /> Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/20 text-gray-300 hover:text-white rounded-full text-xs transition-all duration-300 cursor-default"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export { Experience };
