/**
 * @component ResumeModal
 * @description Clean, elegant Curriculum Vitae preview modal.
 * Focused directly on clean PDF review with direct download and open actions.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Download, ExternalLink, FileText } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const resumeUrl = '/NithinKR.pdf';

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window: covers ~80-85% viewport width and 92% height for optimal document readability */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative z-10 w-[95vw] md:w-[82vw] lg:w-[75vw] max-w-[1300px] h-[92vh] bg-[#0c0d10] text-[#f2efe9] border border-white/10 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#121318]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#d6b99a] shrink-0">
                <FileText size={16} />
              </div>
              <div className="min-w-0">
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#f2efe9] truncate tracking-tight">
                  Nithin K R — Resume
                </h3>
                <p className="font-mono text-[11px] text-[#969099] truncate">
                  Full Stack Developer & Security Researcher
                </p>
              </div>
            </div>

            {/* Actions & Close */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#873653] hover:bg-[#a04264] text-white font-mono text-xs font-medium tracking-wide transition-colors"
                title="Download PDF"
              >
                <Download size={13} />
                <span className="hidden sm:inline">Download</span>
              </button>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[#f2efe9] font-mono text-xs font-medium tracking-wide transition-colors"
                title="Open full PDF in new tab"
              >
                <ExternalLink size={13} />
                <span className="hidden sm:inline">Open Full PDF</span>
              </a>

              <div className="w-[1px] h-5 bg-white/10 mx-1 hidden sm:block" />

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[#969099] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close resume modal"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div className="flex-1 w-full bg-[#181a20] relative overflow-hidden">
            <iframe
              src={`${resumeUrl}#view=FitH`}
              title="Nithin K R Resume PDF Preview"
              className="w-full h-full border-none"
            />
          </div>

          {/* Minimal Clean Footer Bar */}
          <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/10 bg-[#121318] font-mono text-[11px] text-[#969099]">
            <span className="truncate">NithinKR.pdf</span>
            <div className="flex items-center gap-4 shrink-0">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f2efe9] underline underline-offset-4 decoration-white/20 transition-colors"
              >
                Direct link
              </a>
              <button
                type="button"
                onClick={onClose}
                className="hover:text-[#f2efe9] transition-colors"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ResumeModal;
