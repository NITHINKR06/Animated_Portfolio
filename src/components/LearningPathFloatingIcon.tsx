/**
 * @component LearningPathFloatingIcon
 * @description LearningPathFloatingIcon section of the Animated 3D Portfolio
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 *
 * Part of a personal portfolio. Content and design belong to Nithin K R.
 * Code structure may be studied; redistribution as personal portfolio
 * without attribution violates the project license.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

export function LearningPathFloatingIcon() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open('/learning-path', '_blank');
  };

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        onClick={handleClick}
        className="relative group"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Learning Path"
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isHovered
              ? [
                  '0 0 20px rgba(255, 0, 0, 0.6)',
                  '0 0 40px rgba(255, 0, 0, 0.8)',
                  '0 0 20px rgba(255, 0, 0, 0.6)',
                ]
              : '0 0 10px rgba(255, 0, 0, 0.3)',
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Main button container */}
        <motion.div
          className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500/50 bg-gradient-to-br from-red-600/20 via-red-400/20 to-red-600/20 backdrop-blur-xl shadow-2xl overflow-hidden"
          animate={{
            borderColor: isHovered ? 'rgba(255,85,85,0.8)' : 'rgba(255,85,85,0.5)',
            background: isHovered
              ? 'linear-gradient(135deg, rgba(255,0,0,0.28), rgba(255,68,68,0.25), rgba(255,0,0,0.28))'
              : 'linear-gradient(135deg, rgba(255,0,0,0.18), rgba(255,68,68,0.15), rgba(255,0,0,0.18))',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/0 via-red-400/30 to-red-500/0"
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          />

          {/* Sparkle particles */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [
                        0,
                        Math.cos(i * 60 * (Math.PI / 180)) * 30,
                        Math.cos(i * 60 * (Math.PI / 180)) * 50,
                      ],
                      y: [
                        0,
                        Math.sin(i * 60 * (Math.PI / 180)) * 30,
                        Math.sin(i * 60 * (Math.PI / 180)) * 50,
                      ],
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: 'easeOut',
                    }}
                  >
                    <Sparkles className="h-3 w-3 text-red-400" />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Icon */}
          <motion.div
            className="relative z-10"
            animate={{
              rotate: isHovered ? [0, -10, 10, -5, 0] : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              rotate: {
                duration: 0.6,
                ease: 'easeInOut',
              },
              scale: {
                duration: 0.3,
              },
            }}
          >
            <BookOpen className="h-7 w-7 text-white drop-shadow-lg" />
          </motion.div>

          {/* Pulsing dot indicator */}
          <motion.div
            className="absolute top-1 right-1 h-3 w-3 rounded-full bg-gradient-to-r from-red-400 to-red-500"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Tooltip with smooth animation */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{
                duration: 0.3,
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              className="absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="relative">
                {/* Tooltip glow */}
                <motion.div
                  className="absolute inset-0 blur-xl bg-gradient-to-r from-red-500 to-red-400 opacity-50 rounded-lg"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Tooltip content */}
                <div className="relative px-5 py-3 rounded-lg border border-white/20 bg-gradient-to-r from-red-900/90 via-red-800/90 to-red-900/90 backdrop-blur-xl text-white whitespace-nowrap font-semibold text-sm shadow-2xl">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-red-400" />
                    <span className="bg-gradient-to-r from-white via-red-200 to-red-200 bg-clip-text text-transparent">
                      Learning Path
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2">
                    <div className="border-8 border-transparent border-l-red-900/90" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-red-400"
          initial={{ scale: 1, opacity: 0 }}
          whileTap={{
            scale: 1.5,
            opacity: [0.5, 0],
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.button>
    </motion.div>
  );
}
