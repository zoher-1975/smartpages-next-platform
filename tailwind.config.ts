import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Design system tokens ──────────────────────────────────────
      // These are the platform defaults. Per-merchant theming is handled
      // via CSS variables (set dynamically in layout from merchant config).
      colors: {
        // Merchant brand (overridden per-merchant via CSS vars)
        merchant: {
          primary:   'var(--merchant-primary, #7B3F00)',
          secondary: 'var(--merchant-secondary, #D4AF37)',
          surface:   'var(--merchant-surface, #FAF7F2)',
          text:      'var(--merchant-text, #1A1206)',
          muted:     'var(--merchant-muted, #6B5C4A)',
          border:    'var(--merchant-border, #E8E0D4)',
        },
        // WhatsApp green — never changes
        whatsapp: {
          DEFAULT: '#25D366',
          dark:    '#1da851',
          light:   '#dcf8c6',
        },
        // Platform UI (admin/dashboard chrome)
        platform: {
          50:  '#faf8f5',
          100: '#f3ede4',
          200: '#e5d9c9',
          300: '#d4bfa0',
          400: '#c0a077',
          500: '#a8845a',
          600: '#8c6b47',
          700: '#7B3F00',
          800: '#5c2e00',
          900: '#3d1f00',
          950: '#1f0f00',
        },
        // Status colours
        status: {
          new:       '#3B82F6',
          replied:   '#F59E0B',
          confirmed: '#10B981',
          closed:    '#9CA3AF',
        },
      },

      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-league-spartan)', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },

      borderRadius: {
        '4xl': '2rem',
      },

      boxShadow: {
        whatsapp: '0 4px 16px rgba(37, 211, 102, 0.35)',
        card:     '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.08)',
        sticky:   '0 -4px 20px rgba(0,0,0,0.08)',
      },

      // Max width for mobile-first single-column layout
      maxWidth: {
        mobile: '480px',
      },

      keyframes: {
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.25s ease',
        'fade-in':  'fade-in 0.2s ease',
        shimmer:    'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
}

export default config
