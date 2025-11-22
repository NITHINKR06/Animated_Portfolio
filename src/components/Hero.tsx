import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Hero = () => {
  const { personal } = portfolioData;

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-white">I'm </span>
            <motion.span
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
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

          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 w-full sm:w-auto justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.a
              href={`mailto:${personal.email}`}
              className="glass-card w-full sm:w-auto text-center px-6 py-3 rounded-full hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} className="inline-block mr-2 text-purple-400" />
              <span className="text-white">Get In Touch</span>
            </motion.a>

            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card w-full sm:w-auto text-center px-6 py-3 rounded-full hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} className="inline-block mr-2 text-pink-400" />
              <span className="text-white">View Work</span>
            </motion.a>
          </motion.div>

          {/* social icons - hidden on mobile */}
          <motion.div
            className="hidden md:flex justify-center md:justify-start gap-6 mt-4"
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

          {/* TryHackMe Badge */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <iframe
              src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=5141576"
              style={{ border: 'none' }}
              className="w-96 max-w-md"
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
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* SIMPLER MOBILE IMAGE */}
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:hidden relative rounded-full overflow-hidden border-4 border-purple-400 shadow-lg">
              <img
                src="/NITHINKR06.JPG"
                alt="Nithin K R"
                className="w-full h-full object-cover"
              />
            </div>

            {/* ORIGINAL DESKTOP IMAGE */}
            <div className="hidden md:block w-96 h-96 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="absolute inset-4 glass-card rounded-full p-2">
                <img
                  src="/NITHINKR06.JPG"
                  alt="Nithin K R"
                  className="w-full h-full object-cover rounded-full border-4 border-gradient-to-r from-purple-400 to-pink-400"
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
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
      >
        <ChevronDown size={22} className="text-purple-400" />
      </motion.button>
    </section>
  );
};
