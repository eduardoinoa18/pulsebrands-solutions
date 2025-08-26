/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neonBlue: '#00E5FF',
        neonGreen: '#B8FF00',
        neonPink: '#FF00E5',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)'],
        sans: ['var(--font-space-grotesk)'],
        heading: ['var(--font-poppins)'],
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}

