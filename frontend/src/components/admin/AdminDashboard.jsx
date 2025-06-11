// // // import { motion } from 'framer-motion';
// // // import { useContext, useState } from 'react';
// // // import { AuthContext } from '../../contexts/AuthContext.jsx';
// // // import BioForm from './BioForm.jsx';
// // // import PhotoUpload from './PhotoUpload.jsx';
// // // import ProjectForm from './ProjectForm.jsx';
// // // import ColorSettings from './ColorSettings.jsx';
// // // import { Button } from '../ui/button';
// // // import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
// // // import { Tabs, TabsList, TabsContent, TabsTrigger } from '../ui/tabs';
// // // import { toast } from 'react-hot-toast';

// // // function AdminDashboard() {
// // //   const { user, logout } = useContext(AuthContext);
// // //   const [activeTab, setActiveTab] = useState('bio');

// // //   const tabs = [
// // //     { id: 'bio', label: 'Bio' },
// // //     { id: 'photos', label: 'Photos' },
// // //     { id: 'projects', label: 'Projects' },
// // //     { id: 'colors', label: 'Theme' },
// // //   ];

// // //   const handleSave = (data) => {
// // //     console.log('Saved:', data);
// // //     toast.success('Changes saved successfully');
// // //   };

// // //   const handleLogout = async () => {
// // //     try {
// // //       await logout();
// // //       toast.success('Logged out successfully');
// // //     } catch (error) {
// // //       toast.error('Logout failed');
// // //     }
// // //   };

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0 }}
// // //       animate={{ opacity: 1 }}
// // //       className="container mx-auto px-4 py-8"
// // //     >
// // //       <Card className="mb-8">
// // //         <CardHeader className="flex flex-row justify-between items-center">
// // //           <CardTitle className="text-3xl">Dashboard</CardTitle>
// // //           <Button onClick={handleLogout} variant="outline">Logout</Button>
// // //         </CardHeader>
// // //         <CardContent>
// // //           <p className="text-text-primary-on-background">Welcome, {user?.name || 'User'}</p>
// // //         </CardContent>
// // //       </Card>
// // //       <Tabs value={activeTab} onValueChange={setActiveTab}>
// // //         <TabsList className="mb-8">
// // //           {tabs.map((tab) => (
// // //             <TabsTrigger key={tab.id} value={tab.id}>
// // //               {tab.label}
// // //             </TabsTrigger>
// // //           ))}
// // //         </TabsList>
// // //         <TabsContent value="bio">
// // //           <BioForm onSave={handleSave} />
// // //         </TabsContent>
// // //         <TabsContent value="photos">
// // //           <PhotoUpload onSave={handleSave} />
// // //         </TabsContent>
// // //         <TabsContent value="projects">
// // //           <ProjectForm onSave={handleSave} />
// // //         </TabsContent>
// // //         <TabsContent value="colors">
// // //           <ColorSettings />
// // //         </TabsContent>
// // //       </Tabs>
// // //     </motion.div>
// // //   );
// // // }

// // // export default AdminDashboard;

// // import { motion } from 'framer-motion';
// // import { useContext, useState } from 'react';
// // import { AuthContext } from '../../contexts/AuthContext.jsx';
// // import { Link } from 'react-router-dom';
// // import BioForm from './BioForm.jsx';
// // import PhotoUpload from './PhotoUpload.jsx';
// // import ProjectForm from './ProjectForm.jsx';
// // import ColorSettings from './ColorSettings.jsx';
// // import { Button } from '../ui/button';
// // import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
// // import { Tabs, TabsList, TabsContent, TabsTrigger } from '../ui/tabs';
// // import { toast } from 'react-hot-toast';

// // function AdminDashboard() {
// //   const { user, logout } = useContext(AuthContext);
// //   const [activeTab, setActiveTab] = useState('bio');

// //   const tabs = [
// //     { id: 'bio', label: 'Bio' },
// //     { id: 'photos', label: 'Photos' },
// //     { id: 'projects', label: 'Projects' },
// //     { id: 'colors', label: 'Theme' },
// //   ];

