import { motion } from "framer-motion";
import { Eye, Code } from "lucide-react";
import placeholder from "../../assets/placeholder.png";
import { getFileView } from "@/lib/appwrite/storage";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

function ProjectCard({ project, index }) {
  const { colors } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={!isMobile ? {
        y: -10,
        boxShadow: `0 10px 25px -5px ${colors.primary}20`,
      } : {}}
      className="rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-100"
    >
      {/* Image with hover effect for desktop */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getFileView(project.image) || placeholder}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => (e.target.src = placeholder)}
        />
        
        {/* Desktop hover overlay */}
        {!isMobile && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center gap-4 transition-all duration-300">
            {project.codeUrl && (
              <motion.a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: colors.text, color: colors.background }}
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
                className="p-3 rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: colors.background, color: colors.text }}
              >
                <Eye className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        )}
      </div>

      {/* Always visible buttons for mobile */}
      {isMobile && (
        <div className="flex justify-center gap-4 p-3 bg-gray-100 dark:bg-gray-200">
          {project.codeUrl && (
            <motion.a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full"
              style={{ backgroundColor: colors.text, color: colors.background }}
            >
              <Code className="w-5 h-5" />
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full"
              style={{ backgroundColor: colors.background, color: colors.text }}
            >
              <Eye className="w-5 h-5" />
            </motion.a>
          )}
        </div>
      )}

      {/* Project info */}
      <div className="p-6 text-white" style={{ backgroundColor: colors.text, color: colors.background }}>
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="opacity-80 mb-4">
          {project.description || 'No description available.'}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 text-xs rounded-full"
              style={{ 
                backgroundColor: `${colors.primary}20`,
                color: colors.text 
              }}
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