/**
 * @component CertificationScene
 * @description Scene 07: ACHIEVEMENTS & CREDENTIALS — Validated Certifications & Hackathons
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 * Stylized in Obsidian × Burgundy × Champagne visual direction.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, MapPin, X, Trophy, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../../data';

type CertificationType = (typeof portfolioData.certifications)[number];
type CertCategory = 'all' | 'industry' | 'competition';

export function CertificationScene() {
  const [activeCategory, setActiveCategory] = useState<CertCategory>('all');
  const [selectedCert, setSelectedCert] = useState<CertificationType | null>(null);

  const allCerts = [...portfolioData.certifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredCerts = allCerts.filter((cert) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'competition') return cert.category === 'competition';
    return cert.category !== 'competition';
  });

  // Modal Escape key and body lock
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

  return (
    <section
      id="certification"
      className="relative min-h-screen w-full bg-[#08090B] text-[#F0EAE3] py-24 px-6 md:px-16 border-t border-[rgba(214,185,154,0.12)]"
    >
      {/* SECTION IDENTIFIER HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 max-w-6xl mx-auto">
        <div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-[#F0EAE3]">
            VALIDATED <span className="text-[#873653]">CREDENTIALS</span>.
          </h2>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border border-[rgba(214,185,154,0.12)] bg-[#151116]/90 p-1.5 font-mono text-xs">
          {[
            { id: 'all', label: 'ALL CREDENTIALS' },
            { id: 'industry', label: 'INDUSTRY CERTS' },
            { id: 'competition', label: 'HACKATHONS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as CertCategory)}
              className={`px-3 py-1.5 transition-colors uppercase ${
                activeCategory === tab.id
                  ? 'bg-[#5A1832] border border-[#873653] text-[#F0EAE3] font-bold shadow-[0_0_12px_rgba(135,54,83,0.35)]'
                  : 'text-[#969099] hover:text-[#F0EAE3] border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CERTIFICATES GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert, index) => {
          const isComp = cert.category === 'competition';

          return (
            <motion.div
              key={`${cert.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
              onClick={() => setSelectedCert(cert)}
              className="cursor-pointer group relative border border-[rgba(214,185,154,0.12)] bg-[#151116] p-6 flex flex-col justify-between hover:border-[#873653]/70 hover:shadow-[0_0_25px_rgba(135,54,83,0.22)] transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 border-b border-[rgba(214,185,154,0.1)] pb-3 mb-4 font-mono text-[11px]">
                  <span className="text-[#D6B99A] flex items-center gap-1.5 font-medium">
                    {isComp ? <Trophy size={13} className="text-[#873653]" /> : <Award size={13} className="text-[#873653]" />}
                    {isComp ? 'HACKATHON' : 'CERTIFICATION'}
                  </span>
                  <span className="text-[#969099] flex items-center gap-1">
                    <Calendar size={11} className="text-[#873653]" />
                    {cert.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg text-[#F0EAE3] tracking-tight uppercase group-hover:text-[#873653] transition-colors mb-2 line-clamp-2">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="font-mono text-xs text-[#D6B99A]/80 mb-4 line-clamp-1">
                  {cert.issuer}
                </p>

                {/* Location if present */}
                {cert.location && (
                  <div className="font-mono text-[11px] text-[#969099] flex items-center gap-1.5 mb-4">
                    <MapPin size={11} className="text-[#873653]" />
                    <span>{cert.location}</span>
                  </div>
                )}
              </div>

              {/* Skills Footer */}
              <div className="pt-4 border-t border-[rgba(214,185,154,0.1)] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills?.slice(0, 3).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 bg-white/[0.03] border border-[rgba(214,185,154,0.08)] font-mono text-[10px] text-[#F0EAE3]/70"
                    >
                      {skill}
                    </span>
                  ))}
                  {(cert.skills?.length ?? 0) > 3 && (
                    <span className="font-mono text-[10px] text-[#969099] self-center">
                      +{cert.skills!.length - 3}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-[#D6B99A] group-hover:translate-x-0.5 transition-transform">
                  VIEW →
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FULL CREDENTIAL DETAIL MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#151116] border border-[#873653]/60 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 text-[#969099] hover:text-[#F0EAE3] p-1.5 border border-[rgba(214,185,154,0.1)] hover:border-[#873653] transition-colors"
                aria-label="Close credential details"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="border-b border-[rgba(214,185,154,0.12)] pb-4 mb-6 pr-8">
                <div className="flex items-center gap-2 font-mono text-xs text-[#D6B99A] uppercase tracking-wider mb-2">
                  <Award size={14} className="text-[#873653]" />
                  <span>{selectedCert.category === 'competition' ? 'HACKATHON COMPETITION' : 'INDUSTRY CERTIFICATION'}</span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#F0EAE3] uppercase tracking-tight">
                  {selectedCert.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[#D6B99A] mt-1">
                  Issued by {selectedCert.issuer}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-3 font-mono text-xs text-[#969099]">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#873653]" />
                    <span>{selectedCert.date}</span>
                  </div>
                  {selectedCert.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#873653]" />
                      <span>{selectedCert.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Certificate Image Preview */}
              {selectedCert.image && (
                <div className="mb-6 rounded-lg overflow-hidden border border-[rgba(214,185,154,0.15)] bg-black/60 flex items-center justify-center p-2">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-h-[380px] w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Description */}
              {selectedCert.description && selectedCert.description.some((d: string) => d.trim().length > 0) && (
                <div className="space-y-2 mb-6 font-mono text-xs sm:text-sm text-[#969099] leading-relaxed">
                  {selectedCert.description.map((desc: string, i: number) =>
                    desc.trim() ? (
                      <p key={i} className="border-l border-[rgba(214,185,154,0.15)] pl-3">
                        {desc}
                      </p>
                    ) : null
                  )}
                </div>
              )}

              {/* Competencies / Skills */}
              {selectedCert.skills && selectedCert.skills.length > 0 && (
                <div className="pt-4 border-t border-[rgba(214,185,154,0.12)]">
                  <div className="font-mono text-xs text-[#D6B99A] uppercase tracking-wider mb-3">
                    Validated Competencies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/[0.04] border border-[rgba(214,185,154,0.15)] font-mono text-xs text-[#F0EAE3]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
