import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-syne)'],
        mono: ['var(--font-jetbrains)'],
        serif: ['var(--font-lora)'],
      },
      colors: {
        brand: {
          50:  '#e6f9ff',
          100: '#b3efff',
          200: '#66d9ff',
          300: '#1ac2ff',
          400: '#00b8f5',
          500: '#00a8de',
          600: '#0090be',
          700: '#00749a',
          800: '#005876',
          900: '#003b52',
        },
        azure: {
          DEFAULT: '#0078d4',
          light:   '#50b0ff',
          dark:    '#004e8c',
        },
      },
      animation: {
        'fade-up':   'fadeUp 0.5s ease both',
        'fade-in':   'fadeIn 0.4s ease both',
        'ticker':    'ticker 35s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        ticker:   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseDot: { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '0.4', transform: 'scale(0.75)' } },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: { color: '#00a8de', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            'h1,h2,h3,h4': { color: 'inherit', fontFamily: 'var(--font-syne)' },
            code: { color: '#00c2ff', background: 'rgba(0,194,255,0.08)', padding: '0.1em 0.3em', borderRadius: '4px' },
            pre: { background: 'var(--tw-prose-pre-bg)' },
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
