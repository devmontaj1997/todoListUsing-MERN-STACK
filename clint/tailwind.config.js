/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm: "440px",
        xxsm: "290px",
        xxxsm: "140px",
      },
    },
  },
  plugins: [],
}