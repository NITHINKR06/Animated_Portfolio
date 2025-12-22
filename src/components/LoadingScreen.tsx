import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showBlankScreen, setShowBlankScreen] = useState(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Clear any existing timers
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];

    // Timer 1: Start exit animation after 1800ms
    const timer1 = setTimeout(() => {
      setIsExiting(true);
      
      // Timer 2: Show blank screen after exit animation completes (600ms)
      const timer2 = setTimeout(() => {
        setShowBlankScreen(true);
        
        // Timer 3: Load home page after 1 second of blank screen
        const timer3 = setTimeout(() => {
          onComplete();
        }, 1000);
        
        timersRef.current.push(timer3);
      }, 600);
      
      timersRef.current.push(timer2);
    }, 1800);

    timersRef.current.push(timer1);

    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
    };
  }, [onComplete]);

  return (
    <>
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[9999] bg-gradient-to-br from-purple-950 via-black to-indigo-950 flex items-center justify-center overflow-hidden"
          >
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [-20, 20, -20],
                y: [-20, 20, -20],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [20, -20, 20],
                y: [20, -20, 20],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Main loader - spinning rings */}
            <div className="relative z-10">
              {/* Outer ring */}
              <motion.div
                className="w-24 h-24 rounded-full border-2 border-purple-500/30 border-t-purple-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle ring */}
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-indigo-400/30 border-t-indigo-400"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner ring */}
              <motion.div
                className="absolute inset-4 rounded-full border-2 border-purple-300/30 border-t-purple-300"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />

              {/* Center dot with pulse */}
              <motion.div
                className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-purple-400/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blank screen shown after loading screen exits */}
      {showBlankScreen && (
        <div className="fixed inset-0 z-[9999] bg-black" />
      )}
    </>
  );
};
