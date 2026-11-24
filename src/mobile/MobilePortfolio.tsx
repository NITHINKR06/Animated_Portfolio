import React, { useEffect } from 'react';
import './mobile.css';
import {
  Hero,
  ExperienceScene,
  EducationScene,
  ContactScene,
} from '../components';
import { MobileNav } from './MobileNav';
import { MobileAbout } from './MobileAbout';
import { MobileSkills } from './MobileSkills';
import { MobileProjects } from './MobileProjects';
import { MobileCertifications } from './MobileCertifications';
import type { Project } from '../data';

interface MobilePortfolioProps {
  onResumeClick: () => void;
  onProjectClick: (project: Project) => void;
}

/**
 * MobilePortfolio: The dedicated, minimal mobile-optimized experience.
 *
 * Excludes heavy Three.js scenes & desktop scroll-hijacks:
 *  - SystemScene (3D wall-blast & demolition) -> replaced by MobileSkills
 *  - ProjectsScene (3D Vande Bharat train express) -> replaced by MobileProjects (4-item progressive load)
 *  - IdentityScene (desktop pinned 3-panel horizontal track) -> replaced by MobileAbout (concise, zero text dump)
 *  - CertificationScene (desktop layout) -> replaced by MobileCertifications (2-column grid + progressive load)
 *  - DigitalWorldCanvas (continuous background WebGL) -> omitted to preserve mobile GPU/battery
 *
 * Retains all portfolio data, interactive modals, and the Hero stage.
 */
export function MobilePortfolio({ onResumeClick, onProjectClick }: MobilePortfolioProps) {
  // Handle cross-page pending scroll targets (e.g. Navigating from /services to #skills)
  useEffect(() => {
    const pendingTarget = sessionStorage.getItem('pendingScrollTarget');
    if (pendingTarget) {
      sessionStorage.removeItem('pendingScrollTarget');
      const timer = setTimeout(() => {
        const id = pendingTarget.startsWith('#') ? pendingTarget.slice(1) : pendingTarget;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="mobile-root">
      {/* Mobile Navigation Bubble & Drawer with Smart Scroll Show/Hide */}
      <MobileNav onResumeClick={onResumeClick} />

      {/* Main Single-Column Fluid Vertical Stream without overflow locks */}
      <main className="mobile-flow">
        {/* Scene 01: Hero Stage */}
        <Hero onResumeClick={onResumeClick} onProjectClick={onProjectClick} />

        {/* Scene 02: Minimalist, Concise About & Focus (replaces massive desktop text dump) */}
        <MobileAbout />

        {/* Scene 03: Minimalist 2D Technical Skills (replaces 3D Wall Blast) */}
        <MobileSkills />

        {/* Scene 04: Professional Experience Timeline */}
        <ExperienceScene />

        {/* Scene 05: Academic Foundation */}
        <EducationScene />

        {/* Scene 06: Featured Deployments with 4-at-a-time Progressive Load (replaces 3D Train) */}
        <MobileProjects onProjectClick={onProjectClick} />

        {/* Scene 07: Accreditations 2-Column Grid with Progressive Load & Modal */}
        <MobileCertifications />

        {/* Scene 08: Direct Transmission / Contact */}
        <ContactScene onResumeClick={onResumeClick} />
      </main>
    </div>
  );
}
