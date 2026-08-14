import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowUp,
  Award,
  ChevronDown,
  Clock,
  Code,
  Globe,
  Home,
  IndianRupee,
  Palette,
  Shield,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useBlurReveal,
  useClipReveal,
  useCounter,
  useDrawLine,
  useFadeSlide,
  useLetterReveal,
  useMagnetic,
  useSpringGrid,
  useTypewriter,
} from '../hooks';
import { GradientBorder, MagneticButton, TiltCard } from './RevealKit';

/* ── Services Data ──────────────────────────────────────────── */
const services = [
  {
    icon: Globe,
    title: 'Frontend Development',
    description:
      'Pixel-perfect, responsive UIs built with React / Next.js, Tailwind CSS, Framer Motion, and Three.js.',
    features: [
      'React / Next.js SPAs & SSR',
      'Responsive & mobile-first design',
      'Animation & 3D interactive scenes',
      'Performance & Core Web Vitals',
    ],
    minPrice: 3000,
    maxPrice: 15000,
    unit: 'per project',
    popular: true,
  },
  {
    icon: Code,
    title: 'Full Stack Development',
    description:
      'End-to-end web applications — REST / GraphQL APIs to cloud deployment — built on battle-tested stacks.',
    features: [
      'Node.js / Express / FastAPI',
      'PostgreSQL · MongoDB · Redis',
      'Auth, RBAC & security hardening',
      'Dockerised cloud deployment',
    ],
    minPrice: 8000,
    maxPrice: 50000,
    unit: 'per project',
    popular: false,
  },
  {
    icon: Shield,
    title: 'Cyber Security Audit',
    description: 'Identify, prove, and patch vulnerabilities in your web app before attackers do.',
    features: [
      'OWASP Top-10 assessment',
      'Penetration testing & PoC exploits',
      'LLM-powered patch generation',
      'Detailed remediation report',
    ],
    minPrice: 5000,
    maxPrice: 30000,
    unit: 'per audit',
    popular: false,
  },
  {
    icon: Palette,
    title: 'UI / UX Design',
    description:
      'From rough concept to polished Figma prototype — wireframes, design systems, and handoff-ready specs.',
    features: [
      'User research & persona mapping',
      'Wireframes & interactive prototypes',
      'Design systems & component libs',
      'Dev-handoff with specs',
    ],
    minPrice: 2000,
    maxPrice: 12000,
    unit: 'per project',
    popular: false,
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Cross-platform iOS & Android apps built with React Native — shared codebase, native feel.',
    features: [
      'React Native (Expo / bare)',
      'iOS & Android in one codebase',
      'Push notifications & deep links',
      'App Store / Play Store deployment',
    ],
    minPrice: 10000,
    maxPrice: 60000,
    unit: 'per project',
    popular: false,
  },
  {
    icon: Zap,
    title: 'Performance & SEO',
    description:
      'Audit and optimise existing apps — bundle splitting, image compression, Lighthouse scores, Core Web Vitals.',
    features: [
      'Bundle analysis & code splitting',
      'Image & asset optimisation',
      'Lighthouse 90+ guaranteed',
      'Technical SEO & meta / OG tags',
    ],
    minPrice: 2000,
    maxPrice: 10000,
    unit: 'one-time',
    popular: false,
  },
];

const workProcess = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'A free 30-min call to understand your goals, tech stack, and timeline — zero obligation.',
  },
  {
    step: '02',
    title: 'Proposal',
    description:
      'A clear written scope with fixed milestones, deliverables, and a quoted price range.',
  },
  {
    step: '03',
    title: 'Build',
    description:
      'Weekly demos, transparent Git history, and async updates via your preferred channel.',
  },
  {
    step: '04',
    title: 'Delivery',
    description:
      'Code handoff with docs, deployment walkthrough, and 2 weeks of free post-launch support.',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, Tech Startup',
    company: 'InnovateTech',
    content:
      'Outstanding attention to detail and technical depth. Delivered on time, within budget, and exceeded our expectations.',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'Digital Solutions',
    content:
      'Professional, responsive, and exactly what we needed. Communication throughout the project was excellent.',
    rating: 5,
    avatar: '👨‍💻',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Founder, E-commerce',
    company: 'ShopFlow',
    content:
      'Transformed our vision into a beautiful, fast web app. Highly recommend for any serious web project!',
    rating: 5,
    avatar: '👩‍🚀',
  },
];

