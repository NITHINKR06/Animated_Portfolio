/**
 * @component Projects
 * @description Projects section of the Animated 3D Portfolio
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 *
 * Part of a personal portfolio. Content and design belong to Nithin K R.
 * Code structure may be studied; redistribution as personal portfolio
 * without attribution violates the project license.
 */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { ExternalLink, Code, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import type { Project } from '../data';

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
      // Don't trigger if user is typing in an input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      )
        return;

      // Don't trigger if a modal is open (indicated by body scroll lock)
      if (document.body.style.overflow === 'hidden') return;

      // Only trigger if the projects section is somewhat in view
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (!isVisible) return;
      }

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
                transformStyle: 'preserve-3d',
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
                const isFar = Math.abs(relativeIndex) > 2;
                if (isFar) {
                  opacity = 0;
                }

                return (
                  <motion.div
                    key={project.id}
                    className="absolute w-[290px] md:w-[350px] h-[460px] rounded-3xl cursor-pointer select-none origin-center animated-card"
                    style={{
                      transformStyle: 'preserve-3d',
                      zIndex: 30 - Math.abs(relativeIndex),
                      pointerEvents: isFar ? 'none' : 'auto',
                      visibility: isFar ? 'hidden' : 'visible',
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
                    drag={isActive ? 'x' : false}
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
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-purple-500/20 bg-slate-950/70 text-white transition-all duration-500 hover:border-purple-500/40">
                      {/* Ambient background glows */}
                      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/10 blur-[50px] pointer-events-none" />
                      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-500/10 blur-[50px] pointer-events-none" />

                      {/* Cyber Grid Pattern */}
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage:
                            'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
                          backgroundSize: '20px 20px',
                        }}
                      />

                      {/* Image container (only if cardImage exists) */}
                      {cardImage && (
                        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                          <img
                            src={cardImage}
                            alt={project.title}
                            className="w-full h-full object-cover select-none pointer-events-none opacity-40 hover:opacity-50 transition-all duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.opacity = '0';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
                        </div>
                      )}

                      {/* Basic info for inactive cards */}
                      {!isActive && (
                        <div className="absolute bottom-6 left-6 right-6 z-10 transition-all duration-300">
                          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] px-2 py-0.5 bg-white/10 rounded-md text-white/90 border border-white/5"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ACTIVE CARD OVERLAY */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-slate-950/90 to-slate-950 flex flex-col justify-between p-8 text-center text-white z-20 backdrop-blur-md transition-all duration-300">
                          {/* Floating active glowing blobs */}
                          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/25 blur-[60px] pointer-events-none animate-pulse" />
                          <div
                            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-500/25 blur-[60px] pointer-events-none animate-pulse"
                            style={{ animationDelay: '1.5s' }}
                          />

                          {/* Active card grid overlay */}
                          <div
                            className="absolute inset-0 opacity-25 pointer-events-none"
                            style={{
                              backgroundImage:
                                'linear-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.15) 1px, transparent 1px)',
                              backgroundSize: '24px 24px',
                            }}
                          />

                          {/* Mini logo or icon container */}
                          <div className="flex justify-center pt-4 relative z-10">
                            <motion.div
                              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-lg shadow-purple-500/10"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 3 }}
                            >
                              <Code size={20} className="text-purple-200" />
                            </motion.div>
                          </div>

                          {/* Circular action buttons */}
                          <div className="flex justify-center gap-6 my-auto relative z-10">
                            {/* Eye / View details */}
                            <motion.button
                              whileHover={{ scale: 1.12 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onProjectClick(p);
                              }}
                              className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/30 backdrop-blur-md shadow-lg shadow-purple-500/20 transition-colors"
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
                                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/30 backdrop-blur-md shadow-lg shadow-purple-500/20 transition-colors"
                                title="Visit Project"
                              >
                                <ExternalLink size={20} />
                              </motion.a>
                            )}
                          </div>

                          {/* Text info layout at bottom */}
                          <div className="pb-2 relative z-10">
                            <h3 className="text-xl font-bold mb-2 tracking-tight line-clamp-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-purple-200">
                              {project.title}
                            </h3>
                            <p className="text-xs text-purple-200/90 leading-relaxed line-clamp-5 px-2 overflow-y-auto max-h-[120px]">
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
