import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

function Experience({ experiences, loading }) {
  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <motion.section
      id="experience"
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
          Experience
        </motion.h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
          {experiences.map((exp, index) => (
            <motion.div
              key={`exp-${index}`}
              className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="w-5/12"></div>
              <div className="w-5/12 bg-surface p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <p className="text-sm text-text-secondary-on-background">{exp.period}</p>
                </div>
                <h3 className="text-xl font-semibold text-primary">{exp.title} at {exp.company}</h3>
                <p className="text-text-primary-on-background">{exp.description || 'No description provided.'}</p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Experience;