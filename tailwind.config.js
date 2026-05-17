/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        'paper-2': '#F4F2EE',
        ink: '#000000',
        'ink-soft': '#1A1A1A',
        muted: '#6B6B6B',
        'muted-2': '#9A9A9A',
        line: '#E5E5E5',
        terra: '#E1251B',
        'terra-deep': '#B81C13',
        lagoon: '#C8CCCE',
        'lagoon-soft': '#EFEFEF',
        gold: '#B8893A',
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Inter Tight"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
