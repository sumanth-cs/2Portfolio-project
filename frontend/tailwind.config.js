/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-100': 'var(--mdc-theme-primary-100)',
        'primary-200': 'var(--mdc-theme-primary-200)',
        'primary-300': 'var(--mdc-theme-primary-300)',
        'secondary-100': 'var(--mdc-theme-secondary-100)',
        'secondary-200': 'var(--mdc-theme-secondary-200)',
        'secondary-300': 'var(--mdc-theme-secondary-300)',
        'tertiary-100': 'var(--mdc-theme-tertiary-100)',
        'tertiary-200': 'var(--mdc-theme-tertiary-200)',
        'tertiary-300': 'var(--mdc-theme-tertiary-300)',
        surface: 'var(--mdc-theme-surface)',
        'on-surface': 'var(--mdc-theme-on-surface)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};