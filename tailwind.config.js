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
        // Base oscura
        'dark-base': '#242834',
        'dark-900': '#1a1d26',
        'dark-800': '#2d3142',
        
        // Acento morado premium
        'purple-primary': '#7D53FF',
        'purple-600': '#6B46C1',
        'purple-700': '#553C9A',
        'purple-800': '#44337A',
        
        // Verde neón vibrante (solo CTAs y estados positivos)
        'neon-green': '#B6FF00',
        'neon-green-dark': '#9DE000',
        
        // Gris claro para balance
        'light-gray': '#F5F6FA',
        'gray-100': '#f1f5f9',
        'gray-200': '#e2e8f0',
        'gray-300': '#cbd5e1',
        'gray-400': '#94a3b8',
        'gray-500': '#64748b',
        'gray-600': '#475569',
        'gray-700': '#334155',
        'gray-800': '#1e293b',
        'gray-900': '#0f172a',
        
        // Estados
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow-purple': '0 0 20px rgba(125, 83, 255, 0.3)',
        'glow-neon': '0 0 20px rgba(182, 255, 0, 0.4)',
        'button': '0 4px 14px 0 rgba(125, 83, 255, 0.3)',
        'button-hover': '0 8px 25px 0 rgba(125, 83, 255, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'count-up': 'count-up 2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(125, 83, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(125, 83, 255, 0.6)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #7D53FF 0%, #6B46C1 100%)',
        'gradient-hero': 'linear-gradient(135deg, #242834 0%, #7D53FF 50%, #6B46C1 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1d26 0%, #242834 100%)',
      },
    },
  },
  plugins: [],
}
