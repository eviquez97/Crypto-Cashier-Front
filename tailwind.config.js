/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Design System Tokens - Exact HEX values
      colors: {
        base: {
          dark: '#0F1115',    // Fondos oscuros, banda KPIs, footer
          mid: '#1A1E23',     // Cards oscuras, header dashboard
          light: '#F7F8FA',   // Fondos claros
        },
        text: {
          main: '#242834',    // Texto principal
        },
        brand: {
          neon: '#B6FF00',    // SOLO CTAs, checks, highlights
          purple: '#7D53FF',  // Acento secundario, links
        },
        gray: {
          300: '#E9EDF2',
          500: '#9AA3B2',
          700: '#444B57',
        },
        state: {
          success: '#16A34A',
          warn: '#F59E0B',
          error: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Satoshi', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Tipografía - Escala exacta
        'h1': ['64px', { lineHeight: '1.05', fontWeight: '600' }],
        'h1-mobile': ['40px', { lineHeight: '1.05', fontWeight: '600' }],
        'h2': ['40px', { lineHeight: '1.1', fontWeight: '600' }],
        'h2-mobile': ['28px', { lineHeight: '1.1', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '1.2', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body': ['16px', { lineHeight: '1.6' }],
      },
      borderRadius: {
        '2xl': '22px',  // Cards
        'xl': '14px',   // Inputs
      },
      boxShadow: {
        fintech: '0 10px 30px rgba(0,0,0,.08)',
        'fintech-hover': '0 14px 40px rgba(0,0,0,.12)',
      },
      maxWidth: {
        'container': '1200px',
      },
      spacing: {
        'gutter': '24px',
        'section': '96px', // py-24
        'hero': '112px',   // py-28
      },
      backgroundImage: {
        // Gradientes exactos
        'hero': 'linear-gradient(180deg, #0F1115 0%, #141821 60%, #1A1E23 100%)',
        'hero-radial': 'radial-gradient(600px circle at 70% 20%, rgba(182,255,0,.12), transparent 60%)',
        'cta': 'linear-gradient(180deg, #111318 0%, #0F1115 100%)',
      },
      animation: {
        'count-up': 'count-up 1.2s ease-out forwards',
        'fade-up': 'fade-up 0.6s cubic-bezier(.22,.61,.36,1) forwards',
        'parallax': 'parallax 0.6s ease-out forwards',
        'toast-enter': 'toast-enter 0.25s ease-out forwards',
        'toast-exit': 'toast-exit 0.25s ease-out forwards',
      },
      keyframes: {
        'count-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'parallax': {
          from: { transform: 'translateY(0) scale(1)' },
          to: { transform: 'translateY(-18px) scale(1.02)' },
        },
        'toast-enter': {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'toast-exit': {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}