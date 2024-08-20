/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./ui/*.js', './client/*.html'],
  theme: {
    extend: {
      colors: {
        'custom-green': '#04AA6D',
        'custom-red': '#f44336',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #7F8DAD, #7FA4AD)',
      },
    },
    screens: {
      sm: '640px',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [
    ({ addBase }) => {
      addBase({
        body: { '@apply bg-gray-50 text-gray-800': {} },
        'h1, h2, h3, h4, h5, h6': { '@apply font-bold text-center': {} },
      });
    },
  ],
};
