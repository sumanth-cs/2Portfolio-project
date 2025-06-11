import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

function Experience({ experiences, loading }) {
  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <section id="experience" className="py-20 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="bubble bubble-5"></div>
        <div className="bubble bubble-6"></div>
      </div>
      <div className="max-w-4xl mx-auto p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="opacity-80 mb-2">Explore My</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-500"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          {experiences.map((exp, index) => (
            <motion.div
              key={`exp-${index}`}
              className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="w-5/12"></div>
              <div className="w-5/12 p-6 rounded-lg shadow-md hover:shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-primary-500" />
                  <p className="text-sm opacity-80">{exp.period}</p>
                </div>
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="opacity-80">{exp.company}</p>
                <p className="mt-2 text-sm">{exp.description}</p>
              </div>
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;