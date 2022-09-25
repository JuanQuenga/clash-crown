/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  variants: {
    extend: {
      textColor: ["hover", "focus", "group-hover"],
    },
  },
  theme: {
    extend: {},
    colors: {
      transparent: "rgba(0, 0, 0, 0)",
      opaque: "#2e4667a1",
      black: "#020d1b",
      white: "#fff",
      red: "#ff0000",
      green: "#00ff00",
      pink: {
        light: "#d171d4",
        medium: "#9132b4",
        dark: "#322f5a",
      },
      footer: "#425170",
      main: "#2e4667",
      dark: "#181830",
      light: "#cfd6e6",
    },
    fontFamily: {
      supercell: ["Suppercell", "sans-serif"],
    },
  },
  plugins: [],
};
