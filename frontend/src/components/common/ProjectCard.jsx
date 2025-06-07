import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ProjectCard({ project, index }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
      }}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
      className="rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
    >
      <img
        src={project.image || 'https://via.placeholder.com/300x200'}
        alt={project.title}
        className="w-full h-48 object-cover"
        onError={(e) => (e.target.src = '/fallback-image.jpg')}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {project.description || 'No description available.'}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags?.map((tag, tagIndex) => (
            <span key={tagIndex} className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex space-x-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Live Demo
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;