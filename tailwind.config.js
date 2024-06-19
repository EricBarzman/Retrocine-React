/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#78C851',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', ...fontFamily.sans],
      }
    },
  },
  plugins: [],
}

