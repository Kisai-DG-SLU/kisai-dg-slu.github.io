/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgba(33, 128, 141, 1)',
          hover: 'rgba(29, 116, 128, 1)',
        }
      }
    },
  },
  plugins: [],
}