// import { motion } from 'framer-motion';
// import { Briefcase } from 'lucide-react';

// const timelineItem = {
//   hidden: { opacity: 0, y: 20 },
//   show: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.1,
//       duration: 0.5,
//     },
//   }),
// };

// function Experience({ experiences, loading }) {
//   if (loading) {
//     return (
//       <section id="experience" className="py-20 bg-white dark:bg-gray-900">
//         <div className="container mx-auto px-4">
//           <div className="text-center">Loading experience...</div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="experience" className="py-20 bg-white dark:bg-gray-900">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true, margin: "-100px" }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-display">
//             Professional Experience
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             My career journey and professional milestones
//           </p>
//         </motion.div>

//         <div className="relative max-w-3xl mx-auto">
//           {/* Timeline line */}
//           <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
          
//           {experiences.map((exp, index) => (
//             <motion.div
//               key={index}
//               custom={index}
//               variants={timelineItem}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, margin: "-50px" }}
//               className={`mb-8 flex ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
//             >
//               <div className="w-5/12 px-4">
//                 {/* Empty space for alternating layout */}
//               </div>
              
//               {/* Timeline dot */}
//               <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900 z-10" />
              
//               <div className="w-5/12 px-4">
//                 <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300">
//                       <Briefcase className="w-5 h-5" />
//                     </div>
//                     <span className="text-sm text-gray-500 dark:text-gray-400">
//                       {exp.period}
//                     </span>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
//                     {exp.title}
//                   </h3>
//                   <p className="text-primary-600 dark:text-primary-400 mb-3">
//                     {exp.company}
//                   </p>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {exp.description || 'No description provided.'}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Experience;

// frontend/src/components/common/Experience.jsx
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

function Experience({ experiences }) {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="opacity-80 mb-2">Explore My</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4">Frontend Development</h3>
            {['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind'].map((skill, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">{skill}</h4>
                  <p className="text-sm opacity-80">Experienced</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4">Backend Development</h3>
            {['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST API', 'GraphQL'].map((skill, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">{skill}</h4>
                  <p className="text-sm opacity-80">Experienced</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Experience;