/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#2563EB", // Azul bonito para botones, etc.
          secondary: "#64748B", // Gris para fondos suaves
        },
        animation: {
          fade: "fadeIn 0.5s ease-in-out",
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        },
      },
    },
    darkMode: 'class', // Habilita modo oscuro con la clase 'dark'
    plugins: [],
  }
  