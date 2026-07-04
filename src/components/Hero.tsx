/**
 * @component Hero
 * @description Hero section of the Animated 3D Portfolio
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 *
 * Part of a personal portfolio. Content and design belong to Nithin K R.
 * Code structure may be studied; redistribution as personal portfolio
 * without attribution violates the project license.
 */
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import type { Project } from '../data';

interface HeroProps {
  onResumeClick?: () => void;
  onProjectClick?: (project: Project) => void;
}

type Orbit = {
  radius: number;
  duration: number;
  startAngle: number;
  clockwise: boolean;
  icons: { src: string; label: string; angle: number }[];
};

const iconProjectMap: Record<string, string> = {
  React: 'animated-portfolio',
  TypeScript: 'animated-portfolio',
  'Node.js': 'walrus',
  Python: 'driftguard',
  Docker: 'codesentinel',
  'Three.js': 'animated-portfolio',
  MongoDB: 'walrus',
  Kali: 'packet-defender',
  Postgres: 'kaleido',
};

const orbits: Orbit[] = [
  {
    radius: 215,
    duration: 20,
    startAngle: 0,
    clockwise: true,
    icons: [
      { src: '/logos/react-original.svg', label: 'React', angle: 0 },
      { src: '/logos/typescript-original.svg', label: 'TypeScript', angle: 180 },
    ],
  },
  {
    radius: 265,
    duration: 28,
    startAngle: 60,
    clockwise: false,
    icons: [
      { src: '/logos/nodejs-original.svg', label: 'Node.js', angle: 0 },
      { src: '/logos/python-original.svg', label: 'Python', angle: 120 },
      { src: '/logos/docker-original.svg', label: 'Docker', angle: 240 },
    ],
  },
  {
    radius: 315,
    duration: 40,
    startAngle: 30,
    clockwise: true,
    icons: [
      { src: '/logos/threejs-original.svg', label: 'Three.js', angle: 0 },
      { src: '/logos/mongodb-original.svg', label: 'MongoDB', angle: 90 },
      { src: 'https://cdn.simpleicons.org/kalilinux', label: 'Kali', angle: 180 },
      { src: '/logos/postgresql-original.svg', label: 'Postgres', angle: 270 },
    ],
  },
];

interface OrbitRingsProps {
  onProjectClick?: (project: Project) => void;
}

