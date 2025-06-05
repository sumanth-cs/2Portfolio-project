// import { motion } from 'framer-motion';

// function Education() {
//   const educations = [
//     {
//       title: 'B.Sc. Computer Science, XYZ University',
//       period: '2016 - 2020',
//       description: 'Graduated with honors, specializing in software engineering and web development.',
//     },
//     {
//       title: 'High School Diploma, ABC School',
//       period: '2014 - 2016',
//       description: 'Focused on mathematics and computer science.',
//     },
//   ];

//   return (
//     <motion.section
//       id="education"
//       className="py-20 bg-gray-100"
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
//           Education
//         </motion.h2>
//         <div className="relative">
//           <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-700"></div>
//           {educations.map((edu, index) => (
//             <motion.div
//               key={index}
//               className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
//               initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
//               whileInView={{ x: 0, opacity: 1 }}
//               transition={{ delay: index * 0.2, duration: 0.6 }}
//             >
//               <div className="w-5/12"></div>
//               <div className="w-5/12 bg-white p-6 rounded-lg shadow-lg">
//                 <h3 className="text-xl font-semibold text-red-700">{edu.title}</h3>
//                 <p className="text-gray-600 text-sm mb-2">{edu.period}</p>
//                 <p className="text-gray-700">{edu.description}</p>
//               </div>
//               <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-700 rounded-full"></div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   );
// }

// export default Education;

import { motion } from 'framer-motion';

function Education() {
  const educations = [
    {
      title: 'B.Sc. Computer Science, XYZ University',
      period: '2016 - 2020',
      description: 'Graduated with honors, specializing in software engineering and web development.',
    },
    {
      title: 'High School Diploma, ABC School',
      period: '2014 - 2016',
      description: 'Focused on mathematics and computer science.',
    },
  ];

  return (
    <motion.section
      id="education"
      className="py-20 bg-surface"
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
          Education
        </motion.h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="w-5/12"></div>
              <div className="w-5/12 bg-surface p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-primary">{edu.title}</h3>
                <p className="text-text-secondary-on-background text-sm mb-2">{edu.period}</p>
                <p className="text-text-primary-on-background">{edu.description}</p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Education;