/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // PREMIUM FINTECH PALETTE
        brand: {
          dark: '#242834',      // Base oscura premium
          purple: '#7D53FF',    // Morado premium (branding)
          neon: '#B6FF00',      // Verde neón (CTAs y éxito)
          light: '#F5F6FA',     // Gris claro para balance
        },
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#7D53FF',       // Morado premium principal
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3b0764',
        },
        success: {
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#B6FF00',       // Verde neón principal
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#3f6212',
          900: '#365314',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#242834',       // Base oscura
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-md': ['3rem', { lineHeight: '1.2', fontWeight: '600' }],
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #7D53FF 0%, #B6FF00 100%)',
        'gradient-dark': 'linear-gradient(135deg, #242834 0%, #7D53FF 100%)',
        'gradient-hero': 'linear-gradient(135deg, #242834 0%, #7D53FF 50%, #B6FF00 100%)',
        'hexagon-pattern': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"hex\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"><polygon points=\"10,1 19,5.5 19,14.5 10,19 1,14.5 1,5.5\" fill=\"none\" stroke=\"rgba(125,83,255,0.1)\" stroke-width=\"0.5\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23hex)\"/></svg>')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float 6s ease-in-out infinite reverse',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'count-up': 'countUp 1s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        countUp: {
          '0%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(125, 83, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(125, 83, 255, 0.6)' },
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'button': '0 4px 14px 0 rgba(125, 83, 255, 0.3)',
        'button-hover': '0 8px 25px 0 rgba(125, 83, 255, 0.4)',
        'glow-purple': '0 0 30px rgba(125, 83, 255, 0.4)',
        'glow-neon': '0 0 30px rgba(182, 255, 0, 0.4)',
        'premium': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
