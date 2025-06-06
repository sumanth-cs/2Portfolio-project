// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardContent } from '../components/ui/card.jsx';
// import { Button } from '../components/ui/button.jsx';

// function Projects() {
//   const projects = [
//     {
//       title: 'E-Commerce Platform',
//       description: 'A full-stack e-commerce app built with React and Node.js.',
//       link: 'https://example.com',
//       image: 'https://via.placeholder.com/300x200',
//     },
//     {
//       title: 'Task Manager',
//       description: 'A task management tool with real-time updates using WebSockets.',
//       link: 'https://example.com',
//       image: 'https://via.placeholder.com/300x200',
//     },
//     {
//       title: 'Portfolio Website',
//       description: 'A modern portfolio website built with React and Tailwind CSS.',
//       link: 'https://example.com',
//       image: 'https://via.placeholder.com/300x200',
//     },
//   ];

//   const [activeProject, setActiveProject] = useState(null);

//   return (
//     <motion.section
//       id="projects"
//       className="py-20 bg-gray-100 parallax"
//       style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080)' }}
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.h2
//           className="text-4xl font-bold text-center text-red-700 mb-12"
//           initial={{ y: 50, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           Projects
//         </motion.h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {projects.map((project, index) => (
//             <motion.div
//               key={project.title}
//               initial={{ y: 50, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               transition={{ delay: index * 0.1, duration: 0.6 }}
//               onClick={() => setActiveProject(activeProject === index ? null : index)}
//             >
//               <Card className="relative overflow-hidden shadow-lg group">
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <motion.div
//                   className="absolute inset-0 bg-red-700 bg-opacity-90 flex flex-col items-center justify-center p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity md:group-hover:opacity-100 md:opacity-0"
//                   animate={{ opacity: activeProject === index ? 1 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
//                   <p className="text-sm mb-4 text-center">{project.description}</p>
//                   <a href={project.link} target="_blank" rel="noopener noreferrer">
//                     <Button variant="outline" className="text-white border-white hover:bg-teal-700">
//                       View Project
//                     </Button>
//                   </a>
//                 </motion.div>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   );
// }

// export default Projects;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';

function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce app built with React and Node.js.',
      link: 'https://example.com',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Task Manager',
      description: 'A task management tool with real-time updates using WebSockets.',
      link: 'https://example.com',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Portfolio Website',
      description: 'A modern portfolio website built with React and Tailwind CSS.',
      link: 'https://example.com',
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  const [activeProject, setActiveProject] = useState(null);

  return (
    <motion.section
      id="projects"
      className="py-20 bg-surface parallax"
      style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080)' }}
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
            <motion.div
              key={project.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setActiveProject(activeProject === index ? null : index)}
            >
              <Card className="relative overflow-hidden shadow-lg group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-primary bg-opacity-90 flex flex-col items-center justify-center p-4 text-on-primary opacity-0 group-hover:opacity-100 transition-opacity md:group-hover:opacity-100 md:opacity-0"
                  animate={{ opacity: activeProject === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm mb-4 text-center">{project.description}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="text-on-primary border-on-primary hover:bg-secondary hover:text-on-secondary">
                      View Project
                    </Button>
                  </a>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Projects;