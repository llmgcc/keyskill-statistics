/** @type {import('tailwindcss').Config} */
/* eslint-disable */
// const { blackA, mauve, violet } = require('@radix-ui/colors');

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

  plugins: [],
};
