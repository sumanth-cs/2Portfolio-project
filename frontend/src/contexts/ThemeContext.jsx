// frontend/src/contexts/ThemeContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTheme, updateTheme } from '../api/theme.js';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colors, setColors] = useState({
    text: '#000000',
    background: '#ffffff'
  });
  
  const fetchTheme = async () => {
    try {
      const theme = await getTheme();
      if (theme) {
        setColors({
          text: theme['text-color'] || '#000000',
          background: theme['bg-color'] || '#ffffff'
        });
      }
    } catch (error) {
      console.error('Error fetching theme:', error);
    }
  };

  const updateColors = async (newColors) => {
    try {
      const updated = await updateTheme(newColors);
      setColors(prev => ({
        ...prev,
        ...newColors
      }));
      return updated;
    } catch (error) {
      console.error('Error updating theme:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ colors, updateColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);