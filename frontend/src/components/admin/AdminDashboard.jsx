import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext.jsx';
import { Chrome } from '@uiw/react-color';
import { FaMoon, FaSun } from 'react-icons/fa6';
import BioForm from './BioForm.jsx';
import PhotoUpload from './PhotoUpload.jsx';
import PortfolioForm from './PortfolioForm.jsx';
import Sidebar from './Sidebar.jsx';
import AdminHeader from './AdminHeader.jsx';

function AdminDashboard() {
  const { sourceColor, isDark, toggleDarkMode, updateSourceColor } = useContext(ThemeContext);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1">
        <AdminHeader />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
          <h2 className="text-3xl font-bold text-primary-300 mb-6">Admin Dashboard</h2>
          {/* Theme Controls */}
          <div className="mb-8 flex items-center space-x-4">
            <motion.button
              onClick={() => setShowPicker(!showPicker)}
              className="bg-primary-200 text-white px-4 py-2 rounded-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              🎨 Change Theme
            </motion.button>
            <motion.button
              onClick={toggleDarkMode}
              className="bg-primary-200 text-white px-4 py-2 rounded-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
            </motion.button>
            {showPicker && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-50"
              >
                <Chrome
                  color={sourceColor}
                  onChange={(color) => updateSourceColor(color.hex)}
                  style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
                />
              </motion.div>
            )}
          </div>
          {/* Admin Sections */}
          <BioForm />
          <PhotoUpload />
          <PortfolioForm />
        </motion.main>
      </div>
    </div>
  );
}

export default AdminDashboard;