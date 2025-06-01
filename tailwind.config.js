/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D",
        surface: "#1A1A1A",
        primary: "#00ADB5",
        accent: "#EEEEEE",
        secondary: "#393E46",
        error: "#FF4C4C",
        success: "#32E0C4",
        muted: "#B0B0B0",
      },
      fontFamily: {
        exo: ["Exo2-Regular"],
      },
    },
  },
  plugins: [],
};
