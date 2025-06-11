import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { uploadFile } from '../../api/upload.js';
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
      const uploadedUrls = [];
      for (const file of files) {
        const url = await uploadFile(file);
        if (url) {
          uploadedUrls.push(url);
        }
      }
      if (uploadedUrls.length === 0) {
        throw new Error('No files were uploaded successfully.');
      }
      toast.success(`Uploaded ${uploadedUrls.length} photos successfully!`);
      setFiles([]);
      onSave(uploadedUrls);
    } catch (error) {
      console.error('Upload error:', error);
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
          <Label htmlFor="photos">Select Photos</Label>
          <Input
            id="photos"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <Button type="submit" disabled={loading || files.length === 0} style={{
            backgroundColor: colors.primary,
            color: colors.buttonText,
          }}>
          {loading ? 'Uploading...' : 'Upload Photos'}
        </Button>
      </form>
    </motion.section>
  );
}

export default PhotoUpload;