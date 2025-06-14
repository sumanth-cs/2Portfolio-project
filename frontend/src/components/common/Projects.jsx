// frontend/src/components/common/Projects.jsx
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import placeholder from "../../assets/placeholder.png";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

function Projects({ projects, loading }) {
  const { colors } = useContext(ThemeContext);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="opacity-80 mb-2">Browse My Recent</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
        </motion.div>

        {projects.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No projects available. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project._id || `project-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ margin: "-100px" }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                }}
                className="w-full rounded-xl overflow-hidden shadow-md"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.buttonText,
                }}
              >
                <div className="h-48 overflow-hidden relative group">
                  <img
                    src={project.image || placeholder}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => (e.target.src = placeholder)}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.codeUrl && (
                      <motion.a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        className="p-2 rounded-full bg-white text-black"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        className="p-2 rounded-full bg-white text-black"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="opacity-80 mb-4">
                    {project.description || "No description available"}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: `${colors.primary}20`,
                          color: colors.buttonText,
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
