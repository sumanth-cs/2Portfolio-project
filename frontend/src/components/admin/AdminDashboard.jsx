import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { usePortfolio } from "../../contexts/PortfolioContext";
import { Link } from "react-router-dom";
import BioForm from "./BioForm";
import PhotoUpload from "./PhotoUpload";
import ProjectForm from "./ProjectForm";
import ColorSettings from "./ColorSettings";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import { Home, Image, Palette, Briefcase, LogOut } from "lucide-react";

function AdminDashboard() {
  const { user, signout } = useContext(AuthContext); // Updated to use signout
  const { refetch } = usePortfolio();
  const [activeTab, setActiveTab] = useState("bio");
  const tabs = [
    { id: "bio", label: "Bio", icon: <Briefcase className="w-4 h-4 mr-2" /> },
    { id: "photos", label: "Photos", icon: <Image className="w-4 h-4 mr-2" /> },
    {
      id: "projects",
      label: "Projects",
      icon: <Briefcase className="w-4 h-4 mr-2" />,
    },
    {
      id: "colors",
      label: "Theme",
      icon: <Palette className="w-4 h-4 mr-2" />,
    },
  ];

  const handleSave = async (data) => {
    try {
      await refetch(); // Refresh data after save
      console.log("Saved:", data);
      toast.success("Changes saved successfully");
    } catch (error) {
      toast.error("Failed to save changes");
    }
  };

  const handleLogout = async () => {
    try {
      await signout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <Button asChild variant="outline">
                <Link to="/">Back to Home</Link>
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
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
          {activeTab === "bio" && <BioForm onSave={handleSave} />}
          {activeTab === "photos" && <PhotoUpload onSave={handleSave} />}
          {activeTab === "projects" && <ProjectForm onSave={handleSave} />}
          {activeTab === "colors" && <ColorSettings />}
        </motion.div>
      </main>
    </div>
  );
}

export default AdminDashboard;
