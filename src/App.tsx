import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import LearningPathFloatingIcon from './components/LearningPathFloatingIcon';
import LearningPath from './components/LearningPath';
import Services from './components/Services';
import { Sparkles } from 'lucide-react';

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

function PortfolioHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnServicesPage = location.pathname === '/services';

  return (
    <>
      <ThreeDBackground />
      <Sidebar />
      <LearningPathFloatingIcon />
      
      {/* Mobile Services Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="lg:hidden fixed top-4 right-4 z-50"
      >
        <motion.button
          onClick={() => navigate('/services')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm shadow-lg backdrop-blur-md border transition-all ${
            isOnServicesPage
              ? 'bg-blue-600 text-white border-blue-400/50 shadow-blue-500/50'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="View Services"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={18} className={isOnServicesPage ? 'text-white' : 'text-blue-400'} />
          </motion.div>
          <span>Services</span>
        </motion.button>
      </motion.div>
      
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
        <section id="certification" className="">
          <Certification />
        </section>
        <Contact />
      </main>
    </>
  );
}

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
          <Routes>
            <Route path="/" element={<PortfolioHome />} />
            <Route path="/learning-path/*" element={<LearningPath />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </motion.div>
      )}
    </>
  );
}

export default App;
