import { motion } from 'framer-motion';
import { 
  Shield, Lock, Network, Bug, Code2, Terminal, 
  ExternalLink, ArrowLeft, CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Course {
  title: string;
  platform: string;
  url: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
}

interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  courses: Course[];
  color: string;
  difficulty: 'Easy' | 'Intermediate' | 'Hard';
  type: 'Path' | 'Module';
  progress?: number;
  hasGraphic?: boolean;
}

export default function CyberSecurityRoadmap() {
  const navigate = useNavigate();
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  
  const stages: RoadmapStage[] = [
    {
      id: 'fundamentals',
      title: 'Cyber Security Foundations',
      description: 'Develop cyber security skills needed to enter any career in the industry',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      difficulty: 'Easy',
      type: 'Path',
      courses: [
        {
          title: 'Introduction to Cybersecurity',
          platform: 'Coursera (Free Audit)',
          url: 'https://www.coursera.org/learn/introduction-to-cybersecurity',
          level: 'Beginner',
          duration: '20 hours',
        },
        {
          title: 'Cybersecurity Fundamentals',
          platform: 'edX',
          url: 'https://www.edx.org/learn/cybersecurity',
          level: 'Beginner',
          duration: 'Self-paced',
        },
        {
          title: 'Cybersecurity for Everyone',
          platform: 'Coursera',
          url: 'https://www.coursera.org/learn/cybersecurity-for-everyone',
          level: 'Beginner',
          duration: '15 hours',
        },
      ],
    },
    {
      id: 'pre-security',
      title: 'Pre Security',
      description: 'Learn the basics needed to start your cyber security journey',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      difficulty: 'Easy',
      type: 'Path',
      progress: 11,
      hasGraphic: true,
      courses: [
        {
          title: 'Linux for Beginners',
          platform: 'FreeCodeCamp',
          url: 'https://www.freecodecamp.org/news/linux-command-line-for-beginners/',
          level: 'Beginner',
          duration: 'Self-paced',
        },
        {
          title: 'Network Basics',
          platform: 'Cisco Networking Academy',
          url: 'https://www.netacad.com/courses/networking',
          level: 'Beginner',
          duration: 'Self-paced',
        },
      ],
    },
    {
      id: 'networking',
      title: 'Network Security',
      description: 'Understanding networks, protocols, and network security',
      icon: Network,
      color: 'from-green-500 to-emerald-500',
      difficulty: 'Intermediate',
      type: 'Path',
      courses: [
        {
          title: 'Network Security',
          platform: 'Cybrary',
          url: 'https://www.cybrary.it/catalog/',
          level: 'Intermediate',
          duration: 'Self-paced',
        },
        {
          title: 'Introduction to Networking',
          platform: 'Cisco Networking Academy',
          url: 'https://www.netacad.com/courses/networking',
          level: 'Beginner',
          duration: '70 hours',
        },
        {
          title: 'Wireshark for Network Security',
          platform: 'Cybrary',
          url: 'https://www.cybrary.it/catalog/',
          level: 'Intermediate',
          duration: 'Self-paced',
        },
      ],
    },
    {
      id: 'websec',
      title: 'Web Application Security',
      description: 'Learn to identify and exploit vulnerabilities in web applications',
      icon: Code2,
      color: 'from-red-500 to-orange-500',
      difficulty: 'Intermediate',
      type: 'Path',
      progress: 2,
      hasGraphic: true,
      courses: [
        {
          title: 'Web Security Fundamentals',
          platform: 'OWASP',
          url: 'https://owasp.org/www-project-web-security-testing-guide/',
          level: 'Intermediate',
          duration: 'Self-paced',
        },
        {
          title: 'Burp Suite Tutorial',
          platform: 'PortSwigger Web Security Academy',
          url: 'https://portswigger.net/web-security',
          level: 'Intermediate',
          duration: 'Self-paced',
        },
        {
          title: 'OWASP Top 10',
          platform: 'OWASP',
          url: 'https://owasp.org/www-project-top-ten/',
          level: 'Intermediate',
          duration: 'Self-paced',
        },
      ],
    },
    {
      id: 'systems',
      title: 'System & OS Security',
      description: 'Operating system security, Linux, and Windows security',
      icon: Terminal,
      color: 'from-purple-500 to-pink-500',
      difficulty: 'Intermediate',
      type: 'Module',
      courses: [
        {
          title: 'Linux Security',
          platform: 'FreeCodeCamp',
          url: 'https://www.freecodecamp.org/news/linux-command-line-for-beginners/',
          level: 'Beginner',
          duration: 'Self-paced',
        },
        {
          title: 'CompTIA Security+',
          platform: 'Professor Messer',
          url: 'https://www.professormesser.com/security-plus/sy0-601/sy0-601-video/sy0-601-comptia-security-plus-course/',
          level: 'Intermediate',
          duration: '40 hours',
        },
        {
          title: 'Windows Security',
          platform: 'Cybrary',
          url: 'https://www.cybrary.it/catalog/',
          level: 'Intermediate',
          duration: 'Self-paced',
        },
      ],
    },
    {
      id: 'penetration',
      title: 'Penetration Testing',
      description: 'Ethical hacking, penetration testing, and security assessments',
      icon: Bug,
      color: 'from-yellow-500 to-amber-500',
      difficulty: 'Hard',
      type: 'Path',
      courses: [
        {
          title: 'Penetration Testing Basics',
          platform: 'TryHackMe',
          url: 'https://tryhackme.com/',
          level: 'Beginner',
          duration: 'Self-paced',
        },
        {
          title: 'Ethical Hacking Course',
          platform: 'Hack The Box',
          url: 'https://www.hackthebox.com/',
          level: 'Intermediate',
          duration: 'Self-paced',
        },
        {
          title: 'Metasploit Unleashed',
          platform: 'Offensive Security',
          url: 'https://www.offensive-security.com/metasploit-unleashed/',
          level: 'Advanced',
          duration: 'Self-paced',
        },
      ],
    },
    {
      id: 'cryptography',
      title: 'Cryptography',
      description: 'Encryption, hashing, and cryptographic protocols',
      icon: Lock,
      color: 'from-indigo-500 to-purple-500',
      difficulty: 'Hard',
      type: 'Module',
      courses: [
        {
          title: 'Cryptography I',
          platform: 'Coursera (Stanford)',
          url: 'https://www.coursera.org/learn/crypto',
          level: 'Intermediate',
          duration: '23 hours',
        },
        {
          title: 'Applied Cryptography',
          platform: 'Coursera',
          url: 'https://www.coursera.org/learn/applied-crypto',
          level: 'Intermediate',
          duration: 'Self-paced',
        },
        {
          title: 'Cryptography Basics',
          platform: 'Khan Academy',
          url: 'https://www.khanacademy.org/computing/computer-science/cryptography',
          level: 'Beginner',
          duration: 'Self-paced',
        },
      ],
    },
  ];

  // Calculate progress completion for visual path
  const completedStages = stages.filter(stage => stage.progress && stage.progress > 0).length;
  const progressPercentage = (completedStages / stages.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1117] to-[#0a0e1a] py-12 px-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => navigate('/learning-path')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Learning Paths</span>
          </button>

          <div className="mb-8 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Cyber Security Roadmap
            </motion.h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 mx-auto mb-4 rounded-full"></div>
          </div>
        </motion.div>

        {/* Tree Structure Roadmap - Top to Bottom */}
        <div className="relative py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative">
              {/* Vertical Path Line - Centered through all nodes */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/30 via-green-500/50 to-green-500/30 transform -translate-x-1/2 z-0"></div>
              
              {/* Tree Nodes Container - Vertical */}
              <div className="relative flex flex-col items-center">
                {stages.map((stage, index) => {
                  const Icon = stage.icon;
                  const isCompleted = stage.progress !== undefined && stage.progress > 0;
                  const progress = stage.progress || 0;
                  const isExpanded = expandedStage === stage.id;
                  
                  return (
                    <div key={stage.id} className="relative w-full">
                      {/* Node Container - Centered */}
                      <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                        className="relative flex flex-col items-center group z-10 w-full"
                      >
                        {/* Node Icon Container */}
                        <motion.div
                          className="relative cursor-pointer"
                          onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Progress Ring */}
                          {isCompleted && progress > 0 && progress < 100 && (
                            <svg className="absolute inset-0 w-20 h-20 -rotate-90 -z-10" style={{ width: '80px', height: '80px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                              <circle
                                cx="40"
                                cy="40"
                                r="36"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                className="text-green-500/20"
                              />
                              <motion.circle
                                cx="40"
                                cy="40"
                                r="36"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                className="text-green-500"
                                strokeDasharray={`${2 * Math.PI * 36}`}
                                initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - progress / 100) }}
                                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                              />
                            </svg>
                          )}

                          {/* Icon Node - Perfectly centered */}
                          <div className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/50 ring-2 ring-green-400/50' 
                              : 'bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 group-hover:border-green-500/50'
                          }`}>
                            <Icon className={`h-10 w-10 transition-colors ${
                              isCompleted ? 'text-white' : 'text-gray-400 group-hover:text-green-400'
                            }`} />
                            
                            {/* Completed Checkmark */}
                            {isCompleted && progress >= 100 && (
                              <div className="absolute -top-1 -right-1">
                                <CheckCircle2 className="h-6 w-6 text-green-500 fill-green-500 bg-gray-900 rounded-full" />
                              </div>
                            )}
                          </div>

                          {/* Progress Percentage */}
                          {isCompleted && progress > 0 && progress < 100 && (
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                              <span className="text-xs font-bold text-green-400">{progress}%</span>
                            </div>
                          )}

                          {/* Node Number */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center z-20">
                            <span className="text-xs font-bold text-gray-400">{index + 1}</span>
                          </div>
                        </motion.div>

                        {/* Title and Description - Centered */}
                        <div className="mt-4 text-center w-full max-w-lg">
                          <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                            {stage.title}
                          </h3>
                          <p className="text-sm text-gray-400 leading-relaxed mb-3 px-4">
                            {stage.description}
                          </p>
                          
                          {/* Difficulty Badge */}
                          <div className="flex items-center justify-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              stage.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                              stage.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {stage.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* Expanded Courses Panel */}
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl p-4 mt-4"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-semibold text-white">Courses & Resources</h4>
                              <button
                                onClick={() => setExpandedStage(null)}
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                              {stage.courses.map((course, courseIndex) => (
                                <a
                                  key={courseIndex}
                                  href={course.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-start gap-2 p-2 rounded hover:bg-gray-800/50 transition-colors group/item"
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                                    course.level === 'Beginner' ? 'bg-green-500' :
                                    course.level === 'Intermediate' ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`}></div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-300 group-hover/item:text-white transition-colors font-medium">
                                      {course.title}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">{course.platform}</p>
                                  </div>
                                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover/item:text-green-400 transition-colors flex-shrink-0 mt-1" />
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                      
                      {/* Connection Line - Between nodes */}
                      {index < stages.length - 1 && (
                        <div className="relative w-full flex justify-center py-4 md:py-6">
                          <div className="relative w-0.5 h-12 md:h-16">
                            <motion.div
                              className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-green-500/50 via-green-500/60 to-green-500/50 z-0"
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                              style={{ transformOrigin: 'top' }}
                            />
                            {/* Arrow head pointing down */}
                            <motion.div
                              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-4 border-t-green-500/60 border-l-2 border-l-transparent border-r-2 border-r-transparent z-10"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.1 + 0.9 }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Click hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-sm text-gray-500 mt-12"
          >
            Click on any node to view courses and resources
          </motion.p>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-3">Ready to Continue Your Journey?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Explore over 1.1K walkthroughs and challenge rooms, with new content added every week!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href="https://tryhackme.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
              >
                Explore TryHackMe
              </a>
              <a 
                href="https://www.hackthebox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg bg-[#161b22] hover:bg-gray-800 border border-gray-700/50 text-white font-semibold transition-all"
              >
                Check Hack The Box
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
