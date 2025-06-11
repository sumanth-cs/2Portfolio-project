// import { motion } from 'framer-motion';
// import { GraduationCap } from 'lucide-react';

// function Education({ educations, loading }) {
//   if (loading) {
//     return <div className="text-center py-16">Loading...</div>;
//   }

//   return (
//     <motion.section
//       id="education"
//       className="py-16 bg-surface"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.h2
//           className="text-4xl font-bold text-center text-primary mb-12"
//           initial={{ y: 50, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           Education
//         </motion.h2>
//         <div className="relative">
//           <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
//           {educations.map((edu, index) => (
//             <motion.div
//               key={`edu-${index}`}
//               className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
//               initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
//               whileInView={{ x: 0, opacity: 1 }}
//               transition={{ delay: index * 0.2, duration: 0.6 }}
//             >
//               <div className="w-5/12"></div>
//               <div className="w-5/12 bg-surface p-6 rounded-lg shadow-lg">
//                 <div className="flex items-center gap-2 mb-2">
//                   <GraduationCap className="w-5 h-5 text-primary" />
//                   <p className="text-sm text-text-secondary-on-background">{edu.period}</p>
//                 </div>
//                 <h3 className="text-xl font-semibold text-primary">{edu.degree}</h3>
//                 <p className="text-text-primary-on-background">{edu.institution}</p>
//               </div>
//               <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   );
// }

// export default Education;

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

function Education({ educations, loading }) {
  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <section id="education" className="py-20 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="bubble bubble-7"></div>
        <div className="bubble bubble-8"></div>
      </div>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="opacity-80 mb-2">My Academic Journey</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-500"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          {educations.map((edu, index) => (
            <motion.div
              key={`edu-${index}`}
              className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="w-5/12"></div>
              <div className="w-5/12 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-primary-500" />
                  <p className="text-sm opacity-80">{edu.period}</p>
                </div>
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <p className="opacity-80">{edu.institution}</p>
              </div>
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-700 mt-20" />
    </section>
  );
}

export default Education;