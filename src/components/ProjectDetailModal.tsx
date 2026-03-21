import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import { Project } from "../data/portfolio";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  // Parse the details markdown into structured sections
  const parseDetails = (details: string) => {
    const sections: { title: string; content: string[] }[] = [];
    let currentSection: { title: string; content: string[] } | null = null;

    details.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      // H2 or H3 headings become section titles
      if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
        if (currentSection) sections.push(currentSection);
        currentSection = {
          title: trimmed.replace(/^#{2,3}\s/, ''),
          content: [],
        };
      } else if (currentSection) {
        // Skip horizontal rules
        if (trimmed === '---') return;
        currentSection.content.push(trimmed);
      }
    });
    if (currentSection) sections.push(currentSection);
    return sections;
  };

  // Strip markdown bold/code formatting for clean display
  const cleanText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/`(.*?)`/g, '$1');
  };

  const sections = project.details ? parseDetails(project.details) : [];

  // Generate subtitle tags from project data
  const subtitleParts = [
    project.id,
    project.technologies[0],
    project.status === 'completed' ? 'Production Ready' : project.status === 'in-progress' ? 'In Development' : 'Planned'
  ].filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(5, 10, 20, 0.85)', backdropFilter: 'blur(12px)' }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #0c1929 0%, #0a1422 50%, #0d1a2d 100%)',
            border: '1px solid rgba(0, 200, 220, 0.15)',
            boxShadow: '0 0 40px rgba(0, 180, 200, 0.08), 0 0 80px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Subtle top glow line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0, 210, 230, 0.4), transparent)',
            }}
          />

          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-5 right-5 z-30 p-2 rounded-lg transition-all duration-200"
            style={{
              border: '1px solid rgba(0, 200, 220, 0.2)',
              backgroundColor: 'rgba(0, 200, 220, 0.05)',
              color: 'rgba(0, 200, 220, 0.6)',
            }}
          >
            <X size={16} />
          </motion.button>

          {/* Scrollable content */}
          <div className="relative z-10 overflow-y-auto max-h-[85vh] p-8 md:p-10" style={{ scrollbarWidth: 'none' }}>

            {/* Header Section */}
            <div className="mb-8">
              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold mb-3 pr-12"
                style={{ color: '#e2e8f0', fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {project.title}
              </motion.h2>

              {/* Subtitle tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap items-center gap-1"
              >
                {subtitleParts.map((part, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span
                      className="text-sm"
                      style={{ color: 'rgba(148, 163, 184, 0.7)', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
                    >
                      {part}
                    </span>
                    {i < subtitleParts.length - 1 && (
                      <span className="mx-1.5" style={{ color: 'rgba(0, 200, 220, 0.3)' }}>·</span>
                    )}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Sections */}
            {sections.map((section, sIdx) => (
              <motion.div
                key={sIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + sIdx * 0.08 }}
                className="mb-7"
              >
                {/* Section Header */}
                <div className="mb-4">
                  <h3
                    className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                    style={{
                      color: 'rgba(0, 210, 230, 0.8)',
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    }}
                  >
                    {section.title}
                  </h3>
                  <div
                    className="h-px w-full"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0, 210, 230, 0.25), rgba(0, 210, 230, 0.05), transparent)',
                    }}
                  />
                </div>

                {/* Section Content */}
                <div>
                  {section.content.map((line, lIdx) => {
                    // Bullet points (- item or items starting with bullet markers)
                    if (line.startsWith('- ')) {
                      const content = line.substring(2);
                      return (
                        <div key={lIdx} className="flex items-start gap-3 my-2.5 ml-1">
                          <span
                            className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: 'rgba(0, 210, 230, 0.5)' }}
                          />
                          <p
                            className="text-sm leading-relaxed flex-1"
                            style={{ color: 'rgba(203, 213, 225, 0.85)' }}
                          >
                            {cleanText(content)}
                          </p>
                        </div>
                      );
                    }

                    // Numbered lists
                    if (line.match(/^\d+\.\s/)) {
                      const content = line.replace(/^\d+\.\s/, '');
                      const num = line.match(/^\d+/)?.[0];
                      return (
                        <div key={lIdx} className="flex items-start gap-3 my-2.5 ml-1">
                          <span
                            className="text-xs font-mono mt-0.5 flex-shrink-0"
                            style={{ color: 'rgba(0, 210, 230, 0.5)' }}
                          >
                            {num}.
                          </span>
                          <p
                            className="text-sm leading-relaxed flex-1"
                            style={{ color: 'rgba(203, 213, 225, 0.85)' }}
                          >
                            {cleanText(content)}
                          </p>
                        </div>
                      );
                    }

                    // Blockquotes
                    if (line.startsWith('> ')) {
                      return (
                        <blockquote
                          key={lIdx}
                          className="my-3 pl-4 py-2 text-sm italic"
                          style={{
                            borderLeft: '2px solid rgba(0, 210, 230, 0.3)',
                            color: 'rgba(148, 163, 184, 0.8)',
                          }}
                        >
                          {cleanText(line.substring(2))}
                        </blockquote>
                      );
                    }

                    // Regular paragraph
                    return (
                      <p
                        key={lIdx}
                        className="text-sm leading-7 my-2"
                        style={{ color: 'rgba(203, 213, 225, 0.85)' }}
                      >
                        {cleanText(line)}
                      </p>
                    );
                  })}
                </div>
              </motion.div>
            ))}

            {/* Tech Stack Section */}
            {project.technologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + sections.length * 0.08 }}
                className="mb-7"
              >
                <div className="mb-4">
                  <h3
                    className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                    style={{
                      color: 'rgba(0, 210, 230, 0.8)',
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    }}
                  >
                    Tech Stack
                  </h3>
                  <div
                    className="h-px w-full"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0, 210, 230, 0.25), rgba(0, 210, 230, 0.05), transparent)',
                    }}
                  />
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.04 }}
                      className="px-3.5 py-1.5 rounded text-xs"
                      style={{
                        border: '1px solid rgba(0, 210, 230, 0.25)',
                        backgroundColor: 'rgba(0, 210, 230, 0.05)',
                        color: 'rgba(0, 210, 230, 0.8)',
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Links Section */}
            {(project.githubUrl || project.liveUrl) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (sections.length + 1) * 0.08 }}
                className="mb-4"
              >
                <div className="mb-4">
                  <h3
                    className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                    style={{
                      color: 'rgba(0, 210, 230, 0.8)',
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    }}
                  >
                    Links
                  </h3>
                  <div
                    className="h-px w-full"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0, 210, 230, 0.25), rgba(0, 210, 230, 0.05), transparent)',
                    }}
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.03,
                        borderColor: 'rgba(0, 210, 230, 0.5)',
                        backgroundColor: 'rgba(0, 210, 230, 0.08)',
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
                      style={{
                        border: '1px solid rgba(0, 210, 230, 0.2)',
                        backgroundColor: 'rgba(0, 210, 230, 0.03)',
                        color: 'rgba(0, 210, 230, 0.8)',
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      }}
                    >
                      <Github size={15} />
                      <span>View on GitHub</span>
                      <span style={{ color: 'rgba(0, 210, 230, 0.5)' }}>↗</span>
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.03,
                        borderColor: 'rgba(0, 210, 230, 0.5)',
                        backgroundColor: 'rgba(0, 210, 230, 0.08)',
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
                      style={{
                        border: '1px solid rgba(0, 210, 230, 0.2)',
                        backgroundColor: 'rgba(0, 210, 230, 0.03)',
                        color: 'rgba(0, 210, 230, 0.8)',
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      }}
                    >
                      <ExternalLink size={15} />
                      <span>Live Demo</span>
                      <span style={{ color: 'rgba(0, 210, 230, 0.5)' }}>↗</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            )}

            {/* Fallback if no details */}
            {!project.details && (
              <div className="py-6">
                <div className="mb-4">
                  <h3
                    className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
                    style={{
                      color: 'rgba(0, 210, 230, 0.8)',
                      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    }}
                  >
                    About
                  </h3>
                  <div
                    className="h-px w-full"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0, 210, 230, 0.25), rgba(0, 210, 230, 0.05), transparent)',
                    }}
                  />
                </div>
                <p className="text-sm leading-7" style={{ color: 'rgba(203, 213, 225, 0.85)' }}>
                  {project.description}
                </p>
              </div>
            )}

            {/* Bottom subtle glow */}
            <div
              className="h-px w-full mt-4"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(0, 210, 230, 0.15), transparent)',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