// //   const handleSave = (data) => {
// //     console.log('Saved:', data);
// //     toast.success('Changes saved successfully');
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       await logout();
// //       toast.success('Logged out successfully');
// //     } catch (error) {
// //       toast.error('Logout failed');
// //     }
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       className="container mx-auto px-4 py-8"
// //     >
// //       <Card className="mb-8">
// //         <CardHeader className="flex flex-row justify-between items-center">
// //           <CardTitle className="text-3xl">Dashboard</CardTitle>
// //           <div className="flex space-x-2">
// //             <Button asChild variant="outline">
// //               <Link to="/">Back to Home</Link>
// //             </Button>
// //             <Button onClick={handleLogout} variant="outline">Logout</Button>
// //           </div>
// //         </CardHeader>
// //         <CardContent>
// //           <p className="text-text-primary-on-background">Welcome, {user?.name || 'User'}</p>
// //         </CardContent>
// //       </Card>
// //       <Tabs value={activeTab} onValueChange={setActiveTab}>
// //         <TabsList className="mb-8">
// //           {tabs.map((tab) => (
// //             <TabsTrigger key={tab.id} value={tab.id}>
// //               {tab.label}
// //             </TabsTrigger>
// //           ))}
// //         </TabsList>
// //         <TabsContent value="bio">
// //           <BioForm onSave={handleSave} />
// //         </TabsContent>
// //         <TabsContent value="photos">
// //           <PhotoUpload onSave={handleSave} />
// //         </TabsContent>
// //         <TabsContent value="projects">
// //           <ProjectForm onSave={handleSave} />
// //         </TabsContent>
// //         <TabsContent value="colors">
// //           <ColorSettings />
// //         </TabsContent>
// //       </Tabs>
// //     </motion.div>
// //   );
// // }

// // export default AdminDashboard;

// // frontend/src/components/admin/AdminDashboard.jsx
// import { motion } from 'framer-motion';
// import { useContext, useState } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import { Link } from 'react-router-dom';
// import BioForm from './BioForm';
// import PhotoUpload from './PhotoUpload';
// import ProjectForm from './ProjectForm';
// import ColorSettings from './ColorSettings';
// import { Button } from '../ui/button';
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
//     <div className="min-h-screen bg-gray-100">
//       {/* YouTube-like header */}
//       <header className="bg-white shadow-sm">
//         <div className="flex items-center justify-between px-4 py-3 border-b">
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="icon" asChild>
//               <Link to="/">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </Link>
//             </Button>
//             <h1 className="text-xl font-bold">Dashboard</h1>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button variant="outline" onClick={handleLogout}>
//               Logout
//             </Button>
//           </div>
//         </div>
        
//         {/* Tabs */}
//         <div className="flex border-b">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`px-4 py-3 font-medium text-sm ${activeTab === tab.id ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600 hover:text-gray-900'}`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="container mx-auto px-4 py-6">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="bg-white rounded-lg shadow p-6"
//         >
//           {activeTab === 'bio' && <BioForm onSave={handleSave} />}
//           {activeTab === 'photos' && <PhotoUpload onSave={handleSave} />}
//           {activeTab === 'projects' && <ProjectForm onSave={handleSave} />}
//           {activeTab === 'colors' && <ColorSettings />}
//         </motion.div>
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;

import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import BioForm from './BioForm';
import PhotoUpload from './PhotoUpload';
import ProjectForm from './ProjectForm';
import ColorSettings from './ColorSettings';
import { Button } from '../ui/button';
import { toast } from 'react-hot-toast';
import { Home, Image, Palette, Briefcase, LogOut } from 'lucide-react';

function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('bio');
  const tabs = [
    { id: 'bio', label: 'Bio', icon: <Briefcase className="w-4 h-4 mr-2" /> },
    { id: 'photos', label: 'Photos', icon: <Image className="w-4 h-4 mr-2" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4 mr-2" /> },
    { id: 'colors', label: 'Theme', icon: <Palette className="w-4 h-4 mr-2" /> },
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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <Home className="h-6 w-6" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm flex items-center ${
                activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-12 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow p-6"
        >
          {activeTab === 'bio' && <BioForm onSave={handleSave} />}
          {activeTab === 'photos' && <PhotoUpload onSave={handleSave} />}
          {activeTab === 'projects' && <ProjectForm onSave={handleSave} />}
          {activeTab === 'colors' && <ColorSettings />}
        </motion.div>
      </main>
    </div>
  );
}

export default AdminDashboard;