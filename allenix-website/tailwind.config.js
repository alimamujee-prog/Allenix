/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // Design tokens (light warm theme)
      'bg-main':        'var(--col-bg)',
      'bg-card':        'var(--col-surface)',
      'bg-card-2':      'var(--col-surface-2)',
      'border-col':     'var(--col-border)',
      'border-col-2':   'var(--col-border-2)',
      'text-primary':   'var(--col-text-1)',
      'text-secondary': 'var(--col-text-2)',
      'text-muted':     'var(--col-text-3)',
      accent:           'var(--col-accent)',
      'accent-hover':   'var(--col-accent-dim)',
      'accent-light':   'var(--col-accent-light)',
      'accent-wash':    'var(--col-accent-wash)',
    },
    fontFamily: {
      display: ['var(--font-display)', 'Georgia', 'serif'],
      body:    ['var(--font-body)',    'Georgia', 'serif'],
      mono:    ['var(--font-mono)',    'ui-monospace', 'monospace'],
    },
    maxWidth: {
      'content': '1100px',
    },
    extend: {},
  },
  plugins: [],
}
