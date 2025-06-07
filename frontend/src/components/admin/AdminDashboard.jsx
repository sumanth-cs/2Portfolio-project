// import { motion } from 'framer-motion';
// import { useContext, useState } from 'react';
// import { AuthContext } from '../../contexts/AuthContext.jsx';
// import BioForm from './BioForm.jsx';
// import PhotoUpload from './PhotoUpload.jsx';
// import ProjectForm from './ProjectForm.jsx';
// import ColorSettings from './ColorSettings.jsx';
// import { Button } from '../ui/button';
// import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
// import { Tabs, TabsList, TabsContent, TabsTrigger } from '../ui/tabs';
// import { toast } from 'react-hot-toast';

// function AdminDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const [activeTab, setActiveTab] = useState('bio');

//   const tabs = [
//     { id: 'bio', label: 'Bio' },
//     { id: 'photos', label: 'Photos' },
//     { id: 'projects', label: 'Projects' },
//     { id: 'colors', label: 'Theme' },
//   ];

//   const handleSave = (data) => {
//     console.log('Saved:', data);
//     toast.success('Changes saved successfully');
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success('Logged out successfully');
//     } catch (error) {
//       toast.error('Logout failed');
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="container mx-auto px-4 py-8"
//     >
//       <Card className="mb-8">
//         <CardHeader className="flex flex-row justify-between items-center">
//           <CardTitle className="text-3xl">Dashboard</CardTitle>
//           <Button onClick={handleLogout} variant="outline">Logout</Button>
//         </CardHeader>
//         <CardContent>
//           <p className="text-text-primary-on-background">Welcome, {user?.name || 'User'}</p>
//         </CardContent>
//       </Card>
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="mb-8">
//           {tabs.map((tab) => (
//             <TabsTrigger key={tab.id} value={tab.id}>
//               {tab.label}
//             </TabsTrigger>
//           ))}
//         </TabsList>
//         <TabsContent value="bio">
//           <BioForm onSave={handleSave} />
//         </TabsContent>
//         <TabsContent value="photos">
//           <PhotoUpload onSave={handleSave} />
//         </TabsContent>
//         <TabsContent value="projects">
//           <ProjectForm onSave={handleSave} />
//         </TabsContent>
//         <TabsContent value="colors">
//           <ColorSettings />
//         </TabsContent>
//       </Tabs>
//     </motion.div>
//   );
// }

// export default AdminDashboard;

import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';
import BioForm from './BioForm.jsx';
import PhotoUpload from './PhotoUpload.jsx';
import ProjectForm from './ProjectForm.jsx';
import ColorSettings from './ColorSettings.jsx';
import { Button } from '../ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '../ui/tabs';
import { toast } from 'react-hot-toast';

function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('bio');

  const tabs = [
    { id: 'bio', label: 'Bio' },
    { id: 'photos', label: 'Photos' },
    { id: 'projects', label: 'Projects' },
    { id: 'colors', label: 'Theme' },
  ];

  const handleSave = (data) => {
    console.log('Saved:', data);
    toast.success('Changes saved successfully');
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <Card className="mb-8">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-3xl">Dashboard</CardTitle>
          <div className="flex space-x-2">
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button onClick={handleLogout} variant="outline">Logout</Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-text-primary-on-background">Welcome, {user?.name || 'User'}</p>
        </CardContent>
      </Card>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="bio">
          <BioForm onSave={handleSave} />
        </TabsContent>
        <TabsContent value="photos">
          <PhotoUpload onSave={handleSave} />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectForm onSave={handleSave} />
        </TabsContent>
        <TabsContent value="colors">
          <ColorSettings />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

export default AdminDashboard;