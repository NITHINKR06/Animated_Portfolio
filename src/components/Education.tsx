import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Education = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Educational <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-xl text-gray-300">
            Academic background and learning path
          </p>
        </motion.div>

        <div className="relative">
          {/* Tree trunk/timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-full hidden md:block" />

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
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                
                {/* Tree node */}
                <motion.div
                  className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full z-10 border-4 border-black"
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(168, 85, 247, 0.4)',
                      '0 0 0 20px rgba(168, 85, 247, 0)',
                      '0 0 0 0 rgba(168, 85, 247, 0)'
                    ]
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
                  }`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="glass-card p-6 rounded-2xl">
                    <motion.div
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.3 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
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
                        <h3 className="text-xl font-bold text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-purple-300">{edu.institution}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-2 mb-4 text-gray-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.3 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Calendar size={16} className="text-pink-400" />
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
                      className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-60"
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
                <div className="md:hidden absolute left-4 top-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
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
                  className="w-1 bg-gradient-to-b from-purple-500 to-transparent rounded-full"
                  style={{ height: `${20 + i * 4}px` }}
                  animate={{
                    height: [
                      `${20 + i * 4}px`,
                      `${25 + i * 4}px`,
                      `${20 + i * 4}px`
                    ],
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