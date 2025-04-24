// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // if you're using app directory
    "./pages/**/*.{js,ts,jsx,tsx}", // if you're using pages directory
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
