import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-primary-100 text-on-surface h-screen p-4"
    >
      <h3 className="text-xl font-bold text-primary-300 mb-6">Navigation</h3>
      <ul className="space-y-4">
        <li>
          <Link to="/admin" className="text-primary-200 hover:text-primary-300">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/bio" className="text-primary-200 hover:text-primary-300">
            Update Bio
          </Link>
        </li>
        <li>
          <Link to="/admin/photos" className="text-primary-200 hover:text-primary-300">
            Upload Photos
          </Link>
        </li>
        <li>
          <Link to="/admin/portfolio" className="text-primary-200 hover:text-primary-300">
            Create Portfolio
          </Link>
        </li>
        <li>
          <Link to="/" className="text-primary-200 hover:text-primary-300">
            Back to Site
          </Link>
        </li>
      </ul>
    </motion.aside>
  );
}

export default Sidebar;