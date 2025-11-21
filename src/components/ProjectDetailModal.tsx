import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Clock, Rocket, Code, Loader2 } from "lucide-react";
import { Project } from "../data/portfolio";
import { fetchReadme } from "../utils/github";
import { useState, useEffect } from "react";

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

// Enhanced Markdown Renderer Component - GitHub-style preview
const MarkdownRenderer = ({ content }: { content: string }) => {
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = "";

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          // End code block
          const code = codeBlockContent.join("\n");
          elements.push(
            <div key={`code-${index}`} className="my-6 rounded-lg overflow-hidden border border-slate-700/50 bg-slate-950/80 shadow-xl">
              {codeBlockLanguage && (
                <div className="flex items-center justify-between px-4 py-2 bg-slate-800/60 border-b border-slate-700/50">
                  <span className="text-xs font-medium text-purple-300 uppercase tracking-wide">
                    {codeBlockLanguage}
                  </span>
                  <Code size={14} className="text-slate-500" />
                </div>
              )}
              <pre className="p-4 overflow-x-auto m-0 bg-slate-950">
                <code className="text-sm font-mono text-slate-200 leading-relaxed whitespace-pre">
                  {code}
                </code>
              </pre>
            </div>
          );
          codeBlockContent = [];
          inCodeBlock = false;
          codeBlockLanguage = "";
        } else {
          // Start code block
          codeBlockLanguage = line.replace("```", "").trim();
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Horizontal rules
      if (line.trim() === "---" || line.trim() === "***" || line.trim() === "___") {
        elements.push(
          <hr key={`hr-${index}`} className="my-8 border-0 border-t border-slate-700/50" />
        );
        return;
      }

      // Blockquotes
      if (line.trim().startsWith("> ")) {
        const quoteText = line.trim().substring(2);
        elements.push(
          <blockquote
            key={`quote-${index}`}
            className="my-4 pl-4 border-l-4 border-purple-500/50 bg-purple-500/5 py-2 rounded-r"
          >
            <p className="text-slate-300 italic m-0">{renderInlineMarkdown(quoteText)}</p>
          </blockquote>
        );
        return;
      }

      // Headers
      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={`h1-${index}`}
            className="text-3xl font-bold text-white mb-4 mt-8 pb-3 border-b border-slate-700/50 first:mt-0"
          >
            {renderInlineMarkdown(line.replace("# ", ""))}
          </h1>
        );
        return;
      }
      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-2xl font-bold text-white mb-3 mt-7 pb-2 border-b border-slate-700/30"
          >
            {renderInlineMarkdown(line.replace("## ", ""))}
          </h2>
        );
        return;
      }
      if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-xl font-semibold text-purple-300 mb-2 mt-6"
          >
            {renderInlineMarkdown(line.replace("### ", ""))}
          </h3>
        );
        return;
      }
      if (line.startsWith("#### ")) {
        elements.push(
          <h4
            key={`h4-${index}`}
            className="text-lg font-semibold text-purple-200 mb-2 mt-5"
          >
            {renderInlineMarkdown(line.replace("#### ", ""))}
          </h4>
        );
        return;
      }

      // Ordered lists
      const orderedListMatch = line.trim().match(/^\d+\.\s+(.+)$/);
      if (orderedListMatch) {
        elements.push(
          <li key={`oli-${index}`} className="text-slate-300 mb-1.5 ml-6 list-decimal">
            {renderInlineMarkdown(orderedListMatch[1])}
          </li>
        );
        return;
      }

      // Unordered lists
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ") || line.trim().startsWith("+ ")) {
        const text = line.trim().substring(2);
        elements.push(
          <li key={`li-${index}`} className="text-slate-300 mb-1.5 ml-6 list-disc">
            {renderInlineMarkdown(text)}
          </li>
        );
        return;
      }

      // Empty lines
      if (line.trim() === "") {
        return; // Skip empty lines for better spacing
      }

      // Regular paragraphs
      elements.push(
        <p key={`p-${index}`} className="text-slate-300 leading-7 mb-4 text-[15px]">
          {renderInlineMarkdown(line)}
        </p>
      );
    });

    // Close any remaining code block
    if (inCodeBlock && codeBlockContent.length > 0) {
      const code = codeBlockContent.join("\n");
      elements.push(
        <div key={`code-final`} className="my-6 rounded-lg overflow-hidden border border-slate-700/50 bg-slate-950/80 shadow-xl">
          {codeBlockLanguage && (
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/60 border-b border-slate-700/50">
              <span className="text-xs font-medium text-purple-300 uppercase tracking-wide">
                {codeBlockLanguage}
              </span>
              <Code size={14} className="text-slate-500" />
            </div>
          )}
          <pre className="p-4 overflow-x-auto m-0 bg-slate-950">
            <code className="text-sm font-mono text-slate-200 leading-relaxed whitespace-pre">
              {code}
            </code>
          </pre>
        </div>
      );
    }

    // Wrap list items in ul/ol
    const processedElements: JSX.Element[] = [];
    let currentList: JSX.Element[] = [];
    let isOrderedList = false;

    elements.forEach((el, idx) => {
      // Check if element is a list item by checking key pattern
      const elKey = el && typeof el === 'object' && 'key' in el ? String(el.key || '') : '';
      const isListItem = elKey.startsWith('li-') || elKey.startsWith('oli-');
      
      if (isListItem) {
        // Check if it's an ordered list item
        const isOrdered = elKey.startsWith('oli-');
        if (currentList.length === 0) {
          isOrderedList = isOrdered;
        }
        currentList.push(el);
      } else {
        if (currentList.length > 0) {
          processedElements.push(
            isOrderedList ? (
              <ol key={`ol-${idx}`} className="mb-4 space-y-1 pl-6 list-decimal">
                {currentList}
              </ol>
            ) : (
              <ul key={`ul-${idx}`} className="mb-4 space-y-1 pl-6 list-disc">
                {currentList}
              </ul>
            )
          );
          currentList = [];
          isOrderedList = false;
        }
        processedElements.push(el);
      }
    });

    if (currentList.length > 0) {
      processedElements.push(
        isOrderedList ? (
          <ol key={`ol-final`} className="mb-4 space-y-1 pl-6 list-decimal">
            {currentList}
          </ol>
        ) : (
          <ul key={`ul-final`} className="mb-4 space-y-1 pl-6 list-disc">
            {currentList}
          </ul>
        )
      );
    }

    return processedElements;
  };

  const renderInlineMarkdown = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    let currentIndex = 0;

    // Inline code
    const codeRegex = /`([^`]+)`/g;
    let match;
    let lastIndex = 0;

    while ((match = codeRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <code
          key={`code-${currentIndex}`}
          className="px-1.5 py-0.5 bg-slate-800/60 text-purple-300 rounded text-[13px] font-mono border border-slate-700/50"
        >
          {match[1]}
        </code>
      );
      lastIndex = codeRegex.lastIndex;
      currentIndex++;
    }

    if (lastIndex < text.length) {
      const remaining = text.substring(lastIndex);
      // Links
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let linkMatch;
      let linkLastIndex = 0;
      const linkParts: (string | JSX.Element)[] = [];

      while ((linkMatch = linkRegex.exec(remaining)) !== null) {
        if (linkMatch.index > linkLastIndex) {
          linkParts.push(remaining.substring(linkLastIndex, linkMatch.index));
        }
        linkParts.push(
          <a
            key={`link-${currentIndex}`}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/50 hover:decoration-blue-400 transition-colors"
          >
            {linkMatch[1]}
          </a>
        );
        linkLastIndex = linkRegex.lastIndex;
        currentIndex++;
      }

      if (linkLastIndex < remaining.length) {
        linkParts.push(remaining.substring(linkLastIndex));
      }

      parts.push(...(linkParts.length > 0 ? linkParts : [remaining]));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <article className="prose prose-invert prose-slate max-w-none">
      <div className="markdown-body">{renderMarkdown(content)}</div>
    </article>
  );
};

