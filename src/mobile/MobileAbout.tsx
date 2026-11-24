import React, { useState } from 'react';
import { Shield, Server, Terminal } from 'lucide-react';

const intelPrompts = [
  {
    label: 'Architecture',
    answer:
      'Engineered with mechanical sympathy: high-throughput REST APIs, asynchronous Redis caching, and reactive microservices built for deterministic latency.',
  },
  {
    label: 'Cybersecurity',
    answer:
      'Offensive and defensive analysis: AST vulnerability scanning, exploit proof-of-concepts, network flow telemetry, and kernel-level iptables security.',
  },
  {
    label: 'Philosophy',
    answer:
      'I build systems from the ground up, and then rigorously analyze and break them to uncover hidden fault lines before production.',
  },
];

export function MobileAbout() {
  const [activeIntel, setActiveIntel] = useState<number>(0);

  return (
    <section
      id="about"
      className="relative w-full bg-[#08090B] text-[#F0EAE3] py-16 px-4 border-t border-[rgba(214,185,154,0.12)]"
    >
      {/* Eyebrow & Headline */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#873653] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#D6B99A]/80">
            SYSTEM 02 · PROFILE & CRAFT
          </span>
        </div>
        <h2 className="font-heading font-black text-3xl tracking-tight uppercase text-[#F0EAE3]">
          DUAL <span className="text-[#873653]">SPECIALIZATION</span>.
        </h2>
        <p className="font-mono text-xs text-[#969099] mt-2 leading-relaxed">
          Bridging high-concurrency systems engineering with hardened security research.
        </p>
      </div>

      {/* 2 Core Specialization Cards (Concise & Impactful) */}
      <div className="space-y-4 mb-8">
        {/* Card 1: Systems Engineering */}
        <div className="mobile-card p-5 bg-[#0d0e12]/95 border border-[rgba(214,185,154,0.14)] rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#873653]/20 border border-[#873653]/40 flex items-center justify-center text-[#D6B99A]">
              <Server size={16} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#F0EAE3] uppercase tracking-wide">
                High-Concurrency Engineering
              </h3>
              <span className="font-mono text-[10px] text-[#D6B99A]">SCALE & MECHANICAL SYMPATHY</span>
            </div>
          </div>
          <p className="font-mono text-xs text-[#969099] leading-relaxed mb-3.5">
            Designing distributed backends, async Redis pipelines, and reactive SPAs that maintain deterministic sub-50ms execution.
          </p>
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
            <span className="px-2 py-0.5 rounded bg-[#1a1b22] text-[#D6B99A] border border-[rgba(214,185,154,0.1)]">
              10K+ Concurrent Users
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1a1b22] text-[#F0EAE3]/80 border border-[rgba(214,185,154,0.1)]">
              Redis Caching
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1a1b22] text-[#F0EAE3]/80 border border-[rgba(214,185,154,0.1)]">
              Spring Boot / FastAPI
            </span>
          </div>
        </div>

        {/* Card 2: Security Research */}
        <div className="mobile-card p-5 bg-[#0d0e12]/95 border border-[rgba(214,185,154,0.14)] rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#5A1832]/30 border border-[#873653]/50 flex items-center justify-center text-[#D6B99A]">
              <Shield size={16} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#F0EAE3] uppercase tracking-wide">
                Hardened Security Research
              </h3>
              <span className="font-mono text-[10px] text-[#873653] font-semibold">
                OFFENSIVE & DEFENSIVE
              </span>
            </div>
          </div>
          <p className="font-mono text-xs text-[#969099] leading-relaxed mb-3.5">
            Static AST code analysis across 12+ vulnerability patterns, automated PoC exploit generation, and intrusion defense architectures.
          </p>
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
            <span className="px-2 py-0.5 rounded bg-[#1a1b22] text-[#D6B99A] border border-[rgba(214,185,154,0.1)]">
              AST Vulnerability Scanners
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1a1b22] text-[#F0EAE3]/80 border border-[rgba(214,185,154,0.1)]">
              Kernel Firewalling
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1a1b22] text-[#F0EAE3]/80 border border-[rgba(214,185,154,0.1)]">
              Penetration Testing
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Quick-Intel Console */}
      <div className="mobile-card p-4 bg-[#0a0b0e] border border-[rgba(214,185,154,0.12)] rounded-2xl">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[rgba(214,185,154,0.08)]">
          <Terminal size={14} className="text-emerald-400" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D6B99A]">
            Quick Intel Briefing
          </span>
        </div>

        {/* Prompt Selectors */}
        <div className="flex gap-2 mb-3">
          {intelPrompts.map((item, idx) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveIntel(idx)}
              className={`mobile-touch-target px-3 py-1.5 rounded-lg font-mono text-xs border transition-all ${
                activeIntel === idx
                  ? 'bg-[#873653] text-[#F0EAE3] border-[#873653] font-semibold shadow-[0_0_10px_rgba(135,54,83,0.4)]'
                  : 'bg-[#14151b] text-[#969099] border-[rgba(214,185,154,0.1)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Response Box */}
        <div className="p-3 rounded-xl bg-[#121319] border border-[rgba(214,185,154,0.08)]">
          <p className="font-mono text-xs text-[#F0EAE3]/90 leading-relaxed">
            {intelPrompts[activeIntel].answer}
          </p>
        </div>
      </div>
    </section>
  );
}
