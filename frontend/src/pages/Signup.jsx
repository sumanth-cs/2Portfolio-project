import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Button } from '../components/ui/button.jsx';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signup(data.name, data.email, data.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-primary-100"
    >
      <div className="bg-surface p-8 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-3xl font-bold text-primary-300 mb-6">Sign Up</h3>
        {error && <p className="text-error mb-4">{error}</p>}
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="bg-surface"
            />
            {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
              className="bg-surface"
            />
            {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="bg-primary-200 hover:bg-primary-300 w-full">
            Sign Up
          </Button>
        </form>
      </div>
    </motion.section>
  );
}

export default Signup;