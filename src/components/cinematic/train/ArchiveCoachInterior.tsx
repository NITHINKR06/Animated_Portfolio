/**
 * @component ArchiveCoachInterior
 * @description Interior visual system for Coach 05: Central Project Archive
 * Displays the complete repository directory tree, technology category breakdown,
 * artifact count, and the "EXPLORE ALL PROJECTS →" action.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { FolderTree, ArrowRight } from 'lucide-react';
import type { Project } from '../../../data';

interface ArchiveCoachInteriorProps {
  allProjects: Project[];
  onExploreArchive: () => void;
}

export function ArchiveCoachInterior({
  allProjects,
  onExploreArchive,
}: ArchiveCoachInteriorProps) {
  const securityCount = allProjects.filter((p) =>
    p.title.toLowerCase().includes('defense') ||
    p.title.toLowerCase().includes('attack') ||
    p.title.toLowerCase().includes('packet') ||
    p.title.toLowerCase().includes('scanner') ||
    p.title.toLowerCase().includes('security') ||
    p.title.toLowerCase().includes('cipher') ||
    p.title.toLowerCase().includes('hash') ||
    p.id.includes('cyb') ||
    p.id.includes('kali')
  ).length;

  const fullstackCount = allProjects.filter((p) =>
    p.technologies.some((t) => ['React', 'Next.js', 'Node.js', 'TypeScript'].includes(t))
  ).length;

  const mlCount = allProjects.filter((p) =>
    p.technologies.some((t) => ['Python', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'LSTM'].includes(t))
  ).length;

  return (
    <div className="relative w-full h-full p-4 sm:p-5 flex flex-col justify-between overflow-hidden select-none">
      {/* Background Directory Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(214,185,154,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(214,185,154,0.4) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#5A1832]/20 blur-3xl pointer-events-none" />

      {/* Top HUD: Repository Root & Total Count */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-[#969099] border-b border-[rgba(214,185,154,0.1)] pb-2">
        <div className="flex items-center gap-2 text-[#D6B99A]">
          <FolderTree size={13} className="text-[#873653]" />
          <span className="font-bold">ROOT: ~/nithinkr/repositories/</span>
        </div>
        <span className="text-[#873653] font-bold">
          TOTAL: {allProjects.length} REPOSITORIES
        </span>
      </div>

      {/* Center Grid: 3 Domain Vaults & Preview Matrix */}
      <div className="relative z-10 my-auto grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Vault 01: Cybersecurity */}
        <div className="p-3 rounded-lg bg-[#151116]/90 border border-[#873653]/40 flex flex-col justify-between">
          <div className="flex items-center justify-between font-mono text-[10px] mb-1">
            <span className="text-[#873653] font-bold">CYBER DEFENSE</span>
            <span className="text-[#D6B99A]">{securityCount} REPOS</span>
          </div>
          <div className="font-mono text-[10px] text-[#F0EAE3] space-y-0.5">
            <div>• Packet Defender</div>
            <div>• Real-Time Firewall Game</div>
            <div>• Linux Hardening Suite</div>
          </div>
        </div>

        {/* Vault 02: Full Stack & Cloud */}
        <div className="p-3 rounded-lg bg-[#151116]/90 border border-[rgba(214,185,154,0.18)] flex flex-col justify-between">
          <div className="flex items-center justify-between font-mono text-[10px] mb-1">
            <span className="text-[#D6B99A] font-bold">DISTRIBUTED & WEB</span>
            <span className="text-[#969099]">{fullstackCount} REPOS</span>
          </div>
          <div className="font-mono text-[10px] text-[#F0EAE3] space-y-0.5">
            <div>• Code Lab Microservices</div>
            <div>• Melsta Marketplace</div>
            <div>• WebSocket Redis Queues</div>
          </div>
        </div>

        {/* Vault 03: ML & Systems */}
        <div className="p-3 rounded-lg bg-[#151116]/90 border border-[rgba(214,185,154,0.12)] flex flex-col justify-between">
          <div className="flex items-center justify-between font-mono text-[10px] mb-1">
            <span className="text-[#969099] font-bold">AI & SYSTEMS</span>
            <span className="text-[#D6B99A]">{mlCount} REPOS</span>
          </div>
          <div className="font-mono text-[10px] text-[#F0EAE3] space-y-0.5">
            <div>• Hugging Face Zero-Shot</div>
            <div>• Anomaly Autoencoders</div>
            <div>• Kali Automation Toolkits</div>
          </div>
        </div>
      </div>

      {/* Bottom Action Strip: Direct Explore Trigger inside Coach 05 */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[rgba(214,185,154,0.1)]">
        <span className="font-mono text-[10px] text-[#969099]">
          PRESS TO INSPECT COMPLETE METADATA, DIVERSE STACKS & GITHUB REPOS
        </span>

        <button
          onClick={onExploreArchive}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#873653] to-[#5A1832] border border-[#D6B99A] font-mono text-[11px] font-bold text-[#F0EAE3] uppercase hover:shadow-[0_0_15px_rgba(214,185,154,0.35)] transition-all"
        >
          <span>EXPLORE ALL PROJECTS</span>
          <ArrowRight size={12} className="text-[#D6B99A]" />
        </button>
      </div>
    </div>
  );
}
