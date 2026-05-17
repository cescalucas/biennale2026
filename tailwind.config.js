/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F2ECDF',
        'paper-2': '#E6DCC4',
        ink: '#1A1612',
        'ink-soft': '#3D352C',
        muted: '#6B6157',
        line: '#C9BFA9',
        terra: '#A03E2E',
        'terra-deep': '#6E2A20',
        lagoon: '#2C5F66',
        'lagoon-soft': '#B3C6C5',
        gold: '#B8893A',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
