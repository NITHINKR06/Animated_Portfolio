/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        // Editorial display serif for big headline moments — used sparingly,
        // not a wholesale replacement of the sans body/heading faces.
        display: ['"Fraunces"', 'serif'],
        // Monospace for eyebrow labels / tags — a third distinct voice so
        // labels read as "designed" instead of just smaller uppercase sans.
        label: ['"Martian Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};