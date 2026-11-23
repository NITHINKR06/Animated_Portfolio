/**
 * @component ResumeModal
 * @description Master Curriculum Vitae Modal styled in the signature Coach 05
 * Vande Bharat / Portfolio Express Passenger Boarding Pass aesthetic.
 *
 * Features:
 * - Authentic brass/champagne border with luxury layered depth
 * - Perforated ticket stub with circular punch-out notches
 * - Comprehensive Passenger Dossier: Education, Experience, Top Competencies, Achievements
 * - Integrated PDF Preview toggle and instant Download Action
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Train,
  CheckCircle2,
  Calendar,
  MapPin,
  Award,
  Sparkles,
  QrCode,
  Eye,
} from 'lucide-react';
import { portfolioData } from '../data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const resumeUrl = '/NithinKR.pdf';
  const { personal, experience, education, certifications } = portfolioData;
  const [viewMode, setViewMode] = useState<'dossier' | 'pdf'>('dossier');

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Nithin_K_R_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#060e0c]/75 backdrop-blur-md"
        />

        {/* ── THE MASTER TICKET CARD (Coach 05 Design) ── */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative z-10 w-full max-w-[940px] max-h-[90vh] bg-gradient-to-b from-[#151c19] via-[#0f1714] to-[#080d0b] text-[#f3e9d2] border-2 border-[#d9b061] rounded-[20px] shadow-[0_0_0_6px_rgba(13,34,27,0.9),0_0_0_7px_rgba(217,176,97,0.55),0_35px_80px_rgba(0,0,0,0.7)] flex flex-col md:grid md:grid-cols-[1fr_240px] overflow-hidden"
        >
          {/* ── LEFT: MAIN TICKET BODY (tk-main) ── */}
          <div className="p-6 sm:p-8 overflow-y-auto max-h-[85vh] md:max-h-[88vh] scrollbar-thin scrollbar-thumb-[#d9b061] scrollbar-track-black/20">
            {/* Ticket Header & View Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d9b061]/25 pb-4 mb-6">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#d9b061]">
                <Train size={14} className="text-[#d9b061]" />
                <span>BOARDING PASS // CURRICULUM VITAE</span>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 border border-[#d9b061]/30 bg-black/40 p-1 rounded-full font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setViewMode('dossier')}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    viewMode === 'dossier'
                      ? 'bg-[#d9b061] text-[#0d221b] font-bold shadow-sm'
                      : 'text-[#cfc3a6] hover:text-white'
                  }`}
                >
                  PASSENGER DOSSIER
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('pdf')}
                  className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1 ${
                    viewMode === 'pdf'
                      ? 'bg-[#d9b061] text-[#0d221b] font-bold shadow-sm'
                      : 'text-[#cfc3a6] hover:text-white'
                  }`}
                >
                  <Eye size={12} />
                  <span>PDF PREVIEW</span>
                </button>
              </div>
            </div>

            {viewMode === 'dossier' ? (
              <>
                {/* Passenger Headline */}
                <div>
                  <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#f3e9d2] tracking-tight uppercase leading-none">
                    NITHIN K R
                  </h2>
                  <div className="font-heading font-semibold text-lg sm:text-xl text-[#d9b061] mt-2">
                    Full Stack Developer & Cyber Security Researcher
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-[#c9bda3] leading-relaxed mt-4 max-w-2xl border-l-2 border-[#d9b061]/40 pl-3">
                    {personal.bio}
                  </p>
                </div>

                {/* Telemetry Data Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6">
                  <div className="border border-[#d9b061]/30 bg-black/30 rounded-xl p-3">
                    <span className="block font-mono text-[10px] text-[#bcae8e] uppercase">EXPERIENCE</span>
                    <strong className="font-heading text-lg sm:text-xl text-[#f3e9d2] font-bold">2+ Years</strong>
                  </div>
                  <div className="border border-[#d9b061]/30 bg-black/30 rounded-xl p-3">
                    <span className="block font-mono text-[10px] text-[#bcae8e] uppercase">EDUCATION</span>
                    <strong className="font-heading text-base sm:text-lg text-[#f3e9d2] font-bold truncate block">M.Tech CS</strong>
                  </div>
                  <div className="border border-[#d9b061]/30 bg-black/30 rounded-xl p-3">
                    <span className="block font-mono text-[10px] text-[#bcae8e] uppercase">CERTIFICATIONS</span>
                    <strong className="font-heading text-lg sm:text-xl text-[#f3e9d2] font-bold">14+ Awards</strong>
                  </div>
                  <div className="border border-[#d9b061]/30 bg-black/30 rounded-xl p-3">
                    <span className="block font-mono text-[10px] text-[#bcae8e] uppercase">STATUS</span>
                    <strong className="font-heading text-base sm:text-lg text-emerald-400 font-bold">Deployable</strong>
                  </div>
                </div>

                {/* Core Competencies Badges */}
                <div className="mb-6">
                  <h3 className="font-mono text-xs text-[#d9b061] uppercase tracking-wider mb-2.5">
                    // KEY COMPETENCIES & STACK
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'React.js',
                      'Node.js',
                      'TypeScript',
                      'Python',
                      'FastAPI',
                      'OCI Cloud',
                      'Ethical Hacking',
                      'Network Security',
                      'WebSockets',
                      'Redis',
                      'Docker',
                      'PostgreSQL',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full border border-[#d9b061]/50 bg-black/40 font-mono text-xs text-[#f3e9d2]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Professional Flight Path Summary */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-mono text-xs text-[#d9b061] uppercase tracking-wider">
                    // PRODUCTION TRAJECTORY
                  </h3>
                  <div className="space-y-3">
                    {experience.map((exp, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 border border-[#d9b061]/20 bg-white/[0.02] rounded-xl hover:border-[#d9b061]/50 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1 font-mono text-xs">
                          <span className="text-[#f3e9d2] font-bold">{exp.company} — {exp.position}</span>
                          <span className="text-[#d9b061]">{exp.period}</span>
                        </div>
                        <p className="font-mono text-xs text-[#c9bda3] mt-1.5 leading-relaxed">
                          {exp.description[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* PDF View Embed */
              <div className="h-[60vh] w-full rounded-xl overflow-hidden border border-[#d9b061]/30 bg-black/60 my-2">
                <iframe
                  src={`${resumeUrl}#toolbar=0`}
                  title="Nithin K R Resume"
                  className="w-full h-full border-none"
                />
              </div>
            )}

            {/* Direct Action Strip */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#d9b061]/25 mt-6">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d9b061] text-[#0d221b] font-heading font-black text-xs tracking-wider uppercase hover:brightness-110 shadow-lg transition-all"
              >
                <Download size={15} />
                <span>DOWNLOAD RESUME (PDF)</span>
              </button>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#d9b061] text-[#f3e9d2] hover:bg-[#d9b061]/10 font-mono text-xs tracking-wider uppercase transition-colors"
              >
                <ExternalLink size={14} />
                <span>OPEN FULL PDF</span>
              </a>
            </div>
          </div>

          {/* ── RIGHT: PERFORATED TICKET STUB (tk-stub) ── */}
          <div className="relative border-t-2 md:border-t-0 md:border-l-2 border-dashed border-[#d9b061]/60 bg-[#d9b061]/[0.08] p-6 flex flex-col justify-between overflow-hidden">
            {/* Top and Bottom Circular Punch-Out Notches */}
            <div className="hidden md:block absolute -left-3 -top-3 w-6 h-6 rounded-full bg-[#060e0c] border-2 border-[#d9b061] z-20" />
            <div className="hidden md:block absolute -left-3 -bottom-3 w-6 h-6 rounded-full bg-[#060e0c] border-2 border-[#d9b061] z-20" />

            {/* Stub Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full border-2 border-[#d9b061] bg-black/40 text-[#f3e9d2] hover:bg-[#d9b061] hover:text-[#0d221b] flex items-center justify-center transition-all z-20"
              aria-label="Close ticket"
            >
              <X size={16} />
            </button>

            {/* Stub Header */}
            <div>
              <div className="font-mono text-[11px] text-[#d9b061] font-bold uppercase tracking-wider mb-2">
                CAR 05 // PASSENGER
              </div>
              <strong className="font-heading font-bold text-2xl text-[#f3e9d2] block leading-tight">
                NITHIN K R
              </strong>
              <span className="font-mono text-xs text-[#cfc3a6] block mt-1">
                FIRST CLASS ACCESS
              </span>

              {/* Stub Metadata Rows */}
              <div className="mt-6 space-y-3 font-mono text-xs border-y border-[#d9b061]/25 py-4">
                <div className="flex justify-between">
                  <span className="text-[#bcae8e]">ORIGIN:</span>
                  <span className="text-[#f3e9d2] font-semibold">BLR (KA)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#bcae8e]">DESTINATION:</span>
                  <span className="text-[#f3e9d2] font-semibold">CYBERSPACE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#bcae8e]">SEAT:</span>
                  <span className="text-[#d9b061] font-bold">05-A (ARCHIVE)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#bcae8e]">VALIDITY:</span>
                  <span className="text-emerald-400 font-semibold">2026 - 2027</span>
                </div>
              </div>
            </div>

            {/* Barcode / Authentication Punch */}
            <div className="pt-6">
              <div className="font-mono text-[9px] text-[#bcae8e] text-center tracking-widest mb-1.5 uppercase">
                SECURITY VERIFIED // AUTH CODE #4C26FA
              </div>
              {/* Aesthetic Barcode Generator Lines */}
              <div className="h-10 w-full flex items-center justify-between px-2 bg-black/40 border border-[#d9b061]/30 rounded-md overflow-hidden">
                {[
                  2, 4, 1, 3, 5, 2, 1, 4, 2, 6, 1, 3, 2, 4, 1, 5, 3, 2, 1, 4, 2, 3, 1,
                  4, 2, 5, 1, 3, 2, 4,
                ].map((w, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${w * 1.5}px` }}
                    className="h-7 bg-[#d9b061]/80 rounded-[1px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ResumeModal;
