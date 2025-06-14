import { useState, useEffect } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useTheme } from '../contexts/ThemeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import BioForm from '../components/admin/BioForm';
import ProjectForm from '../components/admin/ProjectForm';
import ColorSettings from '../components/admin/ColorSettings';
import PhotoUpload from '../components/admin/PhotoUpload';
import { Button } from '../components/ui/button';
import { toast } from 'react-hot-toast';
import { LayoutDashboard, User, Image, Palette, Briefcase, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { user } = useAuth();
  const { portfolioData, updatePortfolio, refetch } = usePortfolio();
  const { colors, updateColors } = useTheme();
  const [activeTab, setActiveTab] = useState('bio');

  useEffect(() => {
    if (portfolioData.error) {
      toast.error(`Failed to load data: ${portfolioData.error}`);
    }
  }, [portfolioData.error]);

  const handleSave = async (data) => {
    try {
      await updatePortfolio(data);
      await refetch();
      toast.success('Changes saved successfully');
    } catch (error) {
      console.error('Save error:', error);
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

  const handleThemeUpdate = async (newColors) => {
    try {
      await updateColors(newColors);
      toast.success('Theme updated successfully');
    } catch (error) {
      toast.error('Failed to update theme');
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
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleRefresh}
              className="flex items-center gap-2"
              style={{ color: colors.text }}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button
              asChild
              style={{
                backgroundColor: colors.primary,
                color: colors.buttonText,
              }}
            >
              <Link to="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>

        {portfolioData.loading ? (
          <div className="flex justify-center items-center h-64">
            <div 
              className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
              style={{ borderColor: colors.primary }} 
            />
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
                data={portfolioData.bio} 
                onSave={(data) => handleSave({ bio: data })} 
              />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectForm 
                projects={portfolioData.projects} 
                onSave={(projects) => handleSave({ projects })} 
              />
            </TabsContent>

            <TabsContent value="photos">
              <PhotoUpload 
                onSave={(imageUrl) => handleSave({ bio: { ...portfolioData.bio, image: imageUrl } })} 
              />
            </TabsContent>

            <TabsContent value="theme">
              <ColorSettings 
                currentColors={colors}
                onSave={handleThemeUpdate}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Admin;