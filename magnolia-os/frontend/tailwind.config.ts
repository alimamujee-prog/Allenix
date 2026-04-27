import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#04CCBA',
        'accent-hover': '#029e90',
        'accent-light': '#9eeee8',
        'accent-wash': '#edfaf9',
        'bg-main': '#faf9f6',
        'bg-card': '#f2f0eb',
        'border-col': '#d4d0c8',
        'text-primary': '#0d0d0d',
        'text-secondary': '#1a1a1a',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
