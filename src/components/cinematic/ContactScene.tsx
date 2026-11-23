/**
 * @component ContactScene
 * @description Scene 08: CONTACT — Centered Monumental Conclusion
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 * Stylized in Obsidian × Burgundy × Champagne visual direction.
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, MapPin, Copy, Check, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../../data';

interface ContactSceneProps {
  onResumeClick?: () => void;
}

export function ContactScene({ onResumeClick }: ContactSceneProps) {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const contactCards = [
    {
      name: 'GITHUB',
      handle: 'NITHINKR06',
      url: personal.github,
      icon: Github,
      clickable: true,
    },
    {
      name: 'LINKEDIN',
      handle: 'nithinkr06',
      url: personal.linkedin,
      icon: Linkedin,
      clickable: true,
    },
    {
      name: 'INSTAGRAM',
      handle: '@_nithin.kr_',
      url: 'https://instagram.com/_nithin.kr_',
      icon: Instagram,
      clickable: true,
    },
    {
      name: 'LOCATION',
      handle: personal.location || 'Karnataka, India',
      url: null,
      icon: MapPin,
      clickable: false,
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-[#08090B] text-[#F0EAE3] py-24 px-6 md:px-16 flex flex-col justify-between border-t border-[rgba(214,185,154,0.12)] overflow-hidden"
    >
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#873653]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* TOP HEADER STATUS */}
      <div className="relative z-10 flex items-center justify-center font-mono text-xs tracking-widest text-[#D6B99A] uppercase mb-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2 text-[#F0EAE3]/70">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AVAILABLE FOR WORK • READY FOR DEPLOYMENT</span>
        </div>
      </div>

      {/* CENTERED MONUMENTAL HERO */}
      <div className="relative z-10 max-w-5xl mx-auto my-auto text-center flex flex-col items-center justify-center w-full">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase text-[#F0EAE3] leading-[0.94] select-none"
        >
          LET'S CONSTRUCT <br />
          <span className="text-[#873653] underline decoration-[#873653]/40 underline-offset-8">THE NEXT REALM</span>.
        </motion.h2>

        {/* INTERACTIVE EMAIL BOX (CENTERED) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 w-full max-w-xl"
        >
          <div className="flex items-center justify-between font-mono text-[11px] text-[#D6B99A] mb-2 px-1">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Mail size={12} className="text-[#873653]" />
              DIRECT EMAIL TRANSMITTER
            </span>
            <span className="text-[#969099]">PRIMARY CONTACT</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full border border-[rgba(214,185,154,0.18)] bg-[#151116] p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            <div className="flex-1 px-4 py-2 font-mono text-xs sm:text-sm text-[#F0EAE3] truncate select-all text-left">
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
        </motion.div>

        {/* 4 CENTERED CONNECT CARDS (GITHUB, LINKEDIN, INSTAGRAM, LOCATION) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {contactCards.map((card, idx) => {
            const Icon = card.icon;
            const content = (
              <div className="p-5 border border-[rgba(214,185,154,0.12)] bg-[#151116] flex flex-col justify-between h-full group hover:border-[#873653] hover:bg-[#1f1721] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(135,54,83,0.25)] text-left">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-[rgba(214,185,154,0.1)] flex items-center justify-center group-hover:border-[#873653]/60 group-hover:bg-[#873653]/20 transition-colors">
                    <Icon size={17} className="text-[#D6B99A] group-hover:text-[#F0EAE3] transition-colors" />
                  </div>
                  {card.clickable && (
                    <ArrowUpRight
                      size={15}
                      className="text-[#969099] group-hover:text-[#D6B99A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  )}
                </div>

                <div>
                  <span className="font-heading font-bold text-sm sm:text-base text-[#F0EAE3] block uppercase tracking-tight group-hover:text-[#873653] transition-colors">
                    {card.name}
                  </span>
                  <span className="font-mono text-xs text-[#969099] block mt-0.5 truncate">
                    {card.handle}
                  </span>
                </div>
              </div>
            );

            return card.clickable && card.url ? (
              <a
                key={card.name}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {content}
              </a>
            ) : (
              <div key={card.name} className="block">
                {content}
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* ATTRIBUTION INTEGRITY FOOTER */}
      <footer className="relative z-10 w-full mt-20 pt-6 border-t border-[rgba(214,185,154,0.12)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#969099] max-w-6xl mx-auto">
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
