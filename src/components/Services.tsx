import { motion, AnimatePresence } from 'framer-motion';
import { Code, Palette, Smartphone, Globe, Zap, Shield, ArrowRight, Check, Star, ArrowUp, ChevronDown, ChevronUp, Sparkles, Award, Users, Clock, TrendingUp, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const services = [
  { icon: Code, title: 'Full Stack Development', description: 'End-to-end web application development with modern technologies like React, Node.js, and databases.', features: ['Custom Web Applications', 'RESTful APIs', 'Database Design', 'Cloud Deployment'], gradient: 'from-blue-500 to-blue-600', price: 'Starting at $2,500', popular: false, delay: 0.1 },
  { icon: Globe, title: 'Frontend Development', description: 'Beautiful, responsive, and performant user interfaces that provide exceptional user experiences.', features: ['React/Next.js Apps', 'Responsive Design', 'Performance Optimization', 'Modern UI/UX'], gradient: 'from-blue-500 to-blue-600', price: 'Starting at $1,500', popular: true, delay: 0.2 },
  { icon: Palette, title: 'UI/UX Design', description: 'Creating intuitive and visually appealing designs that engage users and drive conversions.', features: ['Wireframing', 'Prototyping', 'User Research', 'Design Systems'], gradient: 'from-blue-500 to-blue-600', price: 'Starting at $1,000', popular: false, delay: 0.3 },
  { icon: Smartphone, title: 'Mobile-First Development', description: 'Responsive web applications optimized for all devices, ensuring seamless mobile experiences.', features: ['Progressive Web Apps', 'Mobile Optimization', 'Cross-Platform', 'Touch Interactions'], gradient: 'from-blue-500 to-blue-600', price: 'Starting at $2,000', popular: false, delay: 0.4 },
  { icon: Zap, title: 'Performance Optimization', description: 'Speed up your applications with advanced optimization techniques and best practices.', features: ['Code Splitting', 'Lazy Loading', 'SEO Optimization', 'Core Web Vitals'], gradient: 'from-blue-500 to-blue-600', price: 'Starting at $800', popular: false, delay: 0.5 },
  { icon: Shield, title: 'Security & Maintenance', description: 'Secure your applications and keep them running smoothly with ongoing support and updates.', features: ['Security Audits', 'Bug Fixes', 'Updates & Patches', '24/7 Support'], gradient: 'from-blue-500 to-blue-600', price: 'Starting at $500/mo', popular: false, delay: 0.6 }
];

const workProcess = [
  { step: '01', title: 'Discovery', description: 'Understanding your requirements, goals, and target audience to create the perfect solution.' },
  { step: '02', title: 'Design', description: 'Creating wireframes and prototypes to visualize the final product before development.' },
  { step: '03', title: 'Development', description: 'Building your application with clean, maintainable code and modern best practices.' },
  { step: '04', title: 'Delivery', description: 'Testing, deployment, and handover with documentation and ongoing support.' }
];

const testimonials = [
  { name: 'Sarah Johnson', role: 'CEO, Tech Startup', company: 'InnovateTech', content: 'Outstanding work! The attention to detail and technical expertise exceeded our expectations. Delivered on time and within budget.', rating: 5, avatar: '👩‍💼' },
  { name: 'Michael Chen', role: 'Product Manager', company: 'Digital Solutions', content: 'Professional, responsive, and delivered exactly what we needed. The communication throughout the project was excellent.', rating: 5, avatar: '👨‍💻' },
  { name: 'Emily Rodriguez', role: 'Founder, E-commerce', company: 'ShopFlow', content: 'Transformed our vision into reality with a beautiful and functional web application. Highly recommend for any web project!', rating: 5, avatar: '👩‍🚀' }
];

const stats = [
  { icon: Award, value: '50+', label: 'Projects Completed' },
  { icon: Users, value: '30+', label: 'Happy Clients' },
  { icon: Clock, value: '2+', label: 'Years Experience' },
  { icon: TrendingUp, value: '100%', label: 'Satisfaction Rate' }
];

const techStack = [
  { name: 'React', logo: '/logos/react-original.svg' },
  { name: 'Next.js', logo: '/logos/nextjs-original.svg' },
  { name: 'TypeScript', logo: '/logos/typescript-original.svg' },
  { name: 'Node.js', logo: '/logos/nodejs-original.svg' },
  { name: 'Tailwind CSS', logo: '/logos/tailwindcss-original.svg' },
  { name: 'MongoDB', logo: '/logos/mongodb-original.svg' },
  { name: 'PostgreSQL', logo: '/logos/postgresql-original.svg' },
  { name: 'Firebase', logo: '/logos/firebase-original.svg' },
  { name: 'Docker', logo: '/logos/docker-original.svg' },
  { name: 'Git', logo: '/logos/git-original.svg' },
  { name: 'Figma', logo: '/logos/figma-original.svg' },
  { name: 'Vercel', logo: '/logos/vercel-original.svg' }
];

const faqs = [
  { question: 'What is your typical project timeline?', answer: 'Project timelines vary based on complexity. A simple landing page takes 1-2 weeks, while a full-stack application can take 6-12 weeks. I provide detailed timelines during the initial consultation.' },
  { question: 'Do you offer ongoing maintenance and support?', answer: 'Yes! I offer various maintenance packages including bug fixes, updates, security patches, and feature additions. All projects include initial support period.' },
  { question: 'What technologies do you specialize in?', answer: 'I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various databases. I stay updated with the latest industry trends and best practices.' },
  { question: 'How do you handle project communication?', answer: 'I believe in transparent communication. We will have regular check-ins via your preferred method (email, Slack, video calls), and I provide weekly progress updates with demos.' },
  { question: 'What is your payment structure?', answer: 'I typically work with a 50% upfront payment and 50% upon completion. For larger projects, we can arrange milestone-based payments. All terms are clearly outlined in the contract.' },
  { question: 'Do you sign NDAs?', answer: 'Absolutely! I understand the importance of confidentiality and am happy to sign NDAs before discussing your project details.' }
];

export default function Services() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((window.scrollY / windowHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 relative">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 origin-left" style={{ scaleX: scrollProgress / 100 }} />

      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20">
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/">
              <motion.button className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 rounded-full text-white hover:bg-slate-700 transition-all" whileHover={{ scale: 1.05, x: -5 }} whileTap={{ scale: 0.95 }}>
                <Home size={20} />
                <span>Back to Portfolio</span>
              </motion.button>
            </Link>

            <motion.div 
              className="inline-block mb-6" 
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }} 
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <span className="text-5xl">✨</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Freelance <span className="text-blue-500">Services</span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Transform your ideas into reality with professional web development services. From concept to deployment, I deliver high-quality solutions tailored to your needs.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }} 
                    className="p-5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all" 
                    whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <Icon className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <Link to="/#contact">
                <motion.button 
                  className="px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all" 
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} 
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                  <ArrowRight className="inline-block ml-2" size={20} />
                </motion.button>
              </Link>
              <motion.a 
                href="#services" 
                onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} 
                className="px-8 py-4 rounded-full text-white font-semibold border-2 border-slate-700 hover:bg-slate-800 transition-all" 
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} 
                whileTap={{ scale: 0.95 }}
              >
                View Services
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-24 px-4 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-block mb-3" 
              animate={{ rotate: [0, 360] }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-10 h-10 text-blue-500" />
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              What I <span className="text-blue-500">Offer</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-slate-500 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Comprehensive web development services to bring your vision to life
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }} 
                  transition={{ duration: 0.5, delay: service.delay }} 
                  whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }} 
                  className="p-6 rounded-2xl group cursor-pointer relative overflow-hidden bg-slate-800 border border-slate-700 hover:bg-slate-750 transition-all duration-300"
                >
                  {service.popular && (
                    <motion.div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      POPULAR
                    </motion.div>
                  )}
                  <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-slate-500 mb-4 text-sm leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-slate-400">
                        <Check size={16} className="text-blue-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 rounded-lg bg-slate-700 border border-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-sm">{service.price}</span>
                      <Link to="/#contact">
                        <motion.button 
                          className="px-3 py-1.5 bg-blue-600 rounded-lg text-white text-xs font-semibold hover:bg-blue-700 transition-all duration-200" 
                          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} 
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn More
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-slate-800 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Tech <span className="text-blue-500">Stack</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Modern technologies I use to build exceptional applications</p>
          </motion.div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.5 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true, margin: "-50px" }} 
                transition={{ duration: 0.4, delay: index * 0.03 }} 
                whileHover={{ scale: 1.1, y: -5, transition: { duration: 0.2 } }} 
                className="p-4 rounded-xl bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-all duration-200 group"
              >
                <img src={tech.logo} alt={tech.name} className="w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                <p className="text-white text-center text-sm font-semibold">{tech.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              How I <span className="text-blue-500">Work</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">A streamlined process to ensure quality and timely delivery</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workProcess.map((process, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-50px" }} 
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                className="relative"
              >
                <div className="p-6 rounded-2xl h-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300">
                  <div className="text-5xl font-bold text-blue-500 mb-4">{process.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{process.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{process.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-slate-800 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Client <span className="text-blue-500">Testimonials</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">What clients say about working with me</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-50px" }} 
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                className="p-6 rounded-2xl bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{testimonial.avatar}</div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-400 mb-4 italic text-sm leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-slate-500 text-sm">{testimonial.role}</p>
                  <p className="text-blue-400 text-xs">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked <span className="text-blue-500">Questions</span>
            </h2>
            <p className="text-lg text-slate-500">Everything you need to know about my services</p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-50px" }} 
                transition={{ duration: 0.4, delay: index * 0.05 }} 
                className="rounded-xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all"
              >
                <button 
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} 
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-700 transition-all duration-200"
                >
                  <span className="text-base font-semibold text-white pr-8">{faq.question}</span>
                  {expandedFaq === index ? <ChevronUp className="text-blue-500 flex-shrink-0" size={20} /> : <ChevronDown className="text-blue-500 flex-shrink-0" size={20} />}
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      transition={{ duration: 0.2 }} 
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-slate-500 text-sm leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.6 }} 
            className="p-8 md:p-12 rounded-2xl text-center relative overflow-hidden bg-slate-800 border-2 border-blue-600"
          >
            <div className="relative z-10">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to Start Your <span className="text-blue-500">Project?</span>
              </motion.h2>
              <motion.p 
                className="text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Let's discuss your ideas and create something amazing together. Get in touch today for a free consultation!
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/#contact">
                  <motion.button 
                    className="px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all" 
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Me
                    <ArrowRight className="inline-block ml-2" size={20} />
                  </motion.button>
                </Link>
                <Link to="/">
                  <motion.button 
                    className="px-8 py-4 rounded-full text-white font-semibold border-2 border-slate-700 hover:bg-slate-700 transition-all" 
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    View Portfolio
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button 
            initial={{ opacity: 0, scale: 0 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0 }} 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all z-50" 
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }} 
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
