/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      'scroll-container': {
        overflowX: 'scroll',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
  },
  plugins: [],
};
