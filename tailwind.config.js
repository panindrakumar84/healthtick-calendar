/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily: {
        raleway: [ "Raleway", "sans-serif"],
        poppins: [ "Poppins", "sans-serif"]
      },
       colors: {
        'background': '#0A0A0A',
        'surface': '#171717',
        'primary': '#FAFAFA',
        'secondary': '#232323',
        'muted-text': '#a1a1a1',
        'border': '#ffffff1a',
        'success': '#16A34A',
        'error': '#DC2626',
        'warning': '#D97706',
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
       screens: {
        "wide": "1440px"
      }
    },
  },
  plugins: [
     require('tailwindcss-scrollbar'),
  ],
}