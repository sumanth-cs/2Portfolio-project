import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { ThemeContext } from '../contexts/ThemeContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Button } from '../components/ui/button.jsx';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4"
      style={{ backgroundColor: colors.background }}
    >
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Left Side - Branding */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <Link to="/" className="inline-block">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl"
                  style={{ color: colors.text }}
              >
                Portfolio
              </h1>
            </Link>
            <h2 className="mt-6 text-2xl md:text-3xl font-bold"
                style={{ color: colors.text }}
            >
              Sign in to your account
            </h2>
            <p className="mt-2"
               style={{ color: colors.text }}
            >
              Access your portfolio
            </p>
          </div>
          {/* Right Side - Form */}
          <div className="w-full md:w-1/2">
            <div className="p-6 rounded-lg shadow-md max-w-lg mx-auto"
                 style={{ backgroundColor: colors.background }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="block mb-2"
                        style={{ color: colors.text }}
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="password" className="block mb-2"
                        style={{ color: colors.text }}
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    className="w-full"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.buttonText
                  }}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm"
                   style={{ color: colors.text }}
              >
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="hover:underline"
                  style={{ color: colors.primary }}
                >
                  Sign up
                </Link>
              </div>
              {error && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;