import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, FileText } from 'lucide-react';
import { portfolioData, Project } from '../data/portfolio';

interface HeroProps {
  onResumeClick?:  () => void;
  onProjectClick?: (project: Project) => void;
}

/* ─────────────────────────────────────────────────────────────
   ICON → PROJECT MAPPING
   Each orbit icon maps to the most relevant project ID.
   null = decorative only (no click behaviour)
    startAngle: 0,
    clockwise: true,
    icons: [
      { src: '/logos/react-original.svg',      label: 'React',      angle: 0   },
      { src: '/logos/typescript-original.svg', label: 'TypeScript', angle: 180 },
    ],
  },
  {
    radius: 265,
    duration: 28,
    startAngle: 60,
    clockwise: false,
    icons: [
      { src: '/logos/nodejs-original.svg', label: 'Node.js', angle: 0   },
      { src: '/logos/python-original.svg', label: 'Python',  angle: 120 },
      { src: '/logos/docker-original.svg', label: 'Docker',  angle: 240 },
    ],
  },
  {
    radius: 315,
    duration: 40,
    startAngle: 30,
    clockwise: true,
    icons: [
      { src: 'https://cdn.simpleicons.org/threejs',   label: 'Three.js', angle: 0   },
      { src: '/logos/mongodb-original.svg',            label: 'MongoDB',  angle: 90  },
      { src: 'https://cdn.simpleicons.org/kalilinux', label: 'Kali',     angle: 180 },
      { src: '/logos/postgresql-original.svg',         label: 'Postgres', angle: 270 },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   ORBIT RINGS COMPONENT
───────────────────────────────────────────────────────────── */
interface OrbitRingsProps {
  onProjectClick?: (project: Project) => void;
}

