import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, MapPin, Send, Sparkles, Instagram } from 'lucide-react';

const Contact = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const personal = {
    email: 'nithinpoojari717@gmail.com',
    github: 'https://github.com/NITHINKR06',
    linkedin: 'https://linkedin.com/in/nithinkr06',
    location: 'Chikkamagalur, India',
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: 'Drop me a line',
      href: `mailto:${personal.email}`,
      gradient: 'from-blue-400 to-purple-600',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'Check my repos',
      href: personal.github,
      gradient: 'from-gray-700 to-gray-900',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@_nithin.kr_',
      href: 'https://instagram.com/_nithin.kr_',
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personal.location,
      href: null,
      gradient: 'from-emerald-400 to-teal-600',
    },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-purple-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header - Apply Scroll-Triggered Fade-In */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 font-medium">Available for work</span>
            </div>

            <h3 className="text-5xl font-bold text-white mb-6 tracking-tight">
              Let's Connect
            </h3>

            <div className="flex items-center justify-center gap-3 mb-8">
              <Sparkles className="text-cyan-400 animate-spin" size={28} />
              <span className="text-2xl text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">
                Create Something Amazing
              </span>
              <Sparkles className="text-purple-400 animate-spin" size={28} style={{ animationDirection: 'reverse' }} />
            </div>

            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Ready to collaborate on your next project? I'd love to hear about your ideas and
              bring them to life.
            </p>
          </motion.div>

          {/* Contact Items - Apply Staggered Entry Animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.15 }}
            className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 justify-center items-center"
          >
            {contactItems.map((item, index) => {
              const IconComponent = item.icon;
              const isClickable = item.href !== null;

              const CardContent = (
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="group relative w-full"
                >
                  {/* mobile: minimal circle buttons */}
                  <div className="block lg:hidden">
                    <div
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className={`w-16 h-16 flex items-center justify-center rounded-full
                                    bg-gradient-to-br ${item.gradient}
                                    shadow-lg shadow-black/30
                                    hover:scale-110 hover:shadow-xl hover:shadow-white/10
                                    transition-all duration-300`}
                      >
                        <IconComponent size={26} className="text-white" />
                      </div>
                      <span className="text-white/80 text-sm font-medium">{item.label}</span>
                    </div>
                  </div>

                  {/* desktop: full cards */}
                  <div className="hidden lg:block relative p-8 h-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`}></div>

                    <div className="relative mb-6 flex justify-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-xl`}>
                        <IconComponent size={28} className="text-white" />
                      </div>
                      <div className={`absolute w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                    </div>

                    <div className="text-center relative">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                        {item.label}
                      </h3>
                      <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                        {item.value}
                      </p>
                    </div>

                    {isClickable && (
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Send size={16} className="text-white/80" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );

              return isClickable ? (
                <a
                  key={index}
                  href={item.href!}
                  target={item.href?.startsWith('http') ? '_blank' : undefined}
                  rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block"
                >
                  {CardContent}
                </a>
              ) : (
                <div key={index}>{CardContent}</div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
