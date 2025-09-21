// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Optional brand niceties you’re already using in CSS/JS
      boxShadow: {
        'elev': '0 10px 24px rgba(0,0,0,0.08)',
      },
    },
  },
  // Make Tailwind utilities win when Bootstrap has similar rules
  important: true,
  plugins: [],
};
