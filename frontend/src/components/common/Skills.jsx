import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

function Skills({ skills, loading }) {
  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'basic':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
      </div>
      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="opacity-80 mb-2">Explore My</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{skill.name}</h3>
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <span className={`px-3 py-1 text-sm rounded-full text-white ${getLevelColor(skill.level)}`}>
                {skill.level}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;