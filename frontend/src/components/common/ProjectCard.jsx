import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ProjectCard = ({ project }) => {
  const { colors } = useTheme();

  return (
    <motion.div
      whileHover="hover"
      className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <motion.div
          variants={{ hover: { opacity: 1 } }}
          initial={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center gap-4"
          style={{ backgroundColor: `${colors.primary}cc` }}
        >
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white"
            >
              <ExternalLink size={20} style={{ color: colors.primary }} />
            </motion.a>
          )}
          {project.codeUrl && (
            <motion.a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white"
            >
              <Github size={20} style={{ color: colors.primary }} />
            </motion.a>
          )}
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded"
              style={{ backgroundColor: `${colors.primary}20`, color: colors.primary }}
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