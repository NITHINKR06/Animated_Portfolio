import { motion } from 'framer-motion';
import { 
  Shield, Lock, Network, Bug, Code2, Terminal, 
  ExternalLink, ArrowLeft, TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="min-h-screen bg-[#0d1117] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <button
            onClick={() => navigate('/learning-path')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Learning Paths</span>
          </button>

          <div className="mb-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
              Cyber Security Learning Roadmap
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              From fundamental principles to advanced techniques, this roadmap provides clear steps and essential resources to help you build a robust skill set.
            </p>
          </div>
        </motion.div>

        {/* Roadmap Cards */}
        <div className="relative">
          {/* Vertical Connecting Lines */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-700/50 transform -translate-x-1/2 hidden md:block">
            {stages.map((_, index) => (
              index < stages.length - 1 && (
                <div
                  key={index}
                  className="absolute top-0 w-full h-32 bg-gradient-to-b from-gray-700/50 to-transparent"
                  style={{ top: `${(index + 1) * 100}%` }}
                />
              )
            ))}
          </div>

          {/* Cards */}
          <div className="space-y-6">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isLast = index === stages.length - 1;
              
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Latest Enrolled Tag */}
                  {stage.progress !== undefined && stage.progress > 0 && (
                    <div className="absolute -top-3 left-6 z-20 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      Latest enrolled path
                    </div>
                  )}

                  {/* Connecting Line */}
                  {!isLast && (
                    <div className="absolute left-1/2 top-full w-0.5 h-6 bg-gray-700/50 transform -translate-x-1/2 z-0 hidden md:block" />
                  )}

                  {/* Card */}
                  <div className={`relative bg-[#161b22] rounded-lg border ${
                    stage.hasGraphic 
                      ? 'border-green-500/50' 
                      : 'border-gray-700/50'
                  } overflow-hidden`}>
                    <div className="flex">
                      {/* Left Graphic (for special cards) */}
                      {stage.hasGraphic && (
                        <div className={`w-32 md:w-40 flex items-center justify-center bg-gradient-to-br ${stage.color} p-6 hidden md:flex`}>
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/20 rounded-lg blur-xl"></div>
                            <Icon className="h-16 w-16 text-white relative z-10" />
                          </div>
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white mb-2">
                              {stage.title}
                            </h2>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex items-center gap-1.5">
                                <TrendingUp className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-400">{stage.difficulty} {stage.type}</span>
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {stage.description}
                            </p>
                          </div>

                          {/* Progress Indicator */}
                          {stage.progress !== undefined && (
                            <div className="ml-4 flex items-center justify-center w-12 h-12 rounded-full border-2 border-green-500 bg-[#161b22]">
                              <span className="text-xs font-semibold text-green-400">{stage.progress}%</span>
                            </div>
                          )}
                        </div>

                        {/* Courses List */}
                        <div className="mt-4 pt-4 border-t border-gray-700/50 space-y-2">
                          {stage.courses.map((course, courseIndex) => (
                            <motion.a
                              key={courseIndex}
                              href={course.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 rounded bg-gray-900/50 hover:bg-gray-800/70 transition-colors group"
                              whileHover={{ x: 4 }}
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                  course.level === 'Beginner' ? 'bg-green-500' :
                                  course.level === 'Intermediate' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}></div>
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                  {course.title}
                                </span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">{course.platform}</span>
                              </div>
                              <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-green-400 transition-colors flex-shrink-0" />
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center p-8 rounded-lg bg-gray-900/50 border border-gray-700/50"
          >
            <h3 className="text-xl font-bold text-white mb-2">What's next?</h3>
            <p className="text-gray-400 mb-4">
              Explore over 1.1K walkthroughs and challenge rooms, with new content added every week!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href="https://tryhackme.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-[#161b22] hover:bg-gray-800 border border-gray-700/50 text-white transition-colors text-sm font-medium"
              >
                Explore more
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
