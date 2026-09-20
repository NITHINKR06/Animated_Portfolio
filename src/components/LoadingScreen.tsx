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
import { useReducedMotion } from 'framer-motion';
import { motion } from 'framer-motion';
import ParticleText from './ParticleText';

export const LoadingScreen = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.2 }
          : { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
      }
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-red-950 via-black to-red-950 flex items-center justify-center overflow-hidden"
    >
      {/* Main loader - Particle Text */}
      <div className="relative z-10 w-full h-[360px]">
        <ParticleText
          text="Nithin K R"
          particleSize={2}
          density={4}
          color="#ffffff"
          highlightColor="#f6efe6" 
          scatter={180}
          gatherDuration={1600}
          stagger={420}
          pointerRepel={40}
          repelRadius={120}
          idleDrift={0.7}
          trigger="mount"
          fontSize="clamp(3rem, 12vw, 8rem)"
          fontWeight={800}
          fontFamily="'Montenegrin Gothic One', serif"
          glow
        />
      </div>
    </motion.div>
  );
};
