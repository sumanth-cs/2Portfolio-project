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
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useContext(ThemeContext);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (files.length === 0) {
        throw new Error("No files selected");
      }
      const file = files[0];
      // Upload to Appwrite
      const fileUrl = await uploadFile(file);
      if (!fileUrl) {
        throw new Error("Failed to get file URL from Appwrite");
      }
      console.log("Appwrite file URL:", fileUrl); // Debug log
      // Fetch current bio
      const currentBio = await getBio();
      console.log("Current bio:", currentBio); // Debug log
      // Ensure required fields
      if (
        !currentBio.name ||
        !currentBio.title ||
        !currentBio.bio ||
        !currentBio.email
      ) {
        throw new Error(
          "Bio is missing required fields. Please update your bio in the Bio Settings form."
        );
      }
      // Update bio with image URL
      const updatedBio = {
        name: currentBio.name,
        title: currentBio.title,
        bio: currentBio.bio,
        email: currentBio.email,
        phone: currentBio.phone || "",
        image: fileUrl,
        skills: Array.isArray(currentBio.skills) ? currentBio.skills : [],
        education: Array.isArray(currentBio.education)
          ? currentBio.education
          : [],
        experience: Array.isArray(currentBio.experience)
          ? currentBio.experience
          : [],
        social: Array.isArray(currentBio.social) ? currentBio.social : [],
        resume: currentBio.resume || "",
      };
      console.log("Sending updated bio:", updatedBio); // Debug log
      const response = await updateBio(updatedBio);
      toast.success("Profile photo uploaded successfully!");
      setFiles([]);
      onSave([fileUrl]);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Failed to upload photo: ${error.message}`);
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
      <h3 className="text-2xl font-bold">Upload Profile Photo</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="photos">Select Profile Photo</Label>
          <div className="relative w-fit border border-gray-300 rounded-lg">
            <input
              id="photos"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer  z-50"
            />
            <Label
              htmlFor="photos"
              className="inline-block bg-blue-600 text-white py-2 px-4 m-2 rounded cursor-pointer "
              style={{
                backgroundColor: colors.primary,
                color: colors.buttonText,
              }}
            >
              Choose Profile Photo
            </Label>
          </div>
        </div>
        {files.length > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            Selected: {files[0].name}
          </p>
        )}
        <Button
          type="submit"
          disabled={loading || files.length === 0}
          style={{
            backgroundColor: colors.primary,
            color: colors.buttonText,
          }}
        >

          {loading ? "Uploading..." : "Upload Photo"}
        </Button>
      </form>
    </motion.section>
  );
}

export default PhotoUpload;
