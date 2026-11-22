/**
 * @component VandeBharatTrainset
 * @description The Vande Bharat Express Trainset carrying four flagship engineering systems
 * plus Coach 05: Central Project Archive.
 *
 * Authentic Indian Railways Vande Bharat (Train 18) design:
 * - Aerodynamic Driving Cab with iconic wedge nose & navy-blue chevron band
 * - FIVE physically connected passenger coaches of EXACTLY identical dimensions:
 *   * Coach 01: DriftGuard (ML Network Intrusion Detection System)
 *   * Coach 02: HAQMS (Distributed Healthcare Triage System)
 *   * Coach 03: WALRUS (AI Threat Intelligence Platform)
 *   * Coach 04: CHC Secure (Cryptographic Integrity Engine)
 *   * Coach 05: Central Archive (Complete 20+ Repository Directory)
 * - Articulated flexible rubber gangway bellows joining all carriages
 * - Low-slung bogies with steel wheels on continuous steel rails
 * - Each coach hosts its project's live interactive visual directly inside its panoramic window
 * - Direct click on coach or spec button opens ProjectDetailModal
 * - Coach 05 features the prominent "EXPLORE ALL PROJECTS →" button
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import React from 'react';
import { Train } from 'lucide-react';
import type { Project } from '../../../data';
import { CoachCarriage } from './CoachCarriage';
import { ArchiveCoachInterior } from './ArchiveCoachInterior';
import { DriftGuardVisual } from '../projects/DriftGuardVisual';
import { HAQMSVisual } from '../projects/HAQMSVisual';
import { WalrusVisual } from '../projects/WalrusVisual';
import { CHCSecureVisual } from '../projects/CHCSecureVisual';

interface VandeBharatTrainsetProps {
  flagshipProjects: Project[];
  allProjects: Project[];
  activeCoach: number; // 0: Loco, 1: DriftGuard, 2: HAQMS, 3: WALRUS, 4: CHC Secure, 5: Central Archive
  onProjectClick: (project: Project) => void;
  onExploreArchive: () => void;
}

export function VandeBharatTrainset({
  flagshipProjects,
  allProjects,
  activeCoach,
  onProjectClick,
  onExploreArchive,
}: VandeBharatTrainsetProps) {
  const driftguard = flagshipProjects.find((p) => p.id === 'driftguard') || flagshipProjects[0];
  const haqms = flagshipProjects.find((p) => p.id === 'haqms') || flagshipProjects[1];
  const walrus = flagshipProjects.find((p) => p.id === 'walrus') || flagshipProjects[2];
  const chcSecure = flagshipProjects.find((p) => p.id === 'chc-secure') || flagshipProjects[3];

  return (
    <div className="relative w-max flex items-end select-none py-10">
      {/* ── 1. LOCOMOTIVE / DRIVING CAB (Vande Bharat Front Nose) ─────────── */}
      <div className="relative flex-shrink-0 w-[420px] sm:w-[480px] h-[480px] flex flex-col justify-end">
        {/* Driving Cab Body */}
        <div className="relative w-full h-[410px] bg-[#0E121A] rounded-tr-[140px] rounded-tl-xl border-t-2 border-r-2 border-[rgba(214,185,154,0.3)] shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col justify-between p-6">
          {/* Pearl White Body Base with Metallic Highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F2F4F8] via-[#E8EDF5] to-[#CCD3E0] pointer-events-none" />

          {/* Vande Bharat Signature Deep Navy-Blue Chevron Band */}
          <div
            className="absolute top-16 left-0 right-0 h-32 bg-[#0C2044] shadow-inner pointer-events-none flex items-center px-6"
            style={{
              clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)',
            }}
          >
            {/* Champagne Pinstripes */}
            <div className="absolute top-0 inset-x-0 h-1 bg-[#D6B99A]/80" />
            <div className="absolute bottom-0 inset-x-0 h-1 bg-[#D6B99A]/80" />
          </div>

          {/* Aerodynamic Front Driver Windshield with Anti-Glare Frit */}
          <div
            className="absolute top-12 right-4 w-48 h-28 bg-[#070B14] border-2 border-[rgba(214,185,154,0.4)] rounded-tr-[90px] rounded-bl-xl shadow-2xl overflow-hidden flex items-center justify-center pointer-events-none"
            style={{
              transform: 'skewX(-16deg)',
            }}
          >
            <div className="w-full h-full bg-gradient-to-tr from-transparent via-[#873653]/20 to-[#D6B99A]/30 opacity-70" />
            <div className="absolute inset-x-2 bottom-1 h-0.5 bg-[#4B5563]" />
          </div>

          {/* Front High-Intensity Twin LED Headlights with Volumetric Beam Throw */}
          <div className="absolute bottom-20 right-4 flex flex-col gap-2 z-10">
            <div className="relative flex items-center">
              <div className="w-7 h-7 rounded-full bg-[#FFFBEB] border-2 border-[#D6B99A] shadow-[0_0_25px_#FFFBEB,0_0_60px_#D6B99A] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white animate-ping" />
              </div>
              {/* Volumetric Light Cone Throw */}
              <div
                className="absolute left-6 w-[420px] h-32 pointer-events-none opacity-45"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,251,235,0.7) 0%, rgba(214,185,154,0.25) 40%, transparent 100%)',
                  clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 60%)',
                }}
              />
            </div>
          </div>

          {/* Locomotive Header Text */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0C2044] tracking-wider uppercase">
              <Train size={15} />
              <span>VANDE BHARAT // EXPRESS CAB</span>
            </div>
            <div className="font-heading font-black text-2xl text-[#0C2044] uppercase tracking-tight mt-1">
              LOCOMOTIVE · 2026
            </div>
          </div>

          {/* Cab Telemetry & Specs */}
          <div className="relative z-10 bg-[#0A0D14]/90 rounded-xl p-3 border border-[rgba(214,185,154,0.2)] font-mono text-[10px] text-[#F0EAE3] space-y-1 max-w-[240px]">
            <div className="flex justify-between text-[#D6B99A]">
              <span>TRACTION:</span>
              <span className="font-bold">25KV AC EMU</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#969099]">OPERATING SPEED:</span>
              <span>160 KM/H</span>
            </div>
            <div className="flex justify-between text-[#873653]">
              <span>ROUTE:</span>
              <span className="font-bold">NDLS → BLR EXPRESS</span>
            </div>
          </div>
        </div>

        {/* Locomotive Bogies & Undercarriage */}
        <div className="relative w-full h-[52px] bg-[#12161F] border-t border-[rgba(214,185,154,0.2)] flex items-center justify-around px-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full border-4 border-[#5A6578] bg-[#1E2430] shadow-inner flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#D6B99A]" />
            </div>
            <div className="w-10 h-10 rounded-full border-4 border-[#5A6578] bg-[#1E2430] shadow-inner flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#D6B99A]" />
            </div>
          </div>
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

      {/* ── GANGWAY BELLOWS (Loco to Coach 1) ───────────────────────── */}
      <div className="relative flex-shrink-0 w-9 h-[380px] bg-[#141720] border-y border-[rgba(214,185,154,0.2)] flex flex-col justify-around py-3 px-1 z-0">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-full h-4 bg-[#1B202B] rounded-sm shadow-inner" />
        ))}
      </div>

      {/* ── COACH 01: DRIFTGUARD ────────────────────────────────────── */}
      <CoachCarriage
        coachNumber="01"
        coachTotal="05"
        coachLabel="DRIFTGUARD"
        badgeTitle="NETWORK ANOMALY INTELLIGENCE"
        achievement="~2,380 Flows/Sec · Tri-Model Ensemble (IF + AE + Bi-LSTM)"
        project={driftguard}
        isActive={activeCoach === 1}
        onProjectClick={onProjectClick}
      >
        <DriftGuardVisual />
      </CoachCarriage>

      {/* ── GANGWAY BELLOWS (Coach 1 to Coach 2) ─────────────────────── */}
      <div className="relative flex-shrink-0 w-9 h-[380px] bg-[#141720] border-y border-[rgba(214,185,154,0.2)] flex flex-col justify-around py-3 px-1 z-0">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-full h-4 bg-[#1B202B] rounded-sm shadow-inner" />
        ))}
      </div>

      {/* ── COACH 02: HAQMS ─────────────────────────────────────────── */}
      <CoachCarriage
        coachNumber="02"
        coachTotal="05"
        coachLabel="HAQMS"
        badgeTitle="DISTRIBUTED HEALTHCARE TRIAGE"
        achievement="Sub-50ms WebSocket & Redis Pub/Sub Synchronization"
        project={haqms}
        isActive={activeCoach === 2}
        onProjectClick={onProjectClick}
      >
        <HAQMSVisual />
      </CoachCarriage>

      {/* ── GANGWAY BELLOWS (Coach 2 to Coach 3) ─────────────────────── */}
      <div className="relative flex-shrink-0 w-9 h-[380px] bg-[#141720] border-y border-[rgba(214,185,154,0.2)] flex flex-col justify-around py-3 px-1 z-0">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-full h-4 bg-[#1B202B] rounded-sm shadow-inner" />
        ))}
      </div>

      {/* ── COACH 03: WALRUS ────────────────────────────────────────── */}
      <CoachCarriage
        coachNumber="03"
        coachTotal="05"
        coachLabel="WALRUS"
        badgeTitle="AI THREAT CLASSIFICATION PLATFORM"
        achievement="Zero-Shot NLP (BART-Large-MNLI) + 2015–2035 Time Machine"
        project={walrus}
        isActive={activeCoach === 3}
        onProjectClick={onProjectClick}
      >
        <WalrusVisual />
      </CoachCarriage>

      {/* ── GANGWAY BELLOWS (Coach 3 to Coach 4) ─────────────────────── */}
      <div className="relative flex-shrink-0 w-9 h-[380px] bg-[#141720] border-y border-[rgba(214,185,154,0.2)] flex flex-col justify-around py-3 px-1 z-0">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-full h-4 bg-[#1B202B] rounded-sm shadow-inner" />
        ))}
      </div>

      {/* ── COACH 04: CHC SECURE (DEDICATED ENTIRELY TO CHC SECURE) ─── */}
      <CoachCarriage
        coachNumber="04"
        coachTotal="05"
        coachLabel="CHC SECURE"
        badgeTitle="CRYPTOGRAPHIC INTEGRITY ENGINE"
        achievement="Contextual Hash Chains · Forward Security Invariant"
        project={chcSecure}
        isActive={activeCoach === 4}
        onProjectClick={onProjectClick}
      >
        <CHCSecureVisual />
      </CoachCarriage>

      {/* ── GANGWAY BELLOWS (Coach 4 to Coach 5) ─────────────────────── */}
      <div className="relative flex-shrink-0 w-9 h-[380px] bg-[#141720] border-y border-[rgba(214,185,154,0.2)] flex flex-col justify-around py-3 px-1 z-0">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-full h-4 bg-[#1B202B] rounded-sm shadow-inner" />
        ))}
      </div>

      {/* ── COACH 05: CENTRAL PROJECT ARCHIVE (IDENTICAL DIMENSIONS) ──── */}
      <CoachCarriage
        coachNumber="05"
        coachTotal="05"
        coachLabel="CENTRAL ARCHIVE"
        badgeTitle="ALL ENGINEERING REPOSITORIES"
        achievement="Complete 20+ Artifact Catalog · Search & Filtering"
        isActive={activeCoach === 5}
        isArchiveCoach
        onExploreArchive={onExploreArchive}
      >
        <ArchiveCoachInterior
          allProjects={allProjects}
          onExploreArchive={onExploreArchive}
        />
      </CoachCarriage>
    </div>
  );
}
