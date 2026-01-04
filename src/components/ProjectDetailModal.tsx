import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Clock, Rocket, Code } from "lucide-react";
import { Project } from "../data/portfolio";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

type ProjectStatus = "completed" | "in-progress" | "planned";

const statusIcons: Record<ProjectStatus, { icon: any; color: string }> = {
  completed: { icon: Rocket, color: "text-green-400" },
  "in-progress": { icon: Clock, color: "text-yellow-400" },
  planned: { icon: Code, color: "text-blue-400" },
};

export const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  const StatusIcon = statusIcons[project.status as ProjectStatus].icon;
  const statusColor = statusIcons[project.status as ProjectStatus].color;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden border border-purple-500/30 bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-2xl shadow-2xl shadow-purple-500/20"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />

          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-6 right-6 z-30 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-gray-300 hover:text-white transition-all duration-200 border border-white/10 hover:border-purple-500/50 backdrop-blur-md shadow-lg"
          >
            <X size={20} />
          </motion.button>

          <div className="relative z-10 overflow-y-auto max-h-[90vh] custom-scrollbar">
            {/* Hero Image Section */}
            {project.image && (
              <div className="relative h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Multi-layer gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                {/* Floating status badge */}
                <div className="absolute top-6 left-6 z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-xl ${statusColor} bg-black/40 border border-white/20 shadow-xl`}
                  >
                    <StatusIcon size={16} />
                    <span className="text-sm capitalize font-semibold tracking-wide">
                      {project.status.replace("-", " ")}
                    </span>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="p-8 pb-6 border-b border-white/10 bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-12">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {project.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-300 text-lg leading-relaxed"
                  >
                    {project.description}
                  </motion.p>
                </div>
              </div>

              {/* Tech Stack */}
              {project.technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 rounded-xl text-sm font-medium border border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 hover:from-purple-600/40 hover:to-pink-600/40 transition-all"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl text-white font-semibold text-sm hover:from-purple-500 hover:to-purple-600 transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                  >
                    <Github size={18} />
                    View Code
                  </motion.a>
                )}
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl text-white font-semibold text-sm hover:from-slate-600 hover:to-slate-700 transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </motion.a>
                )}
              </motion.div>
            </div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-8 bg-gradient-to-b from-transparent to-slate-900/30"
            >
              {project.details ? (
                <div className="markdown-content space-y-6">
                  {project.details.split('\n').map((line, index) => {
                    // Skip empty lines
                    if (!line.trim()) return null;

                    // H2 Headings
                    if (line.startsWith('## ')) {
                      return (
                        <h2
                          key={index}
                          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mt-8 mb-4 first:mt-0 pb-3 border-b border-purple-500/30"
                        >
                          {line.replace('## ', '')}
                        </h2>
                      );
                    }

                    // H3 Headings
                    if (line.startsWith('### ')) {
                      return (
                        <h3
                          key={index}
                          className="text-2xl font-semibold text-purple-300 mt-6 mb-3"
                        >
                          {line.replace('### ', '')}
                        </h3>
                      );
                    }

                    // Code blocks
                    if (line.startsWith('```')) {
                      const lang = line.replace('```', '');
                      const endIndex = project.details!.indexOf('```', project.details!.indexOf(line) + line.length);
                      if (endIndex > -1) {
                        const codeContent = project.details!.substring(
                          project.details!.indexOf(line) + line.length + 1,
                          endIndex
                        );
                        return (
                          <div key={index} className="my-6 rounded-xl overflow-hidden border border-purple-500/30 bg-slate-950/80 shadow-xl">
                            {lang && (
                              <div className="px-5 py-3 bg-slate-800/60 border-b border-purple-500/20">
                                <span className="text-xs font-mono text-purple-300 uppercase tracking-wider font-semibold">
                                  {lang}
                                </span>
                              </div>
                            )}
                            <pre className="p-5 overflow-x-auto">
                              <code className="text-sm font-mono text-slate-200 leading-relaxed">
                                {codeContent.trim()}
                              </code>
                            </pre>
                          </div>
                        );
                      }
                    }

                    // Bullet points
                    if (line.trim().startsWith('- ')) {
                      const content = line.trim().substring(2);
                      const renderText = (text: string) => {
                        if (text.includes('**')) {
                          const parts = text.split('**');
                          return parts.map((part, i) =>
                            i % 2 === 0 ? part : <strong key={i} className="text-white font-semibold">{part}</strong>
                          );
                        }
                        if (text.includes('`')) {
                          const parts = text.split('`');
                          return parts.map((part, i) =>
                            i % 2 === 0 ? part : (
                              <code key={i} className="px-2 py-0.5 bg-purple-500/20 text-purple-200 rounded text-sm font-mono border border-purple-500/30">
                                {part}
                              </code>
                            )
                          );
                        }
                        return text;
                      };

                      return (
                        <div key={index} className="flex items-start gap-4 my-3 ml-6">
                          <span className="text-purple-400 mt-2 text-lg">•</span>
                          <p className="text-slate-300 leading-7 flex-1 text-base">
                            {renderText(content)}
                          </p>
                        </div>
                      );
                    }

                    // Numbered lists
                    if (line.trim().match(/^\d+\.\s/)) {
                      const content = line.trim().replace(/^\d+\.\s/, '');
                      return (
                        <div key={index} className="flex items-start gap-4 my-3 ml-6">
                          <span className="text-purple-400 font-semibold text-base">{line.trim().match(/^\d+/)?.[0]}.</span>
                          <p className="text-slate-300 leading-7 flex-1 text-base">{content}</p>
                        </div>
                      );
                    }

                    // Blockquotes
                    if (line.trim().startsWith('> ')) {
                      return (
                        <blockquote
                          key={index}
                          className="border-l-4 border-purple-500/50 bg-purple-500/5 pl-6 py-4 my-6 italic text-slate-300 rounded-r-lg"
                        >
                          {line.replace('> ', '')}
                        </blockquote>
                      );
                    }

                    // Horizontal rule
                    if (line.trim() === '---') {
                      return <hr key={index} className="my-10 border-0 border-t border-purple-500/30" />;
                    }

                    // Regular paragraphs with inline formatting
                    const renderInlineFormatting = (text: string) => {
                      let result: any[] = [text];

                      // Bold
                      if (text.includes('**')) {
                        const parts = text.split('**');
                        result = parts.map((part, i) =>
                          i % 2 === 0 ? part : <strong key={`b-${i}`} className="text-white font-semibold">{part}</strong>
                        );
                      }

                      // Inline code
                      result = result.flatMap((item, idx) => {
                        if (typeof item === 'string' && item.includes('`')) {
                          const parts = item.split('`');
                          return parts.map((part, i) =>
                            i % 2 === 0 ? part : (
                              <code key={`c-${idx}-${i}`} className="px-2 py-0.5 bg-purple-500/20 text-purple-200 rounded text-sm font-mono border border-purple-500/30">
                                {part}
                              </code>
                            )
                          );
                        }
                        return item;
                      });

                      // Links
                      result = result.flatMap((item, idx) => {
                        if (typeof item === 'string') {
                          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                          const parts: any[] = [];
                          let lastIndex = 0;
                          let match;

                          while ((match = linkRegex.exec(item)) !== null) {
                            if (match.index > lastIndex) {
                              parts.push(item.substring(lastIndex, match.index));
                            }
                            parts.push(
                              <a
                                key={`l-${idx}-${match.index}`}
                                href={match[2]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/50 hover:decoration-blue-400 transition-colors font-medium"
                              >
                                {match[1]}
                              </a>
                            );
                            lastIndex = match.index + match[0].length;
                          }

                          if (lastIndex < item.length) {
                            parts.push(item.substring(lastIndex));
                          }

                          return parts.length > 0 ? parts : item;
                        }
                        return item;
                      });

                      return result;
                    };

                    return (
                      <p key={index} className="text-slate-300 leading-8 my-4 text-base">
                        {renderInlineFormatting(line)}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-semibold text-purple-300 mb-4">About This Project</h3>
                  <p className="text-slate-300 leading-8 mb-6 text-base max-w-2xl mx-auto">
                    {project.description}
                  </p>
                  <div className="mt-8 text-gray-400">
                    <p className="text-sm">
                      Visit the GitHub repository or live demo for more details
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
