/**
 * Signup page component.
 */
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Button } from '../components/ui/button.jsx';
import PropTypes from 'prop-types';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: '', email: '', password: '' },
  });
  const { signup } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await signup(data.name, data.email, data.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Left Side - Branding */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <Link to="/" className="inline-block">
              <h1 className="text-slate-900 font-heading text-5xl md:text-6xl lg:text-7xl">
                Portfolio
              </h1>
            </Link>
            <h2 className="mt-6 text-2xl md:text-3xl font-bold">Create a new account</h2>
            <p className="mt-2 text-gray-600">Sign up for your portfolio</p>
          </div>
          {/* Right Side - Form */}
          <div className="w-full md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    })}
                    placeholder="Name"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address',
                      },
                    })}
                    placeholder="Email"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    })}
                    placeholder="Password"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <Button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-600 w-full"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Sign Up'}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                <span>Have an account? </span>
                <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
              </div>
              {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

Signup.propTypes = {};

export default Signup;