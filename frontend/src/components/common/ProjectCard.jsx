import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay with links */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white p-3 rounded-full text-gray-900 hover:text-primary-600"
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
          {project.codeUrl && (
            <motion.a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white p-3 rounded-full text-gray-900 hover:text-primary-600"
            >
              <Github size={20} />
            </motion.a>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;