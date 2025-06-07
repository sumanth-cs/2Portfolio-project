import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { ThemeContext } from '../../contexts/ThemeContext.jsx';
import { Button } from '../ui/button';
import { Menu, Moon, Sun } from 'lucide-react';
import { toast } from 'react-hot-toast';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/#about' },
  { name: 'Skills', path: '/#skills' },
  { name: 'Experience', path: '/#experience' },
  { name: 'Education', path: '/#education' },
  { name: 'Projects', path: '/#projects' },
  { name: 'Contact', path: '/#contact' },
];

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleDarkMode } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md fixed w-full top-0 z-50"
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Portfolio
        </Link>
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link key={item.name} to={item.path} className="text-text-primary-on-background hover:text-primary">
              {item.name}
            </Link>
          ))}
          {user && (
            <Link to="/dashboard" className="text-text-primary-on-background hover:text-primary">
              My Portfolio
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-text-primary-on-background">Welcome, {user.name}</span>
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
                <Button className="bg-primary text-white hover:bg-primary/90">
                  Create Portfolio
                </Button>
              </Link>
            </>
          )}
          <Button onClick={toggleDarkMode} variant="ghost">
            {isDark ? <Sun className="w-5 h-5 text-text-primary-on-background" /> : <Moon className="w-5 h-5 text-text-primary-on-background" />}
          </Button>
        </div>
        <Button
          className="md:hidden"
          variant="ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6 text-text-primary-on-background" />
        </Button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block py-2 text-text-primary-on-background hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {user && (
            <Link
              to="/dashboard"
              className="block py-2 text-text-primary-on-background hover:text-primary"
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