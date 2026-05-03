/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        open: ['Open Sans', 'sans-serif'],
        yellowtail: ['Yellowtail', 'cursive'],
        merriweather: ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
}