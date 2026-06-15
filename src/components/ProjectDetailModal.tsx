/**
 * @component ProjectDetailModal
 * @description ProjectDetailModal section of the Animated 3D Portfolio
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 *
 * Part of a personal portfolio. Content and design belong to Nithin K R.
 * Code structure may be studied; redistribution as personal portfolio
 * without attribution violates the project license.
 */
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X,
         Terminal, Code2, Layers, Link2, CheckCircle2, Clock, Lightbulb } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Project } from '../data/portfolio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

/* ─── status config ─────────────────────────────────────────── */
const statusConfig = {
  completed:   { label: 'completed',   color: '#22c55e', icon: CheckCircle2, dot: 'bg-green-400'  },
  'in-progress':{ label: 'in-progress', color: '#f59e0b', icon: Clock,        dot: 'bg-yellow-400' },
  planned:     { label: 'planned',     color: '#8b5cf6', icon: Lightbulb,    dot: 'bg-purple-400' },
};

/* ─── VS Code tab bar ───────────────────────────────────────── */
const tabs = [
  { id: 'readme',  label: 'README.md',    icon: '📄' },
  { id: 'stack',   label: 'package.json', icon: '📦' },
  { id: 'links',   label: 'links.sh',     icon: '🔗' },
];

/* ─── syntax highlight colours (fake but convincing) ────────── */
const syntaxComment  = 'rgba(106,153,85,0.9)';   // green
const syntaxKey      = '#9cdcfe';                  // light blue
const syntaxStr      = '#ce9178';                  // orange
const syntaxPunct    = '#d4d4d4';                  // white
const syntaxKeyword  = '#c586c0';                  // pink
const syntaxNum      = '#b5cea8';                  // light green

