/**
 * @component Services
 * @description Services section of the Animated 3D Portfolio
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 *
 * Part of a personal portfolio. Content and design belong to Nithin K R.
 * Code structure may be studied; redistribution as personal portfolio
 * without attribution violates the project license.
 */
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowRight, ArrowUp, Award, ChevronDown, ChevronUp,
  Clock, Code, Globe, Home, IndianRupee, Info, Palette,
  Shield, Smartphone, Star, TrendingUp, Users, Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useBlurReveal,
  useClipReveal,
  useCounter,
  useDrawLine,
  useFadeSlide,
  useLetterReveal,
  useMagnetic,
  useParallax,
  useSpringGrid,
} from '../hooks';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const services = [
  { icon: Globe,      title: 'Frontend Development',  description: 'Pixel-perfect, responsive UIs built with React / Next.js, Tailwind CSS, Framer Motion, and Three.js.',               features: ['React / Next.js SPAs & SSR', 'Responsive & mobile-first design', 'Animation & 3D interactive scenes', 'Performance & Core Web Vitals'],        minPrice: 3000,  maxPrice: 15000, unit: 'per project', popular: true  },
  { icon: Code,       title: 'Full Stack Development', description: 'End-to-end web applications — REST / GraphQL APIs to cloud deployment — built on battle-tested stacks.',             features: ['Node.js / Express / FastAPI', 'PostgreSQL · MongoDB · Redis', 'Auth, RBAC & security hardening', 'Dockerised cloud deployment'],                 minPrice: 8000,  maxPrice: 50000, unit: 'per project', popular: false },
  { icon: Shield,     title: 'Cyber Security Audit',   description: 'Identify, prove, and patch vulnerabilities in your web app before attackers do.',                                    features: ['OWASP Top-10 assessment', 'Penetration testing & PoC exploits', 'LLM-powered patch generation', 'Detailed remediation report'],                  minPrice: 5000,  maxPrice: 30000, unit: 'per audit',   popular: false },
  { icon: Palette,    title: 'UI / UX Design',          description: 'From rough concept to polished Figma prototype — wireframes, design systems, and handoff-ready specs.',             features: ['User research & persona mapping', 'Wireframes & interactive prototypes', 'Design systems & component libs', 'Dev-handoff with specs'],            minPrice: 2000,  maxPrice: 12000, unit: 'per project', popular: false },
  { icon: Smartphone, title: 'Mobile App Development', description: 'Cross-platform iOS & Android apps built with React Native — shared codebase, native feel.',                         features: ['React Native (Expo / bare)', 'iOS & Android in one codebase', 'Push notifications & deep links', 'App Store / Play Store deployment'],         minPrice: 10000, maxPrice: 60000, unit: 'per project', popular: false },
  { icon: Zap,        title: 'Performance & SEO',      description: 'Audit and optimise existing apps — bundle splitting, image compression, Lighthouse scores, Core Web Vitals.',        features: ['Bundle analysis & code splitting', 'Image & asset optimisation', 'Lighthouse 90+ guaranteed', 'Technical SEO & meta / OG tags'],                 minPrice: 2000,  maxPrice: 10000, unit: 'one-time',    popular: false },
];

const workProcess = [
  { step: '01', title: 'Discovery', description: 'A free 30-min call to understand your goals, tech stack, and timeline — zero obligation.' },
  { step: '02', title: 'Proposal',  description: 'A clear written scope with fixed milestones, deliverables, and a quoted price range.' },
  { step: '03', title: 'Build',     description: 'Weekly demos, transparent Git history, and async updates via your preferred channel.' },
  { step: '04', title: 'Delivery',  description: 'Code handoff with docs, deployment walkthrough, and 2 weeks of free post-launch support.' },
];

