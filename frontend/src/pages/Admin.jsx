// frontend/src/pages/Admin.jsx
import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import BioForm from '../components/admin/BioForm';
import ProjectForm from '../components/admin/ProjectForm';
import ColorSettings from '../components/admin/ColorSettings';
import { Button } from '../components/ui/button';
import { toast } from 'react-hot-toast';

const Admin = () => {
  const { portfolioData, updatePortfolio } = usePortfolio();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('bio');

  const handleSave = async (section, data) => {
    try {
      await updatePortfolio({
        [section]: data
      });
      toast.success('Changes saved successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>
            Admin Dashboard
          </h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="bio">Bio</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>

          <TabsContent value="bio">
            <BioForm 
              data={portfolioData?.bio} 
              onSave={(data) => handleSave('bio', data)} 
            />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectForm 
              projects={portfolioData?.projects || []} 
              onSave={(data) => handleSave('projects', data)} 
            />
          </TabsContent>

          <TabsContent value="theme">
            <ColorSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;