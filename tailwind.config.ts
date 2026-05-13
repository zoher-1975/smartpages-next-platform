import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wa: {
          DEFAULT: '#25D366',
          dark:    '#1da851',
          light:   '#dcf8c6',
          bg:      'rgba(37,211,102,0.08)',
        },
        brand: {
          50:  '#fdf8f3',
          100: '#f7edd9',
          200: '#eed8b0',
          300: '#e2bc7f',
          400: '#d4984a',
          500: '#c07d2e',
          600: '#a06124',
          700: '#7B3F00',
          800: '#5c2e00',
          900: '#3d1f00',
          950: '#1f0f00',
        },
        gold: '#D4AF37',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem',  { lineHeight: '1rem'    }],
        'xs':  ['0.75rem',  { lineHeight: '1.125rem' }],
      },
      maxWidth: {
        mobile: '480px',
        site:   '1200px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      boxShadow: {
        'wa':    '0 6px 20px rgba(37,211,102,0.38)',
        'wa-sm': '0 3px 10px rgba(37,211,102,0.28)',
        'card':  '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)',
        'card-md': '0 4px 16px rgba(0,0,0,0.08)',
        'sticky': '0 -4px 20px rgba(0,0,0,0.08)',
        'panel': '0 8px 32px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in':    'fadeIn 0.2s ease',
        'slide-up':   'slideUp 0.25s ease',
        'slide-in':   'slideIn 0.3s ease',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' },                             to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(8px)'},to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { from: { transform: 'translateX(-100%)' },           to: { transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}

export default config
