/**
 * @component Certification
 * @description Master Verified Engineering Credentials & Competitions
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 */
import { useState } from 'react';
import { Award, Calendar, MapPin, X, ShieldCheck, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data';
import type { Certifications as CertificationType } from '../data';

export const Certification = () => {
  const { certifications } = portfolioData;
  const [selectedCert, setSelectedCert] = useState<CertificationType | null>(null);

  const others = certifications.filter((cert) => cert.category === 'other');
  const competitions = certifications.filter((cert) => cert.category === 'competition');

  const renderCertCards = (certs: CertificationType[]) => {
    return certs.map((cert) => (
      <div
        key={cert.title}
        onClick={() => setSelectedCert(cert)}
        className="animated-card group cursor-pointer relative rounded-2xl border border-white/[0.07] bg-[#12131A] hover:border-[#D4A373]/50 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
      >
        <div>
          {/* Certificate Thumbnail Preview */}
          {cert.image && (
            <div className="relative w-full h-40 overflow-hidden bg-[#161722] border-b border-white/[0.06]">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12131A] via-[#12131A]/30 to-transparent" />

              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A0B0E]/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#D4A373] uppercase tracking-wider font-semibold">
                  <ShieldCheck size={12} />
                  <span>VERIFIED</span>
                </span>
                <span className="text-[10px] font-mono text-[#8E929D] bg-[#0A0B0E]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 uppercase">
                  {cert.category || 'AWARD'}
                </span>
              </div>
            </div>
          )}

          <div className="p-6 space-y-3">
            <div>
              <h3 className="text-base font-bold font-sans text-[#F5F4EE] group-hover:text-[#D4A373] transition-colors line-clamp-2 leading-snug">
                {cert.title}
              </h3>
              <p className="text-xs font-mono text-[#D4A373] mt-1 font-medium truncate">
                {cert.issuer}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#8E929D] pt-2 border-t border-white/[0.04]">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-[#D4A373]" />
                <span>{cert.date}</span>
              </div>
              {cert.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-[#8E929D]" />
                  <span>{cert.location}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-[#8E929D] font-body line-clamp-2 leading-relaxed">
              {cert.description}
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 pt-1 flex items-center justify-between text-xs font-mono text-[#8E929D]">
          <span className="group-hover:text-[#F5F4EE] transition-colors">Inspect Credential</span>
          <ExternalLink size={13} className="text-[#D4A373] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    ));
  };

  return (
    <section
      id="certification"
      className="relative min-h-screen py-24 md:py-32 px-6 sm:px-10 lg:px-16 bg-[#0A0B0E] text-[#F5F4EE]"
    >
      {/* Background Subtle Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-[#D4A373]/[0.015] blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Section Header */}
        <div className="border-b border-white/[0.07] pb-8 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.28em] text-[#D4A373] font-medium">
              06 // Verified Credentials &amp; Awards
            </span>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold text-[#F5F4EE] tracking-tight leading-none">
              Certifications &amp; Achievements
            </h2>

            <p className="text-[#8E929D] text-sm sm:text-base font-body leading-relaxed">
              Industry credentials, competition milestones, and cryptographic security verifications.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#8E929D] px-4 py-2 rounded-full border border-white/[0.08] bg-[#12131A]">
            <Award size={13} className="text-[#D4A373]" />
            <span>{certifications.length} CREDENTIALS RECORDED</span>
          </div>
        </div>

        {/* Competitions Section */}
        {competitions.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#D4A373]/60" />
              <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-[#D4A373] font-medium">
                Hackathons &amp; Technical Competitions ({competitions.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderCertCards(competitions)}
            </div>
          </div>
        )}

        {/* Other Certifications */}
        {others.length > 0 && (
          <div className="space-y-8 pt-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#D4A373]/60" />
              <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-[#D4A373] font-medium">
                Professional &amp; Academic Certifications ({others.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderCertCards(others)}
            </div>
          </div>
        )}
      </div>

      {/* Certificate Modal Viewer */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-[#12131A] border border-white/[0.1] shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-[#D4A373]">
                  {selectedCert.issuer}
                </span>
                <h4 className="text-xl font-bold font-sans text-white">
                  {selectedCert.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {selectedCert.image && (
              <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-black">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto object-contain max-h-[50vh]"
                />
              </div>
            )}

            <div className="space-y-3 text-xs sm:text-sm text-[#DCD9CE]">
              <p className="leading-relaxed">{selectedCert.description}</p>
              <div className="flex items-center gap-4 text-xs font-mono text-[#8E929D] pt-2">
                <span>Date: {selectedCert.date}</span>
                {selectedCert.location && <span>Location: {selectedCert.location}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
