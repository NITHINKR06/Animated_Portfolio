import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import ThreeDBackground from './components/ThreeDBackground';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import Experience from './components/Experience';
import { Projects } from './components/Projects';
import Contact from './components/Contact';
import Certification from './components/Certification';
import Sidebar from './components/Sidebar';

// Utility functions
const setCookie = (name: string, value: string, hours = 1) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasValidToken, setHasValidToken] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = () => {
      const existingToken = getCookie('portfolioToken');
      if (existingToken) {
        setHasValidToken(true);
        setIsLoading(false);
      } else {
        setHasValidToken(false);
      }
    };

    checkToken();
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const handleLoadingComplete = () => {
    const token = `portfolio_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setCookie('portfolioToken', token, 1);
    setHasValidToken(true);
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!isLoading && hasValidToken && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <ThreeDBackground />

          <Sidebar />

          <main>
            <section id="home">
              <Hero />
            </section>

            <section id="about" className="py-20">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 rounded-2xl"
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    About <span className="text-gradient">Me</span>
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    I'm a passionate Full Stack Developer with a love for creating beautiful, 
                    functional, and user-friendly applications. With expertise in modern web 
                    technologies, I bring ideas to life through clean code and innovative solutions. 
                    Currently pursuing my Master's in Cyber Security while continuously learning 
                    and adapting to new technologies in the ever-evolving world of software development.
                  </p>
                </motion.div>
              </div>
            </section>

            <Skills />
            <Experience />
            <Education />
            <Projects />
            <section id="certification" className="py-20">
              <Certification />
            </section>
            <Contact />
          </main>

          {/* Optional Footer
          <footer className="py-8 px-4 border-t border-purple-500/20">
            <div className="max-w-6xl mx-auto text-center">
              <motion.p
                className="text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                © 2024 Nithin K R. Built with React, TypeScript, and lots of ☕
              </motion.p>
            </div>
          </footer> */}
        </motion.div>
      )}
    </>
  );
}

export default App;
