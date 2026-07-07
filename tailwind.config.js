/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Official Bush Week Tech Fest gradient colours (from the Canva brand kit)
        brand: {
          yellow: '#ffbb34',
          blue: '#67acf1',
          green: '#3add41',
        },
        // Deep navy drawn from the pixel-poster night sky, used for dark surfaces
        ink: {
          DEFAULT: '#141230',
          soft: '#1e1b45',
        },
        // Road-sign palette (nod to the retro signage posters)
        sign: {
          green: '#1e7a3c',
          yellow: '#f5c518',
          blue: '#1d5fa8',
        },
      },
      fontFamily: {
        sans: ['Aileron', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        // The signature "trail" gradient — yellow / blue / green, as on the brief cover
        'trail': 'radial-gradient(120% 120% at 0% 0%, #ffbb34 0%, #67acf1 52%, #3add41 100%)',
        'trail-soft': 'radial-gradient(140% 140% at 0% 0%, rgba(255,187,52,.16) 0%, rgba(103,172,241,.16) 52%, rgba(58,221,65,.16) 100%)',
        // Deep-tone trail (same yellow→blue→green progression) for tiles that host
        // white/light logos — every stop clears WCAG AA against white.
        'trail-deep': 'radial-gradient(120% 120% at 0% 0%, #8a5a12 0%, #1d5fa8 50%, #176b34 100%)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { 'fade-up': 'fade-up .6s ease-out both' },
    },
  },
  plugins: [],
};
