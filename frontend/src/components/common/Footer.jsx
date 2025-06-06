// // import { motion } from 'framer-motion';
// // import { FaGithub, FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6';

// // function Footer() {
// //   const scrollToSection = (id) => {
// //     const element = document.getElementById(id);
// //     if (element) {
// //       element.scrollIntoView({ behavior: 'smooth' });
// //     }
// //   };

// //   return (
// //     <motion.footer
// //       className="py-12 bg-slate-900 text-white"
// //       initial={{ opacity: 0 }}
// //       whileInView={{ opacity: 1 }}
// //       transition={{ duration: 0.8 }}
// //       viewport={{ once: true }}
// //     >
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //           <motion.div
// //             initial={{ y: 50, opacity: 0 }}
// //             whileInView={{ y: 0, opacity: 1 }}
// //             transition={{ duration: 0.6 }}
// //           >
// //             <h3 className="text-2xl font-bold text-red-700 mb-4">John Doe</h3>
// //             <p className="text-gray-300">Full-Stack Developer crafting innovative solutions.</p>
// //           </motion.div>
// //           <motion.div
// //             initial={{ y: 50, opacity: 0 }}
// //             whileInView={{ y: 0, opacity: 1 }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //           >
// //             <h3 className="text-xl font-semibold text-red-700 mb-4">Quick Links</h3>
// //             <ul className="space-y-2">
// //               {['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'].map((section) => (
// //                 <li key={section}>
// //                   <button
// //                     onClick={() => scrollToSection(section)}
// //                     className="text-gray-300 hover:text-red-700 capitalize"
// //                   >
// //                     {section}
// //                   </button>
// //                 </li>
// //               ))}
// //             </ul>
// //           </motion.div>
// //           <motion.div
// //             initial={{ y: 50, opacity: 0 }}
// //             whileInView={{ y: 0, opacity: 1 }}
// //             transition={{ duration: 0.6, delay: 0.4 }}
// //           >
// //             <h3 className="text-xl font-semibold text-red-700 mb-4">Connect</h3>
// //             <div className="flex space-x-4">
// //               <a href="https://github.com" target="_blank" rel="noopener noreferrer">
// //                 <FaGithub className="w-6 h-6 text-gray-300 hover:text-red-700" />
// //               </a>
// //               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
// //                 <FaLinkedin className="w-6 h-6 text-gray-300 hover:text-red-700" />
// //               </a>
// //               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
// //                 <FaSquareXTwitter className="w-6 h-6 text-gray-300 hover:text-red-700" />
// //               </a>
// //             </div>
// //           </motion.div>
// //         </div>
// //         <motion.p
// //           className="text-center text-gray-300 mt-8"
// //           initial={{ opacity: 0 }}
// //           whileInView={{ opacity: 1 }}
// //           transition={{ duration: 0.6, delay: 0.6 }}
// //         >
// //           © {new Date().getFullYear()} John Doe. All rights reserved.
// //         </motion.p>
// //       </div>
// //     </motion.footer>
// //   );
// // }

// // export default Footer;

// import { motion } from 'framer-motion';
// import { FaGithub, FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6';

// function Footer() {
//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <motion.footer
//       className="py-12 bg-surface text-on-surface"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h3 className="text-2xl font-bold text-primary mb-4">John Doe</h3>
//             <p className="text-text-secondary-on-background">Full-Stack Developer crafting innovative solutions.</p>
//           </motion.div>
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <h3 className="text-xl font-semibold text-primary mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'].map((section) => (
//                 <li key={section}>
//                   <button
//                     onClick={() => scrollToSection(section)}
//                     className="text-text-secondary-on-background hover:text-primary capitalize"
//                   >
//                     {section}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <h3 className="text-xl font-semibold text-primary mb-4">Connect</h3>
//             <div className="flex space-x-4">
//               <a href="https://github.com" target="_blank" rel="noopener noreferrer">
//                 <FaGithub className="w-6 h-6 text-text-secondary-on-background hover:text-primary" />
//               </a>
//               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//                 <FaLinkedin className="w-6 h-6 text-text-secondary-on-background hover:text-primary" />
//               </a>
//               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//                 <FaSquareXTwitter className="w-6 h-6 text-text-secondary-on-background hover:text-primary" />
//               </a>
//             </div>
//           </motion.div>
//         </div>
//         <motion.p
//           className="text-center text-text-secondary-on-background mt-8"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.6 }}
//         >
//           © {new Date().getFullYear()} John Doe. All rights reserved.
//         </motion.p>
//       </div>
//     </motion.footer>
//   );
// }

// export default Footer;

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';

function Footer() {
  const { user } = useContext(AuthContext);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.footer
      className="py-12 bg-surface text-on-surface"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-primary-300 mb-4">Royal House Design</h3>
            <p className="text-text-secondary-on-background">Create and showcase your professional portfolio.</p>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-primary-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['home', 'about', 'services', 'gallery', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="text-text-secondary-on-background hover:text-primary-200 capitalize"
                  >
                    {section}
                  </button>
                </li>
              ))}
              {user && user.isAdmin && (
                <li>
                  <Link to="/admin" className="text-text-secondary-on-background hover:text-primary-200">
                    Admin Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-primary-200 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-6 h-6 text-text-secondary-on-background hover:text-primary-200" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-6 h-6 text-text-secondary-on-background hover:text-primary-200" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaSquareXTwitter className="w-6 h-6 text-text-secondary-on-background hover:text-primary-200" />
              </a>
            </div>
          </motion.div>
        </div>
        <motion.p
          className="text-center text-text-secondary-on-background mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          © {new Date().getFullYear()} Royal House Design. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
}

export default Footer;