const stats = [
  { icon: Award, value: '15+', label: 'Projects Completed' },
  { icon: Users, value: '10+', label: 'Happy Clients' },
  { icon: Clock, value: '2+', label: 'Years Experience' },
  { icon: TrendingUp, value: '100%', label: 'Satisfaction Rate' },
];

const faqs = [
  {
    question: 'How are prices determined?',
    answer:
      'The ranges shown reflect real project complexity. Simple landing pages sit at the low end; multi-role platforms with auth, payments, and dashboards sit at the high end. After a free discovery call I send a fixed quote — no hourly surprises.',
  },
  {
    question: 'What is your payment structure?',
    answer:
      '50% upfront to begin, 50% on delivery. For larger projects (₹20k+) we can agree on milestone-based payments tied to demo sign-offs.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'A static site or landing page: 1–2 weeks. A full-stack app: 4–10 weeks depending on scope. I share a detailed timeline in the proposal before any money changes hands.',
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      'Absolutely — I sign NDAs before any confidential discussions. Protecting your IP is non-negotiable.',
  },
  {
    question: 'Do you offer maintenance after delivery?',
    answer:
      'Yes. All projects include 2 weeks of free post-launch support. Ongoing retainer plans (bug fixes, feature additions, security patches) start at ₹2,000/month.',
  },
  {
    question: 'Can you work with an existing codebase?',
    answer:
      'Yes — I regularly jump into existing React / Node repos. I will do a codebase review first and factor any tech-debt cleanup into the proposal.',
  },
];

/* ── Tech Stack Data ────────────────────────────────────────── */
const CDN_D = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const CDN_S = 'https://cdn.simpleicons.org';
type TechCat = 'Frontend' | 'Backend' | 'DevOps' | 'CyberSecurity';
type TechItem = { name: string; logo: string; cat: TechCat };

const techStack: TechItem[] = [
  { name: 'React', logo: '/logos/react-original.svg', cat: 'Frontend' },
  { name: 'TypeScript', logo: '/logos/typescript-original.svg', cat: 'Frontend' },
  { name: 'Next.js', logo: '/logos/nextjs-original.svg', cat: 'Frontend' },
  { name: 'Tailwind CSS', logo: '/logos/tailwindcss-original.svg', cat: 'Frontend' },
  { name: 'Three.js', logo: '/logos/threejs-original.svg', cat: 'Frontend' },
  { name: 'Node.js', logo: '/logos/nodejs-original.svg', cat: 'Backend' },
  { name: 'Python', logo: '/logos/python-original.svg', cat: 'Backend' },
  { name: 'MongoDB', logo: '/logos/mongodb-original.svg', cat: 'Backend' },
  { name: 'PostgreSQL', logo: '/logos/postgresql-original.svg', cat: 'Backend' },
  { name: 'Firebase', logo: '/logos/firebase-original.svg', cat: 'Backend' },
  { name: 'FastAPI', logo: `${CDN_D}/fastapi/fastapi-original.svg`, cat: 'Backend' },
  { name: 'Docker', logo: '/logos/docker-original.svg', cat: 'DevOps' },
  { name: 'Git', logo: '/logos/git-original.svg', cat: 'DevOps' },
  { name: 'Vercel', logo: '/logos/vercel-original.svg', cat: 'DevOps' },
  { name: 'GitHub Actions', logo: '/logos/githubactions-original.svg', cat: 'DevOps' },
  { name: 'Kali Linux', logo: `${CDN_S}/kalilinux`, cat: 'CyberSecurity' },
  { name: 'TensorFlow', logo: `${CDN_D}/tensorflow/tensorflow-original.svg`, cat: 'CyberSecurity' },
  { name: 'TryHackMe', logo: `${CDN_S}/tryhackme`, cat: 'CyberSecurity' },
];

const catConfig: Record<TechCat, { label: string; dot: string; border: string; bg: string }> = {
  Frontend: { label: 'text-red-400', dot: 'bg-red-400', border: 'border-red-500/30', bg: 'bg-red-500/10' },
  Backend: { label: 'text-white', dot: 'bg-white', border: 'border-white/20', bg: 'bg-white/10' },
  DevOps: { label: 'text-red-300', dot: 'bg-red-300', border: 'border-red-400/30', bg: 'bg-red-400/10' },
  CyberSecurity: { label: 'text-red-200', dot: 'bg-red-200', border: 'border-red-300/30', bg: 'bg-red-300/10' },
};

