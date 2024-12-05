/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        mainBlue: "#133E87",
        warning: "#FFE31A",
        success: "#4CAF50",
        error: "#F44336",
        info: "#2196F3",
        black: "#1A1A19",
        grey: "#F5F7F8",
      },
    },
  },
  plugins: [],
};
