import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building, X, Trophy } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import type { Certification } from '../data';

export function MobileCertifications() {
  const certifications = portfolioData.certifications;
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const visibleCerts = certifications.slice(0, visibleCount);
  const hasMore = visibleCount < certifications.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, certifications.length));
  };

  const getCleanCertImage = (imagePath?: string) => {
    if (!imagePath) return '';
    if (imagePath === '/certificate/udbhav.webp') return '/certificate/udhbav.webp';
    return imagePath;
  };

  return (
    <section
      id="certification"
      className="relative w-full bg-[#08090B] text-[#F0EAE3] py-16 px-4 border-t border-[rgba(214,185,154,0.12)]"
    >
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#873653] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#D6B99A]/80">
            SYSTEM 07 · CREDENTIALS
          </span>
        </div>
        <h2 className="font-heading font-black text-3xl tracking-tight uppercase text-[#F0EAE3]">
          HONORS & <span className="text-[#873653]">CERTS</span>.
        </h2>
        <p className="font-mono text-xs text-[#969099] mt-2 leading-relaxed">
          Industry accreditations, cybersecurity hackathons, and technical certifications.
        </p>
      </div>

      {/* 2-Column Grid Layout (2 Cards Per Row) */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {visibleCerts.map((cert, index) => {
          const imageSrc = getCleanCertImage(cert.image);

          return (
            <motion.div
              key={`${cert.title}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (index % 4) * 0.05 }}
              onClick={() => setSelectedCert(cert)}
              className="mobile-card flex flex-col overflow-hidden bg-[#0d0e12]/90 border border-[rgba(214,185,154,0.12)] rounded-xl cursor-pointer active:scale-95 transition-all group"
            >
              {/* Certificate Image Thumbnail */}
              <div className="relative w-full aspect-[4/3] bg-[#14151b] overflow-hidden border-b border-[rgba(214,185,154,0.08)]">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#873653]">
                    <Award size={28} />
                  </div>
                )}
                <div className="absolute top-2 right-2 p-1 rounded-md bg-[#08090B]/80 backdrop-blur-md border border-[rgba(214,185,154,0.15)] text-[#D6B99A]">
                  {cert.category === 'competition' ? <Trophy size={11} /> : <Award size={11} />}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-3 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xs text-[#F0EAE3] line-clamp-2 leading-snug mb-1">
                    {cert.title}
                  </h3>
                  <p className="font-mono text-[10px] text-[#969099] line-clamp-1">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-[rgba(214,185,154,0.06)]">
                  <span className="font-mono text-[9px] text-[#D6B99A]/80">{cert.date}</span>
                  <span className="font-mono text-[9px] text-[#873653] font-semibold">View →</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Clean Centered 3-Dots Button */}
      {hasMore && (
        <div className="flex justify-center mt-8 mb-2">
          <button
            type="button"
            onClick={handleLoadMore}
            className="px-7 py-2 rounded-full border border-[rgba(214,185,154,0.2)] bg-[#121318] text-[#D6B99A] text-sm tracking-[0.3em] font-mono hover:border-[#873653] active:scale-95 transition-all shadow-md"
            aria-label="Load more certifications"
          >
            •••
          </button>
        </div>
      )}

      {/* Detail Modal when a Certification Card is tapped */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-sm max-h-[85vh] overflow-y-auto bg-[#0d0e12] border border-[rgba(214,185,154,0.22)] rounded-2xl p-5 shadow-2xl z-10 space-y-4"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#181920] border border-[rgba(214,185,154,0.15)] text-[#969099] active:text-[#F0EAE3]"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {/* Certificate Image */}
              {selectedCert.image && (
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#15161d] border border-[rgba(214,185,154,0.1)]">
                  <img
                    src={getCleanCertImage(selectedCert.image)}
                    alt={selectedCert.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Info */}
              <div>
                <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-[#D6B99A]">
                  <Building size={12} />
                  <span>{selectedCert.issuer}</span>
                </div>
                <h3 className="font-heading font-black text-lg text-[#F0EAE3] leading-snug">
                  {selectedCert.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 font-mono text-[10px] text-[#969099]">
                  <Calendar size={11} />
                  <span>{selectedCert.date}</span>
                </div>
              </div>

              {/* Description if present */}
              {selectedCert.description && (
                <p className="font-mono text-xs text-[#969099] leading-relaxed border-t border-[rgba(214,185,154,0.08)] pt-3">
                  {selectedCert.description}
                </p>
              )}

              {/* Skills */}
              {selectedCert.skills && selectedCert.skills.length > 0 && selectedCert.skills[0] !== '' && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedCert.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md font-mono text-[10px] bg-[#1a1b22] text-[#D6B99A] border border-[rgba(214,185,154,0.1)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Credential Link if present */}
              {(selectedCert.verificationUrl || selectedCert.link) && (
                <a
                  href={selectedCert.verificationUrl || selectedCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-touch-target w-full py-2.5 px-4 rounded-xl font-mono text-xs font-semibold bg-[#873653] text-[#F0EAE3] border border-[#873653] flex items-center justify-center gap-2 active:bg-[#6e2c43]"
                >
                  <span>Verify Credential</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
