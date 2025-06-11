// // import { motion } from 'framer-motion';
// // import { Github, Linkedin, Twitter } from 'lucide-react';
// // import { useContext } from 'react';
// // import { AuthContext } from '../../contexts/AuthContext.jsx';
// // import { Link } from 'react-router-dom';
// // import { Button } from '../ui/button';

// // function Footer() {
// //   const { user } = useContext(AuthContext);

// //   const scrollToSection = (id) => {
// //     const element = document.getElementById(id);
// //     if (element) {
// //       element.scrollIntoView({ behavior: 'smooth' });
// //     }
// //   };

// //   return (
// //     <motion.footer
// //       className="py-12 bg-surface"
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
// //             <h3 className="text-2xl font-bold text-primary mb-4">Portfolio</h3>
// //             <p className="text-text-secondary-on-background">Showcase your professional work.</p>
// //             {user ? (
// //               <Button asChild variant="outline" className="mt-4">
// //                 <Link to="/dashboard">Edit Your Portfolio</Link>
// //               </Button>
// //             ) : (
// //               <Button asChild variant="outline" className="mt-4">
// //                 <Link to="/signup">Create Your Portfolio</Link>
// //               </Button>
// //             )}
// //           </motion.div>
// //           <motion.div
// //             initial={{ y: 50, opacity: 0 }}
// //             whileInView={{ y: 0, opacity: 1 }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //           >
// //             <h3 className="text-xl font-semibold text-primary mb-4">Quick Links</h3>
// //             <ul className="space-y-2">
// //               {['home', 'about', 'skills', 'experience', 'education', 'projects', 'contact'].map((section) => (
// //                 <li key={section}>
// //                   <button
// //                     onClick={() => scrollToSection(section)}
// //                     className="text-text-secondary-on-background hover:text-primary capitalize"
// //                   >
// //                     {section}
// //                   </button>
// //                 </li>
// //               ))}
// //               {user && (
// //                 <li>
// //                   <Link to="/dashboard" className="text-text-secondary-on-background hover:text-primary">
// //                     My Portfolio
// //                   </Link>
// //                 </li>
// //               )}
// //             </ul>
// //           </motion.div>
// //           <motion.div
// //             initial={{ y: 50, opacity: 0 }}
// //             whileInView={{ y: 0, opacity: 1 }}
// //             transition={{ duration: 0.6, delay: 0.4 }}
// //           >
// //             <h3 className="text-xl font-semibold text-primary mb-4">Connect</h3>
// //             <div className="flex space-x-4">
// //               <a href="https://github.com" target="_blank" rel="noopener noreferrer">
// //                 <Github className="w-6 h-6 text-text-secondary-on-background hover:text-primary" />
// //               </a>
// //               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
// //                 <Linkedin className="w-6 h-6 text-text-secondary-on-background hover:text-primary" />
// //               </a>
// //               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
// //                 <Twitter className="w-6 h-6 text-text-secondary-on-background hover:text-primary" />
// //               </a>
// //             </div>
// //           </motion.div>
// //         </div>
// //         <motion.p
// //           className="text-center text-text-secondary-on-background/50 mt-8"
// //           initial={{ opacity: 0 }}
// //           whileInView={{ opacity: 1 }}
// //           transition={{ duration: 0.6, delay: 0.6 }}
// //         >
// //           © {new Date().getFullYear()} Portfolio. All rights reserved.
// //         </motion.p>
// //       </div>
// //     </motion.footer>
// //   );
// // }

// // export default Footer;

// // frontend/src/components/common/Footer.jsx
// import { motion } from 'framer-motion';
// import { Github, Linkedin, Twitter } from 'lucide-react';

// function Footer() {
//   return (
//     <footer className="py-12 px-4 border-t border-gray-200 dark:border-gray-700">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mb-6 md:mb-0"
//           >
//             <p className="text-lg font-bold">Portfolio</p>
//             <p className="opacity-80">Showcase your professional work</p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="flex space-x-4"
//           >
//             <a href="https://github.com" target="_blank" rel="noopener noreferrer">
//               <Github className="w-6 h-6 hover:opacity-80 transition-opacity" />
//             </a>
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//               <Linkedin className="w-6 h-6 hover:opacity-80 transition-opacity" />
//             </a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//               <Twitter className="w-6 h-6 hover:opacity-80 transition-opacity" />
//             </a>
//           </motion.div>
//         </div>

//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="text-center mt-8 opacity-60"
//         >
//           © {new Date().getFullYear()} Portfolio. All rights reserved.
//         </motion.p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;


// frontend/src/components/common/Footer.jsx
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

function Footer() {
  const { user } = useContext(AuthContext);

  return (
    <footer className="py-12 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <p className="text-lg font-bold">Portfolio</p>
            <p className="opacity-80">Showcase your professional work</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-6 h-6 hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6 hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6 hover:opacity-80 transition-opacity" />
              </a>
            </div>

            {user ? (
              <Button asChild>
                <Link to="/dashboard">Edit Portfolio</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/signup">Create Your Portfolio</Link>
              </Button>
            )}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8 opacity-60"
        >
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}

export default Footer;