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
        background: "#212529",
        surface: "#343a40",
        primary: "#2b2d42",
        accent: "#f8f9fa",
        secondary: "#6c757d",
        error: "#ba181b",
        success: "#52b788",
        muted: "#B0B0B0",
      },
      fontFamily: {
        exo: ["Exo2-Regular"],
      },
    },
  },
  plugins: [],
};
