// // // import { motion } from "framer-motion";
// // // import { FaGithub, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

// // // function Header() {
// // //   const scrollToSection = (id) => {
// // //     const element = document.getElementById(id);
// // //     if (element) {
// // //       element.scrollIntoView({ behavior: "smooth" });
// // //     }
// // //   };

// // //   return (
// // //     <motion.nav
// // //       initial={{ y: -50, opacity: 0 }}
// // //       animate={{ y: 0, opacity: 1 }}
// // //       transition={{ duration: 0.5 }}
// // //       className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
// // //     >
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
// // //         {/* Name */}
// // //         <motion.h1
// // //           className="text-2xl font-bold text-red-700"
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           transition={{ delay: 0.2 }}
// // //         >
// // //           John Doe
// // //         </motion.h1>

// // //         {/* Navigation Links */}
// // //         <div className="flex space-x-4">
// // //           {[
// // //             "home",
// // //             "about",
// // //             "skills",
// // //             "projects",
// // //             "experience",
// // //             "education",
// // //             "contact",
// // //           ].map((section) => (
// // //             <motion.button
// // //               key={section}
// // //               onClick={() => scrollToSection(section)}
// // //               className="text-red-700 hover:text-teal-700 font-semibold text-lg capitalize transition-colors"
// // //               whileHover={{ scale: 1.1 }}
// // //               whileTap={{ scale: 0.95 }}
// // //             >
// // //               {section}
// // //             </motion.button>
// // //           ))}
// // //         </div>

// // //         {/* Social Media Icons */}
// // //         <div className="flex space-x-4">
// // //           <motion.a
// // //             href="https://github.com"
// // //             target="_blank"
// // //             rel="noopener noreferrer"
// // //             whileHover={{ scale: 1.2 }}
// // //             whileTap={{ scale: 0.9 }}
// // //           >
// // //             <FaGithub className="w-6 h-6 text-red-700 hover:text-teal-700" />
// // //           </motion.a>
// // //           <motion.a
// // //             href="https://linkedin.com"
// // //             target="_blank"
// // //             rel="noopener noreferrer"
// // //             whileHover={{ scale: 1.2 }}
// // //             whileTap={{ scale: 0.9 }}
// // //           >
// // //             <FaLinkedin className="w-6 h-6 text-red-700 hover:text-teal-700" />
// // //           </motion.a>
// // //           <motion.a
// // //             href="https://twitter.com"
// // //             target="_blank"
// // //             rel="noopener noreferrer"
// // //             whileHover={{ scale: 1.2 }}
// // //             whileTap={{ scale: 0.9 }}
// // //           >
// // //             <FaSquareXTwitter className="w-6 h-6 text-red-700 hover:text-teal-700" />
// // //           </motion.a>
// // //         </div>
// // //       </div>
// // //     </motion.nav>
// // //   );
// // // }

// // // export default Header;
// // import { useState, useContext } from 'react';
// // import { motion } from 'framer-motion';
// // import { FaGithub, FaLinkedin, FaSquareXTwitter, FaMoon, FaSun } from 'react-icons/fa6';
// // import { Chrome } from '@uiw/react-color';
// // import { ThemeContext } from '../../contexts/ThemeContext.jsx';

// // function Header() {
// //   const { isDark, toggleDarkMode, updateSourceColor } = useContext(ThemeContext);
// //   const [showPicker, setShowPicker] = useState(false);

// //   const scrollToSection = (id) => {
// //     const element = document.getElementById(id);
// //     if (element) {
// //       element.scrollIntoView({ behavior: 'smooth' });
// //     }
// //   };

