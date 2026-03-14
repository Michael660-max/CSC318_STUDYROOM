/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uoft: {
          blue: '#002A5C',
          lightblue: '#007FA3',
          gold: '#FFB81C',
        },
        status: {
          available: '#16a34a',
          reserved: '#d97706',
          occupied: '#dc2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
