import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { uploadFile } from "../../lib/appwrite/storage.js";
import { updateBio, getBio } from "../../api/bio.js";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "react-hot-toast";
import { ThemeContext } from "@/contexts/ThemeContext.jsx";

function PhotoUpload({ onSave }) {
  const [profileFile, setProfileFile] = useState(null);
  const [aboutFile, setAboutFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { colors } = useContext(ThemeContext);

  const handleProfileChange = (e) => {
    setProfileFile(e.target.files[0]);
  };

  const handleAboutChange = (e) => {
    setAboutFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!profileFile && !aboutFile) {
        throw new Error("No files selected");
      }

      let profileUrl = null;
      let aboutUrl = null;

      if (profileFile) {
        profileUrl = await uploadFile(profileFile);
        if (!profileUrl) throw new Error("Failed to upload profile photo");
      }

      if (aboutFile) {
        aboutUrl = await uploadFile(aboutFile);
        if (!aboutUrl) throw new Error("Failed to upload about photo");
      }

      const currentBio = await getBio();
      if (!currentBio.name || !currentBio.title || !currentBio.bio || !currentBio.email) {
        throw new Error("Bio is missing required fields. Please update your bio first.");
      }

      const updatedBio = {
        ...currentBio,
        image: profileUrl || currentBio.image,
        aboutImage: aboutUrl || currentBio.aboutImage
      };

      const response = await updateBio(updatedBio);
      toast.success("Photos uploaded successfully!");
      setProfileFile(null);
      setAboutFile(null);
      onSave({ image: profileUrl, aboutImage: aboutUrl });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Failed to upload photos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-2xl font-bold">Upload Photos</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="profilePhoto">Profile Photo</Label>
          <div className="relative w-fit border border-gray-300 rounded-lg">
            <input
              id="profilePhoto"
              type="file"
              accept="image/*"
              onChange={handleProfileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-50"
            />
            <Label
              htmlFor="profilePhoto"
              className="inline-block bg-blue-600 text-white py-2 px-4 m-2 rounded cursor-pointer"
              style={{ backgroundColor: colors.primary, color: colors.buttonText }}
            >
              Choose Profile Photo
            </Label>
          </div>
          {profileFile && <p className="text-sm text-gray-600 mt-2">Selected: {profileFile.name}</p>}
        </div>

        <div>
          <Label htmlFor="aboutPhoto">About Section Photo</Label>
          <div className="relative w-fit border border-gray-300 rounded-lg">
            <input
              id="aboutPhoto"
              type="file"
              accept="image/*"
              onChange={handleAboutChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-50"
            />
            <Label
              htmlFor="aboutPhoto"
              className="inline-block bg-blue-600 text-white py-2 px-4 m-2 rounded cursor-pointer"
              style={{ backgroundColor: colors.primary, color: colors.buttonText }}
            >
              Choose About Photo
            </Label>
          </div>
          {aboutFile && <p className="text-sm text-gray-600 mt-2">Selected: {aboutFile.name}</p>}
        </div>

        <Button
          type="submit"
          disabled={loading || (!profileFile && !aboutFile)}
          style={{ backgroundColor: colors.primary, color: colors.buttonText }}
        >
          {loading ? "Uploading..." : "Upload Photos"}
        </Button>
      </form>
    </motion.section>
  );
}

export default PhotoUpload;