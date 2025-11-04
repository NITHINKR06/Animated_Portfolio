import { motion } from "framer-motion";
import { Github, ExternalLink, Code, Clock, Rocket } from "lucide-react";
import { portfolioData } from "../data/portfolio";

type ProjectStatus = "completed" | "in-progress" | "planned";

const statusIcons: Record<ProjectStatus, { icon: any; color: string }> = {
  completed: { icon: Rocket, color: "text-green-400" },
  "in-progress": { icon: Clock, color: "text-yellow-400" },
  planned: { icon: Code, color: "text-blue-400" },
};

export const Projects = () => {
  // newest first
  const projects = [...portfolioData.projects].reverse();

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
            Things I’ve built — newest first
          </p>
        </motion.div>

        {/* Grid - Apply Staggered Entry Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.15 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => {
            const StatusIcon = statusIcons[project.status as ProjectStatus].icon;
            const statusColor = statusIcons[project.status as ProjectStatus].color;

            return (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 30 },
                  visible: { opacity: 1, scale: 1, y: 0 }
                }}
                className="group"
              >
                <div className="glass-card p-6 rounded-2xl h-full border border-white/10 bg-white/5 backdrop-blur-md hover:border-purple-500/30 transition-all duration-300">
                  
                  {/* Title + Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <StatusIcon size={16} className={statusColor} />
                        <span className={`text-sm capitalize ${statusColor}`}>
                          {project.status.replace("-", " ")}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity">
                      <Code size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs border border-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-white hover:bg-slate-700 transition-colors"
                      >
                        <ExternalLink size={16} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
