/**
 * @component IdentityScene
 * @description Scene 02: IDENTITY - The Dual Identity & Engineering Philosophy
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 *
 * Pinned horizontal storytelling layout exploring:
 * - Manifesto & Engineering Philosophy
 * - Full-Stack Architecture Pillar
 * - Cybersecurity & Offensive Research Pillar
 * - Live Cyber Shell Terminal (interactive chatbot query engine)
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Shield,
  Cpu,
  Terminal,
  CornerDownLeft,
  Lock,
  Server,
  Layers,
  Activity,
  CheckCircle2,
  Zap,
  Radio,
  FileCode2,
} from 'lucide-react';
import { portfolioData } from '../../data';
import { quickQuestions, getReply, type Message } from '../../lib/chatbot';

gsap.registerPlugin(ScrollTrigger);

export function IdentityScene() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Terminal Chat State
  const [terminalInput, setTerminalInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'NITHIN_OS v4.2 [SECURITY KERNEL INITIALIZED]\nQuery developer identity, system architecture, or security projects.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const q = (textToSend || terminalInput).trim();
    if (!q || isTyping) return;

    const newMsgs: Message[] = [...messages, { role: 'user', text: q }];
    setMessages(newMsgs);
    setTerminalInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getReply(q, newMsgs);
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
      setIsTyping(false);
    }, 400);
  };

  useEffect(() => {
    const section = containerRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Horizontal slide animation on desktop using GSAP ScrollTrigger
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) {
        const totalScroll = track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.1,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
          },
        });
      }

      // Parallax text reveals
      gsap.fromTo(
        '.identity-heading',
        { opacity: 0.3, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#08090B] text-[#F0EAE3] overflow-hidden border-t border-[rgba(214,185,154,0.12)]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#873653]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* HORIZONTAL STORYTELLING TRACK (Scroll Effect Preserved) */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row h-full min-h-screen items-center will-change-transform"
      >
        {/* PANEL 1: MANIFESTO & REDESIGNED ETHOS CARDS */}
        <div className="w-full lg:w-screen flex-shrink-0 flex flex-col justify-center items-center py-20 px-6 md:px-16 lg:pl-32 lg:pr-20 min-h-screen">
          <div className="max-w-5xl w-full mx-auto">
            <div className="font-mono text-xs tracking-widest text-[#969099] uppercase mb-4 flex items-center gap-2">
              <span className="text-[#873653] font-bold">01</span>
              <span>//</span>
              <span>CORE PHILOSOPHY & MANIFESTO</span>
            </div>

            <h2 className="identity-heading font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] text-[#F0EAE3] uppercase max-w-5xl">
              ENGINEERING AT THE INTERSECTION OF{' '}
              <span className="text-[#873653]">HARDENED SECURITY</span> & HIGH-CONCURRENCY ARCHITECTURE.
            </h2>

            {/* Redesigned Architectural Ethos Cards */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {/* Card 1: Security Ethos */}
            <div className="group relative p-6 sm:p-7 rounded-2xl border border-[rgba(214,185,154,0.14)] bg-gradient-to-br from-[#181116] via-[#120d12] to-[#0a0709] shadow-xl hover:border-[#873653] hover:shadow-[0_0_30px_rgba(135,54,83,0.22)] transition-all duration-300">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[rgba(214,185,154,0.1)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#5A1832]/40 border border-[#873653] flex items-center justify-center text-[#D6B99A]">
                    <Shield size={18} className="text-[#873653]" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-base text-[#F0EAE3] block uppercase tracking-tight">
                      Security Ethos
                    </span>
                    <span className="font-mono text-[10px] text-[#D6B99A]">ADVERSARIAL RESILIENCE</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-[#969099] px-2 py-0.5 rounded border border-[rgba(214,185,154,0.1)] bg-black/40">
                  PILLAR 01
                </span>
              </div>

              <p className="font-mono text-xs text-[#969099] leading-relaxed mb-5">
                Code that functions is standard. Code that withstands adversarial exploitation, AST vulnerability pattern scanning, and dynamic network drift is true engineering. Security is the architectural substrate, not a patch.
              </p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-[rgba(214,185,154,0.1)] font-mono text-[10px]">
                <span className="px-2.5 py-1 bg-[#5A1832]/25 border border-[#873653]/40 text-[#D6B99A] rounded-md">
                  AST Vuln Scanner
                </span>
                <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] text-[#F0EAE3]/80 rounded-md">
                  Zero-Trust Substrate
                </span>
                <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] text-[#F0EAE3]/80 rounded-md">
                  Exploit PoC Defense
                </span>
              </div>
            </div>

            {/* Card 2: Systems Perspective */}
            <div className="group relative p-6 sm:p-7 rounded-2xl border border-[rgba(214,185,154,0.14)] bg-gradient-to-br from-[#161314] via-[#110e10] to-[#0a0808] shadow-xl hover:border-[#D6B99A]/60 hover:shadow-[0_0_30px_rgba(214,185,154,0.15)] transition-all duration-300">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[rgba(214,185,154,0.1)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-[rgba(214,185,154,0.2)] flex items-center justify-center text-[#D6B99A]">
                    <Cpu size={18} className="text-[#D6B99A]" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-base text-[#F0EAE3] block uppercase tracking-tight">
                      Systems Perspective
                    </span>
                    <span className="font-mono text-[10px] text-[#D6B99A]">HIGH CONCURRENCY</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-[#969099] px-2 py-0.5 rounded border border-[rgba(214,185,154,0.1)] bg-black/40">
                  PILLAR 02
                </span>
              </div>

              <p className="font-mono text-xs text-[#969099] leading-relaxed mb-5">
                From microservices serving 10,000+ active users with Redis & WebSockets, to ML models evaluating 2,380 network flows/sec, I engineer distributed software for deterministic sub-50ms latency and raw mechanical sympathy.
              </p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-[rgba(214,185,154,0.1)] font-mono text-[10px]">
                <span className="px-2.5 py-1 bg-[#D6B99A]/10 border border-[#D6B99A]/30 text-[#D6B99A] rounded-md">
                  10,000+ Active Users
                </span>
                <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] text-[#F0EAE3]/80 rounded-md">
                  Sub-50ms Latency
                </span>
                <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] text-[#F0EAE3]/80 rounded-md">
                  Redis Pipelines
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* PANEL 2: REDESIGNED DUAL SPECIALIZATION MATRIX CARDS */}
        <div className="w-full lg:w-screen flex-shrink-0 flex flex-col justify-center items-center py-20 px-6 md:px-16 lg:pl-32 lg:pr-20 min-h-screen">
          <div className="max-w-5xl w-full mx-auto">
            <div className="font-mono text-xs tracking-widest text-[#969099] uppercase mb-4 flex items-center gap-2">
              <span className="text-[#873653] font-bold">02</span>
              <span>//</span>
              <span>DUAL SPECIALIZATION MATRIX</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
            {/* Card A: Full-Stack Architect */}
            <div className="relative p-7 sm:p-8 rounded-3xl border border-[rgba(214,185,154,0.16)] bg-gradient-to-b from-[#161217] via-[#100d11] to-[#0a0709] shadow-2xl flex flex-col justify-between group hover:border-[#D6B99A] hover:shadow-[0_0_35px_rgba(214,185,154,0.18)] transition-all duration-300">
              {/* Header Badge */}
              <div className="flex items-center justify-between font-mono text-[11px] pb-4 mb-4 border-b border-[rgba(214,185,154,0.1)]">
                <span className="flex items-center gap-2 text-[#D6B99A] font-semibold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#D6B99A] animate-pulse" />
                  SUBSYSTEM // ARCH-01
                </span>
                <span className="text-[#969099] text-[10px] uppercase">
                  HIGH-CONCURRENCY WEB
                </span>
              </div>

              <div>
                <div className="w-12 h-12 rounded-2xl border border-[rgba(214,185,154,0.2)] bg-[#1d171e] flex items-center justify-center text-[#D6B99A] mb-5 group-hover:scale-105 transition-transform">
                  <Server size={22} className="text-[#D6B99A]" />
                </div>

                <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#F0EAE3] tracking-tight uppercase group-hover:text-[#D6B99A] transition-colors">
                  Full-Stack Architecture
                </h3>

                <p className="mt-3 font-mono text-xs text-[#969099] leading-relaxed">
                  Architecting distributed web platforms, reactive SPAs, and robust backend pipelines designed for scalability, zero downtime, and instant responsiveness.
                </p>

                {/* Tactical Feature Bullets */}
                <div className="mt-5 space-y-2 font-mono text-xs text-[#F0EAE3]/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#D6B99A]" />
                    <span>Microservices serving 10,000+ active users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#D6B99A]" />
                    <span>Reactive state pipelines with React & TypeScript</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#D6B99A]" />
                    <span>High-throughput REST & FastAPI microservices</span>
                  </div>
                </div>
              </div>

              {/* Technologies Tag Array */}
              <div className="mt-7 border-t border-[rgba(214,185,154,0.1)] pt-4 flex flex-wrap gap-2">
                {[
                  'React.js',
                  'TypeScript',
                  'Node.js',
                  'FastAPI',
                  'PostgreSQL',
                  'Redis',
                  'Docker Compose',
                  'WebSockets',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-black/40 border border-[rgba(214,185,154,0.12)] font-mono text-[11px] text-[#F0EAE3]/85 group-hover:border-[rgba(214,185,154,0.25)] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card B: Cybersecurity Researcher */}
            <div className="relative p-7 sm:p-8 rounded-3xl border border-[#873653]/50 bg-gradient-to-b from-[#1b1117] via-[#120a10] to-[#090508] shadow-2xl flex flex-col justify-between group hover:border-[#873653] hover:shadow-[0_0_35px_rgba(135,54,83,0.3)] transition-all duration-300">
              {/* Header Badge */}
              <div className="flex items-center justify-between font-mono text-[11px] pb-4 mb-4 border-b border-[#873653]/30">
                <span className="flex items-center gap-2 text-[#873653] font-semibold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#873653] animate-pulse" />
                  SUBSYSTEM // SEC-02
                </span>
                <span className="text-[#D6B99A] text-[10px] uppercase">
                  DEFENSIVE & OFFENSIVE
                </span>
              </div>

              <div>
                <div className="w-12 h-12 rounded-2xl border border-[#873653] bg-[#3a1322]/40 flex items-center justify-center text-[#873653] mb-5 group-hover:scale-105 transition-transform">
                  <Lock size={22} className="text-[#873653]" />
                </div>

                <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#F0EAE3] tracking-tight uppercase group-hover:text-[#873653] transition-colors">
                  Cybersecurity Research
                </h3>

                <p className="mt-3 font-mono text-xs text-[#969099] leading-relaxed">
                  Specializing in Abstract Syntax Tree (AST) code vulnerability analysis, Contextual Hash Chain (CHC) file cryptography, and machine learning network intrusion detection.
                </p>

                {/* Tactical Feature Bullets */}
                <div className="mt-5 space-y-2 font-mono text-xs text-[#F0EAE3]/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#873653]" />
                    <span>AST pattern scanning across 12+ flaw classes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#873653]" />
                    <span>Contextual Hash Chains (CHC) cryptographic proof</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#873653]" />
                    <span>ML intrusion model scoring 2,380+ flows/second</span>
                  </div>
                </div>
              </div>

              {/* Technologies Tag Array */}
              <div className="mt-7 border-t border-[#873653]/30 pt-4 flex flex-wrap gap-2">
                {[
                  'ML Intrusion Detection',
                  'Contextual Hash Chains',
                  'AST Vuln Scanning',
                  'Penetration Testing',
                  'Network Cryptography',
                  'Kali & Wireshark',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-[#5A1832]/35 border border-[#873653]/50 font-mono text-[11px] text-[#D6B99A] group-hover:border-[#873653] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* PANEL 3: REDESIGNED CYBER INTELLIGENCE TERMINAL */}
        <div className="w-full lg:w-screen flex-shrink-0 flex flex-col justify-center items-center py-20 px-6 md:px-16 lg:pl-32 lg:pr-20 min-h-screen">
          <div className="max-w-4xl w-full mx-auto">
            <div className="font-mono text-xs tracking-widest text-[#969099] uppercase mb-4 flex items-center gap-2">
              <span className="text-[#873653] font-bold">03</span>
              <span>//</span>
              <span>INTELLIGENCE TERMINAL</span>
            </div>

          <div className="w-full rounded-3xl border border-[rgba(214,185,154,0.18)] bg-[#0C0A0D] shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col h-[500px] overflow-hidden">
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(214,185,154,0.12)] bg-[#151116]">
              <div className="flex items-center gap-2.5 font-mono text-xs text-[#F0EAE3]">
                <Terminal size={15} className="text-[#873653]" />
                <span className="font-bold">NITHIN_OS // SECURE_SHELL v4.2</span>
                <span className="hidden sm:inline text-[#969099] text-[10px] ml-2">
                  [TLS 1.3 • PORT 443 • ACTIVE]
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-[#873653]" />
                <div className="w-3 h-3 rounded-full bg-[#D6B99A]/40" />
              </div>
            </div>

            {/* Terminal Output Stream */}
            <div
              ref={chatBodyRef}
              className="flex-1 p-5 overflow-y-auto space-y-3 font-mono text-xs leading-relaxed text-[#F0EAE3]/90 scrollbar-thin scrollbar-thumb-[rgba(214,185,154,0.2)] scrollbar-track-black"
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${
                    m.role === 'user' ? 'text-[#D6B99A] justify-end' : 'text-[#F0EAE3]/85'
                  }`}
                >
                  <span className="text-white/40 select-none">
                    {m.role === 'user' ? '>' : '$'}
                  </span>
                  <div
                    className={`whitespace-pre-wrap max-w-[85%] ${
                      m.role === 'user'
                        ? 'p-2.5 rounded-xl bg-[#5A1832]/30 border border-[#873653]/40'
                        : ''
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-[#D6B99A] animate-pulse">
                  <span>$</span>
                  <span>EXECUTING QUERY_PROCESSOR...</span>
                </div>
              )}
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-3 border-t border-[rgba(214,185,154,0.1)] bg-[#130F14] flex flex-wrap gap-2">
              {quickQuestions.slice(0, 4).map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1 rounded-full border border-[rgba(214,185,154,0.15)] text-[11px] font-mono text-[#969099] hover:border-[#873653] hover:text-[#D6B99A] hover:bg-white/[0.03] transition-all"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Terminal Command Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center border-t border-[rgba(214,185,154,0.12)] bg-[#0A080B] px-4 py-3"
            >
              <span className="text-[#873653] font-mono text-sm mr-2 font-bold">{'>'}</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Ask about background, stack, DriftGuard, WALRUS..."
                className="flex-1 bg-transparent font-mono text-xs text-[#F0EAE3] placeholder-[#969099]/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Submit query"
                className="text-[#969099] hover:text-[#D6B99A] transition-colors p-1.5 rounded-lg hover:bg-white/[0.05]"
              >
                <CornerDownLeft size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
