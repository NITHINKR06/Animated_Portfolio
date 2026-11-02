/**
 * @component Education
 * @description Master Academic Pedigree & Institutional Registry
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 */
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { portfolioData } from '../data';

export const Education = () => {
  const { education } = portfolioData;

  return (
    <section
      id="education"
      className="relative min-h-screen py-24 md:py-32 px-6 sm:px-10 lg:px-16 bg-[#0E0F14] text-[#F5F4EE]"
    >
      {/* Background Subtle Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/4 right-10 w-[550px] h-[550px] rounded-full bg-[#D4A373]/[0.015] blur-[160px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-12 md:space-y-16">
        {/* Section Header */}
        <div className="border-b border-white/[0.07] pb-8 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.28em] text-[#D4A373] font-medium">
              05 // Academic Registry
            </span>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold text-[#F5F4EE] tracking-tight leading-none">
              Educational Journey
            </h2>

            <p className="text-[#8E929D] text-sm sm:text-base font-body leading-relaxed">
              Computer science foundation, software engineering curriculum, and technical milestones.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#8E929D] px-4 py-2 rounded-full border border-white/[0.08] bg-[#12131A]">
            <GraduationCap size={13} className="text-[#D4A373]" />
            <span>DEGREE VERIFIED</span>
          </div>
        </div>

        {/* Institutional Dossiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {education.map((edu) => (
            <div
              key={edu.institution}
              className="group relative flex flex-col justify-between rounded-2xl bg-[#12131A] border border-white/[0.07] hover:border-[#D4A373]/40 shadow-xl overflow-hidden transition-all duration-300"
            >
              <div>
                {/* Institutional Campus Banner */}
                {edu.image && (
                  <div className="relative w-full h-44 overflow-hidden bg-[#161722] border-b border-white/[0.06]">
                    <img
                      src={edu.image}
                      alt={edu.institution}
                      className="w-full h-full object-cover object-center opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12131A] via-[#12131A]/40 to-transparent" />

                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0B0E]/85 backdrop-blur-md border border-white/10 text-xs font-mono text-[#D4A373]">
                      <Calendar size={12} />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                )}

                <div className="p-7 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-sans font-bold text-[#F5F4EE] group-hover:text-[#D4A373] transition-colors tracking-tight">
                      {edu.degree}
                    </h3>
                    <div className="text-sm font-sans font-medium text-[#D4A373]">
                      {edu.institution}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#8E929D] font-body leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>

              {/* Achievements Footer */}
              {edu.achievements && edu.achievements.length > 0 && (
                <div className="px-7 pb-7 pt-2 border-t border-white/[0.04]">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E929D] font-medium block">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#DCD9CE] font-sans">
                      {edu.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <Award size={13} className="text-[#D4A373] flex-shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
