const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', ...fontFamily.sans],
        mono: ['var(--font-spaceMono)', ...fontFamily.mono],
      },
    },
  },
  plugins: [],
};
