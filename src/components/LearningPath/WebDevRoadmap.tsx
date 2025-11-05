import { motion } from 'framer-motion';
import { 
  Code2, Layers, Server, Database, 
  GitBranch, ExternalLink, ArrowLeft, TrendingUp
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

export default function WebDevRoadmap() {
  const navigate = useNavigate();

  const stages: RoadmapStage[] = [
    {
      id: 'foundations',
      title: 'Web Development Foundations',
      description: 'Acquire the basic web development skills required to get started',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      difficulty: 'Easy',
      type: 'Path',
      progress: 0,
      hasGraphic: true,
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
      title: 'Frontend Development',
      description: 'Master modern frontend frameworks and build interactive user interfaces',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500',
      difficulty: 'Intermediate',
      type: 'Path',
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
      description: 'Learn server-side programming, APIs, and database management',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      difficulty: 'Intermediate',
      type: 'Path',
      hasGraphic: true,
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
      title: 'Database Management',
      description: 'Understand SQL and NoSQL databases for modern applications',
      icon: Database,
      color: 'from-yellow-500 to-orange-500',
      difficulty: 'Intermediate',
      type: 'Module',
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
      title: 'DevOps & Best Practices',
      description: 'Master development tools, version control, testing, and deployment',
      icon: GitBranch,
      color: 'from-purple-500 to-pink-500',
      difficulty: 'Hard',
      type: 'Path',
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
              Web Development Learning Roadmap
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-4"></div>
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
                  {/* Connecting Line */}
                  {!isLast && (
                    <div className="absolute left-1/2 top-full w-0.5 h-6 bg-gray-700/50 transform -translate-x-1/2 z-0 hidden md:block" />
                  )}

                  {/* Card */}
                  <div className={`relative bg-[#161b22] rounded-lg border ${
                    stage.hasGraphic 
                      ? 'border-blue-500/50' 
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
                            <div className="ml-4 flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 bg-[#161b22]">
                              <span className="text-xs font-semibold text-blue-400">{stage.progress}%</span>
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
                              <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
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
            transition={{ delay: 0.6 }}
            className="mt-12 text-center p-8 rounded-lg bg-gray-900/50 border border-gray-700/50"
          >
            <h3 className="text-xl font-bold text-white mb-2">What's next?</h3>
            <p className="text-gray-400 mb-4">
              Continue your learning journey with more resources and practice projects
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
