import { motion } from 'framer-motion';
import { Code, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PathSelection() {
  const navigate = useNavigate();

  const paths = [
    {
      id: 'webdev',
      title: 'Web Development',
      description: 'Master modern web technologies and build full-stack applications',
      icon: Code,
      gradient: 'from-blue-500 to-cyan-500',
      hoverGradient: 'from-blue-600 to-cyan-600',
      color: 'blue',
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      description: 'Learn to protect systems and networks from cyber threats',
      icon: Shield,
      gradient: 'from-purple-500 to-pink-500',
      hoverGradient: 'from-purple-600 to-pink-600',
      color: 'purple',
    },
  ];

  const handleSelect = (pathId: string) => {
    navigate(`/learning-path/${pathId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full"
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Choose Your <span className="text-gradient bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Learning Path</span>
          </h1>
          <p className="text-xl text-gray-400">
            Select a path to explore curated free courses and learning resources
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <motion.button
                  onClick={() => handleSelect(path.id)}
                  className="w-full h-full p-8 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md text-left transition-all duration-300 hover:border-white/20 hover:bg-black/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${path.gradient} mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h2 className="text-3xl font-bold text-white mb-3">
                    {path.title}
                  </h2>

                  <p className="text-gray-400 mb-6 text-lg">
                    {path.description}
                  </p>

                  <div className="flex items-center text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    <span className="font-semibold mr-2">Start Learning</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </div>

                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${path.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`} />
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
