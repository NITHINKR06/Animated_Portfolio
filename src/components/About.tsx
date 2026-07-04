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
            About me
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-3">
            Simple <span className="text-gradient">About</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Short profile on the left, quick chat on the right.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT — profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 rounded-[1.75rem] border border-black/10 bg-[linear-gradient(135deg,rgba(255,252,247,0.96)_0%,rgba(242,233,219,0.96)_100%)] text-slate-900 p-7 md:p-8 shadow-2xl shadow-black/10 backdrop-blur-md flex flex-col"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-white/80 border border-black/10 flex items-center justify-center">
                <Sparkles size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-red-700 font-semibold">
                  Name
                </p>
                <h3 className="text-2xl font-bold">{personal.name}</h3>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-red-700 font-semibold mb-1">
                  What I do
                </p>
                <p className="text-slate-700 font-medium leading-relaxed">{role}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin size={16} className="text-red-600" />
                <span>{personal.location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Circle size={8} className="text-green-600 fill-green-600" />
                <span>Available for work</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6">
              <div className="rounded-xl bg-white/70 border border-black/10 px-2 py-3 text-center">
                <p className="text-lg font-bold text-red-600">3+</p>
                <p className="text-[10px] text-slate-600 uppercase tracking-wide">Years</p>
              </div>
              <div className="rounded-xl bg-white/70 border border-black/10 px-2 py-3 text-center">
                <p className="text-lg font-bold text-red-600">10+</p>
                <p className="text-[10px] text-slate-600 uppercase tracking-wide">Projects</p>
              </div>
              <div className="rounded-xl bg-white/70 border border-black/10 px-2 py-3 text-center">
                <p className="text-lg font-bold text-red-600">5+</p>
                <p className="text-[10px] text-slate-600 uppercase tracking-wide">Tech</p>
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Briefcase size={14} className="text-red-600" />
                <span>Full-stack development &amp; app security</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <GraduationCap size={14} className="text-red-600" />
                <span>Computer Science background</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {['React', 'TypeScript', 'Node.js', 'FastAPI', 'Security'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/80 text-slate-700 border border-black/10"
                >
                  {tag}
                </span>
              ))}
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
              {quickQuestions.map((question) => (
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
                      {message.text}
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