export const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  const [activeTab, setActiveTab] = useState<'readme' | 'stack' | 'links'>('readme');
  const [typedPath, setTypedPath] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  /* reset tab on project change */
  useEffect(() => {
    setActiveTab('readme');
    if (!project) return;
    // animate the file path typing
    const path = `~/projects/${project.id}/`;
    setTypedPath('');
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTypedPath(path.slice(0, i));
      if (i >= path.length) clearInterval(t);
    }, 35);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id]);

  /* lock background scroll while modal is open */
  useEffect(() => {
    if (!project) return;

    const html = document.documentElement;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;

    document.body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    };
  }, [project]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollHeight <= el.clientHeight) return;
    e.preventDefault();
    el.scrollTop += e.deltaY;
  };

  if (!project) return null;

  const status = statusConfig[project.status] ?? statusConfig.completed;
  const StatusIcon = status.icon;

  return (
    <AnimatePresence>
      {/* ── Backdrop ──────────────────────────────────────── */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      >
        {/* ── Editor window ─────────────────────────────── */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)' }}
          exit={{   opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
          onWheel={handleWheel}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl overflow-hidden"
          style={{
            background:  '#1e1e1e',
            border:      '1px solid rgba(255,255,255,0.08)',
            boxShadow:   '0 32px 80px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.05)',
            fontFamily:  "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
          }}
        >

          {/* ── Title bar ─────────────────────────────────── */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0 select-none"
            style={{ background: '#323233', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* macOS traffic lights */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all flex items-center justify-center group"
              >
                <X size={6} className="opacity-0 group-hover:opacity-100 text-[#4a0000]" />
              </button>
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>

            {/* window title */}
            <div className="flex-1 text-center">
              <span className="text-xs" style={{ color: 'rgba(204,204,204,0.5)' }}>
                {project.id} — VS Code
              </span>
            </div>

            {/* status badge */}
            <div
              className="flex items-center gap-1.5 px-2 py-0.5 rounded"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              <span className="text-[10px]" style={{ color: status.color }}>
                {status.label}
              </span>
            </div>
          </div>

          {/* ── Activity bar + editor layout ──────────────── */}
          <div className="flex flex-1 overflow-hidden">

            {/* Activity bar (left sidebar icons) */}
            <div
              className="flex flex-col items-center gap-5 py-4 px-2 flex-shrink-0"
              style={{ background: '#333333', borderRight: '1px solid rgba(255,255,255,0.05)', width: 48 }}
            >
              {[
                { icon: Code2,   active: activeTab === 'readme' },
                { icon: Layers,  active: activeTab === 'stack'  },
                { icon: Link2,   active: activeTab === 'links'  },
              ].map(({ icon: Icon, active }, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(['readme','stack','links'][i] as 'readme' | 'stack' | 'links')}
                  className="p-1.5 rounded transition-colors"
                  style={{
                    color: active ? '#cccccc' : 'rgba(204,204,204,0.4)',
                    borderLeft: active ? '2px solid #cccccc' : '2px solid transparent',
                  }}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>

            {/* Main editor column */}
            <div className="flex-1 flex flex-col overflow-hidden">

              {/* Tab bar */}
              <div
                className="flex items-center flex-shrink-0 overflow-x-auto"
                style={{ background: '#2d2d2d', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'readme' | 'stack' | 'links')}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs whitespace-nowrap transition-colors flex-shrink-0 relative"
                    style={{
                      color:      activeTab === tab.id ? '#cccccc' : 'rgba(204,204,204,0.45)',
                      background: activeTab === tab.id ? '#1e1e1e' : 'transparent',
                      borderRight:'1px solid rgba(255,255,255,0.06)',
                      borderTop:  activeTab === tab.id ? '1px solid #007acc' : '1px solid transparent',
                    }}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Breadcrumb / path bar */}
              <div
                className="flex items-center gap-1 px-4 py-1.5 text-[10px] flex-shrink-0"
                style={{ background: '#1e1e1e', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'rgba(204,204,204,0.35)' }}
              >
                <Terminal size={10} />
                <span className="ml-1" style={{ color: '#9cdcfe' }}>{typedPath}</span>
                <span className="animate-pulse">▋</span>
              </div>

              {/* ── Editor content ────────────────────────── */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto project-modal-scroll"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
              >

                {/* ── README tab ────────────────────────── */}
                {activeTab === 'readme' && (
                  <div className="flex">
                    {/* Line numbers */}
                    <div
                      className="flex-shrink-0 px-3 py-5 text-right select-none"
                      style={{ color: 'rgba(204,204,204,0.2)', fontSize: 12, lineHeight: '1.75rem', minWidth: 44, background: '#1e1e1e' }}
                    >
                      {Array.from({ length: 40 }, (_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-4 py-5 overflow-x-hidden">

                      {/* Project title as markdown heading */}
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
                        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(204,204,204,0.6)' }}>
                          {project.description}
                        </p>
                      </motion.div>

                      {/* Screenshot gallery */}
                      {project.screenshots && project.screenshots.length > 0 && (
                        <div className="mb-6 space-y-4">
                          {/* Big hero screenshot */}
                          <img
                            src={project.screenshots[0]}
                            alt={project.title}
                            className="w-full h-56 md:h-72 object-cover rounded-xl border border-white/10 shadow-2xl shadow-black/60"
                          />

                          {/* Optional smaller shots below */}
                          {project.screenshots.length > 1 && (
                            <div className="grid grid-cols-2 gap-3">
                              {project.screenshots.slice(1, 5).map(src => (
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

                      {/* Divider */}
                      <div className="mb-5 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

                      {/* Markdown details */}
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
                                <h2 className="text-sm font-bold mt-6 mb-3 flex items-center gap-2"
                                  style={{ color: '#9cdcfe', fontFamily: 'inherit' }}>
                                  <span style={{ color: syntaxComment }}>//</span> {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-xs font-semibold mt-4 mb-2 uppercase tracking-widest"
                                  style={{ color: syntaxKeyword }}>
                                  {children}
                                </h3>
                              ),
                              p: ({ children }) => (
                                <p className="mb-3 text-sm leading-7" style={{ color: 'rgba(204,204,204,0.8)' }}>
                                  {children}
                                </p>
                              ),
                              li: ({ children }) => (
                                <li className="flex items-start gap-2 mb-1.5 text-sm list-none"
                                  style={{ color: 'rgba(204,204,204,0.75)' }}>
                                  <span style={{ color: '#007acc', marginTop: 4, flexShrink: 0 }}>▸</span>
                                  <span>{children}</span>
                                </li>
                              ),
                              ul: ({ children }) => <ul className="pl-0 my-2">{children}</ul>,
                              ol: ({ children }) => <ol className="pl-0 my-2">{children}</ol>,
                              strong: ({ children }) => (
                                <strong style={{ color: syntaxStr, fontWeight: 600 }}>{children}</strong>
                              ),
                              code: ({ children }) => (
                                <code className="px-1.5 py-0.5 rounded text-xs"
                                  style={{ background: 'rgba(255,255,255,0.06)', color: syntaxStr }}>
                                  {children}
                                </code>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className="pl-4 my-3 text-sm italic"
                                  style={{ borderLeft: `2px solid ${syntaxComment}`, color: 'rgba(204,204,204,0.55)' }}>
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
                          {`// No detailed documentation yet.`}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* ── package.json tab ──────────────────── */}
                {activeTab === 'stack' && (
                  <div className="flex">
                    {/* line numbers */}
                    <div
                      className="flex-shrink-0 px-3 py-5 text-right select-none"
                      style={{ color: 'rgba(204,204,204,0.2)', fontSize: 12, lineHeight: '1.75rem', minWidth: 44 }}
                    >
                      {Array.from({ length: project.technologies.length + 8 }, (_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>

                    {/* JSON content */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex-1 px-4 py-5 text-sm"
                      style={{ lineHeight: '1.75rem' }}
                    >
                      <div style={{ color: syntaxPunct }}>{'{'}</div>

                      <div className="ml-5">
                        <span style={{ color: syntaxKey }}>"name"</span>
                        <span style={{ color: syntaxPunct }}>: </span>
                        <span style={{ color: syntaxStr }}>"{project.id}"</span>
                        <span style={{ color: syntaxPunct }}>,</span>
                      </div>

                      <div className="ml-5">
                        <span style={{ color: syntaxKey }}>"status"</span>
                        <span style={{ color: syntaxPunct }}>: </span>
                        <span style={{ color: status.color }}>"{project.status}"</span>
                        <span style={{ color: syntaxPunct }}>,</span>
                      </div>

                      <div className="ml-5">
                        <span style={{ color: syntaxKey }}>"dependencies"</span>
                        <span style={{ color: syntaxPunct }}>: {'{'}</span>
                      </div>

                      {project.technologies.map((tech, i) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.04 }}
                          className="ml-10 flex items-center gap-2"
                        >
                          <span style={{ color: syntaxKey }}>"{tech}"</span>
                          <span style={{ color: syntaxPunct }}>: </span>
                          <span style={{ color: syntaxStr }}>"latest"</span>
                          {i < project.technologies.length - 1 && (
                            <span style={{ color: syntaxPunct }}>,</span>
                          )}
                        </motion.div>
                      ))}

                      <div className="ml-5" style={{ color: syntaxPunct }}>{'}'}</div>

                      {project.priority && (
                        <div className="ml-5">
                          <span style={{ color: syntaxKey }}>"priority"</span>
                          <span style={{ color: syntaxPunct }}>: </span>
                          <span style={{ color: syntaxNum }}>"{project.priority}"</span>
                        </div>
                      )}

                      <div style={{ color: syntaxPunct }}>{'}'}</div>

                      {/* comment at bottom */}
                      <div className="mt-4 text-xs" style={{ color: syntaxComment }}>
                        {`// ${project.technologies.length} dependencies · ${project.status}`}
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* ── links.sh tab ──────────────────────── */}
                {activeTab === 'links' && (
                  <div className="flex">
                    {/* line numbers */}
                    <div
                      className="flex-shrink-0 px-3 py-5 text-right select-none"
                      style={{ color: 'rgba(204,204,204,0.2)', fontSize: 12, lineHeight: '1.75rem', minWidth: 44 }}
                    >
                      {Array.from({ length: 20 }, (_, i) => <div key={i}>{i + 1}</div>)}
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex-1 px-4 py-5 text-sm"
                      style={{ lineHeight: '1.75rem' }}
                    >
                      {/* shebang */}
                      <div style={{ color: syntaxComment }}>#!/bin/bash</div>
                      <div style={{ color: syntaxComment }} className="mb-4">{`# Project links for ${project.id}`}</div>

                      {project.githubUrl ? (
                        <>
                          <div>
                            <span style={{ color: syntaxKeyword }}>echo </span>
                            <span style={{ color: syntaxStr }}>"Opening GitHub repository..."</span>
                          </div>
                          <div className="mb-3">
                            <span style={{ color: syntaxKey }}>GITHUB_URL</span>
                            <span style={{ color: syntaxPunct }}>=</span>
                            <span style={{ color: syntaxStr }}>"{project.githubUrl}"</span>
                          </div>
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 4 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg text-sm mb-4 transition-all"
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: '#cccccc',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
                              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                            }}
                          >
                            <Github size={16} style={{ color: '#cccccc' }} />
                            <span>github.com/{project.githubUrl.split('github.com/')[1]}</span>
                            <ExternalLink size={12} style={{ color: 'rgba(204,204,204,0.4)', marginLeft: 'auto' }} />
                          </motion.a>
                        </>
                      ) : (
                        <div className="mb-3" style={{ color: syntaxComment }}>{`# No GitHub URL configured`}</div>
                      )}

                      {project.liveUrl ? (
                        <>
                          <div>
                            <span style={{ color: syntaxKeyword }}>echo </span>
                            <span style={{ color: syntaxStr }}>"Opening live deployment..."</span>
                          </div>
                          <div className="mb-3">
                            <span style={{ color: syntaxKey }}>LIVE_URL</span>
                            <span style={{ color: syntaxPunct }}>=</span>
                            <span style={{ color: syntaxStr }}>"{project.liveUrl}"</span>
                          </div>
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 4 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg text-sm transition-all"
                            style={{
                              background: 'rgba(0,122,204,0.08)',
                              border: '1px solid rgba(0,122,204,0.25)',
                              color: '#9cdcfe',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,122,204,0.5)';
                              (e.currentTarget as HTMLElement).style.background = 'rgba(0,122,204,0.15)';
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,122,204,0.25)';
                              (e.currentTarget as HTMLElement).style.background = 'rgba(0,122,204,0.08)';
                            }}
                          >
                            <ExternalLink size={16} />
                            <span>{project.liveUrl}</span>
                            <ExternalLink size={12} style={{ color: 'rgba(156,220,254,0.4)', marginLeft: 'auto' }} />
                          </motion.a>
                        </>
                      ) : (
                        <div style={{ color: syntaxComment }}>{`# No live deployment URL`}</div>
                      )}

                      {!project.githubUrl && !project.liveUrl && (
                        <div>
                          <div style={{ color: syntaxComment }}>{`# No external links configured for this project`}</div>
                          <div className="mt-2" style={{ color: syntaxComment }}>{`# exit 1`}</div>
                        </div>
                      )}

                      {/* terminal prompt at bottom */}
                      <div className="mt-8 flex items-center gap-2 text-xs" style={{ color: 'rgba(204,204,204,0.3)' }}>
                        <span style={{ color: '#22c55e' }}>nithin@portfolio</span>
                        <span>:</span>
                        <span style={{ color: '#9cdcfe' }}>~/{project.id}</span>
                        <span>$</span>
                        <span className="animate-pulse">▋</span>
                      </div>
                    </motion.div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* ── Status bar (VS Code bottom bar) ──────────── */}
          <div
            className="flex items-center justify-between px-4 py-1 flex-shrink-0 text-[10px]"
            style={{
              background: '#0b1120',
              borderTop: '1px solid rgba(148,163,184,0.4)',
              color: 'rgba(249,250,251,0.9)',
            }}
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <StatusIcon size={10} />
                {project.status}
              </span>
              <span>⎇ main</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{activeTab === 'readme' ? 'Markdown' : activeTab === 'stack' ? 'JSON' : 'Shell Script'}</span>
              <span>UTF-8</span>
              <span>Ln 1, Col 1</span>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};