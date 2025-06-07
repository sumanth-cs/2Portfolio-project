import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { getTheme, updateTheme } from '../api/theme.js';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [colors, setColors] = useState({
    primary: '#2563eb',
    accent: '#10b981',
  });
  const [isDark, setIsDark] = useState(
    localStorage.getItem('themeMode') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const fetchTheme = async () => {
      if (user) {
        try {
          const response = await getTheme();
          if (response.theme) {
            setColors({
              primary: response.theme.primary || '#2563eb',
              accent: response.theme.accent || '#10b981',
            });
          }
        } catch (error) {
          console.error('Error fetching theme:', error);
        }
      }
    };
    fetchTheme();
  }, [user]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--text-color', isDark ? '#ffffff' : '#000000');
    root.style.setProperty('--bg-color', isDark ? '#1f2937' : '#ffffff');
    root.classList.toggle('dark', isDark);
    localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
  }, [colors, isDark]);

  const toggleDarkMode = () => setIsDark((prev) => !prev);

  const updateColors = async (newColors) => {
    setColors((prev) => ({ ...prev, ...newColors }));
    if (user) {
      try {
        await updateTheme(newColors);
      } catch (error) {
        console.error('Error updating theme:', error);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleDarkMode, updateColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};