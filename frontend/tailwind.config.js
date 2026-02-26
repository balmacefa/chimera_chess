/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#D97706", // Amber-600
        "primary-hover": "#B45309", // Amber-700
        "background-light": "#f6f6f8",
        "background-dark": "#111827", // Gray-900
        "surface-dark": "#1F2937", // Gray-800
        "surface-light": "#ffffff",
        "text-main": "#F3F4F6", // Gray-100
        "text-muted": "#9CA3AF", // Gray-400
        "border-dark": "#374151", // Gray-700
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
