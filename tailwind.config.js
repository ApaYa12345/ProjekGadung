/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6eeff',
          100: '#ccdeff',
          200: '#99bdff',
          300: '#669cff',
          400: '#337bff',
          500: '#005aff',
          600: '#0048cc',
          700: '#003699',
          800: '#002466',
          900: '#001233',
        },
        secondary: {
          50: '#eaffec',
          100: '#d6ffd9',
          200: '#adffb3',
          300: '#84ff8d',
          400: '#5bff67',
          500: '#32ff41',
          600: '#28cc34',
          700: '#1e9927',
          800: '#14661a',
          900: '#0a330d',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};