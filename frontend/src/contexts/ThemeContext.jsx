import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { getTheme, updateTheme } from '../api/theme.js';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [colors, setColors] = useState({
    primary: '#2563eb',
    'text-color': '#000000',
    'bg-color': '#ffffff',
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
          const theme = response.theme || {};
          setColors({
            primary: theme.primary || '#2563eb',
            'text-color': theme['text-color'] || '#000000',
            'bg-color': theme['bg-color'] || '#ffffff',
          });
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
    root.style.setProperty('--text-color', colors['text-color']);
    root.style.setProperty('--bg-color', colors['bg-color']);
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