import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card.jsx';

function Skills() {
  const skills = [
    { name: 'JavaScript', level: 'Expert', percentage: 90 },
    { name: 'React', level: 'Expert', percentage: 85 },
    { name: 'Node.js', level: 'Intermediate', percentage: 70 },
    { name: 'Tailwind CSS', level: 'Expert', percentage: 80 },
    { name: 'MongoDB', level: 'Intermediate', percentage: 65 },
    { name: 'Python', level: 'Beginner', percentage: 50 },
  ];

  return (
    <motion.section
      id="skills"
      className="py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center text-red-700 mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
            >
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <p className="text-lg font-semibold text-red-700">{skill.name}</p>
                  <p className="text-sm text-gray-600 mb-2">{skill.level}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      className="bg-red-700 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    ></motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Skills;