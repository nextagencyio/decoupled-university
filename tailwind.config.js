/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Feature icon colors
    'bg-blue-100',
    'text-blue-600',
    'bg-green-100',
    'text-green-600',
    'bg-purple-100',
    'text-purple-600',
    'bg-yellow-100',
    'text-yellow-600',
    'bg-red-100',
    'text-red-600',
    'bg-indigo-100',
    'text-indigo-600',
    'bg-amber-100',
    'text-amber-600',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // University primary color - Deep blue
        'primary': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // University accent color - Amber/Gold
        'accent': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
