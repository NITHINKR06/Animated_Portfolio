import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Project } from '../../data';
import { LineNumbers } from './LineNumbers';
import { syntaxComment, syntaxKey, syntaxKeyword, syntaxStr } from './constants';

interface ReadmeTabProps {
  project: Project;
}

export function ReadmeTab({ project }: ReadmeTabProps) {
  return (
    <div className="flex">
      <LineNumbers count={40} />

      <div className="flex-1 px-4 py-5 overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-5"
        >
          <div className="text-xs mb-1" style={{ color: syntaxComment }}>
            {`# ${project.title}`}
          </div>
          <h2 className="text-xl font-bold" style={{ color: '#d4d4d4' }}>
            {project.title}
          </h2>
          <p
            className="mt-2 text-sm leading-relaxed"
            style={{ color: 'rgba(204,204,204,0.6)' }}
          >
            {project.description}
          </p>
        </motion.div>

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-6 space-y-4">
            <img
              src={project.screenshots[0]}
              alt={project.title}
              className="w-full h-56 md:h-72 object-cover rounded-xl border border-white/10 shadow-2xl shadow-black/60"
            />

            {project.screenshots.length > 1 && (
              <div className="grid grid-cols-2 gap-3">
                {project.screenshots.slice(1, 5).map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt={project.title}
                    className="w-full h-32 object-cover rounded-lg border border-white/10 shadow-lg shadow-black/40"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mb-5 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {project.details ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-sm max-w-none"
            style={{ fontSize: 13, lineHeight: '1.8' }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2
                    className="text-sm font-bold mt-6 mb-3 flex items-center gap-2"
                    style={{ color: '#9cdcfe', fontFamily: 'inherit' }}
                  >
                    <span style={{ color: syntaxComment }}>//</span> {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    className="text-xs font-semibold mt-4 mb-2 uppercase tracking-widest"
                    style={{ color: syntaxKeyword }}
                  >
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p
                    className="mb-3 text-sm leading-7"
                    style={{ color: 'rgba(204,204,204,0.8)' }}
                  >
                    {children}
                  </p>
                ),
                li: ({ children }) => (
                  <li
                    className="flex items-start gap-2 mb-1.5 text-sm list-none"
                    style={{ color: 'rgba(204,204,204,0.75)' }}
                  >
                    <span style={{ color: '#007acc', marginTop: 4, flexShrink: 0 }}>
                      {'\u25B8'}
                    </span>
                    <span>{children}</span>
                  </li>
                ),
                ul: ({ children }) => <ul className="pl-0 my-2">{children}</ul>,
                ol: ({ children }) => <ol className="pl-0 my-2">{children}</ol>,
                strong: ({ children }) => (
                  <strong style={{ color: syntaxStr, fontWeight: 600 }}>{children}</strong>
                ),
                code: ({ children }) => (
                  <code
                    className="px-1.5 py-0.5 rounded text-xs"
                    style={{ background: 'rgba(255,255,255,0.06)', color: syntaxStr }}
                  >
                    {children}
                  </code>
                ),
                blockquote: ({ children }) => (
                  <blockquote
                    className="pl-4 my-3 text-sm italic"
                    style={{
                      borderLeft: `2px solid ${syntaxComment}`,
                      color: 'rgba(204,204,204,0.55)',
                    }}
                  >
                    {children}
                  </blockquote>
                ),
              }}
            >
              {project.details}
            </ReactMarkdown>
          </motion.div>
        ) : (
          <p className="text-sm" style={{ color: 'rgba(204,204,204,0.5)' }}>
            {'// No detailed documentation yet.'}
          </p>
        )}
      </div>
    </div>
  );
}
