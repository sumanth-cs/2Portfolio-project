import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

function Projects({ projects, loading }) {
  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <motion.section
      id="projects"
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
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project._id || `project-${index}`} project={project} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Projects;