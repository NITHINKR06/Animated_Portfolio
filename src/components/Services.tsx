import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Palette, Smartphone, Globe, Zap, Shield,
  ArrowRight, Check, Star, ArrowUp, ChevronDown,
  ChevronUp, Sparkles, Award, Users, Clock,
  TrendingUp, Home, IndianRupee, Info,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SectionReveal } from './SectionReveal';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const services = [
  {
    icon: Globe,
    title: 'Frontend Development',
    description: 'Pixel-perfect, responsive UIs built with React / Next.js, Tailwind CSS, Framer Motion, and Three.js.',
    features: ['React / Next.js SPAs & SSR', 'Responsive & mobile-first design', 'Animation & 3D interactive scenes', 'Performance & Core Web Vitals'],
    minPrice: 3000, maxPrice: 15000, unit: 'per project', popular: true, delay: 0.1,
  },
  {
    icon: Code,
    title: 'Full Stack Development',
    description: 'End-to-end web applications — REST / GraphQL APIs to cloud deployment — built on battle-tested stacks.',
    features: ['Node.js / Express / FastAPI', 'PostgreSQL · MongoDB · Redis', 'Auth, RBAC & security hardening', 'Dockerised cloud deployment'],
    minPrice: 8000, maxPrice: 50000, unit: 'per project', popular: false, delay: 0.2,
  },
  {
    icon: Shield,
    title: 'Cyber Security Audit',
    description: 'Identify, prove, and patch vulnerabilities in your web app before attackers do.',
    features: ['OWASP Top-10 assessment', 'Penetration testing & PoC exploits', 'LLM-powered patch generation', 'Detailed remediation report'],
    minPrice: 5000, maxPrice: 30000, unit: 'per audit', popular: false, delay: 0.3,
  },
  {
    icon: Palette,
    title: 'UI / UX Design',
    description: 'From rough concept to polished Figma prototype — wireframes, design systems, and handoff-ready specs.',
    features: ['User research & persona mapping', 'Wireframes & interactive prototypes', 'Design systems & component libs', 'Dev-handoff with specs'],
    minPrice: 2000, maxPrice: 12000, unit: 'per project', popular: false, delay: 0.4,
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Cross-platform iOS & Android apps built with React Native — shared codebase, native feel.',
    features: ['React Native (Expo / bare)', 'iOS & Android in one codebase', 'Push notifications & deep links', 'App Store / Play Store deployment'],
    minPrice: 10000, maxPrice: 60000, unit: 'per project', popular: false, delay: 0.5,
  },
  {
    icon: Zap,
    title: 'Performance & SEO',
    description: 'Audit and optimise existing apps — bundle splitting, image compression, Lighthouse scores, and Core Web Vitals.',
    features: ['Bundle analysis & code splitting', 'Image & asset optimisation', 'Lighthouse 90+ guaranteed', 'Technical SEO & meta / OG tags'],
    minPrice: 2000, maxPrice: 10000, unit: 'one-time', popular: false, delay: 0.6,
  },
];

const workProcess = [
  { step: '01', title: 'Discovery',  description: 'A free 30-min call to understand your goals, tech stack, and timeline — zero obligation.' },
  { step: '02', title: 'Proposal',   description: 'A clear written scope with fixed milestones, deliverables, and a quoted price range.' },
  { step: '03', title: 'Build',      description: 'Weekly demos, transparent Git history, and async updates via your preferred channel.' },
  { step: '04', title: 'Delivery',   description: 'Code handoff with docs, deployment walkthrough, and 2 weeks of free post-launch support.' },
];

const testimonials = [
  { name: 'Sarah Johnson',   role: 'CEO, Tech Startup',   company: 'InnovateTech',      content: 'Outstanding attention to detail and technical depth. Delivered on time, within budget, and exceeded our expectations.',  rating: 5, avatar: '👩‍💼' },
  { name: 'Michael Chen',    role: 'Product Manager',      company: 'Digital Solutions', content: 'Professional, responsive, and exactly what we needed. Communication throughout the project was excellent.',              rating: 5, avatar: '👨‍💻' },
  { name: 'Emily Rodriguez', role: 'Founder, E-commerce',  company: 'ShopFlow',          content: 'Transformed our vision into a beautiful, fast web app. Highly recommend for any serious web project!',                  rating: 5, avatar: '👩‍🚀' },
];

const stats = [
  { icon: Award,      value: '15+',  label: 'Projects Completed' },
  { icon: Users,      value: '10+',  label: 'Happy Clients'       },
  { icon: Clock,      value: '2+',   label: 'Years Experience'    },
  { icon: TrendingUp, value: '100%', label: 'Satisfaction Rate'   },
];

