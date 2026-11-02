/**
 * @component About
 * @description Master Editorial Narrative & Integrated Architectural Dialogue
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  MessageSquare,
  CornerDownLeft,
  X,
  CheckCircle2,
} from 'lucide-react';
import { portfolioData } from '../data';
import { getReply, type Message } from '../lib/chatbot';

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function renderMessageText(text: string) {
  const parts = text.split(URL_REGEX);
  return parts.map((part, i) =>
    URL_REGEX.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-[#D4A373] underline-offset-2 text-[#D4A373] hover:text-white break-all font-mono font-medium"
        onClick={(e) => e.stopPropagation()}
      >
        {part}
      </a>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

const quickPrompts = [
  'Show top security project',
  'What is his tech stack?',
  'How to contact?',
  'Tell me about his background',
];

export function About() {
  const { personal } = portfolioData;

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Greetings. I am Nithin's interactive portfolio assistant. Ask about his security research, full-stack implementations, or technical background.",
    },
  ]);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const el = chatBodyRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isTyping, isAssistantExpanded]);

  useEffect(
    () => () => {
      if (replyTimerRef.current) {
        window.clearTimeout(replyTimerRef.current);
      }
    },
    [],
  );

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setIsAssistantExpanded(true);
    const userMsg: Message = { role: 'user', text: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsTyping(true);

    if (replyTimerRef.current) {
      window.clearTimeout(replyTimerRef.current);
    }

    replyTimerRef.current = window.setTimeout(() => {
      const reply = getReply(trimmed, nextMessages);
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <section
      id="about"
      className="relative min-h-screen py-28 md:py-36 px-6 sm:px-10 lg:px-16 bg-[#0A0B0E] text-[#F5F4EE] overflow-hidden"
    >
      {/* Background Ambient Atmospheric Light */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/2 left-10 w-[600px] h-[600px] rounded-full bg-[#D4A373]/[0.025] blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-20 md:space-y-28">
        {/* ── Section Title & Editorial Manifesto ── */}
        <div className="border-b border-white/[0.08] pb-10 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#D4A373]" />
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4A373] font-medium">
              01 // Architectural Philosophy &amp; Manifesto
            </span>
          </div>

          <div className="max-w-4xl space-y-4">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold text-[#F5F4EE] tracking-tight leading-[1.05]">
              Engineering Resilient Systems <br />
              <span className="font-serif italic font-light text-[#D4A373]">
                with Computational Rigor.
              </span>
            </h2>

            <p className="text-base sm:text-xl text-[#8E929D] font-body leading-relaxed max-w-2xl font-light">
              Bridging the boundary between proactive AST security analysis, high-concurrency distributed backends, and tactile digital craftsmanship.
            </p>
          </div>
        </div>

        {/* ── Layered Editorial Story Composition ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait Framing & Verified Pedigree */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative group rounded-2xl overflow-hidden border border-white/[0.1] bg-[#12131A] p-3 shadow-2xl">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#161722]">
                <img
                  src="/NITHINKR06.webp"
                  alt="Nithin K R Portrait"
                  className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-transparent to-transparent opacity-80" />

                {/* Overlaid Micro-Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#DCD9CE] bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/[0.08]">
                  <span className="text-[#D4A373] font-semibold">NITHIN K R</span>
                  <span>CS &amp; CYBERSECURITY</span>
                </div>
              </div>
            </div>

            {/* Architectural Pedigree Checklist */}
            <div className="space-y-4 p-6 rounded-2xl border border-white/[0.06] bg-[#12131A]/60">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#D4A373]">
                Verified Focus Areas
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-[#DCD9CE] font-body">
                <div className="flex items-start gap-3">
                  <Shield size={16} className="text-[#D4A373] mt-0.5 flex-shrink-0" />
                  <span>AST Pattern Scanning, Vulnerability Chaining &amp; Exploit Simulation</span>
                </div>
                <div className="flex items-start gap-3">
                  <Layers size={16} className="text-[#D4A373] mt-0.5 flex-shrink-0" />
                  <span>High-Throughput Spring Boot &amp; FastAPI Distributed Microservices</span>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles size={16} className="text-[#D4A373] mt-0.5 flex-shrink-0" />
                  <span>Interactive 3D Environments &amp; GPU-Accelerated Web Engineering</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Three Technical Narrative Essays */}
          <div className="lg:col-span-7 space-y-10">
            {/* Essay 01: Defensive Security */}
            <div className="space-y-3 pb-8 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#D4A373] font-bold">01</span>
                <span className="w-4 h-px bg-white/20" />
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#8E929D]">
                  Defensive Rigor as a Core Discipline
                </h3>
              </div>

              <h4 className="text-xl sm:text-2xl font-sans font-bold text-[#F5F4EE]">
                Vulnerability detection begins in the abstract syntax tree.
              </h4>

              <p className="text-sm sm:text-base text-[#DCD9CE] font-body leading-relaxed font-light">
                Security is not an afterthought or an annual penetration test—it is an architectural guarantee written into the compile and build pipeline. In systems like CodeSentinel and DriftGuard, I design static AST parsers and machine learning anomaly detectors that locate multi-step vulnerability chains before code reaches production environments.
              </p>
            </div>

            {/* Essay 02: High-Throughput Backends */}
            <div className="space-y-3 pb-8 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#D4A373] font-bold">02</span>
                <span className="w-4 h-px bg-white/20" />
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#8E929D]">
                  High-Throughput Engineering
                </h3>
              </div>

              <h4 className="text-xl sm:text-2xl font-sans font-bold text-[#F5F4EE]">
                Concurrency, resilient caching, and clean failure modes.
              </h4>

              <p className="text-sm sm:text-base text-[#DCD9CE] font-body leading-relaxed font-light">
                Whether aggregating developer metrics with Java Spring Boot and non-blocking CompletableFuture workers, or caching multi-tenant data structures with Redis, I engineer distributed services designed to operate flawlessly under aggressive rate limits and heavy concurrent loads.
              </p>
            </div>

            {/* Essay 03: Tactile Digital Craft */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#D4A373] font-bold">03</span>
                <span className="w-4 h-px bg-white/20" />
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#8E929D]">
                  Disciplined Digital Craft
                </h3>
              </div>

              <h4 className="text-xl sm:text-2xl font-sans font-bold text-[#F5F4EE]">
                Substance and motion without superficial decoration.
              </h4>

              <p className="text-sm sm:text-base text-[#DCD9CE] font-body leading-relaxed font-light">
                Digital experiences should feel weightless yet substantial. Combining native CSS scroll-driven keyframes with Three.js shaders and Framer Motion micro-interactions allows for an editorial aesthetic that remains lightning-fast, accessible, and uncompromising in its typographic restraint.
              </p>
            </div>
          </div>
        </div>

        {/* ── Integrated Architectural AI Assistant Dock (Non-Dominating) ── */}
        <div className="pt-8 border-t border-white/[0.08] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MessageSquare size={16} className="text-[#D4A373]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#F5F4EE]">
                Architectural Inquiries &amp; Assistant
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] hover:border-[#D4A373] text-[#8E929D] hover:text-white transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Input Conduit */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-3 bg-[#12131A] border border-white/[0.08] focus-within:border-[#D4A373] rounded-xl px-4 py-2.5 transition-colors"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Nithin's architecture, security research, or background..."
              className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder:text-[#8E929D] focus:outline-none font-mono"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-[#F5F4EE] text-[#0A0B0E] hover:bg-[#D4A373] transition-colors cursor-pointer"
              aria-label="Send inquiry"
            >
              <CornerDownLeft size={14} />
            </button>
          </form>

          {/* Expandable Conversational Drawer */}
          {isAssistantExpanded && (
            <div className="rounded-xl border border-white/[0.08] bg-[#12131A]/95 p-5 space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs font-mono text-[#8E929D]">
                <span>ARCHITECTURAL CONVERSATION</span>
                <button
                  type="button"
                  onClick={() => setIsAssistantExpanded(false)}
                  className="hover:text-white transition-colors"
                  aria-label="Close conversation"
                >
                  <X size={14} />
                </button>
              </div>

              <div
                ref={chatBodyRef}
                className="max-h-56 overflow-y-auto space-y-3 text-xs font-mono pr-2"
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-white/[0.06] text-white ml-auto max-w-[85%]'
                        : 'bg-white/[0.03] text-[#DCD9CE] border border-white/[0.04] max-w-[90%]'
                    }`}
                  >
                    <span className="text-[10px] text-[#D4A373] block mb-1">
                      {msg.role === 'user' ? 'YOU' : 'ARCHITECTURAL ASSISTANT'}
                    </span>
                    <p className="leading-relaxed font-sans text-xs sm:text-sm">
                      {renderMessageText(msg.text)}
                    </p>
                  </div>
                ))}

                {isTyping && (
                  <div className="p-3 rounded-lg bg-white/[0.03] text-[#8E929D] w-fit">
                    <span className="animate-pulse">Formulating architectural response...</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
