/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        'background-primary': 'rgb(var(--color-background-primary))',
        'background-secondary': 'rgb(var(--color-background-secondary))',
        'background-accent': 'rgb(var(--color-background-accent))',
        text: 'rgb(var(--color-text))',
        'text-primary': 'rgb(var(--color-text-primary))',
        'text-secondary': 'rgb(var(--color-text-secondary))',
        'background-gray': 'rgb(var(--color-background-gray))',
      },
    },
  },
    corePlugins: {
    preflight: false, 
  },
  plugins: [],
};