const faqs = [
  { question: 'How are prices determined?',               answer: 'The ranges shown reflect real project complexity. Simple landing pages sit at the low end; multi-role platforms with auth, payments, and dashboards sit at the high end. After a free discovery call I send a fixed quote — no hourly surprises.' },
  { question: 'What is your payment structure?',          answer: '50% upfront to begin, 50% on delivery. For larger projects (₹20k+) we can agree on milestone-based payments tied to demo sign-offs.' },
  { question: 'How long does a typical project take?',    answer: 'A static site or landing page: 1–2 weeks. A full-stack app: 4–10 weeks depending on scope. I share a detailed timeline in the proposal before any money changes hands.' },
  { question: 'Do you sign NDAs?',                        answer: 'Absolutely — I sign NDAs before any confidential discussions. Protecting your IP is non-negotiable.' },
  { question: 'Do you offer maintenance after delivery?', answer: 'Yes. All projects include 2 weeks of free post-launch support. Ongoing retainer plans (bug fixes, feature additions, security patches) start at ₹2,000/month.' },
  { question: 'Can you work with an existing codebase?',  answer: 'Yes — I regularly jump into existing React / Node repos. I will do a codebase review first and factor any tech-debt cleanup into the proposal.' },
];

/* ─────────────────────────────────────────────────────────────
   TECH STACK  (18 items · 2 marquee rows)
   Add to tailwind.config.js → theme.extend.animation:
     'marquee-left':  'marquee-left 30s linear infinite',
     'marquee-right': 'marquee-right 24s linear infinite',
   And keyframes:
     'marquee-left':  { '0%': { transform: 'translateX(0)' },      '100%': { transform: 'translateX(-50%)' } },
     'marquee-right': { '0%': { transform: 'translateX(-50%)' },   '100%': { transform: 'translateX(0)' } },
───────────────────────────────────────────────────────────── */
const CDN_D = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const CDN_S = 'https://cdn.simpleicons.org';

type TechCat = 'Frontend' | 'Backend' | 'DevOps' | 'CyberSecurity';
type TechItem = { name: string; logo: string; cat: TechCat };

const techStack: TechItem[] = [
  // Frontend (5)
  { name: 'React',          logo: '/logos/react-original.svg',                             cat: 'Frontend'      },
  { name: 'TypeScript',     logo: '/logos/typescript-original.svg',                        cat: 'Frontend'      },
  { name: 'Next.js',        logo: '/logos/nextjs-original.svg',                            cat: 'Frontend'      },
  { name: 'Tailwind CSS',   logo: '/logos/tailwindcss-original.svg',                       cat: 'Frontend'      },
  { name: 'Three.js',       logo: '/logos/threejs-original.svg',                           cat: 'Frontend'      },
  // Backend (6)
  { name: 'Node.js',        logo: '/logos/nodejs-original.svg',                            cat: 'Backend'       },
  { name: 'Python',         logo: '/logos/python-original.svg',                            cat: 'Backend'       },
  { name: 'MongoDB',        logo: '/logos/mongodb-original.svg',                           cat: 'Backend'       },
  { name: 'PostgreSQL',     logo: '/logos/postgresql-original.svg',                        cat: 'Backend'       },
  { name: 'Firebase',       logo: '/logos/firebase-original.svg',                          cat: 'Backend'       },
  { name: 'FastAPI',        logo: `${CDN_D}/fastapi/fastapi-original.svg`,                 cat: 'Backend'       },
  // DevOps (4)
  { name: 'Docker',         logo: '/logos/docker-original.svg',                            cat: 'DevOps'        },
  { name: 'Git',            logo: '/logos/git-original.svg',                               cat: 'DevOps'        },
  { name: 'Vercel',         logo: '/logos/vercel-original.svg',                            cat: 'DevOps'        },
  { name: 'GitHub Actions', logo: '/logos/githubactions-original.svg',                     cat: 'DevOps'        },
  // CyberSecurity (3)
  { name: 'Kali Linux',     logo: `${CDN_S}/kalilinux`,                                    cat: 'CyberSecurity' },
  { name: 'TensorFlow',     logo: `${CDN_D}/tensorflow/tensorflow-original.svg`,           cat: 'CyberSecurity' },
  { name: 'TryHackMe',      logo: `${CDN_S}/tryhackme`,                                    cat: 'CyberSecurity' },
];

