/**
 * @component About
 * @description About section of the Animated 3D Portfolio
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 *
 * Part of a personal portfolio. Content and design belong to Nithin K R.
 * Code structure may be studied; redistribution as personal portfolio
 * without attribution violates the project license.
 */
// Replace the entire <section id="about"> block in App.tsx with this component.
// Save as src/components/About.tsx and import it in App.tsx.

import { motion } from 'framer-motion';
import { MapPin, BookOpen, Code2, Cpu } from 'lucide-react';
import { useClipReveal, useCounter, useSpringGrid } from '../hooks';

/* ─────────────────────────────────────────────────────────────
   MINI TECH LOGO
───────────────────────────────────────────────────────────── */
const techLogos = [
  { src: '/logos/react-original.svg',      name: 'React'      },
  { src: '/logos/typescript-original.svg', name: 'TypeScript' },
  { src: '/logos/nodejs-original.svg',     name: 'Node.js'    },
  { src: '/logos/python-original.svg',     name: 'Python'     },
  { src: '/logos/docker-original.svg',     name: 'Docker'     },
  { src: '/logos/mongodb-original.svg',    name: 'MongoDB'    },
];

/* ─────────────────────────────────────────────────────────────
   CARD WRAPPER — glass + inner glow on hover
───────────────────────────────────────────────────────────── */
function Card({ children, className = '', glowColor = 'purple' }: {
  children: React.ReactNode; className?: string; glowColor?: 'purple' | 'pink' | 'green' | 'blue';
}) {
  const glows = {
    purple: 'hover:border-purple-500/40 group-hover:from-purple-600/10',
    pink:   'hover:border-pink-500/40   group-hover:from-pink-600/10',
    green:  'hover:border-green-500/40  group-hover:from-green-600/10',
    blue:   'hover:border-blue-500/40   group-hover:from-blue-600/10',
  };
  return (
    <div className={`group relative rounded-2xl bg-white/10 backdrop-blur-md border border-white/[0.06] overflow-hidden transition-all duration-500 ${glows[glowColor]} ${className}`}>
      {/* inner top glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${glows[glowColor].split(' ')[1]} to-transparent pointer-events-none`} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN ABOUT COMPONENT
───────────────────────────────────────────────────────────── */
export function About() {
  const headRef  = useClipReveal(0);
  const gridRef  = useSpringGrid();

  const projRef  = useCounter('15+');
  const expRef   = useCounter('2+');
  const clientRef= useCounter('10+');

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* ── Section label ───────────────────────────────── */}
        <div className="mb-12 text-center">
          <div
            ref={headRef as React.RefObject<HTMLDivElement>}
            className="inline-block"
          >
            <span className="text-xs text-purple-400 font-semibold uppercase tracking-[0.2em]">
              About me
            </span>
          </div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mt-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Who I <span className="text-gradient">Am</span>
          </motion.h2>
        </div>

        {/* ── Bento grid ──────────────────────────────────── */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">

          {/* ── CARD 1 — Big bio (spans 2 cols) ─────────── */}
          <Card className="md:col-span-2 p-7" glowColor="purple">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center flex-shrink-0">
                <Code2 size={18} className="text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-purple-400 font-semibold uppercase tracking-widest mb-1">Builder · Hacker · Creator</p>
                <h3 className="text-white font-semibold text-base">Nithin K R</h3>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm mb-4">
              I build fast, secure, and beautiful web applications — from pixel-perfect frontends to hardened backends. My work sits at the intersection of <span className="text-purple-300 font-medium">full-stack development</span> and <span className="text-pink-300 font-medium">cyber security</span>.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              Currently pursuing an Btech in Cyber Security while shipping real products. I care deeply about clean architecture, meaningful UI, and systems that don't break under pressure.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {['React', 'TypeScript', 'Node.js', 'FastAPI', 'Penetration Testing', 'AI/ML'].map(t => (
                <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20">
                  {t}
                </span>
              ))}
            </div>
          </Card>

          {/* ── CARD 2 — Location + availability ────────── */}
          <Card className="p-7" glowColor="green">
            <div className="flex flex-col h-full justify-between min-h-[180px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center mb-4">
                  <MapPin size={18} className="text-green-400" />
                </div>
                <p className="text-xs text-green-400 font-semibold uppercase tracking-widest mb-1">Location</p>
                <p className="text-white font-semibold text-sm">Karnataka, India 🇮🇳</p>
                <p className="text-gray-500 text-xs mt-1">UTC+5:30 · Remote friendly</p>
              </div>
              <div className="mt-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/8 border border-green-500/20 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-green-300 text-xs font-medium">Available for work</span>
              </div>
            </div>
          </Card>

          {/* ── CARD 3 — Stats (3 mini counters) ────────── */}
          <Card className="p-7" glowColor="pink">
            <p className="text-xs text-pink-400 font-semibold uppercase tracking-widest mb-5">By the numbers</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Projects shipped</span>
                <span ref={projRef} className="text-2xl font-bold text-white tabular-nums">0+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Years experience</span>
                <span ref={expRef} className="text-2xl font-bold text-white tabular-nums">0+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Happy clients</span>
                <span ref={clientRef} className="text-2xl font-bold text-white tabular-nums">0+</span>
              </div>
            </div>
          </Card>

          {/* ── CARD 4 — Currently ──────────────────────── */}
          <Card className="p-7" glowColor="blue">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center mb-4">
              <BookOpen size={18} className="text-blue-400" />
            </div>
            <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest mb-3">Currently</p>
            <div className="space-y-2.5">
              {[
                '📚 Btech in Cyber Security',
                // '🔨 Building CodeSentinel',
                // '🌐 Learning tRPC + Bun',
                '🎯 CTF competitions',
                'Hackathons',
              ].map(item => (
                <p key={item} className="text-gray-300 text-sm">{item}</p>
              ))}
            </div>
          </Card>

          {/* ── CARD 5 — Stack snapshot ─────────────────── */}
          <Card className="p-7" glowColor="purple">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center">
                <Cpu size={18} className="text-purple-400" />
              </div>
              <p className="text-xs text-purple-400 font-semibold uppercase tracking-widest">Daily Stack</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {techLogos.map(({ src, name }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white/20 border border-white/[0.06] hover:border-purple-500/30 hover:bg-white/15 transition-all duration-200 group/logo"
                >
                  <img src={src} alt={name} className="w-7 h-7 object-contain group-hover/logo:scale-110 transition-transform duration-200"
                    onError={e => { (e.target as HTMLImageElement).style.opacity = '0.2'; }} />
                  <span className="text-[9px] text-gray-500 font-medium">{name}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}
