/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7DFBC', // fondo cálido general
        dark: '#232024',       // texto principal / footer
        rust: '#8B4A1D',       // acento primario (CTAs, subrayados)
        sage: '#4E7856',       // acento secundario (tags, hover)
        tan: '#DFA97C',        // tono intermedio (separadores, fondos suaves)
      },
      fontFamily: {
        grotesk: ['"Mouldy Cheese"', 'cursive'], // display / títulos
        mono: ['Quicksand', 'sans-serif'],        // cuerpo de texto
      },
      maxWidth: {
        content: '1831px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