const catDot: Record<TechCat, string> = {
  Frontend:      'bg-purple-400',
  Backend:       'bg-green-400',
  DevOps:        'bg-blue-400',
  CyberSecurity: 'bg-pink-400',
};
const catLabel: Record<TechCat, string> = {
  Frontend:      'text-purple-400',
  Backend:       'text-green-400',
  DevOps:        'text-blue-400',
  CyberSecurity: 'text-pink-400',
};

function TechCard({ tech }: { tech: TechItem }) {
  return (
    <div
      className="flex flex-col items-center gap-2 px-5 py-4 rounded-xl
                 bg-white/5 border border-white/[0.08]
                 hover:bg-white/10 hover:border-purple-500/30
                 transition-all duration-200 flex-shrink-0 w-24 cursor-default group"
    >
      <img
        src={tech.logo}
        alt={tech.name}
        width={36}
        height={36}
        className="object-contain group-hover:scale-110 transition-transform duration-200"
        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
      />
      <span className="text-[11px] text-gray-400 text-center leading-tight font-medium">
        {tech.name}
      </span>
      <span className={`text-[9px] font-semibold uppercase tracking-wide ${catLabel[tech.cat]}`}>
        {tech.cat}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */
function formatINR(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

function PriceBadge({ min, max, unit }: { min: number; max: number; unit: string }) {
  return (
    <div className="mt-4 p-3 rounded-xl bg-black/30 border border-purple-500/20
                    flex items-center justify-between gap-3 flex-wrap">
      <div>
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className="text-xs text-gray-500">from</span>
          <span className="text-purple-300 font-bold text-base">{formatINR(min)}</span>
          <span className="text-gray-500 text-xs">–</span>
          <span className="text-pink-300 font-bold text-base">{formatINR(max)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{unit} · scope-dependent</p>
      </div>
      <Link to="/#contact">
        <motion.button
          className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg
                     text-white text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get quote
        </motion.button>
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function Services() {
  const [showBackToTop, setShowBackToTop]   = useState(false);
  const [expandedFaq, setExpandedFaq]       = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // double each row for seamless infinite loop
  const row1 = [...techStack.slice(0, 9), ...techStack.slice(0, 9)];
  const row2 = [...techStack.slice(9),    ...techStack.slice(9)];

  return (
    <div className="min-h-screen bg-[#0a0118] relative">

      {/* ── SCROLL PROGRESS ─────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left
                   bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600"
        style={{ scaleX: scrollProgress / 100 }}
      />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/[0.08] rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

            <Link to="/">
              <motion.button
                className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10
                           rounded-full text-white hover:bg-white/10 transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.05, x: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home size={18} />
                <span className="text-sm font-medium">Back to Portfolio</span>
              </motion.button>
            </Link>

            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <span className="text-5xl">✨</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Freelance{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                Services
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              From concept to deployment — web apps, mobile, security audits, and more.
              Transparent pricing, no hidden fees.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    className="p-5 rounded-xl bg-white/5 border border-white/10
                               hover:bg-white/10 transition-all backdrop-blur-sm"
                    whileHover={{ y: -4, scale: 1.04 }}
                  >
                    <Icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full
                         bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <IndianRupee size={14} />
              <span>All prices in INR · Starting from ₹2,000 · Free discovery call</span>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <Link to="/#contact">
                <motion.button
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600
                             text-white font-semibold hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get a Free Quote
                  <ArrowRight className="inline-block ml-2" size={18} />
                </motion.button>
              </Link>
              <motion.a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-4 rounded-full text-white font-semibold border border-white/20 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Services
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES GRID ───────────────────────────────────── */}
      <section id="services" className="py-24 px-4 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <motion.div
                className="inline-block mb-3"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-10 h-10 text-purple-400" />
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                What I{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Offer
                </span>
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Real price ranges based on actual project complexity — not vague "contact for pricing"
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: service.delay }}
                  whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                  className="p-6 rounded-2xl group cursor-pointer relative overflow-hidden
                             bg-white/5 border border-white/10
                             hover:border-purple-500/30 hover:bg-white/[0.08]
                             transition-all duration-300 backdrop-blur-sm"
                >
                  {service.popular && (
                    <motion.div
                      className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600
                                 text-white text-xs font-bold px-3 py-1 rounded-full"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      POPULAR
                    </motion.div>
                  )}

                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-600/20
                                  border border-purple-500/30 flex items-center justify-center mb-4
                                  group-hover:scale-110 transition-all duration-300">
                    <Icon size={26} className="text-purple-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-500 mb-4 text-sm leading-relaxed">{service.description}</p>

                  <ul className="space-y-2 mb-2">
                    {service.features.map((f, idx) => (
                      <li key={idx} className="flex items-center text-gray-400">
                        <Check size={14} className="text-purple-400 mr-2 flex-shrink-0" />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <PriceBadge min={service.minPrice} max={service.maxPrice} unit={service.unit} />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-10 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]
                       flex items-start gap-3 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Info size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong className="text-gray-400">Pricing transparency:</strong>{' '}
              Ranges reflect real-world complexity. Simple projects sit at the lower end;
              multi-role platforms with auth, payments, dashboards, and cloud infra sit at the upper end.
              Every engagement starts with a free discovery call and a fixed written quote — no hourly billing surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TECH STACK — MARQUEE ────────────────────────────── */}
      <section className="py-24 bg-white/[0.02] relative">

        <SectionReveal>
          <div className="text-center mb-12 px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Tech{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Stack
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Tools I actually ship with — across frontend, backend, DevOps, and security
            </p>
            <div className="flex flex-wrap justify-center gap-5 mt-5">
              {(Object.entries(catDot) as [TechCat, string][]).map(([cat, dot]) => (
                <span key={cat} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* wrapper — NO overflow-hidden here, just position:relative for the fades */}
        <div className="relative">

          {/* left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0a0118, transparent)' }}
          />
          {/* right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0a0118, transparent)' }}
          />

          {/* Row 1 — scrolls left */}
          <div style={{ overflow: 'hidden', marginBottom: '12px' }}>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                width: 'max-content',
                animation: 'marquee-scroll 30s linear infinite',
              }}
              onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
            >
              {row1.map((t, i) => <TechCard key={`r1-${i}`} tech={t} />)}
            </div>
          </div>

          {/* Row 2 — scrolls right (reversed) */}
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                width: 'max-content',
                animation: 'marquee-scroll 24s linear infinite reverse',
              }}
              onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
            >
              {row2.map((t, i) => <TechCard key={`r2-${i}`} tech={t} />)}
            </div>
          </div>

        </div>
      </section>

      {/* ── HOW I WORK ──────────────────────────────────────── */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                How I{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Work
                </span>
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">A clear, repeatable process — no surprises, no scope creep</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workProcess.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10
                           hover:border-purple-500/20 hover:bg-white/[0.08]
                           transition-all duration-300 backdrop-blur-sm"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400
                                bg-clip-text text-transparent mb-4">{p.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────── */}
      {/* <section className="py-24 px-4 bg-white/[0.02] relative">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Client{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Testimonials
                </span>
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">What clients say about working with me</p>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10
                           hover:border-purple-500/20 hover:bg-white/[0.08] transition-all duration-300"
              >
                <div className="text-4xl mb-3">{t.avatar}</div>
                <div className="flex mb-3 gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-400 mb-4 italic text-sm leading-relaxed">"{t.content}"</p>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
                <p className="text-purple-400 text-xs mt-0.5">{t.company}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Frequently Asked{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-lg text-gray-500">Everything you need to know before hiring me</p>
            </div>
          </SectionReveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl overflow-hidden bg-white/5 border border-white/10
                           hover:border-purple-500/25 transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between
                             hover:bg-white/5 transition-all duration-200"
                >
                  <span className="text-sm font-semibold text-white pr-8">{faq.question}</span>
                  {expandedFaq === i
                    ? <ChevronUp   className="text-purple-400 flex-shrink-0" size={18} />
                    : <ChevronDown className="text-purple-400 flex-shrink-0" size={18} />}
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 rounded-2xl text-center relative overflow-hidden
                       bg-white/5 border border-purple-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/[0.08] pointer-events-none" />
            <div className="relative z-10">
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to Start Your{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Project?
                </span>
              </motion.h2>
              <motion.p
                className="text-base md:text-lg text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Let's discuss your ideas and build something great together.
                Free 30-minute discovery call — no commitment needed.
              </motion.p>
              <motion.div
                className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full
                           bg-purple-500/10 border border-purple-500/25 text-purple-300 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <IndianRupee size={13} />
                <span>Projects from ₹2,000 · Mobile from ₹10,000 · Audits from ₹5,000</span>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/#contact">
                  <motion.button
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600
                               text-white font-semibold hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get a Free Quote
                    <ArrowRight className="inline-block ml-2" size={18} />
                  </motion.button>
                </Link>
                <Link to="/">
                  <motion.button
                    className="px-8 py-4 rounded-full text-white font-semibold border border-white/20 hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Portfolio
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BACK TO TOP ─────────────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-purple-600 to-pink-600
                       text-white rounded-full shadow-2xl hover:opacity-90 transition-all z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}