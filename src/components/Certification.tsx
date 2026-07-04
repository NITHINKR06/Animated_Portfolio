/**
 * @component Certification
 * @description Certification section of the Animated 3D Portfolio
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 *
 * Part of a personal portfolio. Content and design belong to Nithin K R.
 * Code structure may be studied; redistribution as personal portfolio
 * without attribution violates the project license.
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, MapPin, X, Trophy, BookOpen } from 'lucide-react';
import { portfolioData } from '../data';
import { SectionReveal } from './SectionReveal';
import { cn } from '../lib';

type CertificationType = (typeof portfolioData.certifications)[number];
const Certification = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationType | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);
  const [hoveredCompetition, setHoveredCompetition] = useState<number | null>(null);

  const allCertifications = [...portfolioData.certifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Split certifications into competitions and others
  const competitions = allCertifications.filter((cert) => cert.category === 'competition');
  const others = allCertifications.filter((cert) => cert.category === 'other');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  // Render certification cards
  const renderCertCards = (
    certs: CertificationType[],
    hoveredIndex: number | null,
    setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>,
  ) => {
    return certs.map((cert, index) => (
      <motion.div
        key={cert.title}
        variants={{
          hidden: { opacity: 0, scale: 0.8, y: 20 },
          visible: { opacity: 1, scale: 1, y: 0 },
        }}
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => setSelectedCert(cert)}
        className={cn(
          'group cursor-pointer relative rounded-2xl border border-black/10 bg-white/75 backdrop-blur-md overflow-hidden animated-card transition-all duration-300 hover:shadow-lg hover:shadow-black/10',
          hoveredIndex !== null && hoveredIndex !== index && 'blur-sm scale-[0.98] opacity-60',
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-white/25 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative p-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">{cert.title}</h3>
          <p className="text-red-700 text-sm mb-4">{cert.issuer}</p>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-red-400" />
              <span>{cert.date}</span>
            </div>
            {cert.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-red-300" />
                <span>{cert.location}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    ));
  };

  return (
    <section id="certifications" className="py-20 px-4 min-h-screen theme-section-light">
      <div className="max-w-6xl mx-auto">
        {/* Header - shared SectionReveal */}
        <SectionReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full mb-6">
              <Award size={20} className="text-red-400" />
              <span className="text-red-700 font-medium">Achievements & Certifications</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
              My{' '}
              <span className="bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Click any card to view full details and certificate image.
            </p>
          </div>
        </SectionReveal>

        {/* Course Certifications Section */}
        {others.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="text-red-400" size={28} />
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                <span className="bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                  Course Certifications
                </span>
              </h3>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {renderCertCards(others, hoveredCourse, setHoveredCourse)}
            </motion.div>
          </motion.div>
        )}

        {/* Competitions Section */}
        {competitions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            // className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="text-red-300" size={28} />
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                <span className="bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                  Competitions
                </span>
              </h3>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {renderCertCards(competitions, hoveredCompetition, setHoveredCompetition)}
            </motion.div>
          </motion.div>
        )}

        {/* Modal uses the same updated color scheme */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm py-8">
            <div className="relative w-full max-w-3xl mx-4 rounded-2xl overflow-hidden border border-white/10 bg-black/95 my-auto">
              {/* Close button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="p-8 space-y-6 overflow-y-auto max-h-[90vh]">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedCert.title}</h3>
                  <p className="text-red-200 text-lg mb-4">{selectedCert.issuer}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-red-400" />
                      <span>{selectedCert.date}</span>
                    </div>
                    {selectedCert.location && (
                      <div className="flex items-center gap-2">
                <MapPin size={16} className="text-red-300" />
                        <span>{selectedCert.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Certificate Image */}
                {selectedCert.image && (
                  <div className="rounded-xl overflow-hidden border border-white/10 shadow-md shadow-red-500/10">
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}

                {/* Description */}
                <div className="space-y-3">
                  {selectedCert.description.map((desc: string, i: number) => (
                    <p key={i} className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {desc}
                    </p>
                  ))}
                </div>

                {/* Skills */}
                {selectedCert.skills && (
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Skills Gained</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill: string, i: number) => (
                        <span
                          key={i}
                        className="px-3 py-1 text-xs rounded-lg border border-white/10 bg-gradient-to-r from-black to-white/10 text-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export { Certification };
