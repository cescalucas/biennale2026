/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#14110E',
        'paper-2': '#1F1B16',
        'paper-3': '#28231C',
        ink: '#ECE5D6',
        'ink-soft': '#C9C2B3',
        muted: '#8A8478',
        'muted-2': '#5E5950',
        line: '#2A2520',
        terra: '#C44A2E',
        'terra-deep': '#9E3520',
        gold: '#C5A35E',
        'gold-deep': '#A88A45',
        lagoon: '#1A1714',
        'lagoon-soft': '#0E0C0A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Garamond', 'serif'],
      },
    },
  },
  plugins: [],
};
