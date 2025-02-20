/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/content/index.jsx"
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          dark: 'rgba(23, 23, 23, 0.95)',
          border: 'rgba(255, 255, 255, 0.1)'
        }
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)'
      }
    },
  },
  plugins: [],
} 