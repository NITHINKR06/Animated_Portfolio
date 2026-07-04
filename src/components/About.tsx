/**
 * @component About
 * @description About section of the Animated 3D Portfolio
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, MapPin, Briefcase, GraduationCap, Circle } from 'lucide-react';
import { portfolioData } from '../data';
import { quickQuestions, getReply, type Message } from '../lib/chatbot';

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

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (replyTimerRef.current) {
      window.clearTimeout(replyTimerRef.current);
    }
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setIsTyping(true);
    const reply = getReply(trimmed);
    replyTimerRef.current = window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
      setIsTyping(false);
    }, 350);
    setInput('');
  };

  return (
    <section id="about" className="py-24 px-4 theme-section relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-16 right-12 w-96 h-96 rounded-full bg-red-500/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <span className="text-xs text-red-300 font-semibold uppercase tracking-[0.24em]">
            Quick intro
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-3">
            More than a <span className="text-gradient">bio</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            A compact snapshot of my work, mindset, and stack. The chat on the right can fill
            in the details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT — profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,18,18,0.98)_0%,rgba(10,10,10,0.96)_100%)] text-white p-7 md:p-8 shadow-2xl shadow-black/25 backdrop-blur-md flex flex-col"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center shrink-0">
                  <Sparkles size={20} className="text-red-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-red-300/80 font-semibold">
                    Profile snapshot
                  </p>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    A quick read, not a long resume.
                  </p>
                </div>
              </div>
              {/* <div className="shrink-0 self-start px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] uppercase tracking-[0.22em] text-slate-300 whitespace-nowrap">
                Open to work
              </div> */}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">{personal.name}</h3>
                <p className="text-slate-300 mt-2 text-sm md:text-base leading-relaxed">
                  {personal.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Focus</p>
                  <p className="text-sm font-medium text-white mt-2 leading-relaxed">{role}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Location</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-white mt-2">
                    <MapPin size={15} className="text-red-300" />
                    <span>{personal.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Circle size={8} className="text-emerald-400 fill-emerald-400" />
                <span>Available for freelance and full-time opportunities</span>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Briefcase size={14} className="text-red-300" />
                  <span>Full-stack development and app security</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <GraduationCap size={14} className="text-red-300" />
                  <span>Computer Science background</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {['React', 'TypeScript', 'Node.js', 'FastAPI', 'Security'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/5 text-slate-200 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — fixed-size chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(18,18,18,0.94)_0%,rgba(31,31,31,0.94)_100%)] text-white p-6 md:p-7 shadow-2xl shadow-black/25 backdrop-blur-md flex flex-col"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-red-300 font-semibold">
                  Quick chat
                </p>
                <h3 className="text-xl md:text-2xl font-bold">Ask me short questions</h3>
              </div>
              <div className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                Auto reply
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {quickQuestions.map((question: string) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question)}
                  className="px-3 py-2 rounded-full text-xs border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* fixed-size chat window */}
            <div
              ref={chatBodyRef}
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
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
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
                  if (e.key === 'Enter') sendMessage(input);
                }}
                placeholder="Type a question..."
                className="flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-red-400/40"
              />
              <button
                type="button"
                onClick={() => sendMessage(input)}
                className="rounded-full px-4 py-3 bg-white text-slate-900 font-semibold hover:bg-red-100 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
