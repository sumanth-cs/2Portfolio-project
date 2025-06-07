// import { motion } from 'framer-motion';
// import ProjectCard from './ProjectCard';

// const container = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// function Projects({ projects, loading }) {
//   if (loading) {
//     return (
//       <section id="projects" className="py-20" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
//         <div className="container mx-auto px-4">
//           <div className="text-center">Loading projects...</div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="projects" className="py-20" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true, margin: "-100px" }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
//             Featured Projects
//           </h2>
//           <p className="text-lg max-w-2xl mx-auto">
//             Here are some of my recent projects. Each one was built with care and attention to detail.
//           </p>
//         </motion.div>
//         <motion.div
//           variants={container}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, margin: "-100px" }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//         >
//           {projects.map((project, index) => (
//             <ProjectCard key={project._id || index} project={project} index={index} />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// export default Projects;

// frontend/src/components/common/Projects.jsx
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

function Projects({ projects }) {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="rounded-xl overflow-hidden shadow-lg bg-white/5 backdrop-blur-sm"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image || '/placeholder-project.jpg'}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="opacity-80 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/30">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;