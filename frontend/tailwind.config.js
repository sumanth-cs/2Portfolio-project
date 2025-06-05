/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        teal: {
          600: '#0d9488',
          700: '#0f766e',
        },
        slate: {
          800: '#1e293b',
          900: '#0f172a',
        },
      },
    },
  },
  plugins: [],
};