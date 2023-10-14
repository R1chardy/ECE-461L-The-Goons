/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'abstract': "url('../public/test.jpg')",
        'tailwind': "url('../public/tailwind.png')"
      }
    },
  },
  plugins: [require("daisyui")],
}

