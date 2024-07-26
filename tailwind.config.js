/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: { dark: "#90caf9", light: "#1976d2" },
      secondary: {light:"#9c27b0", dark:"#ce93d8"},
      danger: "#DF4E4E",
      warning: "#ff9800",
      success: "#198754",
      white: "#ffffff",
      black:"#000",
      error: "#FF0000",
      orange: "#EA9650",
      yellow: "#e4c002",
      green: "#14ba6d",
      grey: {
        light: "#ffffffb3",
        mid:"#373a40"
      }
    },
    fontSize: {
      tiny: "0.7rem",
      xxs: "0.8rem",
      xs: "0.9rem",
      sm: "1rem",
      regular: "1.1rem",
      md: "1.2rem",
      mLg: "1.3rem",
      lg: "1.4rem",
      xl: "1.6rem",
      xxl: "1.8rem",
    },
    fontWeight: {
      extraLight: 200,
      light: 300,
      normal: 400,
      semibold: 600,
      bold: 700,
      black: 900,
    },
  },
  plugins: [],
}

