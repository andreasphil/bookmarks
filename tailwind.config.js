const colors = require("tailwindcss/colors");
const theme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["public/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
    colors: {
      black: colors.black,
      gray: colors.coolGray,
      primary: colors.indigo,
      transparent: "transparent",
      white: colors.white,
    },
    borderRadius: {
      DEFAULT: "0.75rem",
      lg: "1.25rem",
      full: theme.borderRadius.full,
    },
    screens: {
      normal: "680px",
    },
  },
  plugins: [],
};
