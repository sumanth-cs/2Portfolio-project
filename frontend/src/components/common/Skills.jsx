import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';

function Skills({ skills, loading }) {
  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <motion.section
      id="skills"
      className="py-16 bg-surface"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center text-primary mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={`skill-${index}`}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
            >
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <p className="text-lg font-semibold text-primary">{skill.name}</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                    <motion.div
                      className="bg-primary h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                  <p className="text-sm text-text-secondary-on-background mt-2">{skill.level}%</p>
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