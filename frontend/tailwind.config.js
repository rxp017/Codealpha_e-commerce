/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'base': '#0A0A0C',
        'surface': 'rgba(255, 255, 255, 0.04)',
        'copper': {
          DEFAULT: '#E8873A',
          light: '#F5A366',
          dark: '#C56820',
        },
        'electric': {
          DEFAULT: '#4F8CFF',
          light: '#7AA9FF',
          dark: '#2E6FE0',
        },
        'text': {
          primary: '#F5F5F2',
          muted: '#8A8A93',
        },
        'status': {
          success: '#3DD68C',
          error: '#FF5C5C',
        },
      },
      fontFamily: {
        'cabinet': ['"Cabinet Grotesk"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.8rem', { lineHeight: '1.5' }],
        'sm': ['1rem', { lineHeight: '1.5' }],
        'base': ['1.25rem', { lineHeight: '1.5' }],
        'lg': ['1.563rem', { lineHeight: '1.5' }],
        'xl': ['1.953rem', { lineHeight: '1.5' }],
        '2xl': ['2.441rem', { lineHeight: '1.5' }],
        '3xl': ['3.052rem', { lineHeight: '1.5' }],
        '4xl': ['3.815rem', { lineHeight: '1.2' }],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-copper': '0 0 20px rgba(232, 135, 58, 0.4)',
        'glow-electric': '0 0 20px rgba(79, 140, 255, 0.4)',
        'surface': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
