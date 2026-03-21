import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, Github, ArrowLeft, X,
  Code2, Layers, Link2, CheckCircle2, Clock, Lightbulb,
  Terminal,
} from 'lucide-react';
import { useEffect, useState, lazy, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { portfolioData } from '../data/portfolio';
const ThreeDBackground = lazy(() => import('./ThreeDBackground'));

/* ─── status config ─────────────────────────────────────────── */
const statusConfig = {
  completed:    { label: 'completed',    color: '#22c55e', icon: CheckCircle2, dot: 'bg-green-400'  },
  'in-progress':{ label: 'in-progress',  color: '#f59e0b', icon: Clock,        dot: 'bg-yellow-400' },
  planned:      { label: 'planned',      color: '#8b5cf6', icon: Lightbulb,    dot: 'bg-purple-400' },
};

type TabId = 'readme' | 'stack' | 'links';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'readme', label: 'README.md',    icon: '📄' },
  { id: 'stack',  label: 'package.json', icon: '📦' },
  { id: 'links',  label: 'links.sh',     icon: '🔗' },
];

/* syntax colours */
const C = {
  comment:  'rgba(106,153,85,0.9)',
  key:      '#9cdcfe',
  str:      '#ce9178',
  punct:    '#d4d4d4',
  keyword:  '#c586c0',
  num:      '#b5cea8',
};

