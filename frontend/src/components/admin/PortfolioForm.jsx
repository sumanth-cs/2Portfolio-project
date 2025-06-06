import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { createPortfolio } from '../../api/portfolio.js';
import { uploadFile } from '../../lib/appwrite/storage.js';
import { Input } from '../ui/input.jsx';
import { Label } from '../ui/label.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { Button } from '../ui/button.jsx';

function PortfolioForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let photoId = null;
      if (data.photo[0]) {
        const uploadedFile = await uploadFile(data.photo[0]);
        photoId = uploadedFile.$id;
      }
      const portfolioData = {
        userId: user.id,
        title: data.title,
        description: data.description,
        photoId,
      };
      await createPortfolio(portfolioData);
      alert('Portfolio created successfully!');
      reset();
    } catch (error) {
      alert(`Failed to create portfolio: ${error.message}`);
      console.error('Portfolio creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary-200 p-6 rounded-lg shadow-md"
    >
      <h3 className="text-2xl font-bold text-primary-300 mb-4">Create</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title">Portfolio Title</Label>
          <Input
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="bg-surface"
          />
          {errors.title && <p className="text-error text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            className="bg-surface"
          />
          {errors.description && <p className="text-error text-sm">{errors.description?.message}</p>}
        </div>
        <div>
          <Label htmlFor="photo">Portfolio Photo</Label>
          <Input
            id="photo"
            type="file"
            accept="image/*"
            {...register('photo')}
            className="bg-surface"
          />
        </div>
        <Button type="submit" disabled={loading} className="bg-primary-200 hover:bg-primary-300">
          {loading ? 'Creating...' : 'Create Portfolio'}
        </Button>
      </form>
    </motion.section>
  );
}

export default PortfolioForm;