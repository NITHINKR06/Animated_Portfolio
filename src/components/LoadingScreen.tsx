/**
 * @component LoadingScreen
 * @description LoadingScreen section of the Animated 3D Portfolio
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 *
 * Part of a personal portfolio. Content and design belong to Nithin K R.
 * Code structure may be studied; redistribution as personal portfolio
 * without attribution violates the project license.
 */
import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const hasCompletedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    return [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
  }, []);

  useEffect(() => {
    // Start exit animation after 1800ms
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Handle animation complete - call onComplete when exit animation finishes
  const handleExitComplete = () => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete();
    }
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.2 }
              : { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }
          }
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-red-950 via-black to-red-950 flex items-center justify-center overflow-hidden"
        >
          {/* Animated gradient orbs */}
          {!prefersReducedMotion && (
            <>
              <motion.div
                className="absolute w-96 h-96 rounded-full bg-red-600/20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [-20, 20, -20],
                  y: [-20, 20, -20],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute w-96 h-96 rounded-full bg-red-600/20 blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  x: [20, -20, 20],
                  y: [20, -20, 20],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
            </>
          )}

          {/* Main loader - spinning rings */}
          <div className="relative z-10">
            {/* Outer ring */}
            <motion.div
              className="w-24 h-24 rounded-full border-2 border-red-500/30 border-t-red-500"
              animate={prefersReducedMotion ? undefined : { rotate: 360 }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 1.5, repeat: Infinity, ease: 'linear' }
              }
            />

            {/* Middle ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-red-400/30 border-t-red-400"
              animate={prefersReducedMotion ? undefined : { rotate: -360 }}
              transition={
                prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity, ease: 'linear' }
              }
            />

            {/* Inner ring */}
            <motion.div
              className="absolute inset-4 rounded-full border-2 border-red-300/30 border-t-red-300"
              animate={prefersReducedMotion ? undefined : { rotate: 360 }}
              transition={
                prefersReducedMotion ? undefined : { duration: 1, repeat: Infinity, ease: 'linear' }
              }
            />

            {/* Center dot with pulse */}
            <motion.div
              className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-400"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 1, 0.8],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
              }
            />
          </div>

          {/* Floating particles */}
          {!prefersReducedMotion &&
            particles.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-red-400/40"
                style={pos}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }}
              />
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
