// // frontend/src/components/common/About.jsx
// import { motion } from 'framer-motion';
// import { Card, CardContent } from '../ui/card';

// function About({ bio }) {
//   return (
//     <section id="about" className="py-20 bg-white dark:bg-gray-950">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true, margin: "-100px" }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             About Me
//           </h2>
//           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             Get to know me better
//           </p>
//         </motion.div>

//         <Card className="max-w-5xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
//               <motion.div
//                 initial={{ x: -50, opacity: 0 }}
//                 whileInView={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.6 }}
//                 className="lg:col-span-1"
//               >
//                 <img
//                   src={bio.image || '/src/assets/profile.jpg'}
//                   alt="About"
//                   className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg"
//                 />
//               </motion.div>
//               <motion.div
//                 initial={{ x: 50, opacity: 0 }}
//                 whileInView={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.6 }}
//                 className="lg:col-span-2"
//               >
//                 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
//                   {bio.description}
//                 </p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                     <h3 className="font-medium text-gray-900 dark:text-white mb-2">Experience</h3>
//                     <p className="text-primary-600 dark:text-primary-400">5+ Years</p>
//                   </div>
//                   <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                     <h3 className="font-medium text-gray-900 dark:text-white mb-2">Projects</h3>
//                     <p className="text-primary-600 dark:text-primary-400">20+ Completed</p>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </section>
//   );
// }

// export default About;

// frontend/src/components/common/About.jsx
import { motion } from 'framer-motion';

function About({ bio }) {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="opacity-80 mb-2">Get To Know More</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <img
              src={bio.image || '/src/assets/profile.jpg'}
              alt="About"
              className="w-full max-w-md rounded-2xl shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium mb-2">Experience</h3>
                <p className="opacity-80">2+ Years</p>
                <p className="opacity-80">Fullstack Development</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium mb-2">Education</h3>
                <p className="opacity-80">B.Sc. Computer Science</p>
                <p className="opacity-80">M.Sc. Software Engineering</p>
              </div>
            </div>

            <p className="opacity-80 leading-relaxed">
              {bio.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;