/**
 * @component About
 * @description About section of the Animated 3D Portfolio
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MapPin, Briefcase, GraduationCap, Circle } from 'lucide-react';
import { portfolioData } from '../data';
import { quickQuestions, getReply, type Message } from '../lib/chatbot';
import { GradientBorder, MagneticButton, TiltCard } from './RevealKit';

gsap.registerPlugin(ScrollTrigger);

// Splits message text on URLs and renders them as real clickable links,
// keeping everything else as plain text in the same bubble.
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
        className="underline decoration-red-400/60 underline-offset-2 text-red-300 hover:text-red-200 break-all"
        onClick={(e) => e.stopPropagation()}
      >
        {part}
      </a>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

const HEADING_WORDS = ['More', 'than', 'a'];

export function About() {
  const { personal } = portfolioData;
  const role = personal.title.split('|')[0].trim();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hi. Ask me anything about Nithin.' },
  ]);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<number | null>(null);
  // Mirrors `messages` outside React state so sendMessage can read the latest
  // history synchronously without putting a side effect (the setTimeout) inside
  // a setState updater — StrictMode double-invokes updaters in dev, which would
  // otherwise schedule two timeouts and post the bot reply twice.
  const messagesRef = useRef<Message[]>(messages);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatBodyRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  useEffect(
    () => () => {
      if (replyTimerRef.current) {
        window.clearTimeout(replyTimerRef.current);
      }
    },
    [],
  );

  // Scroll-scrubbed entrance: tied to actual scroll position through the
  // section (via GSAP ScrollTrigger + the site's Lenis instance) rather than
  // a canned "pop in once it enters the viewport" animation.
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (reduceMotion) return;

      const words = headingRef.current?.querySelectorAll<HTMLElement>('.about-word') ?? [];
      const cards = [cardARef.current, cardBRef.current].filter(Boolean) as HTMLElement[];

      gsap.set(eyebrowRef.current, { opacity: 0, y: 10 });
      gsap.set(words, { opacity: 0, y: 34, rotate: 3 });
      gsap.set(subtextRef.current, { opacity: 0, y: 14, filter: 'blur(6px)' });
      gsap.set(lineRef.current, { scaleX: 0 });
      // transformPerspective is set per-element because GradientBorder's
      // wrapper flattens the 3D context coming down from TiltCard's perspective.
      gsap.set(cards, { opacity: 0, y: 64, rotateX: 6, scale: 0.97, transformPerspective: 900 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          end: 'top 28%',
          scrub: 0.8,
        },
      });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.4 })
        .to(words, { opacity: 1, y: 0, rotate: 0, duration: 0.6, stagger: 0.08 }, 0.05)
        .to(lineRef.current, { scaleX: 1, duration: 0.5 }, 0.3)
        .to(subtextRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5 }, 0.35)
        .to(cards, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.8, stagger: 0.12 }, 0.4);
    }, section);

    return () => ctx.revert();
  }, []);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    // Blocked while a reply is pending (rather than clearing the previous
    // timer) so a fast second send can't silently swallow the first reply,
    // and getReply always sees the up-to-date history via messagesRef.
    if (!trimmed || isTyping) return;
    const next = [...messagesRef.current, { role: 'user' as const, text: trimmed }];
    messagesRef.current = next;
    setMessages(next);
    setIsTyping(true);
    replyTimerRef.current = window.setTimeout(() => {
      const withReply = [...messagesRef.current, { role: 'bot' as const, text: getReply(trimmed, next) }];
      messagesRef.current = withReply;
      setMessages(withReply);
      setIsTyping(false);
    }, 350);
    setInput('');
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-4 theme-section relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-16 right-12 w-96 h-96 rounded-full bg-red-500/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-14 text-center">
          <span
            ref={eyebrowRef}
            className="font-label text-[11px] text-red-400 font-medium uppercase tracking-[0.32em]"
          >
            Quick intro
          </span>
          <h2 ref={headingRef} className="font-display font-light text-4xl md:text-6xl text-white mt-4">
            {HEADING_WORDS.map((w) => (
              <span key={w} className="about-word inline-block mr-[0.28em]">
                {w}
              </span>
            ))}
            <span className="about-word inline-block text-red-400">bio</span>
          </h2>
          <div ref={lineRef} className="w-16 h-px bg-red-500/50 mx-auto mt-6 origin-center" />
          <p
            ref={subtextRef}
            className="text-slate-400 mt-6 max-w-2xl mx-auto text-base md:text-lg"
          >
            A compact snapshot of my work, mindset, and stack. The chat on the right can fill
            in the details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT — profile card */}
          <TiltCard maxTilt={6} className="lg:col-span-4">
            <GradientBorder active radius="rounded-[2rem]" className="h-full rounded-[2rem]">
              <div
                ref={cardARef}
                className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,18,18,0.98)_0%,rgba(10,10,10,0.96)_100%)] text-white p-7 md:p-8 shadow-2xl shadow-black/25 backdrop-blur-md flex flex-col h-full"
              >
                <div className="mb-6">
                  <p className="font-label text-[10px] uppercase tracking-[0.28em] text-slate-400">
                    Profile snapshot
                  </p>
                  <p className="text-xs text-slate-500 mt-1.5 leading-snug">
                    A quick read, not a long resume.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-display font-normal text-xl md:text-2xl leading-tight">
                      {personal.name}
                    </h3>
                    <p className="text-slate-300 mt-2 text-sm md:text-base leading-relaxed">
                      {personal.bio}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="font-label text-[9.5px] uppercase tracking-[0.24em] text-slate-500">
                        Focus
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-white mt-2">
                        <Briefcase size={14} className="text-slate-400" />
                        <span>{role}</span>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="font-label text-[9.5px] uppercase tracking-[0.24em] text-slate-500">
                        Location
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-white mt-2">
                        <MapPin size={14} className="text-slate-400" />
                        <span>{personal.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Circle size={8} className="text-emerald-400 fill-emerald-400" />
                    <span>Available for freelance and full-time opportunities</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                    <GraduationCap size={14} className="text-slate-500" />
                    <span>Computer Science background</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {['React', 'TypeScript', 'Node.js', 'FastAPI', 'Security'].map((tag) => (
                      <span
                        key={tag}
                        className="font-label px-3 py-1.5 rounded-full text-[10.5px] font-medium bg-white/5 text-slate-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GradientBorder>
          </TiltCard>

          {/* RIGHT — fixed-size chat */}
          <TiltCard maxTilt={4} className="lg:col-span-8">
            <GradientBorder active radius="rounded-[1.75rem]" className="h-full rounded-[1.75rem]">
              <div
                ref={cardBRef}
                className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(18,18,18,0.94)_0%,rgba(31,31,31,0.94)_100%)] text-white p-6 md:p-7 shadow-2xl shadow-black/25 backdrop-blur-md flex flex-col h-full"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-[0.28em] text-red-400 font-medium">
                      Quick chat
                    </p>
                    <h3 className="font-display font-normal text-xl md:text-2xl mt-1">
                      Ask me short questions
                    </h3>
                  </div>
                  <div className="font-label px-3 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    Auto reply
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {quickQuestions.map((question: string) => (
                    <MagneticButton
                      key={question}
                      onClick={() => sendMessage(question)}
                      disabled={isTyping}
                      className="px-3 py-2 rounded-full text-xs border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {question}
                    </MagneticButton>
                  ))}
                </div>

                {/* fixed-size chat window */}
                <div
                  ref={chatBodyRef}
                  role="log"
                  aria-live="polite"
                  aria-label="Chat with Nithin's assistant"
                  className="overflow-y-auto rounded-[1.25rem] border border-white/10 bg-black/20 p-4"
                  style={{ height: '360px', maxHeight: '360px', minHeight: '360px' }}
                >
                  <div className="flex flex-col gap-3">
                    {messages.map((message, index) => (
                      <div
                        key={`${message.role}-${index}`}
                        style={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: message.role === 'bot' ? 'flex-start' : 'flex-end',
                        }}
                      >
                        <div
                          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                            message.role === 'bot'
                              ? 'bg-white/8 text-slate-100 border border-white/10'
                              : 'bg-red-500/15 text-white border border-red-500/20'
                          }`}
                          style={{ maxWidth: '75%' }}
                        >
                          {renderMessageText(message.text)}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
                        <div
                          className="rounded-2xl px-4 py-3 text-sm bg-white/8 text-slate-100 border border-white/10"
                          style={{ maxWidth: '75%' }}
                        >
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.2s]" />
                            <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.1s]" />
                            <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.nativeEvent.isComposing) sendMessage(input);
                    }}
                    placeholder="Type a question..."
                    maxLength={300}
                    disabled={isTyping}
                    aria-label="Type a question"
                    className="flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-red-400/40 disabled:opacity-50"
                  />
                  <MagneticButton
                    onClick={() => sendMessage(input)}
                    disabled={isTyping || !input.trim()}
                    className="rounded-full px-4 py-3 bg-white text-slate-900 font-semibold hover:bg-red-100 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <Send size={18} />
                  </MagneticButton>
                </div>
              </div>
            </GradientBorder>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