function OrbitRings({ onProjectClick }: OrbitRingsProps) {
  const reduce = useReducedMotion();
  const projects = portfolioData.projects;

  const handleIconClick = (label: string) => {
    const projectId = iconProjectMap[label];
    if (!projectId || !onProjectClick) return;
    const project = projects.find((p) => p.id === projectId);
    if (project) onProjectClick(project);
  };

  return (
    <div className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
      {orbits.map((orbit, oi) => (
        <div
          key={oi}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            width: orbit.radius * 2,
            height: orbit.radius * 2,
            marginTop: -orbit.radius,
            marginLeft: -orbit.radius,
            borderRadius: '50%',
            border: '1px solid var(--theme-border)',
          }}
        >
          <motion.div
            style={{ width: '100%', height: '100%', position: 'relative' }}
            animate={reduce ? {} : { rotate: orbit.clockwise ? 360 : -360 }}
            transition={{ duration: orbit.duration, repeat: Infinity, ease: 'linear' }}
          >
            {orbit.icons.map((icon, ii) => {
              const rad = ((icon.angle + orbit.startAngle) * Math.PI) / 180;
              const x = orbit.radius + orbit.radius * Math.cos(rad) - 22;
              const y = orbit.radius + orbit.radius * Math.sin(rad) - 22;
              const projectId = iconProjectMap[icon.label];
              const isClickable = !!projectId && !!onProjectClick;

              return (
                <motion.div
                  key={ii}
                  className={`group absolute w-11 h-11 rounded-full theme-panel border backdrop-blur-md flex items-center justify-center ${
                    isClickable ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  style={{
                    left: x,
                    top: y,
                    borderColor: 'var(--theme-border)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.28)',
                  }}
                  animate={reduce ? {} : { rotate: orbit.clockwise ? -360 : 360 }}
                  transition={{ duration: orbit.duration, repeat: Infinity, ease: 'linear' }}
                  whileHover={isClickable ? { scale: 1.3 } : { scale: 1.1 }}
                  whileTap={isClickable ? { scale: 0.95 } : {}}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIconClick(icon.label);
                  }}
                  title={isClickable ? `View ${icon.label} project` : icon.label}
                >
                  <img
                    src={icon.src}
                    alt={icon.label}
                    className="w-5 h-5 object-contain pointer-events-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.opacity = '0';
                    }}
                  />

                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-30">
                    <div className="flex flex-col items-center gap-0.5">
                      <span
                        className="text-[9px] font-medium bg-[rgba(6,5,5,0.92)] px-1.5 py-0.5 rounded border border-white/10"
                        style={{ color: 'var(--theme-text-cream)' }}
                      >
                        {icon.label}
                      </span>
                      {isClickable && (
                        <span className="text-[8px]" style={{ color: 'rgba(246,239,230,0.68)' }}>
                          click to view
                        </span>
                      )}
                    </div>
                  </div>

                  {isClickable && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: '1px solid rgba(246,239,230,0.2)' }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export const Hero = ({ onResumeClick, onProjectClick }: HeroProps) => {
  const { personal } = portfolioData;
  const reduce = useReducedMotion();

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden theme-section-light">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[rgba(255,255,255,0.7)] blur-3xl" />
        <div className="absolute top-10 right-[-6rem] w-[28rem] h-[28rem] rounded-full bg-[rgba(0,0,0,0.06)] blur-3xl" />
        <div className="absolute bottom-[-7rem] left-1/2 w-[34rem] h-[34rem] -translate-x-1/2 rounded-full bg-[rgba(255,255,255,0.35)] blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left flex flex-col items-center md:items-start space-y-5 order-2 md:order-1"
        >
          <motion.h1
            className="text-3xl md:text-6xl lg:text-7xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-slate-900">I&apos;m </span>
            <motion.span
              className="text-gradient"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {personal.name}
            </motion.span>
          </motion.h1>

          <motion.h2
            className="text-xl md:text-4xl"
            style={{ color: '#2b2b2b' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {personal.title}
          </motion.h2>

          <motion.p
            className="text-base md:text-lg leading-relaxed max-w-md md:max-w-none"
            style={{ color: '#5e5e5e' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {personal.bio}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mt-6 w-full sm:w-auto justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.a
              href={`mailto:${personal.email}`}
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-white/80 border border-black/10 text-slate-900 shadow-md shadow-black/5 backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} className="inline-block mr-2 text-red-600" />
              <span className="text-slate-900">Get In Touch</span>
            </motion.a>

            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-white/80 border border-black/10 text-slate-900 shadow-md shadow-black/5 backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} className="inline-block mr-2 text-red-600" />
              <span className="text-slate-900">View Work</span>
            </motion.a>

            <motion.button
              type="button"
              onClick={() =>
                onResumeClick
                  ? onResumeClick()
                  : window.open('/NithinKR.pdf', '_blank', 'noopener,noreferrer')
              }
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-white/80 border border-black/10 text-slate-900 shadow-md shadow-black/5 backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText size={20} className="inline-block mr-2 text-red-600" />
              <span className="text-slate-900">View Resume</span>
            </motion.button>
          </motion.div>

          <motion.div
            className="flex justify-center md:justify-start gap-6 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/80 border border-black/10 text-slate-900 shadow-md shadow-black/5 backdrop-blur-md"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={22} className="text-red-600" />
            </motion.a>
            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/80 border border-black/10 text-slate-900 shadow-md shadow-black/5 backdrop-blur-md"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={22} className="text-red-600" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center md:justify-end order-1 md:order-2"
        >
          <div
            className="md:hidden w-44 h-44 relative rounded-full overflow-hidden"
            style={{
              border: '2px solid rgba(0,0,0,0.18)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.18)',
            }}
          >
            <img
              src="/NITHINKR06.webp"
              alt="Nithin K R"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <motion.div
            className="hidden md:block relative md:scale-[0.6] lg:scale-100 origin-right lg:origin-center"
            animate={reduce ? {} : { y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 660, height: 660 }}
          >
            <OrbitRings onProjectClick={onProjectClick} />

            <div
              className="absolute"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative w-80 h-80">
                <motion.div
                  className="absolute -inset-[5px] rounded-full"
                  style={{
                    background:
                      'conic-gradient(from 0deg, rgba(246,239,230,0.25), #ff0000, #ff3b3b, rgba(246,239,230,0.25))',
                    padding: 2,
                  }}
                  animate={reduce ? {} : { rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-full h-full rounded-full bg-[var(--theme-bg-gradient-start)]" />
                </motion.div>

                <div
                  className="relative z-10 w-full h-full rounded-full overflow-hidden"
                  style={{
                    border: '2px solid rgba(0,0,0,0.18)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
                  }}
                >
                  <img
                    src="/NITHINKR06.webp"
                    alt="Nithin K R"
                    className="w-full h-full object-cover"
                    decoding="async"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-3 rounded-full bg-white/80 border border-black/10 shadow-md shadow-black/5 backdrop-blur-md"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
        aria-label="Scroll to next section"
      >
        <ChevronDown size={22} className="text-slate-900" />
      </motion.button>
    </section>
  );
};
