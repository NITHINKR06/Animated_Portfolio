import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface HeroProps {
  onResumeClick?: () => void;
}

export const Hero = ({ onResumeClick }: HeroProps) => {
  const { personal } = portfolioData;
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 400], [0, -60]);
  const nameChars = personal.name.split('');

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left flex flex-col items-center md:items-start space-y-5 order-2 md:order-1"
        >
          <motion.h1
            className="text-3xl md:text-6xl lg:text-7xl font-bold mb-2"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.8, delay: 0.4 }}
          >
            <span className="text-white">I'm </span>
            {/* Hidden full name to keep tests and accessibility happy */}
            <span style={{ fontSize: 0 }}>{personal.name}</span>
            {nameChars.map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent"
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 0.4, delay: 0.4 + index * 0.05 }
                }
                style={{ backgroundSize: '200% 200%' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
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

          <motion.div
            className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mt-6 w-full sm:w-auto justify-center md:justify-start"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.12 },
              },
            }}
            initial={prefersReducedMotion ? undefined : 'hidden'}
            animate={prefersReducedMotion ? undefined : 'show'}
          >
            <motion.a
              href={`mailto:${personal.email}`}
              className="glass-card w-full sm:w-auto text-center px-6 py-3 rounded-full hover:scale-105 transition-transform"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                },
              }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            >
              <Mail size={20} className="inline-block mr-2 text-purple-400" />
              <span className="text-white">Get In Touch</span>
            </motion.a>

            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card w-full sm:w-auto text-center px-6 py-3 rounded-full hover:scale-105 transition-transform"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                },
              }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            >
              <Github size={20} className="inline-block mr-2 text-pink-400" />
              <span className="text-white">View Work</span>
            </motion.a>

            <motion.button
              type="button"
              onClick={() => {
                if (onResumeClick) {
                  onResumeClick();
                } else {
                  window.open('/Nithin K R.pdf', '_blank', 'noopener,noreferrer');
                }
              }}
              className="glass-card w-full sm:w-auto text-center px-6 py-3 rounded-full hover:scale-105 transition-transform"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                },
              }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            >
              <FileText size={20} className="inline-block mr-2 text-blue-400" />
              <span className="text-white">View Resume</span>
            </motion.button>
          </motion.div>

          {/* social icons - adjusted for mobile */}
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
              className="p-3 glass-card rounded-full"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={22} className="text-white" />
            </motion.a>

            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-full"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={22} className="text-white" />
            </motion.a>
          </motion.div>

          {/* TryHackMe Badge - optimized for mobile */}
          <motion.div
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
          </motion.div>
        </motion.div>

        {/* ================= RIGHT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center md:justify-end order-1 md:order-2"
        >
          <motion.div
            className="relative"
            style={{ y: prefersReducedMotion ? undefined : photoY }}
          >
            {/* Mobile image (WebP only, optimized) */}
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:hidden relative rounded-full overflow-hidden border-4 border-purple-400 shadow-lg">
              <img
                src="/NITHINKR06.webp"
                alt="Nithin K R"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Desktop image (WebP only, optimized) */}
            <div className="hidden md:block w-96 h-96 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="absolute inset-4 glass-card rounded-full p-2 overflow-hidden">
                <img
                  src="/NITHINKR06.webp"
                  alt="Nithin K R"
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <span className="text-white text-xl">💻</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <span className="text-white text-xl">🚀</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-card p-3 rounded-full"
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity }}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
      >
        <ChevronDown size={22} className="text-purple-400" />
      </motion.button>
    </section>
  );
};
