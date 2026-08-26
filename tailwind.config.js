/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Todas as cores vivem como CSS custom properties (ver src/index.css),
        // para que os dois temas — notturno e pietra — troquem sem reclassificar nada.
        ground: 'var(--ground)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        rule: 'var(--rule)',
        'rule-soft': 'var(--rule-soft)',
        text: 'var(--text)',
        'text-2': 'var(--text-2)',
        'text-3': 'var(--text-3)',
        verde: 'var(--verde)',
        'verde-deep': 'var(--verde-deep)',
        rosso: 'var(--rosso)',
        ottone: 'var(--ottone)',
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        body: ['"Newsreader Variable"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        shell: '1400px',
        measure: '62ch',
      },
    },
  },
  plugins: [],
};
