import { motion } from 'framer-motion';
import { 
  Code2, Layers, Server, Database, 
  GitBranch, CheckCircle2, ExternalLink, ArrowLeft 
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

export default function WebDevRoadmap() {
  const navigate = useNavigate();

  const stages: RoadmapStage[] = [
    {
      id: 'foundations',
      title: 'Foundations',
      description: 'HTML, CSS, and JavaScript fundamentals',
      icon: Code2,
      color: 'from-orange-500 to-red-500',
      courses: [
        {
          title: 'HTML & CSS - FreeCodeCamp',
          platform: 'FreeCodeCamp',
          url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
          level: 'Beginner',
          duration: '300 hours',
        },
        {
          title: 'JavaScript - The Complete Guide',
          platform: 'FreeCodeCamp',
          url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
          level: 'Beginner',
          duration: '300 hours',
        },
        {
          title: 'MDN Web Docs - JavaScript Guide',
          platform: 'MDN',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
          level: 'Beginner',
          duration: 'Self-paced',
        },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend Frameworks',
      description: 'React, Vue, or Angular - Modern UI development',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500',
      courses: [
        {
          title: 'React - The Complete Guide',
          platform: 'FreeCodeCamp',
          url: 'https://www.freecodecamp.org/news/react-course-for-beginners/',
          level: 'Intermediate',
          duration: 'Self-paced',
        },
        {
          title: 'React Tutorial - Official Docs',
          platform: 'React',
          url: 'https://react.dev/learn',
          level: 'Beginner',
          duration: 'Self-paced',
        },
        {
          title: 'Frontend Masters - React Course',
          platform: 'Frontend Masters',
          url: 'https://frontendmasters.com/courses/complete-react-v6/',
          level: 'Intermediate',
          duration: '15 hours',
        },
      ],
    },
    {
      id: 'backend',
      title: 'Backend Development',
      description: 'Node.js, APIs, and server-side programming',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      courses: [
        {
          title: 'Node.js - The Complete Guide',
          platform: 'FreeCodeCamp',
          url: 'https://www.freecodecamp.org/news/node-js-course/',
          level: 'Intermediate',
          duration: 'Self-paced',
        },
        {
          title: 'Express.js Tutorial',
          platform: 'MDN',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs',
          level: 'Intermediate',
          duration: 'Self-paced',
        },
        {
          title: 'REST APIs - FreeCodeCamp',
          platform: 'FreeCodeCamp',
          url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
          level: 'Intermediate',
          duration: '300 hours',
        },
      ],
    },
    {
      id: 'database',
      title: 'Databases',
      description: 'SQL and NoSQL databases',
      icon: Database,
      color: 'from-yellow-500 to-orange-500',
      courses: [
        {
          title: 'SQL - FreeCodeCamp',
          platform: 'FreeCodeCamp',
          url: 'https://www.freecodecamp.org/learn/relational-database/',
          level: 'Beginner',
          duration: '300 hours',
        },
        {
          title: 'MongoDB University',
          platform: 'MongoDB',
          url: 'https://university.mongodb.com/',
          level: 'Beginner',
          duration: 'Self-paced',
        },
        {
          title: 'PostgreSQL Tutorial',
          platform: 'PostgreSQL',
          url: 'https://www.postgresqltutorial.com/',
          level: 'Beginner',
          duration: 'Self-paced',
        },
      ],
    },
    {
      id: 'tools',
      title: 'Dev Tools & Practices',
      description: 'Git, Testing, Deployment, and Best Practices',
      icon: GitBranch,
      color: 'from-purple-500 to-pink-500',
      courses: [
        {
          title: 'Git & GitHub - FreeCodeCamp',
          platform: 'FreeCodeCamp',
          url: 'https://www.freecodecamp.org/news/git-and-github-crash-course/',
          level: 'Beginner',
          duration: 'Self-paced',
        },
        {
          title: 'GitHub Skills',
          platform: 'GitHub',
          url: 'https://skills.github.com/',
          level: 'Beginner',
          duration: 'Self-paced',
        },
        {
          title: 'Web Development Best Practices',
          platform: 'MDN',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing',
          level: 'Intermediate',
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
            Web Development <span className="text-gradient bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Roadmap</span>
          </h1>
          <p className="text-xl text-gray-400">
            A comprehensive guide to becoming a full-stack web developer
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
                      <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
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
          className="mt-12 p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to Start Your Journey?
          </h3>
          <p className="text-gray-400 mb-4">
            Follow the roadmap step by step and practice building projects along the way
          </p>
        </motion.div>
      </div>
    </div>
  );
}
