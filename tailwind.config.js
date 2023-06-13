/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: true, 
  theme: {
    extend: {
      colors: {
        'custom-blue': '#3c57ff',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
