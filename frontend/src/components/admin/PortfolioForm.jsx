import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { createPortfolio, updatePortfolio, getPortfolios } from '../../api/portfolio.js';
import { uploadFile } from '@/lib/appwrite/storage.js';
import { Input } from '../ui/input.jsx';
import { Label } from '../ui/label.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { Button } from '../ui/button.jsx';
import { toast } from 'react-hot-toast';

function PortfolioForm({ onSave }) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [existingPortfolio, setExistingPortfolio] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolios = await getPortfolios();
        if (portfolios.length > 0) {
          const portfolio = portfolios[0];
          setExistingPortfolio(portfolio);
          setValue('title', portfolio.title);
          setValue('description', portfolio.description);
          setTags(portfolio.tags || []);
        }
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      }
    };
    if (user) fetchPortfolio();
  }, [user, setValue]);

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = existingPortfolio?.image;
      if (data.image[0]) {
        imageUrl = await uploadFile(data.image[0]);
      }
      const portfolioData = {
        title: data.title,
        description: data.description,
        image: imageUrl || '', // Ensure image is a string
        tags,
      };
      let portfolio;
      if (existingPortfolio) {
        portfolio = await updatePortfolio({ ...portfolioData, id: existingPortfolio._id });
        toast.success('Portfolio updated successfully!');
      } else {
        portfolio = await createPortfolio(portfolioData);
        toast.success('Portfolio created successfully!');
      }
      reset();
      setTags([]);
      setExistingPortfolio(portfolio);
      onSave(portfolio);
    } catch (error) {
      toast.error(`Failed to save portfolio: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-primary-300">{existingPortfolio ? 'Edit' : 'Create'} Portfolio</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title">Portfolio Title</Label>
          <Input
            id="title"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-error text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <p className="text-error text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <Label htmlFor="image">Portfolio Image</Label>
          {existingPortfolio?.image && (
            <img src={existingPortfolio.image} alt="Preview" className="w-32 h-32 object-cover mb-2" />
          )}
          <Input
            id="image"
            type="file"
            accept="image/*"
            {...register('image')}
          />
        </div>
        <div>
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-1 px-2 py-1 bg-primary-200 text-white rounded">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(index)}>×</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag and press Enter"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button type="button" onClick={handleAddTag}>Add Tag</Button>
          </div>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : existingPortfolio ? 'Update Portfolio' : 'Create Portfolio'}
        </Button>
      </form>
    </motion.section>
  );
}

export default PortfolioForm;