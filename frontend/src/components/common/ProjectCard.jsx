import { motion } from 'framer-motion';
import { Github, ExternalLink, Eye, Code } from 'lucide-react';
import placeholder from '../../assets/placeholder.png';
import { getFileView } from '@/lib/appwrite/storage';

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
      className="rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden group">
        <img
          src={getFileView(project.image) || placeholder}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => (e.target.src = placeholder)}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-50 transition-opacity duration-300">
          {project.codeUrl && (
            <motion.a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white text-black hover:bg-gray-100"
            >
              <Code className="w-5 h-5" />
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white text-black hover:bg-gray-100"
            >
              <Eye className="w-5 h-5" />
            </motion.a>
          )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description || 'No description available.'}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/30"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;