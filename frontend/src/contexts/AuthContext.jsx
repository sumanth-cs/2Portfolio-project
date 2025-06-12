import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logout, login, signup } from '../api/api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.user);
      } catch (error) {
        console.error('Auth check error:', error);
        if (
          error.message.includes('User not found') ||
          error.message.includes('Authentication required') ||
          error.message.includes('jwt expired') ||
          error.message.includes('Invalid or missing token')
        ) {
          localStorage.removeItem('token');
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const signupUser = async (name, email, password) => {
    try {
      const response = await signup(name, email, password);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Signup failed');
    }
  };

  const signout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login: loginUser, signup: signupUser, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);