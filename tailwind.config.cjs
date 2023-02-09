/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'max-sm': {'max': '767px'},
        'max-md': {'max': '1024px'},
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