// //   return (
// //     <motion.nav
// //       initial={{ y: -50, opacity: 0 }}
// //       animate={{ y: 0, opacity: 1 }}
// //       transition={{ duration: 0.5 }}
// //       className="fixed top-0 left-0 right-0 bg-surface shadow-md z-50"
// //     >
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
// //         {/* Navigation Links */}
// //         <div className="flex space-x-4">
// //           {['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'].map((section) => (
// //             <motion.button
// //               key={section}
// //               onClick={() => scrollToSection(section)}
// //               className="text-primary hover:text-secondary font-semibold text-lg capitalize transition-colors"
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.95 }}
// //             >
// //               {section}
// //             </motion.button>
// //           ))}
// //         </div>
// //         {/* Name and Theme Controls */}
// //         <div className="flex items-center space-x-4">
// //           <motion.h1
// //             className="text-2xl font-bold text-primary"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.2 }}
// //           >
// //             John Doe
// //           </motion.h1>
// //           <motion.button
// //             onClick={() => setShowPicker(!showPicker)}
// //             className="text-primary hover:text-secondary"
// //             whileHover={{ scale: 1.2 }}
// //             whileTap={{ scale: 0.9 }}
// //           >
// //             🎨
// //           </motion.button>
// //           <motion.button
// //             onClick={toggleDarkMode}
// //             className="text-primary hover:text-secondary"
// //             whileHover={{ scale: 1.2 }}
// //             whileTap={{ scale: 0.9 }}
// //           >
// //             {isDark ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
// //           </motion.button>
// //           {showPicker && (
// //             <motion.div
// //               className="absolute top-16 right-4 z-50"
// //               initial={{ opacity: 0, y: -10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -10 }}
// //             >
// //               <Chrome
// //                 color={localStorage.getItem('themeColor') || '#0d9488'}
// //                 onChange={(color) => updateSourceColor(color.hex)}
// //                 style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
// //               />
// //             </motion.div>
// //           )}
// //         </div>
// //         {/* Social Media Icons */}
// //         <div className="flex space-x-4">
// //           <motion.a
// //             href="https://github.com"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             whileHover={{ scale: 1.2 }}
// //             whileTap={{ scale: 0.9 }}
// //           >
// //             <FaGithub className="w-6 h-6 text-primary hover:text-secondary" />
// //           </motion.a>
// //           <motion.a
// //             href="https://linkedin.com"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             whileHover={{ scale: 1.2 }}
// //             whileTap={{ scale: 0.9 }}
// //           >
// //             <FaLinkedin className="w-6 h-6 text-primary hover:text-secondary" />
// //           </motion.a>
// //           <motion.a
// //             href="https://twitter.com"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             whileHover={{ scale: 1.2 }}
// //             whileTap={{ scale: 0.9 }}
// //           >
// //             <FaSquareXTwitter className="w-6 h-6 text-primary hover:text-secondary" />
// //           </motion.a>
// //         </div>
// //       </div>
// //     </motion.nav>
// //   );
// // }

// // export default Header;

// import { useContext } from 'react';
// import { motion } from 'framer-motion';
// import { FaGithub, FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6';
// import { AuthContext } from '../../contexts/AuthContext.jsx';
// import { Link } from 'react-router-dom';

// function Header() {
//   const { user, logout } = useContext(AuthContext);

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <motion.nav
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="fixed top-0 left-0 right-0 bg-surface shadow-md z-50"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//         {/* Navigation Links */}
//         <div className="flex space-x-4">
//           {['home', 'about', 'skills', 'projects', 'experience', 'education', 'portfolio', 'contact'].map((section) => (
//             <motion.button
//               key={"section"}
//               onClick={() => scrollToSection(section)}
//               className="text-primary-200 hover:text-secondary-200 font-semibold text-lg capitalize transition-colors"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {section}
//             </motion.button>
//           ))}
//         </div>
//         {/* Name and Auth Controls */}
//         <div className="flex items-center space-x-4">
//           <motion.h1
//             className="text-2xl font-bold text-primary-300"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             {user ? user.name : 'Portfolio Hub'}
//           </motion.h1>
//           {user ? (
//             <motion.button
//               onClick={logout}
//               className="text-btn bg-primary-200 hover:bg-primary-300 text-white px-4 py-2 rounded-md"
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               Logout
//             </motion.button>
//           ) : (
//             <>
//               <Link to="/login" className="text-primary text-primary-200 hover:text-primary-300">Login</Link>
//               <Link to="/signup" className="text-primary text-primary-200 hover:bg-primary">Sign Up</Link>
//             </>
//           )}
//         </div>
//         {/* Social Media Icons */}
//         <div className="flex space-x-4">
//             <motion.a
//               href="https://github.com"
//               target="_blank"
//               rel="noopener"
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <FaGithub className="w-a6 h-6 text-primary-200 hover:text-secondary-200" />
//             </motion.a>
//             <motion.a
//               href="https://linkedin.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <FaLinkedin className="w-6 h-6 text-primary-200 hover:text-secondary-200" />
//             </motion.a>
//             <motion.a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <FaSquareXTwitter className="w-6 h-6 text-primary-200 hover:text-secondary-200" />
//             </motion.a>
//           </div>
//       </div>
//     </motion.nav>
//   );
// }

// export default Header;

/**
 * Header component with navigation.
 */
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { ThemeContext } from '../../contexts/ThemeContext.jsx';
import { Button } from '../ui/button.jsx';
import PropTypes from 'prop-types';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 z-50"
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Portfolio
        </Link>
        <div className="hidden md:flex space-x-4">
          {navItems.map((item, index) => (
            <Link
              key={`nav-${index}`} // Unique key using index
              to={item.path}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
          <Button onClick={toggleTheme} variant="ghost">
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>
        </div>
        <button
          className="md:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 py-2">
          {navItems.map((item, index) => (
            <Link
              key={`mobile-nav-${index}`} // Unique key for mobile nav
              to={item.path}
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </motion.header>
  );
}

Header.propTypes = {};

export default Header;