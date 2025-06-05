// import { motion } from "framer-motion";
// import { FaGithub, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

// function Header() {
//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <motion.nav
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//         {/* Name */}
//         <motion.h1
//           className="text-2xl font-bold text-red-700"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           John Doe
//         </motion.h1>

//         {/* Navigation Links */}
//         <div className="flex space-x-4">
//           {[
//             "home",
//             "about",
//             "skills",
//             "projects",
//             "experience",
//             "education",
//             "contact",
//           ].map((section) => (
//             <motion.button
//               key={section}
//               onClick={() => scrollToSection(section)}
//               className="text-red-700 hover:text-teal-700 font-semibold text-lg capitalize transition-colors"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {section}
//             </motion.button>
//           ))}
//         </div>

//         {/* Social Media Icons */}
//         <div className="flex space-x-4">
//           <motion.a
//             href="https://github.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <FaGithub className="w-6 h-6 text-red-700 hover:text-teal-700" />
//           </motion.a>
//           <motion.a
//             href="https://linkedin.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <FaLinkedin className="w-6 h-6 text-red-700 hover:text-teal-700" />
//           </motion.a>
//           <motion.a
//             href="https://twitter.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <FaSquareXTwitter className="w-6 h-6 text-red-700 hover:text-teal-700" />
//           </motion.a>
//         </div>
//       </div>
//     </motion.nav>
//   );
// }

// export default Header;
import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaSquareXTwitter, FaMoon, FaSun } from 'react-icons/fa6';
import { Chrome } from '@uiw/react-color';
import { ThemeContext } from '../../contexts/ThemeContext.jsx';

function Header() {
  const { isDark, toggleDarkMode, updateSourceColor } = useContext(ThemeContext);
  const [showPicker, setShowPicker] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-surface shadow-md z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Navigation Links */}
        <div className="flex space-x-4">
          {['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'].map((section) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              className="text-primary hover:text-secondary font-semibold text-lg capitalize transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {section}
            </motion.button>
          ))}
        </div>
        {/* Name and Theme Controls */}
        <div className="flex items-center space-x-4">
          <motion.h1
            className="text-2xl font-bold text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            John Doe
          </motion.h1>
          <motion.button
            onClick={() => setShowPicker(!showPicker)}
            className="text-primary hover:text-secondary"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            🎨
          </motion.button>
          <motion.button
            onClick={toggleDarkMode}
            className="text-primary hover:text-secondary"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDark ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
          </motion.button>
          {showPicker && (
            <motion.div
              className="absolute top-16 right-4 z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Chrome
                color={localStorage.getItem('themeColor') || '#0d9488'}
                onChange={(color) => updateSourceColor(color.hex)}
                style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
              />
            </motion.div>
          )}
        </div>
        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="w-6 h-6 text-primary hover:text-secondary" />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin className="w-6 h-6 text-primary hover:text-secondary" />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaSquareXTwitter className="w-6 h-6 text-primary hover:text-secondary" />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}

export default Header;