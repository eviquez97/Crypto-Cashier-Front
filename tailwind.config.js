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
        // Coinfixi Brand Colors - Based on Atomos Template
        primary: {
          dark: '#0F1115',
          text: '#242834',
        },
        secondary: {
          bg: '#F7F8FA',
        },
        accent: {
          neon: '#B6FF00',
          purple: '#7D53FF',
        },
        gray: {
          light: '#E9EDF2',
          medium: '#9AA3B2',
          dark: '#444B57',
        },
        // Legacy colors for compatibility
        'dark-base': '#242834',
        'dark-900': '#0F1115',
        'purple-primary': '#7D53FF',
        'neon-green': '#B6FF00',
        'light-gray': '#F7F8FA',
        // Status colors
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
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
        fintech: '0 10px 30px rgba(0,0,0,0.08)',
        'fintech-hover': '0 20px 40px rgba(0,0,0,0.12)',
        'neon-glow': '0 0 20px rgba(182, 255, 0, 0.3)',
        'purple-glow': '0 0 20px rgba(125, 83, 255, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'count-up': 'count-up 0.8s ease-out forwards',
        'parallax': 'parallax 20s ease-in-out infinite alternate',
        'hover-lift': 'hover-lift 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'count-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'parallax': {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-20px)' },
        },
        'hover-lift': {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-4px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(125, 83, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(125, 83, 255, 0.6)' },
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
