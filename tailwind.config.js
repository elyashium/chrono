/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'fixed',
    'top-0', 'right-0', 'bottom-0', 'left-0',
    'w-48',
    'p-4',
    'rounded-xl',
    'backdrop-blur-md',
    'shadow-lg',
    'z-[2147483647]',
    'space-y-2',
    'space-y-3',
    'flex',
    'items-center',
    'justify-between',
    'justify-center',
    'gap-3',
    'text-xs',
    'text-sm',
    'font-medium',
    'text-white',
    'text-secondary',
    'border-t',
    'border-white/10',
    'pt-2',
    'mr-1.5',
    'truncate',
    'absolute',
    'inset-0',
    'stroke-white/10',
    'stroke-white/90'
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