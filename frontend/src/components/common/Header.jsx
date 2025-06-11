// // // frontend/src/components/common/Header.jsx
// // import { useContext, useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { AuthContext } from '../../contexts/AuthContext.jsx';
// // import { ThemeContext } from '../../contexts/ThemeContext.jsx';
// // import { Button } from '../ui/button';
// // import { Menu, Moon, Sun, Download, Share2 } from 'lucide-react';
// // import { toast } from 'react-hot-toast';

// // const navItems = [
// //   { name: 'Home', path: '#home' },
// //   { name: 'About', path: '#about' },
// //   { name: 'Skills', path: '#skills' },
// //   { name: 'Experience', path: '#experience' },
// //   { name: 'Projects', path: '#projects' },
// //   { name: 'Contact', path: '#contact' },
// // ];

// // function Header() {
// //   const { user, logout } = useContext(AuthContext);
// //   const { isDark, toggleDarkMode } = useContext(ThemeContext);
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setScrolled(window.scrollY > 10);
// //     };
// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   const handleScroll = (e, hash) => {
// //     e.preventDefault();
// //     const element = document.querySelector(hash);
// //     if (element) {
// //       element.scrollIntoView({
// //         behavior: 'smooth',
// //         block: 'start'
// //       });
// //     }
// //     setIsMenuOpen(false);
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       await logout();
// //       toast.success('Logged out successfully');
// //       navigate('/login');
// //     } catch (error) {
// //       toast.error('Logout failed');
// //     }
// //   };

// //   return (
// //     <motion.header
// //       initial={{ y: -100 }}
// //       animate={{ y: 0 }}
// //       transition={{ duration: 0.5 }}
// //       className={`fixed w-full top-0 z-50 transition-all ${scrolled ? 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-sm' : 'bg-transparent'}`}
// //     >
// //       <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
// //         <Link to="/" className="text-2xl font-bold text-primary">
// //           Portfolio
// //         </Link>

// //         <div className="hidden md:flex items-center gap-6">
// //           {navItems.map((item) => (
// //             <a
// //               key={item.name}
// //               href={item.path}
// //               onClick={(e) => handleScroll(e, item.path)}
// //               className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
// //             >
// //               {item.name}
// //             </a>
// //           ))}
// //         </div>

// //         <div className="flex items-center gap-3">
// //           <Button
// //             onClick={toggleDarkMode}
// //             variant="ghost"
// //             size="icon"
// //             aria-label="Toggle theme"
// //           >
// //             {isDark ? (
// //               <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
// //             ) : (
// //               <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
// //             )}
// //           </Button>

// //           {user ? (
// //             <>
// //               <Button onClick={handleLogout} variant="outline">
// //                 Logout
// //               </Button>
// //             </>
// //           ) : (
// //             <>
// //               <Link to="/login">
// //                 <Button variant="outline">Login</Button>
// //               </Link>
// //               <Link to="/signup">
// //                 <Button>Create Portfolio</Button>
// //               </Link>
// //             </>
// //           )}

// //           <Button
// //             className="md:hidden"
// //             variant="ghost"
// //             size="icon"
// //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// //             aria-label="Toggle menu"
// //           >
// //             <Menu className="w-6 h-6" />
// //           </Button>
// //         </div>
// //       </nav>

// //       {isMenuOpen && (
// //         <motion.div
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="md:hidden bg-white dark:bg-gray-900 px-4 py-3 shadow-lg"
// //         >
// //           {navItems.map((item) => (
// //             <a
// //               key={item.name}
// //               href={item.path}
// //               onClick={(e) => handleScroll(e, item.path)}
// //               className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
// //             >
// //               {item.name}
// //             </a>
// //           ))}
// //         </motion.div>
// //       )}
// //     </motion.header>
// //   );
// // }

// // export default Header;

// import { useContext, useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { AuthContext } from '../../contexts/AuthContext';
// import { Button } from '../ui/button';
// import { Menu } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// const navItems = [
//   { name: 'About', path: '#about' },
//   { name: 'Experience', path: '#experience' },
//   { name: 'Projects', path: '#projects' },
//   { name: 'Contact', path: '#contact' },
// ];

// function Header() {
//   const { user, logout } = useContext(AuthContext);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleScroll = (e, hash) => {
//     e.preventDefault();
//     const element = document.querySelector(hash);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//     setIsMenuOpen(false);
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success('Logged out successfully');
//       navigate('/login');
//     } catch (error) {
//       toast.error('Logout failed');
//     }
//   };

//   return (
//     <header
//       className={`fixed w-full top-0 z-50 transition-all ${
//         scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
//       }`}
//     >
//       <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold text-black">
//           Portfolio
//         </Link>

//         <div className="hidden md:flex items-center gap-6">
//           {navItems.map((item) => (
//             <a
//               key={item.name}
//               href={item.path}
//               onClick={(e) => handleScroll(e, item.path)}
//               className="text-black hover:opacity-80 transition-opacity"
//             >
//               {item.name}
//             </a>
//           ))}
//         </div>

//         <div className="flex items-center gap-3">
//           {user ? (
//             <>
//               <Button
//                 onClick={handleLogout}
//                 variant="outline"
//                 className="border-black text-black hover:bg-black hover:text-white"
//               >
//                 Logout
//               </Button>
//               <Button asChild>
//                 <Link to="/dashboard">Dashboard</Link>
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button
//                 asChild
//                 variant="outline"
//                 className="border-black text-black hover:bg-black hover:text-white"
//               >
//                 <Link to="/login">Login</Link>
//               </Button>
//               <Button asChild className="bg-black text-white hover:bg-gray-800">
//                 <Link to="/signup">Sign Up</Link>
//               </Button>
//             </>
//           )}

//           <Button
//             className="md:hidden"
//             variant="ghost"
//             size="icon"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <Menu className="w-5 h-5 text-black" />
//           </Button>
//         </div>
//       </nav>

//       {isMenuOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="md:hidden bg-white p-4 shadow-lg"
//         >
//           {navItems.map((item) => (
//             <a
//               key={item.name}
//               href={item.path}
//               onClick={(e) => handleScroll(e, item.path)}
//               className="block py-2 text-black hover:opacity-80 transition-opacity"
//             >
//               {item.name}
//             </a>
//           ))}
//         </motion.div>
//       )}
//     </header>
//   );
// }

// export default Header;
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import { Menu, LogOut, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

const navItems = [
  { name: 'About', path: '#about' },
  { name: 'Experience', path: '#experience' },
  { name: 'Projects', path: '#projects' },
  { name: 'Contact', path: '#contact' },
];

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleScroll = (e, hash) => {
    e.preventDefault();
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <header
      className="fixed w-full top-0 z-50 shadow-sm"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold" style={{ color: colors.text }}>
          Portfolio
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={(e) => handleScroll(e, item.path)}
              className="hover:opacity-80 transition-opacity"
              style={{ color: colors.text }}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-current hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ color: colors.text }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button asChild style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
                <Link to="/dashboard">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="border-current hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ color: colors.text }}
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild style={{ backgroundColor: colors.primary, color: '#ffffff' }}>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}

          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" style={{ color: colors.text }} />
          </Button>
        </div>
      </nav>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden p-4 shadow-lg"
          style={{ backgroundColor: colors.background }}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={(e) => handleScroll(e, item.path)}
              className="block py-2 hover:opacity-80 transition-opacity"
              style={{ color: colors.text }}
            >
              {item.name}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}

export default Header;