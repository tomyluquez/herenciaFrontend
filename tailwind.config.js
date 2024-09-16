/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#e3dace",
        success: "#d2fbab",
        "success-message": "#4b8c0c",
        warning: "#f4f1b8",
        "warning-message": "#fbbf3b",
        error: "#fb9a87",
        "error-message": "#f24726",
      },
    },
  },
  plugins: [],
};
