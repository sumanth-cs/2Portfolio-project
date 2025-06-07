import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import BioForm from './BioForm.jsx';
import PhotoUpload from './PhotoUpload.jsx';
import PortfolioForm from './PortfolioForm.jsx';
import { Button } from '../ui/button.jsx';
import { toast } from 'react-hot-toast';

function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('bio');

  const tabs = [
    { id: 'bio', label: 'Bio' },
    { id: 'photos', label: 'Photos' },
    { id: 'portfolio', label: 'Portfolio' },
  ];

  const handleSave = (data) => {
    console.log('Saved:', data);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-primary-300">Dashboard</h2>
            <p className="text-gray-600">Welcome, {user?.name || 'User'}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? 'primary' : 'outline'}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          {activeTab === 'bio' && <BioForm onSave={handleSave} />}
          {activeTab === 'photos' && <PhotoUpload onSave={handleSave} />}
          {activeTab === 'portfolio' && <PortfolioForm onSave={handleSave} />}
        </div>
      </motion.div>
    </div>
  );
}

export default AdminDashboard;