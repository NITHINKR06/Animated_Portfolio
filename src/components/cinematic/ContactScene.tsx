/**
 * @component ContactScene
 * @description Scene 06: CONTACT - Dramatic Minimal Typography Conclusion
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 *
 * Minimal typography-focused composition:
 * - One-click interactive email transmitter
 * - Direct links to GitHub, LinkedIn, Instagram
 * - Real-time coordinates and availability badge
 * - Terminal dispatcher form
 * - Full attribution integrity
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, ArrowUpRight, Copy, Check, Send, Sparkles, MapPin } from 'lucide-react';
import { portfolioData } from '../../data';

interface ContactSceneProps {
  onResumeClick?: () => void;
}

export function ContactScene({ onResumeClick }: ContactSceneProps) {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    // Format mailto link to preserve actual delivery
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Anonymous'}`);
    const body = encodeURIComponent(`From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setMsgSent(true);
  };

  const socialLinks = [
    { name: 'GITHUB', handle: 'NITHINKR06', url: personal.github, icon: Github },
    { name: 'LINKEDIN', handle: 'nithinkr06', url: personal.linkedin, icon: Linkedin },
    { name: 'INSTAGRAM', handle: '@_nithin.kr_', url: 'https://instagram.com/_nithin.kr_', icon: Instagram },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-[#08090B] text-[#F0EAE3] py-24 px-6 md:px-16 flex flex-col justify-between border-t border-[rgba(214,185,154,0.12)]"
    >
      {/* TOP HEADER */}
      <div className="flex items-center justify-between font-mono text-xs tracking-widest text-[#D6B99A] uppercase mb-12">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#873653]" />
          <span>SCENE 06 // TERMINATION & ENGAGEMENT</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[#F0EAE3]/70">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>READY FOR DEPLOYMENT</span>
        </div>
      </div>

      {/* MONUMENTAL CALLOUT */}
      <div className="max-w-6xl my-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-[#969099] block mb-4">
          // INITIALIZE TRANSMISSION PROTOCOL
        </span>

        <h2 className="font-heading font-black text-4xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase text-[#F0EAE3] leading-[0.92] select-none">
          LET'S CONSTRUCT <br />
          <span className="text-[#873653] underline decoration-[#873653]/40 underline-offset-8">THE NEXT REALM</span>.
        </h2>

        {/* INTERACTIVE EMAIL BOX */}
        <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-2xl border border-[rgba(214,185,154,0.18)] bg-[#151116] p-2.5">
          <div className="flex-1 px-4 py-2 font-mono text-xs sm:text-base text-[#F0EAE3] truncate select-all">
            {personal.email}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[rgba(214,185,154,0.2)] bg-[#0D0B0E] text-[#F0EAE3] hover:border-[#873653] font-mono text-xs tracking-wider uppercase transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
            <a
              href={`mailto:${personal.email}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#5A1832] border border-[#873653] text-[#F0EAE3] font-mono text-xs font-bold tracking-wider uppercase hover:bg-[#873653] hover:shadow-[0_0_15px_rgba(135,54,83,0.4)] transition-colors"
            >
              <Mail size={14} />
              <span>TRANSMIT</span>
            </a>
          </div>
        </div>

        {/* CONTACT TERMINAL FORM & SOCIAL DISPATCH */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[rgba(214,185,154,0.12)] pt-12">
          {/* Quick Dispatch Form (7 Cols) */}
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase text-[#D6B99A] font-semibold block mb-4">
              [ DIRECT PACKET DISPATCHER ]
            </span>

            {msgSent ? (
              <div className="p-6 border border-emerald-500/40 bg-emerald-500/10 font-mono text-xs text-[#F0EAE3]">
                Packet queued for delivery. Mail client dispatched to {personal.email}.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[11px] text-[#969099] uppercase block mb-1">
                      IDENTITY / NAME
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full bg-[#0D0B0E] border border-[rgba(214,185,154,0.12)] px-4 py-2.5 font-mono text-xs text-[#F0EAE3] focus:border-[#873653] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] text-[#969099] uppercase block mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@frontier.io"
                      className="w-full bg-[#0D0B0E] border border-[rgba(214,185,154,0.12)] px-4 py-2.5 font-mono text-xs text-[#F0EAE3] focus:border-[#873653] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[11px] text-[#969099] uppercase block mb-1">
                    TRANSMISSION MESSAGE
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Project details, security inquiry, collaboration..."
                    className="w-full bg-[#0D0B0E] border border-[rgba(214,185,154,0.12)] px-4 py-2.5 font-mono text-xs text-[#F0EAE3] focus:border-[#873653] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#5A1832]/60 border border-[#873653]/60 text-[#F0EAE3] font-mono text-xs uppercase tracking-wider hover:border-[#873653] hover:bg-[#5A1832] transition-all"
                >
                  <Send size={13} />
                  <span>DISPATCH TRANSMISSION</span>
                </button>
              </form>
            )}
          </div>

          {/* Social Links & Location Telemetry (5 Cols) */}
          <div className="lg:col-span-5 lg:border-l lg:border-[rgba(214,185,154,0.12)] lg:pl-8 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase text-[#D6B99A] font-semibold block mb-4">
                [ NETWORK REPOSITORIES & COMMS ]
              </span>
              <div className="space-y-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 border border-[rgba(214,185,154,0.12)] bg-[#151116] flex items-center justify-between hover:border-[#873653] hover:bg-[#1f1721] transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} className="text-[#873653] group-hover:text-[#D6B99A] transition-colors" />
                        <div>
                          <span className="font-heading font-bold text-sm text-[#F0EAE3] block uppercase">
                            {item.name}
                          </span>
                          <span className="font-mono text-[10px] text-[#969099]">
                            {item.handle}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-[#969099] group-hover:text-[#D6B99A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Location & Time telemetry */}
            <div className="p-4 border border-[rgba(214,185,154,0.12)] bg-[#151116] font-mono text-xs text-[#969099] space-y-1.5">
              <div className="flex items-center gap-2 text-[#F0EAE3] font-medium">
                <MapPin size={13} className="text-[#873653]" />
                <span>LOCATION: {personal.location}</span>
              </div>
              <p className="text-[11px] text-[#969099]">
                Available for full-time software engineering and cybersecurity roles globally.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ATTRIBUTION INTEGRITY FOOTER */}
      <footer className="w-full mt-20 pt-6 border-t border-[rgba(214,185,154,0.12)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#969099]">
        <div>
          <span>© {new Date().getFullYear()} NITHIN K R. ALL RIGHTS RESERVED.</span>
        </div>
        <div>
          <span>
            DESIGNED & ENGINEERED BY{' '}
            <a
              href="https://github.com/NITHINKR06"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F0EAE3] hover:text-[#D6B99A] underline decoration-[#873653]/60 underline-offset-4 transition-colors"
            >
              NITHINKR06
            </a>
          </span>
        </div>
      </footer>
    </section>
  );
}
