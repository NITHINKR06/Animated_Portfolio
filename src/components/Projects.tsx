import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code, Clock, Rocket, Loader2, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { portfolioData, Project } from "../data/portfolio";
import { fetchGitHubProjects, mergeProjects } from "../utils/github";
import { ProjectDetailModal } from "./ProjectDetailModal";

type ProjectStatus = "completed" | "in-progress" | "planned";

const statusIcons: Record<ProjectStatus, { icon: any; color: string }> = {
  completed: { icon: Rocket, color: "text-green-400" },
  "in-progress": { icon: Clock, color: "text-yellow-400" },
  planned: { icon: Code, color: "text-blue-400" },
};

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Get GitHub username from portfolio data
        const githubUrl = portfolioData.personal.github;
        const username = githubUrl.split("/").pop() || "";

        // Fetch GitHub projects (with optional repo name filtering)
        const githubProjects = await fetchGitHubProjects(
          username,
          portfolioData.githubRepos.length > 0 ? portfolioData.githubRepos : undefined
        );

        // Merge with existing projects
        const mergedProjects = mergeProjects(portfolioData.projects, githubProjects);

        // Sort by newest first (reverse)
        setProjects([...mergedProjects].reverse());
      } catch (error) {
        console.error("Error loading projects:", error);
        // Fallback to existing projects if GitHub fetch fails
        setProjects([...portfolioData.projects].reverse());
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header - Apply Scroll-Triggered Fade-In */}
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
          <p className="text-lg text-gray-400">
            Things I've built — newest first
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            <span className="ml-3 text-gray-400">Loading projects from GitHub...</span>
          </div>
        )}

        {/* Grid - Apply Staggered Entry Animation */}
        {!isLoading && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.15 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.length === 0 ? (
              <div className="col-span-2 text-center py-20">
                <p className="text-gray-400">No projects found.</p>
              </div>
            ) : (
              projects.map((project) => {
                const StatusIcon = statusIcons[project.status as ProjectStatus].icon;
                const statusColor = statusIcons[project.status as ProjectStatus].color;

                return (
                  <motion.div
                    key={project.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9, y: 30 },
                      visible: { opacity: 1, scale: 1, y: 0 }
                    }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative glass-card p-6 rounded-2xl h-full border border-white/10 bg-gradient-to-br from-white/5 via-purple-500/5 to-pink-500/5 backdrop-blur-md hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group/card overflow-hidden">
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover/card:from-purple-500/10 group-hover/card:via-pink-500/10 group-hover/card:to-purple-500/10 rounded-2xl transition-all duration-500 pointer-events-none" />
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000" />
                      </div>
                      
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 pr-3">
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-purple-400 group-hover/card:via-pink-400 group-hover/card:to-purple-400 transition-all duration-300">
                              {project.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <StatusIcon size={16} className={statusColor} />
                              <span className={`text-sm capitalize font-medium ${statusColor}`}>
                                {project.status.replace("-", " ")}
                              </span>
                            </div>
                          </div>
                          <div className="p-2.5 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl border border-purple-500/40 group-hover/card:from-purple-500/50 group-hover/card:to-pink-500/50 group-hover/card:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/20">
                            <Code size={18} className="text-purple-200" />
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 leading-relaxed mb-5 text-sm line-clamp-3 flex-grow">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        {project.technologies.length > 0 && (
                          <motion.div
                            className="flex flex-wrap gap-2 mb-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ staggerChildren: 0.03 }}
                          >
                            {project.technologies.slice(0, 4).map((tech) => (
                              <motion.span
                                key={tech}
                                variants={{
                                  hidden: { opacity: 0, scale: 0.8 },
                                  visible: { opacity: 1, scale: 1 }
                                }}
                                className="px-3 py-1.5 bg-gradient-to-r from-purple-600/40 to-pink-600/40 text-purple-100 rounded-lg text-xs font-medium border border-purple-500/40 hover:border-purple-400/60 hover:from-purple-600/50 hover:to-pink-600/50 transition-all duration-200 shadow-sm"
                              >
                                {tech}
                              </motion.span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-3 py-1.5 text-purple-300 text-xs font-medium">
                                +{project.technologies.length - 4} more
                              </span>
                            )}
                          </motion.div>
                        )}

                        {/* Action Section */}
                        <div className="mt-auto pt-4 border-t border-white/10">
                          <div className="flex items-center justify-between">
                            <div className="flex gap-3">
                              {project.githubUrl && (
                                <motion.a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="p-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-purple-200 transition-all duration-200 border border-purple-500/30 hover:border-purple-400/50"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Github size={16} />
                                </motion.a>
                              )}
                              {project.liveUrl && (
                                <motion.a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="p-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/40 text-gray-300 hover:text-white transition-all duration-200 border border-slate-600/30 hover:border-slate-500/50"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink size={16} />
                                </motion.a>
                              )}
                            </div>
                            <motion.div
                              className="flex items-center gap-2 text-purple-400 group-hover/card:text-purple-300 transition-colors"
                              whileHover={{ x: 5 }}
                            >
                              <span className="text-sm font-medium">View Details</span>
                              <ArrowRight size={16} className="group-hover/card:translate-x-1 transition-transform" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
