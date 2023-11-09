import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#19C463',
        'p' : {
          50: '#e3f7e9',
          100: '#bdeac8',
          200: '#8fdca5',
          300: '#59cf80',
          400: '#19c463',
          500: '#00b946',
          600: '#00a93c',
          700: '#00972f',
          800: '#008623',
          900: '#00660e',
        },
        'on-primary': '#000000',
        'secondary': '#F87171',
        'on-secondary': '#1F2937',
        'surface': '#FFFFFF',
        'on-surface': '#1F2937',
      },
    },
  },
  plugins: [],
}
export default config
