/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        screen: ["100vh", "100dvh"],
      },
      width: {
        screen: ["100vw", "100dvw"],
      },
    },
    fontFamily: {
      sans: ["Arima", "sans-serif"],
    },
  },
  plugins: [],
};
