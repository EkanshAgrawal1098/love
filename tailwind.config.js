/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0b0a1f',
        navy: '#12113a',
        plum: '#2a1550',
        blush: '#ffc2d1',
        rose: '#e5546f',
        cream: '#fbf3e4',
        ink: '#3b2a2f',
      },
      fontFamily: {
        script: ['"Dancing Script"', '"Segoe Script"', 'cursive'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(255, 140, 170, 0.35)',
        soft: '0 20px 50px -20px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};
