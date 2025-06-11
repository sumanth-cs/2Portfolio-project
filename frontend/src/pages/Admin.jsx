import { useState, useEffect } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useTheme } from '../contexts/ThemeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import BioForm from '../components/admin/BioForm';
import ProjectForm from '../components/admin/ProjectForm';
import ColorSettings from '../components/admin/ColorSettings';
import { Button } from '../components/ui/button';
import { toast } from 'react-hot-toast';
import { LayoutDashboard, User, Image, Palette, Briefcase, RefreshCw } from 'lucide-react';

const Admin = () => {
  const { portfolioData, updatePortfolio, loading, error, refetch } = usePortfolio();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('bio');

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load data: ${error}`);
    }
  }, [error]);

  const handleSave = async (section, data) => {
    try {
      await updatePortfolio({
        [section]: data
      });
      await refetch(); // Refresh data after update
      toast.success('Changes saved successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    }
  };

  const handleRefresh = async () => {
    try {
      await refetch();
      toast.success('Data refreshed');
    } catch (error) {
      toast.error('Failed to refresh data');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="h-6 w-6" style={{ color: colors.primary }} />
            <h1 className="text-3xl font-bold" style={{ color: colors.text }}>
              Dashboard
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="flex items-center gap-2"
            style={{ color: colors.text }}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
                 style={{ borderColor: colors.primary }} />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8" style={{ backgroundColor: colors.background }}>
              <TabsTrigger value="bio" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Bio
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="photos" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Photos
              </TabsTrigger>
              <TabsTrigger value="theme" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Theme
              </TabsTrigger>
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
        )}
      </div>
    </div>
  );
};

export default Admin;