const categories: TechCat[] = ['Frontend', 'Backend', 'DevOps', 'CyberSecurity'];

/* ── Helper Components ──────────────────────────────────────── */
function SectionHeading({ text, className = '' }: { text: string; className?: string }) {
  const ref = useLetterReveal(text, 0);
  return <h2 ref={ref} className={`font-heading ${className}`} aria-label={text} />;
}

function SectionDesc({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useBlurReveal(text, delay);
  return <p ref={ref} className={className} />;
}

function ClipReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useClipReveal(delay);
  return <div ref={ref} className={className}>{children}</div>;
}

function FadeSlide({ children, delay = 0, className = '', direction = 'up' as 'up' | 'left' | 'right' }: { children: React.ReactNode; delay?: number; className?: string; direction?: 'up' | 'left' | 'right' }) {
  const ref = useFadeSlide(delay, direction);
  return <div ref={ref} className={className}>{children}</div>;
}

function SpringGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useSpringGrid();
  return <div ref={ref} className={className}>{children}</div>;
}

function SectionLine({ className = '' }: { className?: string }) {
  const ref = useDrawLine();
  return (
      <div ref={ref} className={`h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent ${className}`}
      style={{ transform: 'scaleX(0)', transformOrigin: 'center' }}
    />
  );
}

