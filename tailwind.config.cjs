/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          500: '#22d3ee',
          600: '#06b6d4',
          700: '#0891b2',
        },
        background: '#f9fafb',
        surface: '#ffffff',
        text: {
          primary: '#111827',
          secondary: '#6b7280',
        },
      },
      boxShadow: {
        soft: '0 2px 6px rgba(0, 0, 0, 0.05)',
        card: '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
      transitionTimingFunction: {
        'in-out-soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      gradientColorStops: {
        // define tuas cores padrão pro gradiente
        'retiro-from': '#0b2248', // azul do fundo do vídeo
        'retiro-via': '#1a2a44',  // tom médio pra suavizar
        'retiro-to': '#ff6b00',   // laranja das letras
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
