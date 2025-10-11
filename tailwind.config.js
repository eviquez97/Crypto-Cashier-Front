/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
          // PROFESSIONAL FINTECH COLOR SYSTEM
          colors: {
            // PRIMARY BRAND COLORS
            brand: {
              primary: '#16F98A',      // Bright green - Primary actions, success
              secondary: '#134338',    // Dark teal - Secondary elements
              accent: '#0D8A9E',       // Blue teal - Accents, highlights
              dark: '#05220B',         // Very dark green - Backgrounds
              light: '#FFFFFF',        // White - Text on dark backgrounds
            },
            
            // NEUTRAL GRAYS
            gray: {
              50: '#F8FAFC',
              100: '#F1F5F9',
              200: '#E2E8F0',
              300: '#CBD5E1',
              400: '#94A3B8',
              500: '#64748B',
              600: '#475569',
              700: '#334155',
              800: '#1E293B',
              900: '#0F172A',
            },
            
            // SEMANTIC COLORS
            success: {
              50: '#ECFDF5',
              500: '#10B981',
              600: '#059669',
            },
            warning: {
              50: '#FFFBEB',
              500: '#F59E0B',
              600: '#D97706',
            },
            error: {
              50: '#FEF2F2',
              500: '#EF4444',
              600: '#DC2626',
            },
            info: {
              50: '#EFF6FF',
              500: '#3B82F6',
              600: '#2563EB',
            },
            
            // DASHBOARD SPECIFIC
            surface: {
              primary: '#0F172A',      // Dark background
              secondary: '#1E293B',    // Card backgrounds
              tertiary: '#334155',     // Elevated surfaces
              border: '#475569',       // Borders and dividers
            },
            
            text: {
              primary: '#FFFFFF',      // Primary text
              secondary: '#CBD5E1',    // Secondary text
              muted: '#94A3B8',        // Muted text
              accent: '#16F98A',       // Accent text
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