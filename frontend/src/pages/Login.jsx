import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Button } from '../components/ui/button.jsx';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext);
  const [error, setError ] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
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
        <h3 className="text-3xl font-bold text-primary-300 mb-6">Login</h3>
        {error && <p className="text-error mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              {...register('password', { required: 'Password is required' })}
              className="bg-surface"
            />
            {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="bg-primary-200 hover:bg-primary-300 w-full">
            Login
          </Button>
        </form>
      </div>
    </motion.section>
  );
}

export default Login;