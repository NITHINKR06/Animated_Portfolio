import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Clock, Rocket, Code, Loader2 } from "lucide-react";
import { Project } from "../data/portfolio";
import { fetchReadme } from "../utils/github";
import { useState, useEffect } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
  const [readme, setReadme] = useState<string | null>(null);
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);

  useEffect(() => {
    if (project?.githubUrl) {
      setIsLoadingReadme(true);
      fetchReadme(project.githubUrl)
        .then((content) => {
          setReadme(content);
        })
        .catch((error) => {
          console.error("Error loading README:", error);
          setReadme(null);
        })
        .finally(() => {
          setIsLoadingReadme(false);
        });
    } else {
      setReadme(null);
    }
  }, [project]);

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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl shadow-2xl shadow-purple-500/20"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 pointer-events-none" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-gray-300 hover:text-white transition-all duration-200 border border-white/10 hover:border-purple-500/50"
          >
            <X size={20} />
          </button>

          <div className="relative z-10 overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="p-8 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-3 mb-4">
                    <StatusIcon size={18} className={statusColor} />
                    <span className={`text-sm capitalize font-medium ${statusColor}`}>
                      {project.status.replace("-", " ")}
                    </span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 rounded-lg text-xs font-medium border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white font-medium text-sm hover:from-purple-500 hover:to-purple-600 transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
                  >
                    <Github size={16} />
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
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg text-white font-medium text-sm hover:from-slate-600 hover:to-slate-700 transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </motion.a>
                )}
              </div>
            </div>

            {/* README Content */}
            <div className="p-0">
              {isLoadingReadme ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                  <span className="ml-3 text-gray-400">Loading README...</span>
                </div>
              ) : readme ? (
                <div className="markdown-preview bg-slate-900/50 border-t border-white/10">
                  <div className="p-8 max-w-none">
                    <MarkdownRenderer content={readme} />
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Code size={48} className="text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No README available for this project</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Check out the code repository for more details
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const markdownComponents: Components = {
  h1: ({ node, ...props }) => (
    <h1
      className="text-3xl font-bold text-white mb-4 mt-8 pb-3 border-b border-slate-700/50 first:mt-0"
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h2
      className="text-2xl font-bold text-white mb-3 mt-7 pb-2 border-b border-slate-700/30"
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="text-xl font-semibold text-purple-300 mb-2 mt-6" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <h4 className="text-lg font-semibold text-purple-200 mb-2 mt-5" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="text-slate-300 leading-7 mb-4 text-[15px]" {...props} />
  ),
  a: ({ node, ...props }) => (
    <a
      className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/50 hover:decoration-blue-400 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: ({ node, ...props }) => (
    <ul className="mb-4 space-y-1 pl-6 list-disc" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="mb-4 space-y-1 pl-6 list-decimal" {...props} />
  ),
  li: ({ node, ...props }) => <li className="text-slate-300 mb-1.5" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="my-4 pl-4 border-l-4 border-purple-500/50 bg-purple-500/5 py-2 rounded-r"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-0 border-t border-slate-700/50" />,
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-left border-collapse border border-white/10" {...props} />
    </div>
  ),
  th: ({ node, ...props }) => (
    <th
      className="px-3 py-2 bg-slate-800/80 text-purple-200 text-sm border border-white/10"
      {...props}
    />
  ),
  td: ({ node, ...props }) => (
    <td className="px-3 py-2 text-gray-300 text-sm border border-white/10" {...props} />
  ),
  img: ({ node, alt, ...props }) => (
    <figure className="my-8 flex flex-col items-center gap-3 w-full">
      <img
        {...props}
        alt={alt}
        className="max-h-[420px] w-full rounded-2xl border border-white/10 bg-slate-900/40 object-contain p-3"
        loading="lazy"
      />
      {alt && <figcaption className="text-sm text-gray-400 text-center">{alt}</figcaption>}
    </figure>
  ),
  code: ({ node, inline, className, children, ...props }) => {
    if (inline) {
      return (
        <code
          className="px-1.5 py-0.5 bg-slate-800/60 text-purple-300 rounded text-[13px] font-mono border border-slate-700/50"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="my-6 rounded-lg overflow-hidden border border-slate-700/50 bg-slate-950/80 shadow-xl">
        {className && (
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800/60 border-b border-slate-700/50">
            <span className="text-xs font-medium text-purple-300 uppercase tracking-wide">
              {className.replace("language-", "").toUpperCase() || "CODE"}
            </span>
            <Code size={14} className="text-slate-500" />
          </div>
        )}
        <pre className="p-4 overflow-x-auto m-0 bg-slate-950">
          <code className="text-sm font-mono text-slate-200 leading-relaxed whitespace-pre" {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  },
};

const MarkdownRenderer = ({ content }: { content: string }) => (
  <article className="prose prose-invert prose-slate max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  </article>
);

