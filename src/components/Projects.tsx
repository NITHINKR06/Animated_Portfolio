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
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import type { Project } from '../data';
import InfiniteMenu from './InfiniteMenu';

interface ProjectsProps {
  onProjectClick?: (project: Project) => void;
}

type ProjectWithExtras = Project & { thumbnail?: string; screenshots?: string[]; image?: string };

// Tech-themed Unsplash images — grayscale, high contrast, work with WebGL CORS
const SPHERE_IMAGES = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=600&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=600&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1592609931095-54a2168ae893?q=80&w=600&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1530822847156-5df684ec5105?q=80&w=600&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&h=600&fit=crop&auto=format',
];

export const Projects = ({ onProjectClick = () => {} }: ProjectsProps) => {
  const projects = portfolioData.projects;

  const menuItems = projects.map((p, i) => {
    const proj = p as ProjectWithExtras;
    return {
      image: SPHERE_IMAGES[i % SPHERE_IMAGES.length],
      link: proj.liveUrl || proj.githubUrl || '#',
      title: proj.title,
      description: proj.description,
    };
  });

  return (
    <section
      id="projects"
      className="theme-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        // Offset for sidebar (sidebar is ~64px wide)
        paddingLeft: '64px',
        boxSizing: 'border-box',
      }}
    >
      {/* Floating section header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '64px',
          right: 0,
          textAlign: 'center',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-1">
          My <span className="text-gradient">Projects</span>
        </h2>
        <p style={{ color: '#888', fontSize: '1rem', marginTop: '0.25rem' }}>
          Drag to spin · Click ↗ to visit
        </p>
      </motion.div>

      {/* InfiniteMenu fills the remaining space */}
      <div style={{ width: '100%', height: '100%' }}>
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">No projects found.</p>
          </div>
        ) : (
          <InfiniteMenu items={menuItems} backgroundColor="transparent" scale={1.0} />
        )}
      </div>
    </section>
  );
};
