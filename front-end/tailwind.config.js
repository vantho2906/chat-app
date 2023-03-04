/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{html,jsx}',
    './src/pages/**/*.{html,jsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      backgroundImage: {
        logoHome: "url('components/logo/logoHome.png')",
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
