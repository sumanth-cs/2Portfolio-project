import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { uploadFile } from '../../api/upload.js';
import { updateBio, getBio } from '../../api/bio.js';
import { Button } from '../ui/button.jsx';
import { Input } from '../ui/input.jsx';
import { Label } from '../ui/label.jsx';
import { toast } from 'react-hot-toast';
import { ThemeContext } from '@/contexts/ThemeContext.jsx';

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
      // Upload the first image (assuming single profile image)
      if (files.length === 0) {
        throw new Error('No files selected');
      }
      const file = files[0]; // Use first file
      const fileUrl = await uploadFile(file);
      // Fetch current bio
      const currentBio = await getBio();
      const bio = currentBio.bio || currentBio || {};
      // Update bio with image URL
      const updatedBio = {
        ...bio,
        image: fileUrl,
      };
      const response = await updateBio(updatedBio);
      toast.success('Profile photo uploaded successfully!');
      setFiles([]);
      onSave([fileUrl]); // Keep onSave for consistency
    } catch (error) {
      console.error('Upload error:', error);
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
          <Input
            id="photos"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <Button
          type="submit"
          disabled={loading || files.length === 0}
          style={{
            backgroundColor: colors.primary,
            color: colors.buttonText,
          }}
        >
          {loading ? 'Uploading...' : 'Upload Photo'}
        </Button>
      </form>
    </motion.section>
  );
}

export default PhotoUpload;