export default function ProjectPage() {
  const { id }     = useParams<{ id: string }>();
  const navigate   = useNavigate();
  const project    = portfolioData.projects.find(p => p.id === id) ?? null;

  const [activeTab, setActiveTab] = useState<TabId>('readme');
  const [typedPath, setTypedPath] = useState('');

  /* redirect 404 */
  useEffect(() => {
    if (!project) navigate('/', { replace: true });
  }, [project]);

  /* typing animation for breadcrumb */
  useEffect(() => {
    if (!project) return;
    const path = `~/projects/${project.id}/`;
    setTypedPath('');
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTypedPath(path.slice(0, i));
      if (i >= path.length) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, [project?.id]);

  /* keyboard: Escape → back */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') navigate(-1); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!project) return null;

  const status     = statusConfig[project.status] ?? statusConfig.completed;
  const StatusIcon = status.icon;

  return (
    <div className="relative min-h-screen bg-[#0a0118] flex flex-col">

      {/* 3D background — same as portfolio */}
      <Suspense fallback={<div className="fixed inset-0 bg-[#0a0118] z-0" />}>
        <ThreeDBackground />
      </Suspense>

      {/* ── outer chrome — full page VS Code window ─────────── */}
      <motion.div
        className="relative z-10 flex flex-col min-h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Title bar ───────────────────────────────────────── */}
        <div
          className="flex items-center gap-3 px-5 py-3 flex-shrink-0 select-none"
          style={{ background: 'rgba(50,50,51,0.92)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
        >
          {/* macOS buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => navigate(-1)}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all flex items-center justify-center group"
            >
              <X size={6} className="opacity-0 group-hover:opacity-100 text-[#4a0000]" />
            </button>
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>

          {/* window title */}
          <div className="flex-1 text-center">
            <span className="text-xs" style={{ color: 'rgba(204,204,204,0.5)', fontFamily: 'system-ui' }}>
              {project.id} — VS Code
            </span>
          </div>

          {/* back button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all"
            style={{ color: 'rgba(204,204,204,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
            whileHover={{ color: '#cccccc', borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)' }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={12} />
            <span style={{ fontFamily: 'system-ui' }}>Back to Portfolio</span>
          </motion.button>

          {/* status badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            <span className="text-[10px]" style={{ color: status.color, fontFamily: 'monospace' }}>
              {status.label}
            </span>
          </div>
        </div>

        {/* ── Editor layout ────────────────────────────────────── */}
        <div className="flex flex-1 overflow-hidden" style={{ fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace" }}>

          {/* Activity bar */}
          <div
            className="flex flex-col items-center gap-5 py-5 px-2 flex-shrink-0"
            style={{ background: 'rgba(51,51,51,0.88)', borderRight: '1px solid rgba(255,255,255,0.05)', width: 48, backdropFilter: 'blur(20px)' }}
          >
            {[
              { icon: Code2,  id: 'readme' },
              { icon: Layers, id: 'stack'  },
              { icon: Link2,  id: 'links'  },
            ].map(({ icon: Icon, id: tid }) => (
              <button
                key={tid}
                onClick={() => setActiveTab(tid as TabId)}
                className="p-1.5 rounded transition-all"
                title={tid}
                style={{
                  color:      activeTab === tid ? '#cccccc' : 'rgba(204,204,204,0.35)',
                  borderLeft: activeTab === tid ? '2px solid #cccccc' : '2px solid transparent',
                }}
              >
                <Icon size={20} />
              </button>
            ))}
          </div>

          {/* Main editor */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Tab bar */}
            <div
              className="flex items-center flex-shrink-0"
              style={{ background: 'rgba(45,45,45,0.9)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
            >
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs whitespace-nowrap transition-colors flex-shrink-0 relative"
                  style={{
                    color:       activeTab === tab.id ? '#cccccc' : 'rgba(204,204,204,0.4)',
                    background:  activeTab === tab.id ? 'rgba(30,30,30,0.95)' : 'transparent',
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                    borderTop:   activeTab === tab.id ? '1px solid #007acc' : '1px solid transparent',
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Breadcrumb */}
            <div
              className="flex items-center gap-1.5 px-5 py-1.5 text-[11px] flex-shrink-0"
              style={{ background: 'rgba(30,30,30,0.9)', borderBottom: '1px solid rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)' }}
            >
              <Terminal size={10} style={{ color: 'rgba(204,204,204,0.3)' }} />
              <span style={{ color: C.key }}>{typedPath}</span>
              <span className="animate-pulse" style={{ color: 'rgba(204,204,204,0.4)' }}>▋</span>
            </div>

            {/* ── Content area ────────────────────────────────── */}
            <div
              className="flex-1 overflow-y-auto"
              style={{
                background: 'rgba(30,30,30,0.88)',
                backdropFilter: 'blur(20px)',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.1) transparent',
              }}
            >
              <div className="max-w-4xl mx-auto">

                {/* ── README tab ──────────────────────────────── */}
                {activeTab === 'readme' && (
                  <motion.div
                    key="readme"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    {/* line numbers */}
                    <div className="flex-shrink-0 px-4 py-6 text-right select-none"
                      style={{ color: 'rgba(204,204,204,0.18)', fontSize: 12, lineHeight: '1.8rem', minWidth: 48 }}>
                      {Array.from({ length: 60 }, (_, i) => <div key={i}>{i + 1}</div>)}
                    </div>

                    <div className="flex-1 px-6 py-6">
                      {/* title */}
                      <div className="mb-6">
                        <div className="text-xs mb-1.5" style={{ color: C.comment }}>{`# ${project.title}`}</div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#d4d4d4' }}>{project.title}</h1>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(204,204,204,0.6)' }}>{project.description}</p>
                      </div>

                      {/* project image if available */}
                      {project.image && (
                        <motion.div
                          className="mb-6 rounded-lg overflow-hidden border"
                          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                        >
                          <img src={project.image} alt={project.title} className="w-full object-cover max-h-64" />
                        </motion.div>
                      )}

                      <div className="mb-6 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

                      {/* markdown details */}
                      {project.details ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h2: ({ children }) => (
                                <h2 className="text-sm font-bold mt-8 mb-3 flex items-center gap-2"
                                  style={{ color: C.key, fontFamily: 'inherit' }}>
                                  <span style={{ color: C.comment }}>//</span> {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-xs font-semibold mt-5 mb-2 uppercase tracking-widest"
                                  style={{ color: C.keyword }}>
                                  {children}
                                </h3>
                              ),
                              p: ({ children }) => (
                                <p className="mb-3 text-sm leading-7" style={{ color: 'rgba(204,204,204,0.8)' }}>{children}</p>
                              ),
                              li: ({ children }) => (
                                <li className="flex items-start gap-2 mb-2 text-sm list-none"
                                  style={{ color: 'rgba(204,204,204,0.75)' }}>
                                  <span style={{ color: '#007acc', marginTop: 5, flexShrink: 0 }}>▸</span>
                                  <span>{children}</span>
                                </li>
                              ),
                              ul: ({ children }) => <ul className="pl-0 my-2">{children}</ul>,
                              ol: ({ children }) => <ol className="pl-0 my-2">{children}</ol>,
                              strong: ({ children }) => (
                                <strong style={{ color: C.str, fontWeight: 600 }}>{children}</strong>
                              ),
                              code: ({ children }) => (
                                <code className="px-1.5 py-0.5 rounded text-xs"
                                  style={{ background: 'rgba(255,255,255,0.06)', color: C.str }}>
                                  {children}
                                </code>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className="pl-4 my-3 text-sm italic"
                                  style={{ borderLeft: `2px solid ${C.comment}`, color: 'rgba(204,204,204,0.5)' }}>
                                  {children}
                                </blockquote>
                              ),
                            }}
                          >
                            {project.details}
                          </ReactMarkdown>
                        </motion.div>
                      ) : (
                        <p className="text-sm" style={{ color: 'rgba(204,204,204,0.35)' }}>
                          {`// No detailed documentation yet.`}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ── package.json tab ────────────────────────── */}
                {activeTab === 'stack' && (
                  <motion.div
                    key="stack"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <div className="flex-shrink-0 px-4 py-6 text-right select-none"
                      style={{ color: 'rgba(204,204,204,0.18)', fontSize: 12, lineHeight: '1.8rem', minWidth: 48 }}>
                      {Array.from({ length: project.technologies.length + 12 }, (_, i) => <div key={i}>{i + 1}</div>)}
                    </div>

                    <div className="flex-1 px-6 py-6 text-sm" style={{ lineHeight: '1.8rem' }}>
                      <div style={{ color: C.punct }}>{'{'}</div>
                      <div className="ml-6">
                        <span style={{ color: C.key }}>"name"</span><span style={{ color: C.punct }}>: </span>
                        <span style={{ color: C.str }}>"{project.id}"</span><span style={{ color: C.punct }}>,</span>
                      </div>
                      <div className="ml-6">
                        <span style={{ color: C.key }}>"version"</span><span style={{ color: C.punct }}>: </span>
                        <span style={{ color: C.str }}>"1.0.0"</span><span style={{ color: C.punct }}>,</span>
                      </div>
                      <div className="ml-6">
                        <span style={{ color: C.key }}>"status"</span><span style={{ color: C.punct }}>: </span>
                        <span style={{ color: status.color }}>"{project.status}"</span><span style={{ color: C.punct }}>,</span>
                      </div>
                      {project.priority && (
                        <div className="ml-6">
                          <span style={{ color: C.key }}>"priority"</span><span style={{ color: C.punct }}>: </span>
                          <span style={{ color: C.num }}>"{project.priority}"</span><span style={{ color: C.punct }}>,</span>
                        </div>
                      )}
                      <div className="ml-6 mt-2">
                        <span style={{ color: C.key }}>"dependencies"</span>
                        <span style={{ color: C.punct }}>: {'{'}</span>
                      </div>
                      {project.technologies.map((tech, i) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 + i * 0.04 }}
                          className="ml-12"
                        >
                          <span style={{ color: C.key }}>"{tech}"</span>
                          <span style={{ color: C.punct }}>: </span>
                          <span style={{ color: C.str }}>"latest"</span>
                          {i < project.technologies.length - 1 && <span style={{ color: C.punct }}>,</span>}
                        </motion.div>
                      ))}
                      <div className="ml-6" style={{ color: C.punct }}>{'}'}</div>
                      <div style={{ color: C.punct }}>{'}'}</div>
                      <div className="mt-5 text-xs" style={{ color: C.comment }}>
                        {`// ${project.technologies.length} dependencies installed`}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── links.sh tab ────────────────────────────── */}
                {activeTab === 'links' && (
                  <motion.div
                    key="links"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <div className="flex-shrink-0 px-4 py-6 text-right select-none"
                      style={{ color: 'rgba(204,204,204,0.18)', fontSize: 12, lineHeight: '1.8rem', minWidth: 48 }}>
                      {Array.from({ length: 24 }, (_, i) => <div key={i}>{i + 1}</div>)}
                    </div>

                    <div className="flex-1 px-6 py-6 text-sm" style={{ lineHeight: '1.8rem' }}>
                      <div style={{ color: C.comment }}>#!/bin/bash</div>
                      <div style={{ color: C.comment }} className="mb-5">{`# Project links — ${project.id}`}</div>

                      {project.githubUrl ? (
                        <div className="mb-6">
                          <div>
                            <span style={{ color: C.keyword }}>echo </span>
                            <span style={{ color: C.str }}>"Opening GitHub repository..."</span>
                          </div>
                          <div className="mb-3">
                            <span style={{ color: C.key }}>GITHUB</span>
                            <span style={{ color: C.punct }}>=</span>
                            <span style={{ color: C.str }}>"{project.githubUrl}"</span>
                          </div>
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 6 }}
                            className="inline-flex items-center gap-3 px-5 py-3 rounded-lg text-sm transition-all"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#cccccc' }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
                              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                            }}
                          >
                            <Github size={16} />
                            <span>{project.githubUrl.replace('https://', '')}</span>
                            <ExternalLink size={12} style={{ color: 'rgba(204,204,204,0.35)', marginLeft: 'auto' }} />
                          </motion.a>
                        </div>
                      ) : (
                        <div className="mb-4" style={{ color: C.comment }}>{`# No GitHub URL configured`}</div>
                      )}

                      {project.liveUrl ? (
                        <div>
                          <div>
                            <span style={{ color: C.keyword }}>echo </span>
                            <span style={{ color: C.str }}>"Opening live deployment..."</span>
                          </div>
                          <div className="mb-3">
                            <span style={{ color: C.key }}>LIVE</span>
                            <span style={{ color: C.punct }}>=</span>
                            <span style={{ color: C.str }}>"{project.liveUrl}"</span>
                          </div>
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 6 }}
                            className="inline-flex items-center gap-3 px-5 py-3 rounded-lg text-sm transition-all"
                            style={{ background: 'rgba(0,122,204,0.08)', border: '1px solid rgba(0,122,204,0.25)', color: C.key }}
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
                            <span>{project.liveUrl.replace('https://', '')}</span>
                            <ExternalLink size={12} style={{ color: 'rgba(156,220,254,0.35)', marginLeft: 'auto' }} />
                          </motion.a>
                        </div>
                      ) : (
                        <div style={{ color: C.comment }}>{`# No live deployment URL`}</div>
                      )}

                      {!project.githubUrl && !project.liveUrl && (
                        <div style={{ color: C.comment }}>{`# No external links configured`}</div>
                      )}

                      {/* terminal prompt */}
                      <div className="mt-10 flex items-center gap-2 text-xs" style={{ color: 'rgba(204,204,204,0.25)' }}>
                        <span style={{ color: '#22c55e' }}>nithin@portfolio</span>
                        <span>:</span>
                        <span style={{ color: C.key }}>~/{project.id}</span>
                        <span>$</span>
                        <span className="animate-pulse">▋</span>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* ── VS Code status bar ───────────────────────────────── */}
        <div
          className="flex items-center justify-between px-5 py-1 flex-shrink-0 text-[10px]"
          style={{ background: '#007acc', color: 'rgba(255,255,255,0.9)' }}
        >
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <StatusIcon size={10} />
              {project.status}
            </span>
            <span>⎇ main</span>
            <span>0 errors · 0 warnings</span>
          </div>
          <div className="flex items-center gap-5">
            <span>{activeTab === 'readme' ? 'Markdown' : activeTab === 'stack' ? 'JSON' : 'Shell Script'}</span>
            <span>UTF-8</span>
            <span>Ln 1, Col 1</span>
            <span>Spaces: 2</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
