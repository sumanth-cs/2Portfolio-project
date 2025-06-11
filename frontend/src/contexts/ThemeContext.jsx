import { createContext, useState, useEffect, useContext } from 'react';
import { getTheme, updateTheme } from '../api/theme';

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
      // Use defaults if error occurs
      setColors({
        text: '#000000',
        background: '#ffffff'
      });
    }
  };

  const updateColors = async (newColors) => {
    try {
      const updated = await updateTheme({
        'text-color': newColors.text || colors.text,
        'bg-color': newColors.background || colors.background
      });
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

  // Apply colors to root CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--text-color', colors.text);
    document.documentElement.style.setProperty('--bg-color', colors.background);
  }, [colors]);

  return (
    <ThemeContext.Provider value={{ colors, updateColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);