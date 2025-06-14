import { createContext, useState, useEffect, useContext } from 'react';
import { getTheme, updateTheme } from '../api/theme';
import { useAuth } from './AuthContext';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user } = useAuth();
  const [colors, setColors] = useState({
    text: '#000000',
    background: '#ffffff',
    primary: '#0B1D51',
    secondary: '#6b7280',
    accent: '#10b981',
    buttonText: '#ffffff'
  });

  const fetchTheme = async (userId = null) => {
    try {
      const targetUserId = userId || user?.id;
      const theme = await getTheme(targetUserId);
      if (theme) {
        setColors({
          text: theme['text-color'] || '#000000',
          background: theme['bg-color'] || '#ffffff',
          primary: theme['primary-color'] || '#0B1D51',
          secondary: theme['secondary-color'] || '#6b7280',
          accent: theme['accent-color'] || '#10b981',
          buttonText: theme['button-text'] || '#ffffff'
        });
      }
    } catch (error) {
      console.error('Error fetching theme:', error);
    }
  };

  const updateColors = async (newColors) => {
    try {
      const themeData = {
        'text-color': newColors.text || colors.text,
        'bg-color': newColors.background || colors.background,
        'primary-color': newColors.primary || colors.primary,
        'secondary-color': newColors.secondary || colors.secondary,
        'accent-color': newColors.accent || colors.accent,
        'button-text': newColors.buttonText || colors.buttonText
      };
      await updateTheme(themeData);
      setColors(newColors);
    } catch (error) {
      console.error('Error updating theme:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      fetchTheme();
    }
  }, [user]);

  useEffect(() => {
    document.documentElement.style.setProperty('--text-color', colors.text);
    document.documentElement.style.setProperty('--bg-color', colors.background);
    document.documentElement.style.setProperty('--primary-color', colors.primary);
    document.documentElement.style.setProperty('--secondary-color', colors.secondary);
    document.documentElement.style.setProperty('--accent-color', colors.accent);
    document.documentElement.style.setProperty('--button-text', colors.buttonText);
  }, [colors]);

  return (
    <ThemeContext.Provider value={{ colors, updateColors, fetchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);