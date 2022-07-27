/** @type {import('tailwindcss').Config} */
const forms = require("@tailwindcss/forms");
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [forms],
};
