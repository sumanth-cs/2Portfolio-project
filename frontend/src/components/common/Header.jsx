/**
 * Header component with navigation.
 */
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { ThemeContext } from '../../contexts/ThemeContext.jsx';
import { Button } from '../ui/button.jsx';

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
              key={`nav-${index}`}
              to={item.path}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {item.name}
            </Link>
          ))}
          {user && (
            <Link
              to={`/portfolio/${user.id}`}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              My Portfolio
            </Link>
          )}
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
              key={`mobile-nav-${index}`}
              to={item.path}
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {user && (
            <Link
              to={`/portfolio/${user.id}`}
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              My Portfolio
            </Link>
          )}
        </div>
      )}
    </motion.header>
  );
}

export default Header;