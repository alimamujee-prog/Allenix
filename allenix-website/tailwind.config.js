/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      // Design tokens
      'bg-main':       '#06080a',
      'bg-card':       '#0d1117',
      'border-col':    '#1e2730',
      'text-primary':  '#f0f2f4',
      'text-secondary':'#8a9bb0',
      accent:          '#00c8b4',
      'accent-hover':  '#007d74',
      'accent-light':  '#9eeee8',
      'accent-wash':   '#041e1c',
      // Extended palette
      'col-bg':        '#06080a',
      'col-surface':   '#0d1117',
      'col-surface-2': '#131920',
      'col-border':    '#1e2730',
      'col-border-2':  '#2a3540',
      'col-text-1':    '#f0f2f4',
      'col-text-2':    '#8a9bb0',
      'col-text-3':    '#5a6b7e',
      'col-accent':    '#00c8b4',
      'col-accent-dim':'#007d74',
      'col-accent-bg': '#041e1c',
    },
    fontFamily: {
      display: ['var(--font-display)', 'Georgia', 'serif'],
      body:    ['var(--font-body)',    'Georgia', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}
