/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f9f6f3",
          100: "#f0ebe4",
          200: "#e3dace",
          300: "#ccbaa5",
          400: "#b69b81",
          500: "#a78468",
          600: "#9a735c",
          700: "#805e4e",
          800: "#694e43",
          900: "#564138",
          950: "#2d211d",
          whitefull: "#ffffff",
        },
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
