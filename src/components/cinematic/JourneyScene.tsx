/**
 * @component JourneyScene
 * @description Scene 04: JOURNEY - Spatial Timeline of Experience & Education
 * Concept: DIGITAL WORLD × EXPERIMENTAL EDITORIAL
 *
 * Preserves complete real experience, degrees, and certified hackathons:
 * - Melsta Studio & Code Lab Systems
 * - NMAMIT & SDM Institute of Technology
 * - Hackfest, Code Fury, OCI Networking Certification
 *
 * @author Nithin K R (https://github.com/NITHINKR06)
 * @license Attribution required
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { portfolioData } from '../../data';

type TimelineCategory = 'all' | 'experience' | 'education' | 'certifications';

export function JourneyScene() {
  const [filter, setFilter] = useState<TimelineCategory>('all');

  const { experience, education, certifications } = portfolioData;

  // Synthesize a structured chronological timeline
  const timelineItems = [
    {
      type: 'experience' as const,
      category: 'PROFESSIONAL ARCHITECTURE',
      title: 'Melsta Studio',
      role: 'Full Stack Developer Intern',
      period: 'Jun 2026 – Present',
      location: 'Bengaluru, Karnataka (Remote)',
      details: [
        'Developing and maintaining full-stack features for an AI-powered beauty marketplace connecting verified professionals and clients.',
        'Building responsive UI components, REST API integrations, and contributing to platform architecture in a fast-paced environment.',
      ],
      tags: ['React.js', 'Node.js', 'REST API', 'Go'],
      highlight: true,
    },
    {
      type: 'education' as const,
      category: 'ACADEMIC RESEARCH',
      title: 'NMAM Institute of Technology Nitte',
      role: 'Master of Technology - Computer Science (Cyber Security)',
      period: '2024 – 2027',
      location: 'Nitte, Karnataka',
      details: [
        "Pursuing Master's degree in Cyber Security with specialized focus on Ethical Hacking, Network Security Protocols, and Machine Learning Intrusion Systems.",
      ],
      tags: ['Network Security', 'Ethical Hacking', 'Cryptographic Analysis'],
      highlight: false,
    },
    {
      type: 'experience' as const,
      category: 'MICROSERVICES & PERFORMANCE',
      title: 'Code Lab Systems',
      role: 'Full Stack Developer Intern',
      period: '2024',
      location: 'Mangalore, Karnataka',
      details: [
        'Led development of microservices architecture serving 10,000+ active users.',
        'Implemented real-time features using WebSockets and Redis caching, cutting latency.',
        'Reduced overall application load time by 40% through bundle and database query optimization.',
      ],
      tags: ['Node.js', 'React', 'Redis', 'PostgreSQL', 'WebSockets'],
      highlight: false,
    },
    {
      type: 'education' as const,
      category: 'UNDERGRADUATE FOUNDATION',
      title: 'SDM Institute of Technology Ujire',
      role: 'Bachelor of Engineering - Computer Science (Full Stack)',
      period: '2021 – 2024',
      location: 'Ujire, Karnataka',
      details: [
        'Specialized in Full Stack Engineering with extensive foundations in algorithms, distributed systems, and web protocols.',
      ],
      tags: ['Data Structures', 'Full Stack', 'Database Systems'],
      highlight: false,
    },
    {
      type: 'certifications' as const,
      category: 'INDUSTRY CERTIFICATION',
      title: 'Oracle Cloud Infrastructure (OCI)',
      role: '2025 Certified Networking Professional',
      period: 'Nov 2025',
      location: 'Oracle University',
      details: [
        'Validated expertise in deploying Virtual Cloud Networks (VCN), hybrid cloud routing, and securing cloud communication topologies.',
      ],
      tags: ['Cloud Networking', 'OCI VCN', 'Security Architectures'],
      highlight: true,
    },
    {
      type: 'certifications' as const,
      category: 'NATIONAL HACKATHON',
      title: 'Code Fury 8.0 & Hackfest 25',
      role: 'National Hackathon Competitor',
      period: '2025 – 2026',
      location: 'UVCE / NMAMIT',
      details: [
        'Engineered rapid full-stack security prototypes and AI threat evaluation platforms under intense 24-48 hour hackathon conditions.',
      ],
      tags: ['Rapid Prototyping', 'CyberSecurity', 'GenAI'],
      highlight: false,
    },
  ];

  const filteredItems = timelineItems.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <section
      id="experience"
      className="relative min-h-screen w-full bg-[#08090B] text-[#F0EAE3] py-24 px-6 md:px-16 border-t border-[rgba(214,185,154,0.12)]"
    >
      {/* SECTION IDENTIFIER HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#D6B99A] uppercase mb-2">
            <span className="w-2.5 h-2.5 bg-[#873653]" />
            <span>SCENE 04 // SPATIAL TIMELINE</span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-[#F0EAE3]">
            THE CHRONOLOGICAL <span className="text-[#873653]">FLIGHT</span>.
          </h2>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2 border border-[rgba(214,185,154,0.12)] bg-[#151116]/90 p-1.5 font-mono text-xs">
          {[
            { id: 'all', label: 'ALL TRAJECTORY' },
            { id: 'experience', label: 'EXPERIENCE' },
            { id: 'education', label: 'EDUCATION' },
            { id: 'certifications', label: 'AWARDS & CERTS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as TimelineCategory)}
              className={`px-3 py-1.5 transition-colors uppercase ${
                filter === tab.id
                  ? 'bg-[#5A1832] border border-[#873653] text-[#F0EAE3] font-bold shadow-[0_0_12px_rgba(135,54,83,0.35)]'
                  : 'text-[#969099] hover:text-[#F0EAE3] border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spatial Target Anchors */}
      <div id="education" className="sr-only" tabIndex={-1} />
      <div id="certification" className="sr-only" tabIndex={-1} />

      {/* TIMELINE SPATIAL RAIL */}
      <div className="relative max-w-5xl mx-auto">
        {/* Central Vertical Burgundy Laser Guide */}
        <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#873653] via-[#5A1832]/60 to-transparent pointer-events-none" />

        <div className="space-y-12">
          {filteredItems.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`relative flex flex-col md:flex-row gap-8 items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Central Waypoint Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-[#873653] bg-[#08090B] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(135,54,83,0.5)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D6B99A]" />
                </div>

                {/* Content Card (Left or Right on desktop) */}
                <div
                  className={`ml-12 md:ml-0 md:w-[45%] border p-6 sm:p-8 bg-[#151116] transition-all duration-300 group ${
                    item.highlight
                      ? 'border-[#873653]/60 shadow-[0_0_25px_rgba(135,54,83,0.18)]'
                      : 'border-[rgba(214,185,154,0.12)] hover:border-[#873653]/50'
                  }`}
                >
                  {/* Category & Period Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(214,185,154,0.1)] pb-3 mb-4 font-mono text-[11px]">
                    <span className="text-[#D6B99A] font-semibold tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[#969099] flex items-center gap-1.5">
                      <Calendar size={12} className="text-[#873653]" />
                      {item.period}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <h3 className="font-heading font-bold text-2xl text-[#F0EAE3] tracking-tight uppercase group-hover:text-[#873653] transition-colors">
                    {item.title}
                  </h3>
                  <div className="font-mono text-xs text-[#D6B99A] font-medium mt-1 mb-3">
                    {item.role}
                  </div>

                  {/* Location telemetry */}
                  <div className="font-mono text-[11px] text-[#969099] flex items-center gap-1.5 mb-4">
                    <MapPin size={12} className="text-[#873653]" />
                    <span>{item.location}</span>
                  </div>

                  {/* Description Details */}
                  <div className="space-y-2 mb-6 font-mono text-xs text-[#969099] leading-relaxed">
                    {item.details.map((desc, dIdx) => (
                      <p key={dIdx} className="border-l border-[rgba(214,185,154,0.15)] pl-3">
                        {desc}
                      </p>
                    ))}
                  </div>

                  {/* Tech / Competency Badges */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[rgba(214,185,154,0.1)]">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white/[0.03] border border-[rgba(214,185,154,0.1)] font-mono text-[10px] text-[#F0EAE3]/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Counterbalance Spacer for 50/50 Desktop Alignment */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
