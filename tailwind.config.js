/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'line': '#E9E9E9',
        'darkBtn': '#757575',
        'racxanairiPurple': '#A445ED',
        'search': '#F4F4F4',
        'blackOne': '#2D2D2D',
        'darkMode': '#050505',
        'searchBg': '#1F1F1F',
      },
      boxShadow: {
        'fontShadow': '0px 5px 30px 0px rgba(0, 0, 0, 0.10)',
      },
      fontSize: {
        '18px': '18px',
        '20px': '20px',
        '24px': '24px',
        '64px': '64px',
      },
      fontFamily: {
        lato: "'Lato', sans-serif",
        roboto: "'Roboto Mono', monospace",
        garamond: "'EB Garamond', serif"
      },
    },
  },
  plugins: [],
}

