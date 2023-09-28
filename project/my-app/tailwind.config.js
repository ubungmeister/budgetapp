/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'header-primary': '#3b757f',
        'info-content': '#54a3ab',
        'info-content-light': '#badadd',
      },
    },
  },
  plugins: [],
}
