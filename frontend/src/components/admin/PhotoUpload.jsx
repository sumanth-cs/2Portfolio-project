import { useState } from 'react';
import { motion } from 'framer-motion';
import { uploadFile } from '../../lib/appwrite/storage.js';
import { Button } from '../ui/button.jsx';
import { Input } from '../ui/input.jsx';
import { Label } from '../ui/label.jsx';

function PhotoUpload() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadedFiles = await uploadFile(files);
      alert(`Uploaded ${uploadedFiles.length} photos successfully!`);
      setFiles([]);
    } catch (error) {
      alert(`Failed to upload photos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-tertiary-100 p-6 rounded-lg shadow-md"
    >
      <h3 className="text-2xl font-bold text-primary-300 mb-4">Upload Photos</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="photos">Select Photos</Label>
          <Input
            id="photos"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="bg-surface"
          />
        </div>
        <Button type="submit" disabled={loading || files.length === 0} className="bg-primary-200 hover:bg-primary-300">
          {loading ? 'Uploading...' : 'Upload Photos'}
        </Button>
      </form>
    </motion.section>
  );
}

export default PhotoUpload;