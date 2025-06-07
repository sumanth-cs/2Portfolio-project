import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Projects({ projects, loading }) {
  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-display">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one was built with care and attention to detail.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project._id || index} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;