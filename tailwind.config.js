/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom colors
        'navy': {
          900: '#0c1a3d',
          800: '#112248',
          700: '#162a54',
          600: '#1b3260',
          500: '#203a6b',
        },
        'violet': {
          900: '#2d1b69',
          800: '#36207a',
          700: '#3f258b',
          600: '#472a9c',
          500: '#502fad',
        },
        'charcoal': {
          900: '#121212',
          800: '#1a1a1a',
          700: '#222222',
          600: '#2a2a2a',
          500: '#333333',
        },
        'neon': {
          blue: '#00f3ff',
          purple: '#b300ff',
          pink: '#ff00e6',
          cyan: '#39ffdc',
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
};