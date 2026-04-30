import React, { ElementType } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Clock, Rocket, ArrowRight } from 'lucide-react';
import { portfolioData, Project } from '../data/portfolio';

type ProjectStatus = 'completed' | 'in-progress' | 'planned';

const statusConfig: Record<ProjectStatus, { icon: ElementType; color: string }> = {
  completed:     { icon: Rocket, color: 'text-green-400'  },
  'in-progress': { icon: Clock,  color: 'text-yellow-400' },
  planned:       { icon: Code,   color: 'text-blue-400'   },
};

interface ProjectsProps {
  onProjectClick?: (project: Project) => void;
}

type ProjectWithExtras = Project & { thumbnail?: string; screenshots?: string[]; image?: string };

export const Projects = ({ onProjectClick = () => {} }: ProjectsProps) => {
  const projects = portfolioData.projects;

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-gray-400">Things I've built — newest first</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.15 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.length === 0 ? (
            <div className="col-span-3 text-center py-20">
              <p className="text-gray-400">No projects found.</p>
            </div>
          ) : (
            projects.map((project) => {
              const p: ProjectWithExtras = project as ProjectWithExtras;
              const cfg        = statusConfig[p.status as ProjectStatus];
              const StatusIcon = cfg.icon;
              const cardImage  = p.thumbnail ?? p.image ?? p.screenshots?.[0];

              return (
                <motion.div
                  key={project.id}
                  variants={{
                    hidden:  { opacity: 0, scale: 0.95, y: 30 },
                    visible: { opacity: 1, scale: 1,    y: 0  },
                  }}
                  className="group cursor-pointer animated-card"
                  onClick={() => onProjectClick(p)}
                >
                  <div className="relative rounded-3xl h-full overflow-hidden bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 group/card shadow-xl hover:shadow-2xl hover:shadow-purple-500/20">

                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover/card:from-purple-500/20 group-hover/card:via-pink-500/20 group-hover/card:to-purple-500/20 blur-xl transition-all duration-500 -z-10" />
                    <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000" />
                    </div>

                    <div className="relative h-full">
                      <div className="relative h-72 overflow-hidden">
                        {cardImage ? (
                          <>
                            <img src={cardImage} alt={project.title} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-slate-900 to-pink-900/20">
                            <div className="relative">
                              <Code size={72} className="text-purple-400/20" />
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-2xl" />
                            </div>
                          </div>
                        )}

                        {/* Status badge */}
                        <div className="absolute top-4 right-4 z-20">
                          <motion.div
                            className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl ${cfg.color} bg-black/30 border border-white/20 shadow-lg shadow-black/50`}
                            whileHover={{ scale: 1.05 }}
                          >
                            <StatusIcon size={14} />
                            <span className="text-xs capitalize font-semibold tracking-wide">
                              {project.status.replace('-', ' ')}
                            </span>
                          </motion.div>
                        </div>

                        {/* Quick links — stop propagation */}
                        <div className="absolute top-4 left-4 z-20 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                          {project.githubUrl && (
                            <motion.a
                              href={project.githubUrl}
                              target="_blank" rel="noopener noreferrer"
                              whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}
                              className="p-3 rounded-xl bg-black/50 hover:bg-purple-600/90 text-white backdrop-blur-xl border border-white/20 shadow-xl transition-all"
                              onClick={e => e.stopPropagation()}
                            >
                              <Github size={18} />
                            </motion.a>
                          )}
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank" rel="noopener noreferrer"
                              whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.95 }}
                              className="p-3 rounded-xl bg-black/50 hover:bg-purple-600/90 text-white backdrop-blur-xl border border-white/20 shadow-xl transition-all"
                              onClick={e => e.stopPropagation()}
                            >
                              <ExternalLink size={18} />
                            </motion.a>
                          )}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
                      </div>

                      <div className="relative p-6 bg-gradient-to-b from-slate-900/95 to-slate-900/98 backdrop-blur-md">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-purple-400 group-hover/card:via-pink-400 group-hover/card:to-purple-400 transition-all duration-500">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-5 text-sm line-clamp-2 group-hover/card:text-gray-300 transition-colors">
                          {project.description}
                        </p>

                        {project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-5">
                            {project.technologies.slice(0, 3).map(tech => (
                              <span key={tech} className="px-3 py-1.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-200 rounded-lg text-xs font-medium border border-purple-500/30">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="px-3 py-1.5 text-purple-300/60 text-xs font-medium">
                                +{project.technologies.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-purple-400 group-hover/card:text-purple-300 transition-colors pt-4 border-t border-white/5">
                          <span className="text-sm font-semibold">Explore Project</span>
                          <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                            <ArrowRight size={16} />
                          </motion.div>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </div>
    </section>
  );
};