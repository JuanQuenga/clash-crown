/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  variants: {},
  theme: {
    extend: {
      animation: {
        tilt: "tilt 10s infinite linear",
      },
      keyframes: {
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(0.5deg)",
          },
          "75%": {
            transform: "rotate(-0.5deg)",
          },
        },
      },
      colors: {
        transparent: "rgba(0, 0, 0, 0)",
        opaque: "#2e4667a1",
        green: "#00ff00",
        magic: {
          light: "#d171d4",
          medium: "#9132b4",
          dark: "#322f5a",
        },
        footer: "#425170",
        main: "#2e4667",
        dark: "#181830",
        light: "#cfd6e6",
      },
    },
    fontFamily: {
      supercell: ["Suppercell", "sans-serif"],
    },
  },
  plugins: [],
};
