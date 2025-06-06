import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';

function AdminHeader() {
  const { user, logout } = useContext(AuthContext);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-primary-200 text-white shadow-md p-4"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-lg">Welcome, {user.name}</span>
            <motion.button
              onClick={logout}
              className="bg-secondary-200 text-white px-4 py-2 rounded-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Logout
            </motion.button>
          </div>
        )}
      </div>
    </motion.header>
  );
}

export default AdminHeader;