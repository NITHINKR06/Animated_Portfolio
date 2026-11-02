/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['"Fraunces"', 'serif'],
        mono: ['"JetBrains Mono"', '"Martian Mono"', 'monospace'],
        label: ['"Martian Mono"', 'monospace'],
      },
      colors: {
        obsidian: {
          DEFAULT: '#08080B',
          950: '#050507',
          900: '#08080B',
          800: '#0E0E14',
          700: '#14141C',
        },
        graphite: {
          DEFAULT: '#17171F',
          surface: '#111117',
          card: '#161620',
          elevated: '#1F1F2C',
          hover: '#262636',
        },
        crimson: {
          DEFAULT: '#EF4444',
          glow: 'rgba(239, 68, 68, 0.25)',
          dark: '#B91C1C',
          light: '#F87171',
        },
        // Editorial Contemporary Tokens
        mineral: {
          DEFAULT: '#090A0F',
          deep: '#060608',
          card: '#111218',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        bone: {
          DEFAULT: '#F3F2EE',
          muted: '#9CA3AF',
          dark: '#E2E1DA',
        },
        solar: {
          DEFAULT: '#F59E0B',
          glow: 'rgba(245, 158, 11, 0.25)',
          light: '#FCD34D',
          dark: '#D97706',
        },
      },
    },
  },
  plugins: [],
};