const testimonials = [
  { name: 'Sarah Johnson',   role: 'CEO, Tech Startup',  company: 'InnovateTech',      content: 'Outstanding attention to detail and technical depth. Delivered on time, within budget, and exceeded our expectations.',  rating: 5, avatar: '👩‍💼' },
  { name: 'Michael Chen',    role: 'Product Manager',     company: 'Digital Solutions', content: 'Professional, responsive, and exactly what we needed. Communication throughout the project was excellent.',              rating: 5, avatar: '👨‍💻' },
  { name: 'Emily Rodriguez', role: 'Founder, E-commerce', company: 'ShopFlow',          content: 'Transformed our vision into a beautiful, fast web app. Highly recommend for any serious web project!',                  rating: 5, avatar: '👩‍🚀' },
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
   TECH STACK
───────────────────────────────────────────────────────────── */
const CDN_D = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const CDN_S = 'https://cdn.simpleicons.org';
type TechCat = 'Frontend' | 'Backend' | 'DevOps' | 'CyberSecurity';
type TechItem = { name: string; logo: string; cat: TechCat };

const techStack: TechItem[] = [
  { name: 'React',          logo: '/logos/react-original.svg',                         cat: 'Frontend'      },
  { name: 'TypeScript',     logo: '/logos/typescript-original.svg',                    cat: 'Frontend'      },
  { name: 'Next.js',        logo: '/logos/nextjs-original.svg',                        cat: 'Frontend'      },
  { name: 'Tailwind CSS',   logo: '/logos/tailwindcss-original.svg',                   cat: 'Frontend'      },
  { name: 'Three.js',       logo: '/logos/threejs-original.svg',                       cat: 'Frontend'      },
  { name: 'Node.js',        logo: '/logos/nodejs-original.svg',                        cat: 'Backend'       },
  { name: 'Python',         logo: '/logos/python-original.svg',                        cat: 'Backend'       },
  { name: 'MongoDB',        logo: '/logos/mongodb-original.svg',                       cat: 'Backend'       },
  { name: 'PostgreSQL',     logo: '/logos/postgresql-original.svg',                    cat: 'Backend'       },
  { name: 'Firebase',       logo: '/logos/firebase-original.svg',                      cat: 'Backend'       },
  { name: 'FastAPI',        logo: `${CDN_D}/fastapi/fastapi-original.svg`,             cat: 'Backend'       },
  { name: 'Docker',         logo: '/logos/docker-original.svg',                        cat: 'DevOps'        },
  { name: 'Git',            logo: '/logos/git-original.svg',                           cat: 'DevOps'        },
  { name: 'Vercel',         logo: '/logos/vercel-original.svg',                        cat: 'DevOps'        },
  { name: 'GitHub Actions', logo: '/logos/githubactions-original.svg',                 cat: 'DevOps'        },
  { name: 'Kali Linux',     logo: `${CDN_S}/kalilinux`,                                cat: 'CyberSecurity' },
  { name: 'TensorFlow',     logo: `${CDN_D}/tensorflow/tensorflow-original.svg`,       cat: 'CyberSecurity' },
  { name: 'TryHackMe',      logo: `${CDN_S}/tryhackme`,                                cat: 'CyberSecurity' },
];

const catDot:   Record<TechCat, string> = { Frontend: 'bg-purple-400', Backend: 'bg-green-400', DevOps: 'bg-blue-400', CyberSecurity: 'bg-pink-400' };
const catLabel: Record<TechCat, string> = { Frontend: 'text-purple-400', Backend: 'text-green-400', DevOps: 'text-blue-400', CyberSecurity: 'text-pink-400' };

/* ─────────────────────────────────────────────────────────────
   REUSABLE WRAPPER COMPONENTS
───────────────────────────────────────────────────────────── */

/** Big section heading — spring letter reveal */
function SectionHeading({ text, className = '' }: { text: string; className?: string }) {
  const ref = useLetterReveal(text, 0);
  return <h2 ref={ref} className={className} aria-label={text} />;
}

/** Sub-heading / description — blur-in word by word */
function SectionDesc({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useBlurReveal(text, delay);
  return <p ref={ref} className={className} />;
}

/** Clip-path reveal — for badges, stat blocks, etc */
function ClipReveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useClipReveal(delay);
  return <div ref={ref} className={className}>{children}</div>;
}

/** Fade+slide — generic support content */
function FadeSlide({ children, delay = 0, className = '', direction = 'up' as 'up' | 'left' | 'right' }: {
  children: React.ReactNode; delay?: number; className?: string; direction?: 'up' | 'left' | 'right';
}) {
  const ref = useFadeSlide(delay, direction);
  return <div ref={ref} className={className}>{children}</div>;
}

/** Spring stagger grid */
function SpringGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useSpringGrid();
  return <div ref={ref} className={className}>{children}</div>;
}

/** Animated section divider line */
function SectionLine({ className = '' }: { className?: string }) {
  const ref = useDrawLine();
  return (
    <div
      ref={ref}
      className={`h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent ${className}`}
      style={{ transform: 'scaleX(0)', transformOrigin: 'center' }}
    />
  );
}

