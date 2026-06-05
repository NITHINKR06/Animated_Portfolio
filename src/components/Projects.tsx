import React, { useState, useEffect, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { ExternalLink, Code, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData, Project } from '../data/portfolio';

interface ProjectsProps {
  onProjectClick?: (project: Project) => void;
}

type ProjectWithExtras = Project & { thumbnail?: string; screenshots?: string[]; image?: string };

export const Projects = ({ onProjectClick = () => {} }: ProjectsProps) => {
  const projects = portfolioData.projects;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, nextSlide, prevSlide]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  return (
    <section id="projects" className="py-24 px-4 overflow-hidden relative bg-slate-950/20">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-gray-400">Swipe or click to explore — interactive 3D deck</p>
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">No projects found.</p>
          </div>
        ) : (
          <div className="relative flex flex-col items-center">
            
            {/* 3D Perspective Swiper Viewport */}
            <div 
              className="relative w-full max-w-[95vw] md:max-w-5xl h-[520px] flex items-center justify-center"
              style={{ 
                perspective: '1200px', 
                transformStyle: 'preserve-3d' 
              }}
            >
              {projects.map((project, index) => {
                const p: ProjectWithExtras = project as ProjectWithExtras;
                const cardImage = p.thumbnail ?? p.image ?? p.screenshots?.[0];
                const relativeIndex = index - activeIndex;
                const isActive = relativeIndex === 0;

                // 3D placement math
                let x = 0;
                let rotateY = 0;
                let z = 0;
                let opacity = 1;
                let scale = 1;

                if (relativeIndex === 0) {
                  x = 0;
                  rotateY = 0;
                  z = 0;
                  opacity = 1;
                  scale = 1.05;
                } else {
                  // Position relative to active index
                  const side = relativeIndex > 0 ? 1 : -1;
                  x = relativeIndex * 150 + side * 120;
                  rotateY = relativeIndex > 0 ? -40 : 40;
                  z = -150 - Math.abs(relativeIndex) * 100;
                  opacity = Math.max(0.15, 1 - Math.abs(relativeIndex) * 0.35);
                  scale = 0.85;
                }

                // Don't render cards that are too far out for performance & visual clarity
                if (Math.abs(relativeIndex) > 2) {
                  opacity = 0;
                }

                return (
                  <motion.div
                    key={project.id}
                    className="absolute w-[290px] md:w-[350px] h-[460px] rounded-3xl cursor-pointer select-none origin-center animated-card"
                    style={{
                      transformStyle: 'preserve-3d',
                      zIndex: 30 - Math.abs(relativeIndex),
                      pointerEvents: Math.abs(relativeIndex) > 2 ? 'none' : 'auto'
                    }}
                    animate={{
                      x,
                      rotateY,
                      z,
                      opacity,
                      scale,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 25,
                    }}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={handleDragEnd}
                    onClick={() => {
                      if (!isActive) {
                        setActiveIndex(index);
                      }
                    }}
                  >
                    {/* The Project Card */}
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
                      
                      {/* CARD WITH IMAGE (DARK THEME) */}
                      {cardImage ? (
                        <div className="w-full h-full relative bg-slate-900 text-white">
                          <img 
                            src={cardImage} 
                            alt={project.title} 
                            className="w-full h-full object-cover select-none pointer-events-none" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                          
                          {/* Basic bottom info for inactive cards */}
                          {!isActive && (
                            <div className="absolute bottom-6 left-6 right-6 z-10 transition-opacity duration-300">
                              <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
                              <div className="flex flex-wrap gap-1.5">
                                {project.technologies.slice(0, 2).map((tech) => (
                                  <span key={tech} className="text-[10px] px-2 py-0.5 bg-white/10 rounded-md text-white/90">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        
                        // CARD WITHOUT IMAGE: LIGHT THEME FALLBACK (As requested)
                        <div className="w-full h-full p-8 flex flex-col justify-between bg-white text-slate-900 border border-slate-200/80 shadow-2xl relative">
                          {/* Ambient background accent */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full pointer-events-none" />
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-100 to-transparent rounded-tr-full pointer-events-none" />
                          
                          {/* Header section of Light Theme Card */}
                          <div className="relative z-10">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border ${
                              project.status === 'completed' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' :
                              project.status === 'in-progress' ? 'text-amber-600 bg-amber-50 border-amber-100' :
                              'text-blue-600 bg-blue-50 border-blue-100'
                            }`}>
                              {project.status.replace('-', ' ')}
                            </span>
                            
                            <h3 className="text-2xl font-extrabold text-slate-800 leading-tight mb-4 tracking-tight">
                              {project.title}
                            </h3>
                          </div>

                          {/* Body details */}
                          <div className="relative z-10 flex-grow py-2">
                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-4">
                              {project.description}
                            </p>
                          </div>

                          {/* Technologies bottom tags */}
                          <div className="relative z-10 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span 
                                key={tech} 
                                className="text-[10px] px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md font-semibold border border-slate-200"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-[10px] px-2 py-1 text-slate-400 font-medium">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* ACTIVE CARD OVERLAY (Coverflow mockup details) */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-700/80 via-purple-900/90 to-slate-950 flex flex-col justify-between p-8 text-center text-white z-20 backdrop-blur-[2px] transition-all duration-300">
                          
                          {/* Mini logo or icon container */}
                          <div className="flex justify-center pt-4">
                            <motion.div 
                              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 3 }}
                            >
                              <Code size={20} className="text-purple-200" />
                            </motion.div>
                          </div>

                          {/* Circular action buttons matching mock */}
                          <div className="flex justify-center gap-6 my-auto">
                            {/* Eye / View details (launches VS Code modal) */}
                            <motion.button
                              whileHover={{ scale: 1.12 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onProjectClick(p);
                              }}
                              className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/30 backdrop-blur-md shadow-lg transition-colors"
                              title="Explore in VS Code Workspace"
                            >
                              <Eye size={22} />
                            </motion.button>

                            {/* Demo/Code external link */}
                            {(project.liveUrl || project.githubUrl) && (
                              <motion.a
                                href={project.liveUrl || project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.12 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/30 backdrop-blur-md shadow-lg transition-colors"
                                title="Visit Project"
                              >
                                <ExternalLink size={20} />
                              </motion.a>
                            )}
                          </div>

                          {/* Text info layout at bottom matching mock */}
                          <div className="pb-2">
                            <h3 className="text-xl font-bold mb-2 tracking-tight line-clamp-1">{project.title}</h3>
                            <p className="text-xs text-purple-200/80 leading-relaxed line-clamp-3 px-2">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      )}

                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex items-center gap-6 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="p-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all shadow-md backdrop-blur-sm"
                aria-label="Previous Project"
              >
                <ChevronLeft size={22} />
              </motion.button>

              {/* Slider Dots */}
              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === activeIndex 
                        ? 'bg-purple-500 scale-125 ring-2 ring-purple-400/50' 
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="p-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all shadow-md backdrop-blur-sm"
                aria-label="Next Project"
              >
                <ChevronRight size={22} />
              </motion.button>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};