/**
 * Provides authentication context with JWT-based user session management.
 */
import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { signup, login, logout, getCurrentUser } from '../api/api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkSession = useCallback(async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.user);
      setError(null);
    } catch (err) {
      // Handle 401 gracefully (user not logged in)
      if (err.message.includes('401')) {
        setUser(null);
        localStorage.removeItem('token');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const loginUser = async (email, password) => {
    try {
      setError(null);
      const response = await login(email, password);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signupUser = async (name, email, password) => {
    try {
      setError(null);
      const response = await signup(name, email, password);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logoutUser = async () => {
    try {
      setError(null);
      await logout();
      localStorage.removeItem('token');
      setUser(null);
    } catch (err) {
      setError('Logout failed');
      console.error('Logout failed:', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login: loginUser, signup: signupUser, logout: logoutUser, loading, error, checkSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};