function OrbitRings({ onProjectClick }: OrbitRingsProps) {
  const reduce   = useReducedMotion();
  const projects = portfolioData.projects;

  const handleIconClick = (label: string) => {
    const projectId = iconProjectMap[label];
    if (!projectId || !onProjectClick) return;
    const project = projects.find(p => p.id === projectId);
    if (project) onProjectClick(project);
  };

  return (
    <div
      className="absolute inset-0"
      style={{ width: '100%', height: '100%' }}
    >
      {orbits.map((orbit, oi) => (
        <div
          key={oi}
          className="absolute"
          style={{
            top: '50%', left: '50%',
            width:  orbit.radius * 2,
            height: orbit.radius * 2,
            marginTop:  -orbit.radius,
            marginLeft: -orbit.radius,
            borderRadius: '50%',
            border: '1px solid rgba(139, 92, 246, 0.12)',
          }}
        >
          {/* Rotating ring wrapper */}
          <motion.div
            style={{ width: '100%', height: '100%', position: 'relative' }}
            animate={reduce ? {} : { rotate: orbit.clockwise ? 360 : -360 }}
            transition={{ duration: orbit.duration, repeat: Infinity, ease: 'linear' }}
          >
            {orbit.icons.map((icon, ii) => {
              const rad        = ((icon.angle + orbit.startAngle) * Math.PI) / 180;
              const x          = orbit.radius + orbit.radius * Math.cos(rad) - 22;
              const y          = orbit.radius + orbit.radius * Math.sin(rad) - 22;
              const projectId  = iconProjectMap[icon.label];
              const isClickable = !!projectId && !!onProjectClick;

              return (
                <motion.div
                  key={ii}
                  className={`absolute w-11 h-11 rounded-full bg-black/60 border border-purple-500/30
                              backdrop-blur-md flex items-center justify-center shadow-lg shadow-purple-900/30
                              ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                  style={{ left: x, top: y }}
                  // counter-rotate so icon stays upright
                  animate={reduce ? {} : { rotate: orbit.clockwise ? -360 : 360 }}
                  transition={{ duration: orbit.duration, repeat: Infinity, ease: 'linear' }}
                  whileHover={isClickable
                    ? { scale: 1.4, borderColor: 'rgba(139,92,246,0.9)', backgroundColor: 'rgba(139,92,246,0.2)' }
                    : { scale: 1.2, borderColor: 'rgba(139,92,246,0.5)' }
                  }
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
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                  />

                  {/* Tooltip */}
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none
                                  opacity-0 group-hover:opacity-100 transition-opacity z-30">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[9px] text-purple-300 font-medium bg-black/80 px-1.5 py-0.5 rounded">
                        {icon.label}
                      </span>
                      {isClickable && (
                        <span className="text-[8px] text-purple-400/70">click to view</span>
                      )}
                    </div>
                  </div>

                  {/* Pulsing ring on clickable icons */}
                  {isClickable && (
                    <motion.div
                      className="absolute inset-0 rounded-full border border-purple-400/40"
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

/* ─────────────────────────────────────────────────────────────
   AVAILABILITY BADGE
───────────────────────────────────────────────────────────── */
// function AvailabilityBadge() {
//   return (
//     <motion.div
//       className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-green-500/30 backdrop-blur-sm"
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: 1.2 }}
//     >
//       <motion.span
//         className="w-1.5 h-1.5 rounded-full bg-green-400"
//         animate={{ opacity: [1, 0.3, 1] }}
//         transition={{ duration: 1.8, repeat: Infinity }}
//       />
//       {/* <span className="text-[10px] text-green-300 font-medium">Available for work</span> */}
//     </motion.div>
//   );
// }

/* ─────────────────────────────────────────────────────────────
   STAT CHIPS
───────────────────────────────────────────────────────────── */
function StatChips() {
  const chips = [
    { label: '30+ Projects', color: 'border-purple-500/40 text-purple-300' },
    { label: '2+ Years',     color: 'border-pink-500/40   text-pink-300'   },
  ];
  return (
    <>
      {chips.map((chip, i) => (
        <motion.div
          key={i}
          className={`absolute z-20 px-2.5 py-1 rounded-full bg-black/60 border backdrop-blur-sm text-[10px] font-semibold ${chip.color}`}
          style={{ bottom: i === 0 ? '12%' : '6%', right: i === 0 ? '-18%' : '-12%' }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.4 + i * 0.15 }}
        >
          {chip.label}
        </motion.div>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────────────────────────── */
export const Hero = ({ onResumeClick, onProjectClick }: HeroProps) => {
  const { personal } = portfolioData;
  const reduce = useReducedMotion();

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* ── LEFT CONTENT ──────────────────────────────────── */}
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
            <span className="text-white">I'm </span>
            <motion.span
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {personal.name}
            </motion.span>
          </motion.h1>

          <motion.h2
            className="text-xl md:text-4xl text-purple-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {personal.title}
          </motion.h2>

          <motion.p
            className="text-base md:text-lg text-gray-300 leading-relaxed max-w-md md:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {personal.bio}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mt-6 w-full sm:w-auto justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.a
              href={`mailto:${personal.email}`}
              className="glass-card w-full sm:w-auto text-center px-6 py-3 rounded-full"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} className="inline-block mr-2 text-purple-400" />
              <span className="text-white">Get In Touch</span>
            </motion.a>

            <motion.a
              href={personal.github}
              target="_blank" rel="noopener noreferrer"
              className="glass-card w-full sm:w-auto text-center px-6 py-3 rounded-full"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              <Github size={20} className="inline-block mr-2 text-pink-400" />
              <span className="text-white">View Work</span>
            </motion.a>

            <motion.button
              type="button"
              onClick={() => onResumeClick ? onResumeClick() : window.open('/Nithin K R.pdf', '_blank', 'noopener,noreferrer')}
              className="glass-card w-full sm:w-auto text-center px-6 py-3 rounded-full"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              <FileText size={20} className="inline-block mr-2 text-blue-400" />
              <span className="text-white">View Resume</span>
            </motion.button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="flex justify-center md:justify-start gap-6 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.a href={personal.github} target="_blank" rel="noopener noreferrer"
              className="p-3 glass-card rounded-full"
              whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
            >
              <Github size={22} className="text-white" />
            </motion.a>
            <motion.a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
              className="p-3 glass-card rounded-full"
              whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={22} className="text-white" />
            </motion.a>
          </motion.div>

          {/* TryHackMe badge */}
          {/* <motion.div
            className="mt-6 w-full max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <iframe
              src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=5141576"
              style={{ border: 'none' }}
              className="w-full h-[180px] rounded-xl overflow-hidden"
              title="TryHackMe Badge"
              loading="lazy"
            />
          </motion.div> */}
        </motion.div>

        {/* ── RIGHT CONTENT — photo + orbital rings ─────────── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center md:justify-end order-1 md:order-2"
        >
          {/* Mobile — simple photo */}
          <div className="md:hidden w-44 h-44 relative rounded-full overflow-hidden border-2 border-purple-500/40 shadow-2xl shadow-purple-900/40">
            <img src="/NITHINKR06.webp" alt="Nithin K R" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </div>

          {/* Desktop — photo + clickable orbit system */}
          <motion.div
            className="hidden md:block relative"
            animate={reduce ? {} : { y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 660, height: 660 }}
          >
            {/* Pass onProjectClick into OrbitRings */}
            <OrbitRings onProjectClick={onProjectClick} />

            {/* Photo */}
            <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <div className="relative w-80 h-80">

                <motion.div
                  className="absolute -inset-[5px] rounded-full"
                  style={{ background: 'conic-gradient(from 0deg, #8b5cf6, #ec4899, #8b5cf6)', padding: 2 }}
                  animate={reduce ? {} : { rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-full h-full rounded-full bg-[#0a0118]" />
                </motion.div>

                <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-2 border-purple-500/50 shadow-2xl shadow-purple-900/60">
                  <img src="/NITHINKR06.webp" alt="Nithin K R" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-900/20 to-transparent" />
                </div>

                {/* <AvailabilityBadge /> */}
                {/* <StatChips /> */}
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-card p-3 rounded-full"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
      >
        <ChevronDown size={22} className="text-purple-400" />
      </motion.button>
    </section>
  );
};
