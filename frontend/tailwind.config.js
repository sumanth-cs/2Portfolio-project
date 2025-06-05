/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: 'var(--mdc-theme-primary)',
        secondary: 'var(--mdc-theme-secondary)',
        background: 'var(--mdc-theme-background)',
        surface: 'var(--mdc-theme-surface)',
        'on-primary': 'var(--mdc-theme-on-primary)',
        'on-secondary': 'var(--mdc-theme-on-secondary)',
        error: 'var(--mdc-theme-error)',
      },
    },
  },
  plugins: [],
};