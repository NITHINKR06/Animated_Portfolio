/**
 * @component CertificationScene
 * @description Scene 07: ACHIEVEMENTS & CREDENTIALS — Validated Certifications & Hackathons
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 * Stylized in Obsidian × Burgundy × Champagne visual direction.
 *
 * Minimalist Card Architecture:
 * - Card face displays strictly: Name, Year, Type, and Mode (Online / Offline)
 * - Zero text dump / clutter on the card surface
 * - Full interactive modal with certificate image, issuer, and description on click
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Calendar,
  MapPin,
  X,
  Trophy,
  BookOpen,
  Terminal,
  Globe,
  ArrowUpRight,
} from 'lucide-react';
import { portfolioData } from '../../data';

type CertificationType = (typeof portfolioData.certifications)[number];
type CertCategory = 'all' | 'industry' | 'competition' | 'online' | 'offline';

function getYear(dateStr?: string): string {
  if (!dateStr) return '2025';
  const match = dateStr.match(/\d{4}/);
  return match ? match[0] : dateStr;
}

function getMode(cert: CertificationType): 'ONLINE' | 'OFFLINE' {
  if (cert.location) {
    if (cert.location.toLowerCase().includes('online')) return 'ONLINE';
    if (cert.location.toLowerCase().includes('offline')) return 'OFFLINE';
  }
  const issuer = (cert.issuer || '').toLowerCase();
  const title = (cert.title || '').toLowerCase();
  if (
    issuer.includes('oracle') ||
    issuer.includes('microsoft') ||
    issuer.includes('nptel') ||
    issuer.includes('hashgraph') ||
    title.includes('online')
  ) {
    return 'ONLINE';
  }
  return 'OFFLINE';
}

function getType(cert: CertificationType): {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
} {
  const title = cert.title.toLowerCase();
  if (title.includes('hackathon') || title.includes('ctf')) {
    return { label: 'HACKATHON', icon: Trophy };
  }
  if (title.includes('workshop')) {
    return { label: 'WORKSHOP', icon: Terminal };
  }
  if (title.includes('course')) {
    return { label: 'COURSE', icon: BookOpen };
  }
  if (title.includes('tech fest')) {
    return { label: 'TECH FEST', icon: Trophy };
  }
  if (cert.category === 'competition') {
    return { label: 'COMPETITION', icon: Trophy };
  }
  return { label: 'CERTIFICATION', icon: Award };
}

export function CertificationScene() {
  const [activeCategory, setActiveCategory] = useState<CertCategory>('all');
  const [selectedCert, setSelectedCert] = useState<CertificationType | null>(null);

  const allCerts = [...portfolioData.certifications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredCerts = allCerts.filter((cert) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'competition') return cert.category === 'competition';
    if (activeCategory === 'industry') return cert.category !== 'competition';
    const mode = getMode(cert);
    if (activeCategory === 'online') return mode === 'ONLINE';
    if (activeCategory === 'offline') return mode === 'OFFLINE';
    return true;
  });

  // Modal Escape key and body scroll lock
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
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 max-w-6xl mx-auto">
        <div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-[#F0EAE3]">
            VALIDATED <span className="text-[#873653]">CREDENTIALS</span>.
          </h2>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 border border-[rgba(214,185,154,0.12)] bg-[#151116]/90 p-1.5 font-mono text-xs">
          {[
            { id: 'all', label: 'ALL' },
            { id: 'industry', label: 'CERTIFICATIONS' },
            { id: 'competition', label: 'HACKATHONS' },
            { id: 'online', label: 'ONLINE' },
            { id: 'offline', label: 'OFFLINE' },
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

      {/* MINIMALIST CERTIFICATES GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert, index) => {
          const typeInfo = getType(cert);
          const TypeIcon = typeInfo.icon;
          const mode = getMode(cert);
          const year = getYear(cert.date);

          return (
            <motion.div
              key={`${cert.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
              onClick={() => setSelectedCert(cert)}
              className="cursor-pointer group relative border border-[rgba(214,185,154,0.14)] bg-[#151116] p-6 rounded-2xl flex flex-col justify-between hover:border-[#873653] hover:shadow-[0_0_25px_rgba(135,54,83,0.25)] transition-all duration-300 hover:-translate-y-1 min-h-[190px]"
            >
              {/* TOP ROW: TYPE & MODE */}
              <div className="flex items-center justify-between gap-2 border-b border-[rgba(214,185,154,0.1)] pb-3.5 mb-4 font-mono text-[11px]">
                {/* Type Badge */}
                <span className="text-[#D6B99A] flex items-center gap-1.5 font-bold tracking-wider uppercase">
                  <TypeIcon size={14} className="text-[#873653]" />
                  <span>{typeInfo.label}</span>
                </span>

                {/* Mode Badge (Online / Offline) */}
                {mode === 'ONLINE' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium">
                    <Globe size={11} />
                    <span>ONLINE</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-[#D6B99A]/30 bg-[#D6B99A]/10 text-[#D6B99A] font-medium">
                    <MapPin size={11} className="text-[#873653]" />
                    <span>OFFLINE</span>
                  </span>
                )}
              </div>

              {/* CENTER: NAME (TITLE) */}
              <div className="my-auto py-2">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#F0EAE3] tracking-tight uppercase group-hover:text-[#873653] transition-colors line-clamp-3 leading-snug">
                  {cert.title}
                </h3>
              </div>

              {/* BOTTOM ROW: YEAR & ACTION */}
              <div className="pt-3.5 border-t border-[rgba(214,185,154,0.1)] flex items-center justify-between font-mono text-xs">
                {/* Year */}
                <div className="flex items-center gap-1.5 text-[#D6B99A] font-semibold">
                  <Calendar size={13} className="text-[#873653]" />
                  <span>{year}</span>
                </div>

                {/* Action Trigger */}
                <span className="text-[11px] text-[#969099] group-hover:text-[#D6B99A] transition-colors flex items-center gap-1 font-mono">
                  VIEW <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FULL CREDENTIAL DETAIL MODAL (On-Click View) */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#151116] border border-[#873653]/60 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-2xl p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 text-[#969099] hover:text-[#F0EAE3] p-1.5 border border-[rgba(214,185,154,0.1)] hover:border-[#873653] rounded-lg transition-colors"
                aria-label="Close credential details"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="border-b border-[rgba(214,185,154,0.12)] pb-4 mb-6 pr-8">
                <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
                  <span className="text-[#D6B99A] uppercase tracking-wider font-semibold">
                    {getType(selectedCert).label}
                  </span>
                  <span className="text-[#969099]">•</span>
                  <span className="text-[#873653] font-semibold">
                    {getMode(selectedCert)}
                  </span>
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
                <div className="mb-6 rounded-xl overflow-hidden border border-[rgba(214,185,154,0.15)] bg-black/60 flex items-center justify-center p-2">
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
              {selectedCert.skills && selectedCert.skills.length > 0 && selectedCert.skills.some((s) => s.trim().length > 0) && (
                <div className="pt-4 border-t border-[rgba(214,185,154,0.12)]">
                  <div className="font-mono text-xs text-[#D6B99A] uppercase tracking-wider mb-3">
                    Validated Competencies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.filter((s) => s.trim().length > 0).map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/[0.04] border border-[rgba(214,185,154,0.15)] rounded-lg font-mono text-xs text-[#F0EAE3]"
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
