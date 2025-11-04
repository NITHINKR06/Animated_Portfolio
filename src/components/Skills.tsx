import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolio";

const SkillCard = ({
  skill,
  index,
}: {
  skill: { name: string; logo: string; link: string; color: string };
  index: number;
}) => {
  return (
  <motion.a
    href={skill.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
    whileHover={{
      scale: 1.08,
      y: -2,
      boxShadow: `0 0 25px ${skill.color}80`,
      borderColor: `${skill.color}90`,
    }}
    className="
          group flex flex-col items-center justify-center
          bg-white/10         
          backdrop-blur-md      
          border border-white/10
          rounded-xl p-4 w-28 h-28
          shadow-md shadow-black/10
          transition-all duration-500 ease-out
        "
  >
    <img
      src={skill.logo}
      alt={skill.name}
      className="w-8 h-8 mb-2 object-contain opacity-90 group-hover:opacity-100 transition"
      style={{ filter: `drop-shadow(0 0 6px ${skill.color}80)` }}
    />
    <span className="text-xs text-gray-300 font-medium text-center">{skill.name}</span>
  </motion.a>
  );
};

const CategoryTab = ({
  category,
  isActive,
  onClick,
}: {
  category: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={`
        group relative px-6 py-3 rounded-xl
        font-medium text-sm sm:text-base tracking-wide
        transition-all duration-500
        ${isActive ? "text-white" : "text-slate-300 hover:text-white"}
      `}
    >
      {/* glass base */}
      <div className="absolute inset-0 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-inner shadow-black/10" />

      {/* active glow */}
      {isActive && (
        <motion.div
          layoutId="activeGlow"
          className="absolute inset-0 rounded-xl"
          style={{
            boxShadow:
              "0 0 20px rgba(99,102,241,0.35), 0 0 50px rgba(236,72,153,0.25)",
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(236,72,153,0.1))",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        />
      )}

      {/* sweep shine on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -left-1/3 group-hover:animate-shine" />
      </div>

      <span className="relative z-10">{category}</span>
    </motion.button>
  );
};

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const categories = portfolioData.skills.map((skill) => skill.category);

  return (
    <section
      id="skills"
      className="min-h-screen from-slate-900 via-slate-800 to-slate-900 py-20 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            style={{
              background:
                "linear-gradient(45deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            Technologies and tools I use to create exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-row flex-wrap justify-center gap-3 pb-10"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CategoryTab
                category={category}
                isActive={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center max-w-4xl mx-auto"
        >
          {portfolioData.skills
            .find((cat) => cat.category === activeCategory)
            ?.items.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
        </motion.div>
      </div>
    </section>
  );
};
