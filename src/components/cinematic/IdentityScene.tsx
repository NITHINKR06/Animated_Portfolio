/**
 * @component IdentityScene
 * @description Scene 02: IDENTITY - The Dual Identity & Engineering Philosophy
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 *
 * Pinned horizontal storytelling layout exploring:
 * - Panel 1: Core Manifesto, Engineering Mindset & Architectural Pillars
 * - Panel 2: Dual Specialization Matrix (Full-Stack Engineering & Cybersecurity Research)
 * - Panel 3: Live Interactive Intelligence Terminal (Direct Developer Query Shell)
 *
 * Stylized in Obsidian × Burgundy × Champagne visual direction.
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
  Server,
  Layers,
  Sparkles,
  Lock,
  Zap,
  CheckCircle2,
  Code2,
  Activity,
  Compass,
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
    }, 380);
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
        { opacity: 0.35, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
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
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#873653]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#D6B99A]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* HORIZONTAL STORYTELLING TRACK (Centering & Scroll Mechanics Preserved) */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row h-full min-h-screen items-center will-change-transform"
      >
        {/* ========================================================================= */}
        {/* PANEL 1: MANIFESTO, CRAFT & ARCHITECTURAL PILLARS                        */}
        {/* ========================================================================= */}
        <div className="w-full lg:w-screen flex-shrink-0 flex flex-col justify-center items-center py-16 sm:py-20 px-6 md:px-16 lg:pl-32 lg:pr-20 min-h-screen">
          <div className="max-w-5xl w-full mx-auto">
            {/* Elegant Editorial Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#873653] animate-pulse" />
              <span className="font-mono text-xs tracking-[0.25em] text-[#D6B99A] uppercase font-semibold">
                About Me // Craft & Philosophy
              </span>
            </div>

            {/* Balanced Editorial Headline */}
            <h2 className="identity-heading font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[#F0EAE3] uppercase max-w-4xl">
              Engineering at the intersection of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6B99A] via-[#873653] to-[#D6B99A]">
                Hardened Security
              </span>{' '}
              & High-Concurrency Systems.
            </h2>

            {/* Narrative Bio */}
            <p className="mt-4 font-mono text-xs sm:text-sm text-[#969099] max-w-3xl leading-relaxed">
              I am <span className="text-[#F0EAE3] font-semibold">{portfolioData.personal.name}</span>—a Full-Stack Developer and Security Researcher based in {portfolioData.personal.location}. I treat software engineering as an exacting craft: building fluid, immersive interfaces backed by deterministic, defensive architectures designed to withstand real-world concurrency and adversarial threats.
            </p>

            {/* Elevated Architectural Pillars */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Adversarial Resilience */}
              <div className="group relative p-6 sm:p-7 rounded-2xl border border-[rgba(214,185,154,0.15)] bg-gradient-to-b from-[#181116] via-[#120d12] to-[#0A0709] shadow-xl hover:border-[#873653] hover:shadow-[0_0_35px_rgba(135,54,83,0.22)] transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[rgba(214,185,154,0.1)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5A1832]/35 border border-[#873653] flex items-center justify-center text-[#D6B99A] group-hover:scale-105 transition-transform">
                      <Shield size={20} className="text-[#873653]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-[#F0EAE3] uppercase tracking-tight">
                        Adversarial Resilience
                      </h3>
                      <span className="font-mono text-[10px] text-[#D6B99A] tracking-wider">
                        DEFENSE AS SUBSTRATE
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-[#969099] px-2.5 py-1 rounded-md border border-[rgba(214,185,154,0.12)] bg-black/40">
                    CORE PILLAR
                  </span>
                </div>

                <p className="font-mono text-xs text-[#969099] leading-relaxed mb-5">
                  Security cannot be a late patch bolted on at deployment. I engineer systems with proactive threat modeling, automated AST code pattern auditing, and cryptographic zero-trust validation from line one.
                </p>

                {/* Tactical Value Points */}
                <div className="space-y-2 mb-5 font-mono text-[11px] text-[#F0EAE3]/85">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#873653] mt-0.5 flex-shrink-0" />
                    <span>Automated AST vulnerability analysis pre-build</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#873653] mt-0.5 flex-shrink-0" />
                    <span>Cryptographic proof through Contextual Hash Chains</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#873653] mt-0.5 flex-shrink-0" />
                    <span>Exploit PoC defense & zero-trust authentication</span>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-[rgba(214,185,154,0.1)] font-mono text-[10px]">
                  <span className="px-2.5 py-1 bg-[#5A1832]/25 border border-[#873653]/40 text-[#D6B99A] rounded-md">
                    AST Code Scanning
                  </span>
                  <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] text-[#F0EAE3]/80 rounded-md">
                    Zero-Trust Protocols
                  </span>
                  <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] text-[#F0EAE3]/80 rounded-md">
                    Cryptographic Hashing
                  </span>
                </div>
              </div>

              {/* Card 2: High-Concurrency Architecture */}
              <div className="group relative p-6 sm:p-7 rounded-2xl border border-[rgba(214,185,154,0.15)] bg-gradient-to-b from-[#161317] via-[#110e13] to-[#0A0709] shadow-xl hover:border-[#D6B99A]/70 hover:shadow-[0_0_35px_rgba(214,185,154,0.18)] transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[rgba(214,185,154,0.1)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[rgba(214,185,154,0.25)] flex items-center justify-center text-[#D6B99A] group-hover:scale-105 transition-transform">
                      <Cpu size={20} className="text-[#D6B99A]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-[#F0EAE3] uppercase tracking-tight">
                        High-Concurrency Systems
                      </h3>
                      <span className="font-mono text-[10px] text-[#D6B99A] tracking-wider">
                        MECHANICAL SYMPATHY
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-[#969099] px-2.5 py-1 rounded-md border border-[rgba(214,185,154,0.12)] bg-black/40">
                    SCALE & LATENCY
                  </span>
                </div>

                <p className="font-mono text-xs text-[#969099] leading-relaxed mb-5">
                  From distributed backends serving 10,000+ active users with Redis pipelines to reactive SPAs with sub-50ms deterministic execution, I design software with pure mechanical sympathy and high efficiency.
                </p>

                {/* Tactical Value Points */}
                <div className="space-y-2 mb-5 font-mono text-[11px] text-[#F0EAE3]/85">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#D6B99A] mt-0.5 flex-shrink-0" />
                    <span>Microservices serving 10,000+ active users</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#D6B99A] mt-0.5 flex-shrink-0" />
                    <span>Deterministic sub-50ms execution & caching</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#D6B99A] mt-0.5 flex-shrink-0" />
                    <span>Reactive state pipelines with React & TypeScript</span>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-[rgba(214,185,154,0.1)] font-mono text-[10px]">
                  <span className="px-2.5 py-1 bg-[#D6B99A]/10 border border-[#D6B99A]/30 text-[#D6B99A] rounded-md">
                    10K+ Concurrent Users
                  </span>
                  <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] text-[#F0EAE3]/80 rounded-md">
                    Redis Pipelines
                  </span>
                  <span className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] text-[#F0EAE3]/80 rounded-md">
                    FastAPI Event Loops
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PANEL 2: DUAL SPECIALIZATION MATRIX (CAPABILITIES)                       */}
        {/* ========================================================================= */}
        <div className="w-full lg:w-screen flex-shrink-0 flex flex-col justify-center items-center py-16 sm:py-20 px-6 md:px-16 lg:pl-32 lg:pr-20 min-h-screen">
          <div className="max-w-5xl w-full mx-auto">
            {/* Editorial Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D6B99A] animate-pulse" />
              <span className="font-mono text-xs tracking-[0.25em] text-[#D6B99A] uppercase font-semibold">
                Dual Specialization // Technical Domains
              </span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] text-[#F0EAE3] uppercase max-w-4xl mb-3">
              Two Disciplines. <span className="text-[#873653]">One Cohesive Vision.</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#969099] max-w-3xl leading-relaxed mb-8">
              Bridging modern product engineering with rigorous offensive and defensive security research to deliver experiences that are as resilient as they are intuitive.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
              {/* Card A: Full-Stack Product Engineering */}
              <div className="relative p-7 sm:p-8 rounded-3xl border border-[rgba(214,185,154,0.18)] bg-gradient-to-b from-[#161217] via-[#100d11] to-[#0a0709] shadow-2xl flex flex-col justify-between group hover:border-[#D6B99A] hover:shadow-[0_0_35px_rgba(214,185,154,0.18)] transition-all duration-300">
                <div>
                  {/* Header Badge */}
                  <div className="flex items-center justify-between font-mono text-[11px] pb-4 mb-5 border-b border-[rgba(214,185,154,0.1)]">
                    <span className="flex items-center gap-2 text-[#D6B99A] font-semibold tracking-wider">
                      <Layers size={14} className="text-[#D6B99A]" />
                      FULL-STACK CRAFT
                    </span>
                    <span className="text-[#969099] text-[10px] uppercase">
                      PRODUCT & SYSTEMS
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#F0EAE3] tracking-tight uppercase group-hover:text-[#D6B99A] transition-colors mb-2">
                    Full-Stack Engineering
                  </h3>

                  <p className="font-mono text-xs text-[#969099] leading-relaxed mb-6">
                    Designing responsive, client-side applications paired with robust backend services designed for zero downtime and instant user feedback.
                  </p>

                  {/* 3 Core Strengths */}
                  <div className="space-y-3 font-mono text-xs text-[#F0EAE3]/85">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-[rgba(214,185,154,0.08)]">
                      <div className="text-[#D6B99A] font-semibold text-[11px] mb-1">
                        Fluid Frontend Experiences
                      </div>
                      <div className="text-[#969099] text-[11px] leading-relaxed">
                        60fps animations, accessible design systems, and reactive state workflows with React, TypeScript & Tailwind.
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-[rgba(214,185,154,0.08)]">
                      <div className="text-[#D6B99A] font-semibold text-[11px] mb-1">
                        High-Throughput Backends
                      </div>
                      <div className="text-[#969099] text-[11px] leading-relaxed">
                        RESTful & WebSocket APIs built with FastAPI and Node.js for low-latency asynchronous processing.
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-[rgba(214,185,154,0.08)]">
                      <div className="text-[#D6B99A] font-semibold text-[11px] mb-1">
                        Distributed Infrastructure
                      </div>
                      <div className="text-[#969099] text-[11px] leading-relaxed">
                        In-memory caching with Redis, relational models in PostgreSQL, and Docker containerization.
                      </div>
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
                    'Docker',
                    'Tailwind CSS',
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

              {/* Card B: Cybersecurity & Offensive Research */}
              <div className="relative p-7 sm:p-8 rounded-3xl border border-[#873653]/50 bg-gradient-to-b from-[#1b1117] via-[#120a10] to-[#090508] shadow-2xl flex flex-col justify-between group hover:border-[#873653] hover:shadow-[0_0_35px_rgba(135,54,83,0.3)] transition-all duration-300">
                <div>
                  {/* Header Badge */}
                  <div className="flex items-center justify-between font-mono text-[11px] pb-4 mb-5 border-b border-[#873653]/30">
                    <span className="flex items-center gap-2 text-[#873653] font-semibold tracking-wider">
                      <Lock size={14} className="text-[#873653]" />
                      SECURITY RESEARCH
                    </span>
                    <span className="text-[#D6B99A] text-[10px] uppercase">
                      OFFENSIVE & DEFENSIVE
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#F0EAE3] tracking-tight uppercase group-hover:text-[#873653] transition-colors mb-2">
                    Cybersecurity & Systems
                  </h3>

                  <p className="font-mono text-xs text-[#969099] leading-relaxed mb-6">
                    Uncovering vulnerabilities, analyzing attack surfaces, and engineering algorithmic defenses against exploitation and data tampering.
                  </p>

                  {/* 3 Core Strengths */}
                  <div className="space-y-3 font-mono text-xs text-[#F0EAE3]/85">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-[#873653]/25">
                      <div className="text-[#873653] font-semibold text-[11px] mb-1">
                        AST Vulnerability Auditing
                      </div>
                      <div className="text-[#969099] text-[11px] leading-relaxed">
                        Static code analysis to detect SQLi, command injection, and logic flaws prior to deployment.
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-[#873653]/25">
                      <div className="text-[#873653] font-semibold text-[11px] mb-1">
                        Contextual Cryptographic Proofs
                      </div>
                      <div className="text-[#969099] text-[11px] leading-relaxed">
                        Contextual Hash Chains (CHC) for tamper-evident file verification and auditability.
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-[#873653]/25">
                      <div className="text-[#873653] font-semibold text-[11px] mb-1">
                        Machine Learning Intrusion Detection
                      </div>
                      <div className="text-[#969099] text-[11px] leading-relaxed">
                        Real-time flow classification evaluating 2,380+ network connections/second.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technologies Tag Array */}
                <div className="mt-7 border-t border-[#873653]/30 pt-4 flex flex-wrap gap-2">
                  {[
                    'AST Vuln Scanning',
                    'Contextual Hash Chains',
                    'ML Intrusion Defense',
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

        {/* ========================================================================= */}
        {/* PANEL 3: INTERACTIVE INTELLIGENCE TERMINAL                                */}
        {/* ========================================================================= */}
        <div className="w-full lg:w-screen flex-shrink-0 flex flex-col justify-center items-center py-16 sm:py-20 px-6 md:px-16 lg:pl-32 lg:pr-20 min-h-screen">
          <div className="max-w-4xl w-full mx-auto">
            {/* Editorial Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs tracking-[0.25em] text-[#D6B99A] uppercase font-semibold">
                Interactive Console // Query Engine
              </span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] text-[#F0EAE3] uppercase max-w-3xl mb-3">
              Ask Anything. <span className="text-[#873653]">Direct Intelligence.</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#969099] max-w-2xl leading-relaxed mb-6">
              Query my background, security projects, tech stack, or engineering philosophy directly through this secure terminal interface.
            </p>

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
                    className={`flex gap-2.5 ${
                      m.role === 'user' ? 'text-[#D6B99A] justify-end' : 'text-[#F0EAE3]/85'
                    }`}
                  >
                    <span className="text-white/40 select-none">
                      {m.role === 'user' ? '>' : '$'}
                    </span>
                    <div
                      className={`whitespace-pre-wrap max-w-[85%] ${
                        m.role === 'user'
                          ? 'p-2.5 rounded-xl bg-[#5A1832]/35 border border-[#873653]/40'
                          : 'pl-1 border-l-2 border-[#873653]/40'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-[#D6B99A] animate-pulse">
                    <span>$</span>
                    <span>PROCESSING QUERY KERNEL...</span>
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
