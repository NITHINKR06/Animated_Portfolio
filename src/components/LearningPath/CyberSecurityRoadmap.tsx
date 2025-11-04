import { motion } from 'framer-motion';
import { 
  Shield, Lock, Network, Bug, Code2, Terminal, 
  CheckCircle2, ExternalLink, ArrowLeft 
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
}

export default function CyberSecurityRoadmap() {
  const navigate = useNavigate();

  const stages: RoadmapStage[] = [
    {
      id: 'fundamentals',
      title: 'Security Fundamentals',
      description: 'Basic concepts of cybersecurity, threats, and vulnerabilities',
      icon: Shield,
      color: 'from-blue-500 to-indigo-500',
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
      id: 'networking',
      title: 'Network Security',
      description: 'Understanding networks, protocols, and network security',
      icon: Network,
      color: 'from-green-500 to-emerald-500',
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
      id: 'systems',
      title: 'System & OS Security',
      description: 'Operating system security, Linux, and Windows security',
      icon: Terminal,
      color: 'from-purple-500 to-pink-500',
      courses: [
        {
          title: 'Linux for Beginners',
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
      id: 'websec',
      title: 'Web Application Security',
      description: 'OWASP Top 10, penetration testing, and web vulnerabilities',
      icon: Code2,
      color: 'from-red-500 to-orange-500',
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
      id: 'penetration',
      title: 'Penetration Testing & Ethical Hacking',
      description: 'Ethical hacking, penetration testing, and security assessments',
      icon: Bug,
      color: 'from-yellow-500 to-amber-500',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.button
          onClick={() => navigate('/learning-path')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Path Selection</span>
        </motion.button>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Cybersecurity <span className="text-gradient bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Roadmap</span>
          </h1>
          <p className="text-xl text-gray-400">
            Master the art of protecting digital systems and networks
          </p>
        </motion.div>

        <div className="space-y-8">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-white/10"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${stage.color} flex-shrink-0`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-bold text-white">{stage.title}</h2>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-sm">
                        Stage {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-400 text-lg">{stage.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  {stage.courses.map((course, courseIndex) => (
                    <motion.a
                      key={courseIndex}
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 rounded-xl border border-white/10 bg-black/20 hover:border-white/20 hover:bg-black/30 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{course.platform}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          course.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                          course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {course.level}
                        </span>
                        <span className="text-gray-500 text-xs">{course.duration}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-12 p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Start Your Cybersecurity Journey
          </h3>
          <p className="text-gray-400 mb-4">
            Practice with hands-on labs, CTF challenges, and real-world scenarios
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a 
              href="https://tryhackme.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              TryHackMe
            </a>
            <a 
              href="https://www.hackthebox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Hack The Box
            </a>
            <a 
              href="https://www.cybrary.it/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Cybrary
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