/** Magnetic CTA button */
function MagneticButton({ children, className = '', onClick }: {
  children: React.ReactNode; className?: string; onClick?: () => void;
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.4);
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}

/** Counting stat */
function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  const numRef = useCounter(value);
  const cardRef = useFadeSlide(0, 'up');
  return (
    <div ref={cardRef} className="p-5 rounded-xl bg-white/5 border border-white/10 text-center group hover:bg-white/10 hover:border-purple-500/20 transition-all duration-300 backdrop-blur-sm">
      <Icon className="w-6 h-6 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
      <div className="text-2xl md:text-3xl font-bold text-white mb-1">
        <span ref={numRef}>{value}</span>
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRICE BADGE
───────────────────────────────────────────────────────────── */
function formatINR(n: number) { return `₹${n.toLocaleString('en-IN')}`; }

function PriceBadge({ min, max, unit }: { min: number; max: number; unit: string }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.3);
  return (
    <div className="mt-4 p-3 rounded-xl bg-black/30 border border-purple-500/20 flex items-center justify-between gap-3 flex-wrap">
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
        <button
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Get quote
        </button>
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TECH CARD
───────────────────────────────────────────────────────────── */
function TechCard({ tech }: { tech: TechItem }) {
  return (
    <div className="flex flex-col items-center gap-2 px-5 py-4 rounded-xl bg-white/5 border border-white/[0.08] hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 flex-shrink-0 w-24 cursor-default group">
      <img src={tech.logo} alt={tech.name} width={36} height={36} className="object-contain group-hover:scale-110 transition-transform duration-300" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }} />
      <span className="text-[11px] text-gray-400 text-center leading-tight font-medium">{tech.name}</span>
      <span className={`text-[9px] font-semibold uppercase tracking-wide ${catLabel[tech.cat]}`}>{tech.cat}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export function Services() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedFaq, setExpandedFaq]     = useState<number | null>(null);

  // Framer scroll progress for top bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Parallax orbs in hero
  const orb1 = useParallax(0.25);
  const orb2 = useParallax(0.18);

  // 4× repeat for seamless marquee
  const row1 = [...techStack.slice(0, 9), ...techStack.slice(0, 9), ...techStack.slice(0, 9), ...techStack.slice(0, 9)];
  const row2 = [...techStack.slice(9),    ...techStack.slice(9),    ...techStack.slice(9),    ...techStack.slice(9)];

  return (
    <div className="min-h-screen bg-[#0a0118] relative overflow-x-hidden">

      {/* ── SCROLL PROGRESS — spring-smoothed ───────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600"
        style={{ scaleX }}
      />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20">

        {/* parallax background orbs */}
        <div ref={orb1} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div ref={orb2} className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/[0.07] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto text-center z-10">

          {/* back button */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/">
              <MagneticButton className="mb-10 inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all backdrop-blur-sm text-sm font-medium">
                <Home size={16} /> Back to Portfolio
              </MagneticButton>
            </Link>
          </motion.div>

          {/* badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>✨</motion.span>
            Available for freelance work
          </motion.div>

          {/* heading — clip-path reveal from Framer */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight text-white"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Freelance{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                Services
              </span>
            </motion.h1>
          </div>

          {/* subheading — blur reveal */}
          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-14 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            From concept to deployment — web apps, mobile, security audits, and more.
            Transparent pricing. No hidden fees.
          </motion.p>

          {/* stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
                <StatCard value={s.value} label={s.label} icon={s.icon} />
              </motion.div>
            ))}
          </div>

          {/* CTAs — magnetic */}
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }}>
            <Link to="/#contact">
              <MagneticButton className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-opacity text-sm">
                Get a Free Quote <ArrowRight className="inline-block ml-2" size={16} />
              </MagneticButton>
            </Link>
            <MagneticButton
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full text-white font-semibold border border-white/20 hover:bg-white/10 transition-all text-sm"
            >
              View Services
            </MagneticButton>
          </motion.div>

          {/* pricing note */}
          <motion.div
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-gray-500 text-xs"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          >
            <IndianRupee size={12} className="text-purple-400" />
            All prices in INR · Starting from ₹2,000 · Free 30-min discovery call
          </motion.div>
        </div>
      </section>

      <SectionLine className="max-w-3xl mx-auto px-4" />

      {/* ── SERVICES GRID ───────────────────────────────────── */}
      <section id="services" className="py-28 px-4 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <ClipReveal delay={0} className="inline-block mb-3 text-xs text-purple-400 font-semibold uppercase tracking-widest">
              What I Offer
            </ClipReveal>
            <SectionHeading
              text="Services & Pricing"
              className="text-4xl md:text-6xl font-bold text-white mb-5"
            />
            <SectionDesc
              text="Real price ranges based on actual project complexity — not vague contact for pricing."
              className="text-lg text-gray-500 max-w-2xl mx-auto"
              delay={400}
            />
          </div>

          <SpringGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="relative p-7 rounded-2xl group cursor-default overflow-hidden
                             bg-white/[0.04] border border-white/[0.08]
                             hover:border-purple-500/25 hover:bg-white/[0.07]
                             transition-colors duration-500"
                >
                  {/* subtle inner glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.08), transparent 70%)' }} />

                  {service.popular && (
                    <div className="absolute top-5 right-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                      POPULAR
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/25 to-pink-600/15 border border-purple-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-purple-500/40 transition-all duration-300">
                      <Icon size={22} className="text-purple-400" />
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-100 transition-colors duration-300">{service.title}</h3>
                    <p className="text-gray-500 mb-5 text-sm leading-relaxed">{service.description}</p>

                    <ul className="space-y-2 mb-1">
                      {service.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-400">
                          <div className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                          <span className="text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <PriceBadge min={service.minPrice} max={service.maxPrice} unit={service.unit} />
                  </div>
                </div>
              );
            })}
          </SpringGrid>

          <FadeSlide delay={200} className="mt-12 p-4 rounded-xl bg-white/[0.025] border border-white/[0.06] flex items-start gap-3 max-w-2xl mx-auto">
            <Info size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong className="text-gray-400">Transparent pricing — </strong>
              every engagement starts with a free 30-min discovery call and a fixed written quote. No hourly billing surprises.
            </p>
          </FadeSlide>
        </div>
      </section>

      <SectionLine className="max-w-3xl mx-auto px-4" />

      {/* ── TECH STACK — MARQUEE ────────────────────────────── */}
      <section className="py-28 bg-white/[0.015] relative">
        <div className="text-center mb-16 px-4">
          <ClipReveal delay={0} className="inline-block mb-3 text-xs text-purple-400 font-semibold uppercase tracking-widest">
            Tools & Technologies
          </ClipReveal>
          <SectionHeading text="Tech Stack" className="text-4xl md:text-6xl font-bold text-white mb-5" />
          <SectionDesc text="Tools I actually ship with across frontend backend DevOps and security." className="text-lg text-gray-500 max-w-xl mx-auto" delay={300} />
          <FadeSlide delay={500} className="flex flex-wrap justify-center gap-5 mt-6">
            {(Object.entries(catDot) as [TechCat, string][]).map(([cat, dot]) => (
              <span key={cat} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />{cat}
              </span>
            ))}
          </FadeSlide>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #0a0118, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #0a0118, transparent)' }} />

          <div style={{ overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', width: 'max-content', animation: 'marquee-scroll 32s linear infinite' }}
              onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
              {row1.map((t, i) => <TechCard key={`r1-${i}`} tech={t} />)}
            </div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: '12px', width: 'max-content', animation: 'marquee-scroll 26s linear infinite reverse' }}
              onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}>
              {row2.map((t, i) => <TechCard key={`r2-${i}`} tech={t} />)}
            </div>
          </div>
        </div>
      </section>

      <SectionLine className="max-w-3xl mx-auto px-4" />

      {/* ── HOW I WORK ──────────────────────────────────────── */}
      <section className="py-28 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <ClipReveal className="inline-block mb-3 text-xs text-purple-400 font-semibold uppercase tracking-widest">
              Process
            </ClipReveal>
            <SectionHeading text="How I Work" className="text-4xl md:text-6xl font-bold text-white mb-5" />
            <SectionDesc text="A clear repeatable process. No surprises. No scope creep." className="text-lg text-gray-500 max-w-xl mx-auto" delay={300} />
          </div>

          <SpringGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {workProcess.map((p, i) => (
              <div key={i} className="relative p-7 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/20 hover:bg-white/[0.06] transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: 'radial-gradient(circle at 0% 100%, rgba(139,92,246,0.06), transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="text-5xl font-bold bg-gradient-to-br from-purple-400/60 to-pink-400/40 bg-clip-text text-transparent mb-5 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {p.step}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </SpringGrid>
        </div>
      </section>

      <SectionLine className="max-w-3xl mx-auto px-4" />

      {/* ── TESTIMONIALS ────────────────────────────────────── */}
      <section className="py-28 px-4 bg-white/[0.015] relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <ClipReveal className="inline-block mb-3 text-xs text-purple-400 font-semibold uppercase tracking-widest">
              Social Proof
            </ClipReveal>
            <SectionHeading text="Client Testimonials" className="text-4xl md:text-6xl font-bold text-white mb-5" />
            <SectionDesc text="What clients say about working with me." className="text-lg text-gray-500 max-w-xl mx-auto" delay={300} />
          </div>

          <SpringGrid className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="relative p-7 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/20 hover:bg-white/[0.06] transition-all duration-300 group">
                <div className="absolute top-5 right-5 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">"</div>
                <div className="text-3xl mb-4">{t.avatar}</div>
                <div className="flex mb-4 gap-0.5">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-400 mb-5 text-sm leading-relaxed">{t.content}</p>
                <div className="border-t border-white/[0.06] pt-4">
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t.role} · {t.company}</p>
                </div>
              </div>
            ))}
          </SpringGrid>
        </div>
      </section>

      <SectionLine className="max-w-3xl mx-auto px-4" />

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="py-28 px-4 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <ClipReveal className="inline-block mb-3 text-xs text-purple-400 font-semibold uppercase tracking-widest">
              FAQ
            </ClipReveal>
            <SectionHeading text="Common Questions" className="text-4xl md:text-6xl font-bold text-white mb-5" />
            <SectionDesc text="Everything you need to know before hiring me." className="text-lg text-gray-500" delay={300} />
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FadeSlide key={i} delay={i * 70} className="rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.07] hover:border-purple-500/20 transition-colors duration-300">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 group"
                >
                  <span className="text-sm font-medium text-white group-hover:text-purple-200 transition-colors duration-200">{faq.question}</span>
                  <div className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${expandedFaq === i ? 'bg-purple-500/20 border-purple-500/40' : ''}`}>
                    {expandedFaq === i
                      ? <ChevronUp size={14} className="text-purple-400" />
                      : <ChevronDown size={14} className="text-gray-400" />}
                  </div>
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 text-gray-500 text-sm leading-relaxed border-t border-white/[0.05]">
                        <div className="pt-4">{faq.answer}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FadeSlide>
            ))}
          </div>
        </div>
      </section>

      <SectionLine className="max-w-3xl mx-auto px-4" />

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-28 px-4 relative">
        <div className="max-w-3xl mx-auto">
          <FadeSlide className="relative p-10 md:p-16 rounded-3xl text-center overflow-hidden border border-purple-500/20 bg-white/[0.03]">
            {/* animated gradient background */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(139,92,246,0.15), transparent 70%)' }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10">
              <ClipReveal className="inline-block mb-4 text-xs text-purple-400 font-semibold uppercase tracking-widest">
                Let's Build Together
              </ClipReveal>

              <SectionHeading
                text="Start Your Project"
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              />

              <SectionDesc
                text="Free 30-minute discovery call. No commitment needed."
                className="text-lg text-gray-400 mb-3 max-w-xl mx-auto"
                delay={300}
              />

              <FadeSlide delay={400} className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
                <IndianRupee size={12} />
                Projects from ₹2,000 · Mobile from ₹10,000 · Audits from ₹5,000
              </FadeSlide>

              <FadeSlide delay={500} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#contact">
                  <MagneticButton className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-opacity text-sm">
                    Get a Free Quote <ArrowRight className="inline-block ml-2" size={16} />
                  </MagneticButton>
                </Link>
                <Link to="/">
                  <MagneticButton className="px-8 py-4 rounded-full text-white font-semibold border border-white/15 hover:bg-white/8 transition-all text-sm">
                    View Portfolio
                  </MagneticButton>
                </Link>
              </FadeSlide>
            </div>
          </FadeSlide>
        </div>
      </section>

      {/* ── BACK TO TOP — magnetic ───────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <MagneticButton
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl shadow-purple-900/40 hover:opacity-90 transition-opacity"
            >
              <ArrowUp size={18} />
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Persistent Footer Attribution --- */}
      <footer className="w-full py-6 text-center text-xs text-white/40 bg-[#0a0118] border-t border-white/5 relative z-10 flex flex-col items-center gap-1">
        <p>© {new Date().getFullYear()} Nithin K R. All rights reserved.</p>
        <p>
          Designed & Built by <a href="https://github.com/NITHINKR06" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-purple-400 transition-colors">NITHINKR06</a>
        </p>
      </footer>

    </div>
  );
}