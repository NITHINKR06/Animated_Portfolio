import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight, Award, Code2 } from "lucide-react";
import { portfolioData } from "../data/portfolio";

const Experience = () => {
  const { experience } = portfolioData;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header - Apply Scroll-Triggered Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full mb-6">
            <Briefcase size={20} className="text-purple-400" />
            <span className="text-purple-300 font-medium">Professional Journey</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Work <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            My journey of growth, learning, and impact through diverse roles and challenges
          </p>
        </motion.div>

        {/* Cards - Apply Staggered Entry Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-10"
        >
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              variants={{
                // Slide in from left or right based on index
                hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
              }}
              className="relative group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
            >
              {/* Gradient strip on left */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500" />

              <div className="relative p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{exp.position}</h3>
                    <p className="text-lg text-purple-300 font-medium">{exp.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mt-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-pink-400" />
                        <span>{exp.period}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-purple-400" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                      <Briefcase size={24} className="text-white" />
                    </div>
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-xs text-purple-300 hover:text-purple-200 transition-colors"
                    >
                      {expandedIndex === index ? "Show Less" : "Show More"}
                    </button>
                  </div>
                </div>

                {/* Achievements */}
                {exp.achievements && (
                  <motion.div
                    className="flex flex-wrap gap-2 mb-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    {exp.achievements.map((ach, i) => (
                      <motion.div
                        key={i}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { opacity: 1, scale: 1 }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-200"
                      >
                        <Award size={12} />
                        {ach}
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Description */}
                <div className="space-y-3 mb-6">
                  {(expandedIndex === index ? exp.description : exp.description.slice(0, 2)).map(
                    (desc, i) => (
                      <div key={i} className="flex items-start gap-3 group">
                        <div className="mt-1">
                          <ChevronRight
                            size={16}
                            className="text-purple-400 group-hover:text-pink-400 transition-colors"
                          />
                        </div>
                        <p className="text-gray-300 group-hover:text-white transition-colors">
                          {desc}
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* Technologies */}
                {exp.technologies && expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-6 border-t border-white/10"
                  >
                    <motion.h4
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2"
                    >
                      <Code2 size={14} className="text-pink-400" /> Technologies Used
                    </motion.h4>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial="hidden"
                      animate="visible"
                      transition={{ staggerChildren: 0.05 }}
                    >
                      {exp.technologies.map((tech, i) => (
                        <motion.span
                          key={i}
                          variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1 }
                          }}
                          className="px-3 py-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 rounded-lg text-xs border border-purple-500/20"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