function formatINR(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

/* ── Floating Mesh Background ────────────────────────────────── */
function MeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,0,0,0.24), transparent 70%)' }}
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(255,248,240,0.18), transparent 70%)' }}
        animate={{ x: [0, -40, 50, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.14), transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ── Floating Decorations ────────────────────────────────────── */
function FloatingShapes() {
  const shapes = [
    { size: 12, x: '15%', y: '20%', delay: 0, duration: 6, color: 'bg-red-500/20', shape: 'rounded-lg' },
    { size: 8, x: '80%', y: '15%', delay: 1, duration: 8, color: 'bg-white/15', shape: 'rounded-full' },
    { size: 10, x: '70%', y: '70%', delay: 2, duration: 7, color: 'bg-red-400/20', shape: 'rounded-lg' },
    { size: 6, x: '20%', y: '75%', delay: 0.5, duration: 9, color: 'bg-white/20', shape: 'rounded-full' },
    { size: 14, x: '50%', y: '85%', delay: 1.5, duration: 10, color: 'bg-red-200/10', shape: 'rotate-45' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute ${s.color} ${s.shape}`}
          style={{ width: s.size * 2, height: s.size * 2, left: s.x, top: s.y }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ── Stat Card ────────────────────────────────────────────────── */
function StatCard({ value, label, icon: Icon, index }: { value: string; label: string; icon: React.ElementType; index: number }) {
  const numRef = useCounter(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.6 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-5 rounded-2xl theme-panel hover:border-red-500/30 transition-all duration-500 text-center group overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-red-500/5 to-transparent" />
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-300">
          <Icon size={18} className="text-red-400" />
        </div>
        <div className="text-2xl md:text-3xl font-bold font-heading text-white mb-1">
          <span ref={numRef}>{value}</span>
        </div>
        <div className="text-xs text-gray-500 font-medium">{label}</div>
      </div>
    </motion.div>
  );
}

/* ── Service Card ────────────────────────────────────────────── */
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon;
  const { ref: magRef, onMouseMove, onMouseLeave } = useMagnetic(0.3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard className="h-full">
        <GradientBorder active className="h-full">
          <div className="relative p-7 rounded-2xl h-full theme-panel overflow-hidden group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,0,0,0.08), transparent 70%)' }}
            />

            {service.popular && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-white text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-wider shadow-lg shadow-red-900/30 z-10"
              >
                POPULAR
              </motion.div>
            )}

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/20 to-white/10 border border-red-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-red-500/40 group-hover:shadow-lg group-hover:shadow-red-500/20 transition-all duration-300">
                <Icon size={22} className="text-red-400 group-hover:text-red-300 transition-colors" />
              </div>

              <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-red-100 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-400 mb-5 text-sm leading-relaxed flex-1">
                {service.description}
              </p>

              <ul className="space-y-2.5 mb-5">
                {service.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-gray-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/70 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto p-3.5 rounded-xl bg-black/30 border border-red-500/15 flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">From</span>
                    <span className="text-red-300 font-bold text-base font-heading">{formatINR(service.minPrice)}</span>
                    <span className="text-gray-600 text-xs">–</span>
                    <span className="text-white font-bold text-base font-heading">{formatINR(service.maxPrice)}</span>
                  </div>
                  <p className="text-[10px] text-gray-600 mt-0.5">{service.unit} · scope-dependent</p>
                </div>
                <Link to="/#contact">
                  <button ref={magRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-white rounded-lg text-black text-xs font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all whitespace-nowrap"
                  >
                    Get quote
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </GradientBorder>
      </TiltCard>
    </motion.div>
  );
}

/* ── Testimonials Carousel ───────────────────────────────────── */
function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const t = testimonials[active];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 md:p-10 rounded-2xl theme-panel max-w-2xl mx-auto"
        >
          {/* Large quote mark */}
          <div className="absolute -top-2 -left-2 text-6xl leading-none text-red-500/20 font-heading select-none">"</div>

          <div className="flex items-center gap-1 mb-4">
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} size={14} className="text-red-200 fill-red-200" />
            ))}
          </div>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 italic">
            "{t.content}"
          </p>

          <div className="flex items-center gap-3 border-t border-white/[0.06] pt-4">
            <div className="text-2xl">{t.avatar}</div>
            <div>
              <p className="text-white font-semibold text-sm font-heading">{t.name}</p>
              <p className="text-gray-500 text-xs">{t.role} · {t.company}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-red-500' : 'bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Process Timeline ────────────────────────────────────────── */
function ProcessTimeline() {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* vertical line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/40 via-red-500/20 to-transparent md:-translate-x-px" />

      <div className="relative space-y-12 md:space-y-16">
        {workProcess.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            {/* step circle */}
            <div className="absolute left-6 md:left-1/2 w-12 h-12 -ml-6 md:-ml-6 rounded-full bg-black border-2 border-red-500/40 flex items-center justify-center z-10">
              <span className="text-red-400 font-bold font-heading text-sm">{p.step}</span>
            </div>

            {/* content */}
            <div className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
              <div className="p-5 rounded-xl theme-panel hover:border-red-500/20 transition-all duration-300">
                <h3 className="text-lg font-bold font-heading text-white mb-1">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Tech Stack Section ──────────────────────────────────────── */
function TechStackSection() {
  const [filter, setFilter] = useState<TechCat | 'all'>('all');
  const filtered = filter === 'all' ? techStack : techStack.filter((t) => t.cat === filter);

  return (
    <div>
      {/* filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {['all', ...categories].map((cat) => {
          const active = filter === cat;
          return (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat as TechCat | 'all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                active
                  ? 'bg-red-500/20 text-red-200 border border-red-500/30 shadow-lg shadow-red-500/10'
                  : 'bg-white/[0.04] text-gray-400 border border-white/[0.08] hover:bg-white/[0.08] hover:text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {active && <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block mr-1.5 align-middle" />}
              {cat === 'all' ? 'All' : cat}
            </motion.button>
          );
        })}
      </div>

      {/* grid */}
      <SpringGrid className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((tech, i) => {
            const cfg = catConfig[tech.cat];
            return (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="flex flex-col items-center gap-2 px-3 py-4 rounded-xl theme-panel hover:border-red-500/30 transition-all duration-300 group cursor-default"
              >
                <img
                  src={tech.logo}
                  alt={tech.name}
                  width={28}
                  height={28}
                  className="object-contain group-hover:scale-125 transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
                />
                <span className="text-[10px] text-gray-400 text-center leading-tight font-medium">{tech.name}</span>
                <span className={`text-[8px] font-semibold uppercase tracking-wider ${cfg.label}`}>{tech.cat}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </SpringGrid>
    </div>
  );
}

/* ── FAQ Section ─────────────────────────────────────────────── */
function FAQSection({ expandedFaq, setExpandedFaq }: { expandedFaq: number | null; setExpandedFaq: (v: number | null) => void }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = expandedFaq === i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl overflow-hidden theme-panel hover:border-red-500/20 transition-colors duration-300"
          >
            <button onClick={() => setExpandedFaq(isOpen ? null : i)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 group"
            >
              <span className="text-sm font-medium text-white group-hover:text-red-200 transition-colors">{faq.question}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                  isOpen ? 'bg-red-500/20 border-red-500/40' : 'border-white/10'
                }`}
              >
                <ChevronDown size={14} className={isOpen ? 'text-red-400' : 'text-gray-400'} />
              </motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/[0.05]">
                    <div className="pt-4">{faq.answer}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── CTA Section ─────────────────────────────────────────────── */
function CTASection() {
  const ctaRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ctaRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ctaRef} className="py-28 px-4 relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-red-950/20" />
        <MeshBackground />
      </motion.div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-10 md:p-16 rounded-3xl text-center overflow-hidden theme-panel border-red-500/20"
        >
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(255,0,0,0.15), transparent 70%)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10">
            <ClipReveal className="inline-block mb-4 text-[10px] text-red-400 font-semibold uppercase tracking-[0.2em]">
              Let's Build Together
            </ClipReveal>

            <SectionHeading text="Start Your Project" className="text-4xl md:text-5xl font-bold text-white mb-4" />

            <SectionDesc text="Free 30-minute discovery call. No commitment needed." className="text-base md:text-lg text-gray-400 mb-4 max-w-xl mx-auto" delay={300} />

            <FadeSlide delay={400} className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-200 text-xs font-medium">
              <IndianRupee size={12} />
              Projects from ₹2,000 · Mobile from ₹10,000 · Audits from ₹5,000
            </FadeSlide>

            <FadeSlide delay={500} className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton href="/#contact" className="px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-white text-black font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all text-sm">
                Get a Free Quote <ArrowRight className="inline-block ml-2" size={16} />
              </MagneticButton>
              <MagneticButton href="/" className="px-8 py-4 rounded-full text-white font-semibold border border-white/15 hover:bg-white/10 transition-all text-sm">
                View Portfolio
              </MagneticButton>
            </FadeSlide>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Main Component ──────────────────────────────────────────── */
export function Services() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const typewriterText = useTypewriter(['Services', 'Solutions', 'Experiences'], { typeSpeed: 80, deleteSpeed: 50, pause: 2500 });

  return (
    <div className="min-h-screen theme-shell relative overflow-x-hidden font-body">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-gradient-to-r from-red-500 via-white to-red-600" style={{ scaleX }} />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-20 overflow-hidden theme-section">
        <MeshBackground />
        <FloatingShapes />

        <div className="relative max-w-7xl mx-auto text-center z-10">
          {/* Back button */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/">
              <MagneticButton className="mb-8 inline-flex items-center gap-2 px-6 py-2.5 theme-panel rounded-full text-white/70 hover:text-white hover:bg-white/[0.08] transition-all text-sm">
                <Home size={14} /> Back to Portfolio
              </MagneticButton>
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-100 text-xs font-medium"
          >
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
              ✨
            </motion.span>
            Available for freelance work
          </motion.div>

          {/* Heading with typewriter */}
          <div className="mb-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading leading-tight text-white">
              Freelance{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-red-400 via-white to-red-600 bg-clip-text text-transparent">
                  {typewriterText}
                </span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                  className="inline-block w-[3px] h-[0.8em] bg-red-400 ml-1 align-middle"
                />
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-gray-300 mb-14 max-w-2xl mx-auto leading-relaxed"
          >
            From concept to deployment — web apps, mobile, security audits, and more.
            <br className="hidden sm:block" />
            Transparent pricing. No hidden fees.
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <StatCard key={i} value={s.value} label={s.label} icon={s.icon} index={i} />
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton href="/#contact" className="px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-white text-black font-semibold hover:shadow-xl hover:shadow-red-500/25 transition-all text-sm">
              Get a Free Quote <ArrowRight className="inline-block ml-2" size={16} />
            </MagneticButton>
            <MagneticButton onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-full text-white/80 font-semibold border border-white/15 hover:bg-white/10 hover:text-white transition-all text-sm">
              View Services <ChevronRight className="inline-block ml-1" size={14} />
            </MagneticButton>
          </motion.div>

          {/* Pricing note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full theme-panel text-gray-300 text-xs"
          >
            <IndianRupee size={11} className="text-red-400" />
            All prices in INR · Starting from ₹2,000 · Free 30-min discovery call
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown size={14} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionLine className="max-w-3xl mx-auto px-4" />

      {/* ── SERVICES GRID ─────────────────────────────────── */}
      <section id="services" className="py-28 px-4 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <ClipReveal delay={0} className="inline-block mb-3 text-[10px] text-red-400 font-semibold uppercase tracking-[0.2em]">
              What I Offer
            </ClipReveal>
            <SectionHeading text="Services & Pricing" className="text-4xl md:text-6xl font-bold text-white mb-5" />
            <SectionDesc text="Real price ranges based on actual project complexity — not vague contact for pricing." className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto" delay={400} />
          </div>

          <SpringGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </SpringGrid>

          <FadeSlide delay={200} className="mt-10 p-4 md:p-5 rounded-2xl theme-panel flex items-start gap-3 max-w-2xl mx-auto">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
              <IndianRupee size={14} className="text-red-400" />
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              <strong className="text-white">Transparent pricing — </strong>
              every engagement starts with a free 30-min discovery call and a fixed written quote. No hourly billing surprises.
            </p>
          </FadeSlide>
        </div>
      </section>

      <SectionLine className="max-w-3xl mx-auto px-4" />

      {/* ── TECH STACK ────────────────────────────────────── */}
      <section className="py-28 px-4 relative theme-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <ClipReveal delay={0} className="inline-block mb-3 text-[10px] text-red-400 font-semibold uppercase tracking-[0.2em]">
              Tools & Technologies
            </ClipReveal>
            <SectionHeading text="Tech Stack" className="text-4xl md:text-6xl font-bold text-white mb-5" />
            <SectionDesc text="Tools I actually ship with across frontend, backend, DevOps, and security." className="text-base md:text-lg text-gray-300 max-w-xl mx-auto" delay={300} />
          </div>

          <TechStackSection />
        </div>
      </section>

      <SectionLine className="max-w-3xl mx-auto px-4" />

      {/* ── PROCESS ───────────────────────────────────────── */}
      <section className="py-28 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <ClipReveal className="inline-block mb-3 text-[10px] text-red-400 font-semibold uppercase tracking-[0.2em]">
              Process
            </ClipReveal>
            <SectionHeading text="How I Work" className="text-4xl md:text-6xl font-bold text-white mb-5" />
            <SectionDesc text="A clear repeatable process. No surprises. No scope creep." className="text-base md:text-lg text-gray-500 max-w-xl mx-auto" delay={300} />
          </div>

          <ProcessTimeline />
        </div>
      </section>

      <SectionLine className="max-w-3xl mx-auto px-4" />

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="py-28 px-4 relative theme-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ClipReveal className="inline-block mb-3 text-[10px] text-red-400 font-semibold uppercase tracking-[0.2em]">
              Social Proof
            </ClipReveal>
            <SectionHeading text="Client Testimonials" className="text-4xl md:text-6xl font-bold text-white mb-5" />
            <SectionDesc text="What clients say about working with me." className="text-base md:text-lg text-gray-300 max-w-xl mx-auto" delay={300} />
          </div>

          <TestimonialsCarousel />
        </div>
      </section>

      <SectionLine className="max-w-3xl mx-auto px-4" />

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="py-28 px-4 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <ClipReveal className="inline-block mb-3 text-[10px] text-red-400 font-semibold uppercase tracking-[0.2em]">
              FAQ
            </ClipReveal>
            <SectionHeading text="Common Questions" className="text-4xl md:text-6xl font-bold text-white mb-5" />
            <SectionDesc text="Everything you need to know before hiring me." className="text-base md:text-lg text-gray-500" delay={300} />
          </div>

          <FAQSection expandedFaq={expandedFaq} setExpandedFaq={setExpandedFaq} />
        </div>
      </section>

      <SectionLine className="max-w-3xl mx-auto px-4" />

      {/* ── CTA ────────────────────────────────────────────── */}
      <CTASection />

      {/* ── Back to Top ───────────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <MagneticButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="p-3.5 bg-gradient-to-r from-red-600 to-white text-black rounded-full shadow-2xl shadow-red-900/40 hover:shadow-red-500/30 transition-all">
              <ArrowUp size={18} />
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-white/40 bg-black border-t border-white/5 relative z-10 flex flex-col items-center gap-1">
        <p>© {new Date().getFullYear()} Nithin K R. All rights reserved.</p>
        <p>
          Designed & Built by{' '}
          <a href="https://github.com/NITHINKR06" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-red-300 transition-colors">
            NITHINKR06
          </a>
        </p>
      </footer>
    </div>
  );
}
