/** @type {import('tailwindcss').Config} */
/* eslint-disable */
const { blackA, mauve, violet } = require('@radix-ui/colors');

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
        ...blackA,
        ...mauve,
        ...violet,
      },
    },
  },
  keyframes: {
    slideUpAndFade: {
      from: { opacity: '0', transform: 'translateY(2px)' },
      to: { opacity: '1', transform: 'translateY(0)' },
    },
    slideRightAndFade: {
      from: { opacity: '0', transform: 'translateX(-2px)' },
      to: { opacity: '1', transform: 'translateX(0)' },
    },
    slideDownAndFade: {
      from: { opacity: '0', transform: 'translateY(-2px)' },
      to: { opacity: '1', transform: 'translateY(0)' },
    },
    slideLeftAndFade: {
      from: { opacity: '0', transform: 'translateX(2px)' },
      to: { opacity: '1', transform: 'translateX(0)' },
    },
  },
  animation: {
    slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
  plugins: [],
};
