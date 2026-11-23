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
import { Shield, Cpu, Terminal, ArrowRight, CornerDownLeft, Sparkles, Binary, Lock, Server } from 'lucide-react';
import { portfolioData } from '../../data';
import { quickQuestions, getReply, type Message } from '../../lib/chatbot';

gsap.registerPlugin(ScrollTrigger);

export function IdentityScene() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'manifesto' | 'dual' | 'terminal'>('manifesto');

  // Terminal Chat State
  const [terminalInput, setTerminalInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'NITHIN_OS v4.2 [SECURITY KERNEL INITIALIZED]\nQuery developer identity, system architecture, or security projects.' },
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
        const totalScroll = track.scrollWidth - window.innerWidth + 80;
        gsap.to(track, {
          x: () => -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.1,
            start: 'top top',
            end: () => `+=${totalScroll * 1.2}`,
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
      className="relative min-h-screen w-full bg-obsidian text-cream overflow-hidden border-t border-white/10"
    >
      {/* HORIZONTAL STORYTELLING TRACK */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row h-full min-h-screen pt-24 pb-16 px-6 md:px-24 items-center gap-12 lg:gap-24 will-change-transform"
      >
        {/* PANEL 1: MANIFESTO & OVERSIZED EDITORIAL STATEMENT */}
        <div className="w-full lg:w-[75vw] flex-shrink-0 flex flex-col justify-center">
          <div className="font-mono text-xs tracking-widest text-[#969099] uppercase mb-4 flex items-center gap-2">
            <span className="text-[#873653] font-bold">01</span>
            <span>//</span>
            <span>CORE MANIFESTO</span>
          </div>

          <h2 className="identity-heading font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] text-[#F0EAE3] uppercase max-w-5xl">
            ENGINEERING AT THE INTERSECTION OF <span className="text-[#873653]">HARDENED SECURITY</span> & HIGH-CONCURRENCY ARCHITECTURE.
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl border-t border-[rgba(214,185,154,0.12)] pt-6">
            <div>
              <h3 className="font-heading font-bold text-lg text-[#F0EAE3] uppercase tracking-wide flex items-center gap-2">
                <Shield size={16} className="text-[#873653]" />
                <span>The Security Ethos</span>
              </h3>
              <p className="mt-2 font-mono text-xs text-[#969099] leading-relaxed">
                Code that functions is standard. Code that withstands adversarial exploitation, AST vulnerability pattern scanning, and dynamic network drift is engineering. Security is not an afterthought patch; it is the substrate.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#F0EAE3] uppercase tracking-wide flex items-center gap-2">
                <Cpu size={16} className="text-[#D6B99A]" />
                <span>The Systems Perspective</span>
              </h3>
              <p className="mt-2 font-mono text-xs text-[#969099] leading-relaxed">
                From microservices processing 10,000+ users with Redis & WebSockets, to ML models evaluating 2,380 network flows/second, I build distributed software engineered for deterministic latency and raw mechanical sympathy.
              </p>
            </div>
          </div>
        </div>

        {/* PANEL 2: THE DUAL IDENTITY ARCHITECTURE */}
        <div className="w-full lg:w-[65vw] flex-shrink-0 flex flex-col justify-center">
          <div className="font-mono text-xs tracking-widest text-[#969099] uppercase mb-4 flex items-center gap-2">
            <span className="text-[#873653] font-bold">02</span>
            <span>//</span>
            <span>DUAL SPECIALIZATION MATRIX</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Column A: Full-Stack Architect */}
            <div className="relative p-8 rounded-2xl border border-[rgba(214,185,154,0.12)] bg-[#151116] backdrop-blur-md flex flex-col justify-between group hover:border-[#D6B99A]/50 transition-colors">
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-[#969099]/50 group-hover:text-[#D6B99A] transition-colors">
                [SYS_01]
              </div>

              <div>
                <div className="w-10 h-10 rounded-xl border border-[rgba(214,185,154,0.15)] flex items-center justify-center text-[#D6B99A] mb-6 bg-[#0D0B0E]">
                  <Server size={18} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#F0EAE3] tracking-tight uppercase">
                  Full-Stack Architecture
                </h3>
                <p className="mt-3 font-mono text-xs text-[#969099] leading-relaxed">
                  Engineered distributed web platforms, reactive SPAs, and scalable backends utilizing React, TypeScript, Node.js, FastAPI, PostgreSQL, and Docker.
                </p>
              </div>

              <div className="mt-8 border-t border-[rgba(214,185,154,0.1)] pt-4 flex flex-wrap gap-2">
                {['Distributed Queues', 'REST & GraphQL', 'WebSocket Pipelines', 'Database Modeling', 'Docker Compose'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-[#0D0B0E] border border-[rgba(214,185,154,0.1)] font-mono text-[10px] text-[#F0EAE3]/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Column B: Cybersecurity Researcher */}
            <div className="relative p-8 rounded-2xl border border-[#873653]/50 bg-[#151116] backdrop-blur-md flex flex-col justify-between group hover:border-[#873653] transition-colors">
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-[#873653] font-semibold">
                [SEC_02]
              </div>

              <div>
                <div className="w-10 h-10 rounded-xl border border-[#873653] flex items-center justify-center text-[#873653] mb-6 bg-[#35101F]/40">
                  <Lock size={18} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#F0EAE3] tracking-tight uppercase">
                  Cybersecurity Research
                </h3>
                <p className="mt-3 font-mono text-xs text-[#969099] leading-relaxed">
                  Offensive and defensive security practitioner specializing in AST pattern vulnerability identification, Contextual Hash Chain (CHC) file cryptography, and ML network intrusion detection.
                </p>
              </div>

              <div className="mt-8 border-t border-[rgba(214,185,154,0.1)] pt-4 flex flex-wrap gap-2">
                {['ML Intrusion Detection', 'Contextual Hash Chains', 'AST Vuln Scanning', 'Penetration Testing', 'Kali & Wireshark'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-[#5A1832]/30 border border-[#873653]/40 font-mono text-[10px] text-[#D6B99A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 3: INTERACTIVE INTELLIGENCE TERMINAL */}
        <div className="w-full lg:w-[60vw] flex-shrink-0 flex flex-col justify-center">
          <div className="font-mono text-xs tracking-widest text-[#969099] uppercase mb-4 flex items-center gap-2">
            <span className="text-[#873653] font-bold">03</span>
            <span>//</span>
            <span>INTELLIGENCE TERMINAL</span>
          </div>

          <div className="w-full rounded-2xl border border-[rgba(214,185,154,0.15)] bg-[#0D0B0E] shadow-2xl flex flex-col h-[480px] overflow-hidden">
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(214,185,154,0.1)] bg-[#151116]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#F0EAE3]">
                <Terminal size={14} className="text-[#873653]" />
                <span>NITHIN_OS // SECURE_SHELL v4.2</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#873653]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#D6B99A]/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-[rgba(214,185,154,0.2)]" />
              </div>
            </div>

            {/* Terminal Output */}
            <div
              ref={chatBodyRef}
              className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs leading-relaxed text-cream/90"
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${
                    m.role === 'user' ? 'text-signal justify-end' : 'text-cream/80'
                  }`}
                >
                  <span className="text-white/40 select-none">
                    {m.role === 'user' ? '>' : '$'}
                  </span>
                  <div className="whitespace-pre-wrap max-w-[85%]">{m.text}</div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-signal animate-pulse">
                  <span>$</span>
                  <span>EXECUTING QUERY_PROCESSOR...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="p-3 border-t border-[rgba(214,185,154,0.1)] bg-[#151116] flex flex-wrap gap-2">
              {quickQuestions.slice(0, 4).map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 rounded-md border border-[rgba(214,185,154,0.12)] text-[10px] font-mono text-[#969099] hover:border-[#873653] hover:text-[#D6B99A] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center border-t border-[rgba(214,185,154,0.1)] bg-[#0D0B0E] px-4 py-2.5"
            >
              <span className="text-[#873653] font-mono text-xs mr-2">{'>'}</span>
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
                className="text-[#969099] hover:text-[#D6B99A] transition-colors p-1"
              >
                <CornerDownLeft size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
