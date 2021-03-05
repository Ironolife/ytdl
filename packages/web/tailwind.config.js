module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        violet: {
          100: '#e8d5f9',
          200: '#d0aaf3',
          300: '#b980ee',
          400: '#a155e8',
          500: '#8a2be2',
          600: '#6e22b5',
          700: '#531a88',
          800: '#37115a',
          900: '#1c092d',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
