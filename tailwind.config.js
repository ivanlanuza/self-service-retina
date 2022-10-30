module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        open: ["Chivo"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
