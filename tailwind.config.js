/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
          // Design System Tokens - EXACT COLOR PALETTE FROM IMAGE
          colors: {
            // PALETA ESTRATÉGICA PARA FINTECH
            brand: {
              primary: '#16F98A',    // Verde brillante - CTAs, success, confianza
              dark: '#05220B',       // Verde oscuro - Fondo principal, estabilidad
              teal: '#134338',       // Teal oscuro - Fondos secundarios, tecnología
              light: '#FFFFFF',      // Blanco - Texto, claridad, transparencia
            },
            // SEMÁNTICA INTELIGENTE
            success: '#16F98A',      // Verde brillante - Éxito, confirmaciones
            primary: '#16F98A',      // Verde brillante - CTAs principales
            secondary: '#134338',    // Teal - Botones secundarios
            background: '#FFFFFF',   // Blanco - Fondo principal
            surface: '#134338',      // Teal - Cards, modales
            surfaceDark: '#05220B',  // Verde oscuro - Fondos premium
            text: {
              primary: '#05220B',    // Verde oscuro - Texto principal
              secondary: '#134338',  // Teal - Texto secundario
              light: '#FFFFFF',      // Blanco - Texto en fondos oscuros
              muted: '#134338',      // Teal - Texto atenuado
            },
            border: {
              light: '#134338',      // Teal - Borders sutiles
              medium: '#16F98A',     // Verde brillante - Borders activos
              dark: '#05220B',       // Verde oscuro - Borders fuertes
            },
            // ESTADOS CON PSICOLOGÍA
            state: {
              success: '#16F98A',    // Verde - Confianza, dinero, éxito
              warning: '#134338',    // Teal - Advertencias suaves
              error: '#05220B',      // Verde oscuro - Errores (no agresivo)
              info: '#16F98A',       // Verde - Información positiva
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