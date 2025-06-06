import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { updateBio, getBio } from '../../api/bio.js';
import { Input } from '../ui/input.jsx';
import { Label } from '../ui/label.jsx';
import { Textarea } from '../ui/textarea.jsx';
import { Button } from '../ui/button.jsx';

function BioForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const bio = await getBio();
        setValue('name', bio.name || '');
        setValue('title', bio.title || '');
        setValue('bio', bio.bio || '');
        setValue('email', bio.email || '');
        setValue('phone', bio.phone || '');
      } catch (error) {
        console.error('Failed to fetch bio:', error);
      }
    };
    fetchBio();
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateBio(data);
      alert('Bio updated successfully!');
    } catch (error) {
      alert(`Failed to update bio: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary-100 p-6 rounded-lg shadow-md mb-8"
    >
      <h3 className="text-2xl font-bold text-primary-300 mb-4">Update Bio</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="bg-surface"
          />
          {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="bg-surface"
          />
          {errors.title && <p className="text-error text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="bio">Bio Description</Label>
          <Textarea
            id="bio"
            {...register('bio', { required: 'Bio is required' })}
            className="bg-surface"
          />
          {errors.bio && <p className="text-error text-sm">{errors.bio.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
            })}
            className="bg-surface"
          />
          {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            {...register('phone')}
            className="bg-surface"
          />
        </div>
        <Button type="submit" disabled={loading} className="bg-primary-200 hover:bg-primary-300">
          {loading ? 'Saving...' : 'Save Bio'}
        </Button>
      </form>
    </motion.section>
  );
}

export default BioForm;