/**
 * @component Experience
 * @description Master Professional Experience & Engineering Chronology
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 */
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { portfolioData } from '../data';

export const Experience = () => {
  const { experience } = portfolioData;

  if (!experience || experience.length === 0) {
    return null;
  }

  return (
    <section
      id="experience"
      className="relative min-h-screen py-24 md:py-32 px-6 sm:px-10 lg:px-16 bg-[#0A0B0E] text-[#F5F4EE]"
    >
      {/* Background Subtle Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/3 left-10 w-[600px] h-[600px] rounded-full bg-[#D4A373]/[0.012] blur-[160px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-12 md:space-y-16">
        {/* Section Header */}
        <div className="border-b border-white/[0.07] pb-8 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.28em] text-[#D4A373] font-medium">
              04 // Industry Chronology
            </span>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold text-[#F5F4EE] tracking-tight leading-none">
              Work Experience
            </h2>

            <p className="text-[#8E929D] text-sm sm:text-base font-body leading-relaxed">
              A verified track record of production software engineering roles, microservice deployments, and full-stack system architecture.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#8E929D] px-4 py-2 rounded-full border border-white/[0.08] bg-[#12131A]">
            <Briefcase size={13} className="text-[#D4A373]" />
            <span>{experience.length} POSITIONS VERIFIED</span>
          </div>
        </div>

        {/* Continuous Typographic Timeline */}
        <div className="relative border-l border-white/[0.1] ml-3 sm:ml-6 space-y-12 pl-6 sm:pl-10">
          {experience.map((exp, index) => (
            <div key={exp.company + index} className="relative group">
              {/* Timeline Pip */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0A0B0E] border-2 border-[#D4A373] flex items-center justify-center group-hover:scale-125 transition-transform" />

              {/* Role Card */}
              <div className="rounded-2xl bg-[#12131A] border border-white/[0.07] p-6 sm:p-8 space-y-5 hover:border-[#D4A373]/40 transition-all duration-300 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/[0.06] pb-4">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#F5F4EE] group-hover:text-[#D4A373] transition-colors tracking-tight">
                      {exp.position}
                    </h3>
                    <div className="text-sm font-sans font-medium text-[#D4A373]">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#8E929D]">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#D4A373]" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#8E929D]" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Description Bullets */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#DCD9CE] font-body leading-relaxed list-disc list-outside pl-4">
                  {exp.description.map((desc, dIdx) => (
                    <li key={dIdx}>{desc}</li>
                  ))}
                </ul>

                {/* Technologies Used */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-3 border-t border-white/[0.04] flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-white/[0.03] text-[11px] font-mono text-[#8E929D]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
