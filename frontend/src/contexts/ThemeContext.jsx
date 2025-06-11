// frontend/src/contexts/ThemeContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { getTheme, updateTheme } from '../api/theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colors, setColors] = useState({
    text: '#000000',
    background: '#ffffff',
    primary: '#0B1D51', // Added primary color for buttons
    buttonText: '#ffffff' // Text color for primary buttons
  });

  const fetchTheme = async () => {
    try {
      const theme = await getTheme();
      if (theme) {
        setColors({
          text: theme['text-color'] || '#000000',
          background: theme['bg-color'] || '#ffffff',
          primary: theme['primary-color'] || '#0B1D51',
          buttonText: theme['button-text'] || '#ffffff'
        });
      }
    } catch (error) {
      console.error('Error fetching theme:', error);
      setColors({
        text: '#000000',
        background: '#ffffff',
        primary: '#0B1D51',
        buttonText: '#ffffff'
      });
    }
  };

  const updateColors = async (newColors) => {
    try {
      const updated = await updateTheme({
        'text-color': newColors.text || colors.text,
        'bg-color': newColors.background || colors.background,
        'primary-color': newColors.primary || colors.primary,
        'button-text': newColors.buttonText || colors.buttonText
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

  useEffect(() => {
    document.documentElement.style.setProperty('--text-color', colors.text);
    document.documentElement.style.setProperty('--bg-color', colors.background);
    document.documentElement.style.setProperty('--primary-color', colors.primary);
    document.documentElement.style.setProperty('--button-text', colors.buttonText);
  }, [colors]);

  return (
    <ThemeContext.Provider value={{ colors, updateColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);