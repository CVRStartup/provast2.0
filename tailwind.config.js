const forms = require("@tailwindcss/forms");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        a4H: "297mm",
        a4W: "210mm",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [forms, require("@tailwindcss/typography")],
};
