/**
 * @component CoachCarriage
 * @description Master reusable passenger coach model for the Vande Bharat Express.
 *
 * CRITICAL REQUIREMENT:
 * Every single passenger coach (Coach 01 to Coach 05) has EXACTLY IDENTICAL:
 * - Length, Height, Width
 * - Exterior geometry & Pearl-White / Deep Navy-Blue livery
 * - Panoramic window positioning & anti-reflective glass reflections
 * - Passenger door positioning at both ends with safety seals
 * - Dual 2-axle bogies with realistic steel wheels and undercarriage equipment
 * - Rooftop aerodynamic AC pods and ventilation grilles
 *
 * Only the interior presentation and project identity change.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import React from 'react';
import {
  Maximize2,
  Github,
  ExternalLink,
  ArrowRight,
  FolderOpen,
} from 'lucide-react';
import type { Project } from '../../../data';

interface CoachCarriageProps {
  coachNumber: string;
  coachTotal: string;
  coachLabel: string;
  badgeTitle: string;
  achievement: string;
  project?: Project;
  isActive: boolean;
  isArchiveCoach?: boolean;
  onProjectClick?: (project: Project) => void;
  onExploreArchive?: () => void;
  children: React.ReactNode;
}

export function CoachCarriage({
  coachNumber,
  coachTotal,
  coachLabel,
  badgeTitle,
  achievement,
  project,
  isActive,
  isArchiveCoach = false,
  onProjectClick,
  onExploreArchive,
  children,
}: CoachCarriageProps) {
  return (
    <div
      className={`relative flex-shrink-0 w-[680px] sm:w-[740px] md:w-[780px] h-[480px] flex flex-col justify-end transition-all duration-500 ${
        isActive ? 'scale-[1.015] z-10' : 'opacity-90 z-0'
      }`}
    >
      {/* ── MASTER PASSENGER COACH BODY (Standardized 100% Identical Dimensions) ── */}
      <div
        className={`relative w-full h-[410px] rounded-2xl border-2 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl ${
          isActive
            ? 'bg-[#0E121A] border-[#873653] shadow-[0_25px_80px_rgba(135,54,83,0.45)]'
            : 'bg-[#0A0D14] border-[rgba(214,185,154,0.18)]'
        }`}
      >
        {/* ── 1. ROOFTOP FAIRINGS & AERODYNAMIC AC PODS ─────────── */}
        <div className="relative w-full h-8 bg-gradient-to-r from-[#CCD3E0] via-[#E5E9F0] to-[#CCD3E0] border-b border-[#0C2044] flex items-center justify-around px-12 pointer-events-none">
          {/* Aerodynamic AC Pod 1 */}
          <div className="w-28 h-4 rounded-t-lg bg-[#1E2430] border-t border-x border-[rgba(214,185,154,0.3)] shadow-inner flex items-center justify-around px-2">
            <div className="w-6 h-1 bg-[#2C3444] rounded-full" />
            <div className="w-6 h-1 bg-[#2C3444] rounded-full" />
            <div className="w-6 h-1 bg-[#2C3444] rounded-full" />
          </div>

          {/* Roof Corrugation Ribs */}
          <div className="flex-1 flex justify-center gap-3 px-4">
            <div className="w-full h-[1px] bg-[#B0B8C8]" />
            <div className="w-full h-[1px] bg-[#B0B8C8]" />
          </div>

          {/* Aerodynamic AC Pod 2 */}
          <div className="w-28 h-4 rounded-t-lg bg-[#1E2430] border-t border-x border-[rgba(214,185,154,0.3)] shadow-inner flex items-center justify-around px-2">
            <div className="w-6 h-1 bg-[#2C3444] rounded-full" />
            <div className="w-6 h-1 bg-[#2C3444] rounded-full" />
            <div className="w-6 h-1 bg-[#2C3444] rounded-full" />
          </div>
        </div>

        {/* ── 2. UPPER COACH LIVERY: PEARL WHITE BODY ───────────── */}
        <div className="relative px-6 py-2.5 bg-gradient-to-r from-[#F2F4F8] via-[#F8FAFC] to-[#F2F4F8] flex items-center justify-between border-b border-[#0C2044]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-[#0C2044] text-[#F0EAE3] font-mono text-[11px] font-black tracking-wider">
              COACH {coachNumber}
            </span>
            <span className="font-heading font-black text-lg sm:text-xl text-[#0C2044] tracking-tight uppercase">
              {coachLabel}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[#0C2044] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#873653] animate-pulse" />
            <span>{badgeTitle}</span>
          </div>
        </div>

        {/* ── 3. ICONIC DEEP NAVY-BLUE WINDOW RIBBON ────────────── */}
        <div className="relative bg-[#0C2044] px-6 py-1.5 border-b-2 border-[#D6B99A]/80 flex items-center justify-between font-mono text-[11px] text-[#F0EAE3]">
          <div className="flex items-center gap-2">
            <span className="text-[#D6B99A] font-bold">SPEC:</span>
            <span className="text-[#D6B99A]">{achievement}</span>
          </div>
          <span className="text-white/70">
            COACH {coachNumber} OF {coachTotal}
          </span>
        </div>

        {/* ── 4. PANORAMIC PASSENGER WINDOW (PROJECT VIEWING BAY) ─ */}
        <div className="relative px-6 py-3 bg-[#08090B] flex-1 flex flex-col justify-center">
          {/* Passenger Door Simulation at Left & Right Ends */}
          <div className="absolute left-2 inset-y-3 w-3 bg-[#111622] border-r border-[rgba(214,185,154,0.15)] flex flex-col justify-around py-4">
            <div className="w-1 h-3 bg-[#D6B99A]/60 mx-auto rounded-full" />
            <div className="w-1 h-3 bg-[#D6B99A]/60 mx-auto rounded-full" />
          </div>
          <div className="absolute right-2 inset-y-3 w-3 bg-[#111622] border-l border-[rgba(214,185,154,0.15)] flex flex-col justify-around py-4">
            <div className="w-1 h-3 bg-[#D6B99A]/60 mx-auto rounded-full" />
            <div className="w-1 h-3 bg-[#D6B99A]/60 mx-auto rounded-full" />
          </div>

          {/* Panoramic Glass Window Frame (Identical for all 5 coaches) */}
          <div className="relative mx-3 h-full rounded-xl border border-[rgba(214,185,154,0.16)] bg-[#07090E] overflow-hidden shadow-inner flex flex-col justify-center">
            {/* Interior Project Lighting & System Visual */}
            {children}
          </div>
        </div>

        {/* ── 5. LOWER COACH CHASSIS & CONTROL INTERACTION STRIP ── */}
        <div className="px-6 py-3 bg-[#0A0D14] border-t border-[rgba(214,185,154,0.12)] flex items-center justify-between gap-4">
          {isArchiveCoach ? (
            /* Coach 05: Central Archive Special Interactive Exploration */
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-[#D6B99A]">
                <FolderOpen size={14} className="text-[#873653]" />
                <span className="font-bold">CENTRAL REPOSITORY ARCHIVE</span>
                <span className="text-[#969099] hidden sm:inline">
                  (ALL 20+ ARTIFACTS)
                </span>
              </div>

              {onExploreArchive && (
                <button
                  onClick={onExploreArchive}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#873653] to-[#5A1832] border border-[#D6B99A] font-mono text-xs font-bold text-[#F0EAE3] uppercase tracking-wider hover:shadow-[0_0_20px_rgba(214,185,154,0.4)] transition-all"
                >
                  <span>EXPLORE ALL PROJECTS</span>
                  <ArrowRight size={13} className="text-[#D6B99A]" />
                </button>
              )}
            </div>
          ) : (
            /* Coaches 01-04: Tech Chips & Spec Inspection */
            <>
              <div className="flex flex-wrap items-center gap-1.5">
                {project?.technologies.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-[#151116] border border-[rgba(214,185,154,0.12)] font-mono text-[10px] text-[#F0EAE3]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                {project && onProjectClick && (
                  <button
                    onClick={() => onProjectClick(project)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#5A1832] border border-[#873653] font-mono text-[11px] font-bold text-[#F0EAE3] uppercase tracking-wider hover:bg-[#873653] shadow-[0_0_12px_rgba(135,54,83,0.3)] transition-all"
                  >
                    <Maximize2 size={11} />
                    <span>INSPECT SPEC</span>
                  </button>
                )}

                {project?.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded border border-[rgba(214,185,154,0.15)] bg-[#151116] text-[#F0EAE3] hover:text-[#D6B99A] hover:border-[#D6B99A] transition-colors"
                    aria-label={`GitHub for ${project.title}`}
                  >
                    <Github size={13} />
                  </a>
                )}

                {project?.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded border border-[rgba(214,185,154,0.15)] bg-[#151116] text-[#D6B99A] hover:border-[#D6B99A] transition-colors"
                    aria-label={`Live Demo for ${project.title}`}
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── 6. DUAL 2-AXLE BOGIES & STEEL WHEELS (100% Identical on all 5 Coaches) ── */}
      <div className="relative w-full h-[52px] bg-[#12161F] border-t border-[rgba(214,185,154,0.2)] flex items-center justify-between px-16 pointer-events-none">
        {/* Front Bogie */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-[#5A6578] bg-[#1E2430] shadow-inner flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#D6B99A]" />
          </div>
          <div className="w-10 h-10 rounded-full border-4 border-[#5A6578] bg-[#1E2430] shadow-inner flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#D6B99A]" />
          </div>
        </div>

        {/* Central Undercarriage Battery & Air Reservoir Boxes */}
        <div className="h-6 w-40 bg-[#1A1F2B] border border-[rgba(214,185,154,0.12)] rounded-sm flex items-center justify-center font-mono text-[8px] text-[#969099]">
          TRAIN 18 · AUX CONVERTER
        </div>

        {/* Rear Bogie */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-[#5A6578] bg-[#1E2430] shadow-inner flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#D6B99A]" />
          </div>
          <div className="w-10 h-10 rounded-full border-4 border-[#5A6578] bg-[#1E2430] shadow-inner flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#D6B99A]" />
          </div>
        </div>
      </div>
    </div>
  );
}
