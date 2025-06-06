// import React, { createContext, useState, useEffect } from 'react';
// import { themeFromSourceColor, argbFromHex, applyTheme } from '@material/material-color-utilities';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [sourceColor, setSourceColor] = useState(localStorage.getItem('themeColor') || '#0d9488'); // Default teal
//   const [isDark, setIsDark] = useState(
//     localStorage.getItem('themeMode') === 'dark' ||
//     window.matchMedia('(prefers-color-scheme: dark)').matches
//   );

//   useEffect(() => {
//     try {
//       const theme = themeFromSourceColor(argbFromHex(sourceColor));
//       const scheme = isDark ? theme.schemes.dark : theme.schemes.light;

//       // Apply theme to document root
//       applyTheme(theme, { target: document.documentElement, dark: isDark });

//       // Update CSS custom properties
//       const root = document.documentElement;
//       Object.entries(scheme.toJSON()).forEach(([key, value]) => {
//         const rgb = `rgb(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255})`;
//         root.style.setProperty(`--mdc-theme-${key}`, rgb);
//       });

//       // Save to localStorage
//       localStorage.setItem('themeColor', sourceColor);
//       localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
//     } catch (error) {
//       console.error('Error applying theme:', error);
//     }
//   }, [sourceColor, isDark]);

//   const toggleDarkMode = () => setIsDark((prev) => !prev);
//   const updateSourceColor = (color) => setSourceColor(color);

//   return (
//     <ThemeContext.Provider value={{ sourceColor, isDark, toggleDarkMode, updateSourceColor }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';
import { themeFromSourceColor, argbFromHex, applyTheme } from '@material/material-color-utilities';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [sourceColor, setSourceColor] = useState(localStorage.getItem('themeColor') || '#0d9488');
  const [isDark, setIsDark] = useState(
    localStorage.getItem('themeMode') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    try {
      const theme = themeFromSourceColor(argbFromHex(sourceColor));
      const scheme = isDark ? theme.schemes.dark : theme.schemes.light;

      // Apply theme to document root
      applyTheme(theme, { target: document.documentElement, dark: isDark });

      // Update CSS custom properties with lighter shades
      const root = document.documentElement;
      const shades = {
        'primary-100': scheme.primary + 0x20,
        'primary-200': scheme.primary,
        'primary-300': scheme.primary - 0x20,
        'secondary-100': scheme.secondary + 0x20,
        'secondary-200': scheme.secondary,
        'secondary-300': scheme.secondary - 0x20,
        'tertiary-100': scheme.tertiary + 0x20,
        'tertiary-200': scheme.tertiary,
        'tertiary-300': scheme.tertiary - 0x20,
      };

      Object.entries(shades).forEach(([key, value]) => {
        const rgb = `rgb(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255})`;
        root.style.setProperty(`--mdc-theme-${key}`, rgb);
      });

      localStorage.setItem('themeColor', sourceColor);
      localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [sourceColor, isDark]);

  const toggleDarkMode = () => setIsDark((prev) => !prev);
  const updateSourceColor = (color) => setSourceColor(color);

  return (
    <ThemeContext.Provider value={{ sourceColor, isDark, toggleDarkMode, updateSourceColor }}>
      {children}
    </ThemeContext.Provider>
  );
};