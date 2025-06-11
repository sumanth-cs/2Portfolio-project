import { createContext, useState, useEffect } from 'react';
import { getCurrentUser, logout } from '../api/api.js';

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

  const login = async (email, password) => {
    try {
      const response = await import('../api/api.js').then(({ login }) => login(email, password));
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await import('../api/api.js').then(({ signup }) => signup(name, email, password));
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
    <AuthContext.Provider value={{ user, loading, login, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};