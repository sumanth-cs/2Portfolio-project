import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import { Menu, LogOut, User, LayoutDashboard, Home, PenSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';

const navItems = [
  { name: 'About', path: '#about', icon: <User className="w-4 h-4" /> },
  { name: 'Experience', path: '#experience', icon: <PenSquare className="w-4 h-4" /> },
  { name: 'Projects', path: '#projects', icon: <LayoutDashboard className="w-4 h-4" /> },
  { name: 'Contact', path: '#contact', icon: <Home className="w-4 h-4" /> },
];

function Header() {
  const { user, signout } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      await signout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-opacity-90 backdrop-blur-sm shadow-sm' : 'bg-opacity-100'
      }`}
      style={{ backgroundColor: colors.background }}
    >
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link 
            to="/" 
            className="text-2xl font-bold flex items-center gap-2"
            style={{ color: colors.text }}
          >
            <span className="text-primary font-extrabold" style={{ color: colors.primary }}>Portfolio.</span>
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center justify-between gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={(e) => handleScroll(e, item.path)}
              className="relative flex items-center gap-2 hover:opacity-80 transition-opacity nav-link"
              style={{ color: colors.text }}
            >
              {item.icon}
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <motion.div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-current flex items-center gap-2"
                  style={{ color: colors.text }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </motion.div>
              
              <motion.div>
                <Button 
                  asChild
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.buttonText
                  }}
                >
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Link>
                </Button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  asChild
                  variant="outline"
                  className="border-current hover:bg-gray-100 dark:hover:bg-gray-800"
                  style={{ color: colors.text }}
                >
                  <Link to="/login">Login</Link>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button 
                  asChild
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.buttonText
                  }}
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </motion.div>
            </>
          )}

          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: colors.text }}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden p-4 shadow-lg"
          style={{ backgroundColor: colors.background }}
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => handleScroll(e, item.path)}
                className="relative flex items-center gap-2 py-2 hover:opacity-80 transition-opacity nav-link"
                style={{ color: colors.text }}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Header;