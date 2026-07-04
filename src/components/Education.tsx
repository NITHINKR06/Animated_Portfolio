/**
 * @component Education
 * @description Education section of the Animated 3D Portfolio
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 *
 * Part of a personal portfolio. Content and design belong to Nithin K R.
 * Code structure may be studied; redistribution as personal portfolio
 * without attribution violates the project license.
 */
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { portfolioData } from '../data';
import { useState } from 'react';
import { SectionReveal } from './SectionReveal';

export const Education = () => {
  const { education } = portfolioData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="education" className="py-20 px-4 theme-section-light">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Educational <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xl text-slate-600">Academic background and learning path</p>
          </div>
        </SectionReveal>

        <div className="relative">
          {/* Tree trunk/timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 via-red-400 to-red-500 rounded-full hidden md:block" />

          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Branch connection */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-red-500 to-red-400 rounded-full" />

                {/* Tree node (lightweight pulse animation) */}
                <motion.div
                  className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-red-500 to-red-400 rounded-full z-10 border-4 border-black"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />

                {/* Content card */}
                <motion.div
                  className={`flex-1 max-w-md mx-auto md:mx-0 ${
                    index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                  } relative group transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02]`}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="glass-card p-6 rounded-2xl overflow-hidden relative">
                    {/* College Image Overlay on Hover (pure CSS fade) */}
                    {edu.image && (
                      <div
                        className={`absolute inset-0 z-50 rounded-2xl overflow-hidden pointer-events-none transition-opacity duration-300 ease-out ${
                          hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-10" />
                        <img
                          src={edu.image}
                          alt={edu.institution}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                          <h3 className="text-2xl font-bold text-white mb-2">{edu.institution}</h3>
                          <p className="text-red-300 text-lg">{edu.degree}</p>
                        </div>
                      </div>
                    )}

                    <motion.div
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.3 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="p-2 bg-gradient-to-r from-red-500 to-red-400 rounded-lg"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      >
                        <GraduationCap size={24} className="text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                        <p className="text-red-300">{edu.institution}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-2 mb-4 text-gray-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.3 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Calendar size={16} className="text-red-400" />
                      <span>{edu.period}</span>
                    </motion.div>

                    {edu.description && (
                      <motion.p
                        className="text-gray-300 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.3 + 0.4 }}
                        viewport={{ once: true }}
                      >
                        {edu.description}
                      </motion.p>
                    )}

                    {/* Decorative elements */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-red-400 to-red-500 rounded-full opacity-60"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                  </div>
                </motion.div>

                {/* Mobile timeline dot */}
                <div className="md:hidden absolute left-4 top-6 w-4 h-4 bg-gradient-to-r from-red-500 to-red-400 rounded-full" />
              </motion.div>
            ))}
          </div>

          {/* Tree roots effect */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 opacity-30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-b from-red-500 to-transparent rounded-full"
                  style={{ height: `${20 + i * 4}px` }}
                  animate={{
                    height: [`${20 + i * 4}px`, `${25 + i * 4}px`, `${20 + i * 4}px`],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
