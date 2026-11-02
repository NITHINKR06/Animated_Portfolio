/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#08090B',
        deep: '#0D0B0E',
        surface: {
          DEFAULT: '#151116',
          panel: '#1A141C',
          glass: 'rgba(21, 17, 22, 0.85)',
        },
        burgundy: {
          deep: '#35101F',
          DEFAULT: '#5A1832',
          highlight: '#873653',
          glow: 'rgba(135, 54, 83, 0.3)',
          muted: 'rgba(90, 24, 50, 0.2)',
        },
        // Alias signal to burgundy highlight for seamless system-wide color conversion
        signal: {
          DEFAULT: '#873653',
          glow: 'rgba(135, 54, 83, 0.3)',
          muted: 'rgba(90, 24, 50, 0.2)',
        },
        champagne: {
          DEFAULT: '#D6B99A',
          muted: 'rgba(214, 185, 154, 0.7)',
          dim: 'rgba(214, 185, 154, 0.12)',
        },
        cream: {
          DEFAULT: '#F0EAE3',
          muted: '#C4BCB4',
          dim: 'rgba(240, 234, 227, 0.65)',
        },
        muted: '#969099',
        editorial: {
          border: 'rgba(214, 185, 154, 0.12)',
          borderStrong: 'rgba(135, 54, 83, 0.45)',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', '"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        label: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};