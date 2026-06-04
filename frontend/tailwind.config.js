/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 🌟 CRITICAL: This is the missing link! Tells Tailwind to watch for the .dark class
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], 
  },
};