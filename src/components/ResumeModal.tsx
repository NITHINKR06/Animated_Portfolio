import { AnimatePresence, motion } from 'framer-motion';
import { X, Download, ExternalLink, FileText } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const resumeUrl = '/Nithin K R.pdf';

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl glass-card border border-white/10 shadow-2xl"
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full glass-card border border-white/10 text-gray-300 transition-all hover:border-purple-400/50 hover:text-white"
            aria-label="Close resume"
          >
            <X size={18} />
          </motion.button>

          <div className="relative flex h-[90vh] flex-col">
            {/* Header */}
            <div className="border-b border-white/10 px-6 py-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                    <FileText className="text-purple-300" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white md:text-2xl">
                      My <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">Resume</span>
                    </h2>
                    <p className="text-sm text-gray-400">
                      Nithin K R • Full Stack Developer
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={handleDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/30 transition-all hover:from-purple-500 hover:to-purple-600"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </motion.button>

                  <motion.a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-lg glass-card border border-white/20 px-4 py-2 text-sm font-medium text-white transition-all hover:border-purple-400/50"
                  >
                    <ExternalLink size={16} />
                    <span>Open</span>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="relative flex-1 overflow-hidden bg-slate-950/50">
              <iframe
                src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                title="Nithin K R Resume"
                className="h-full w-full"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeModal;