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
        'you-white': '#FFFFFF',
        'chilli-red': '#FF0000',
        'glass-bg': 'rgba(255, 255, 255, 0.1)',
        'glass-border': 'rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        'dancing': ['Dancing Script', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'heart-float': 'heartFloat 8s ease-in-out infinite',
        'credits-roll': 'creditsRoll 60s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        heartFloat: {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100px) scale(1)', opacity: '0' },
        },
        creditsRoll: {
          '0%': { transform: 'translateY(100vh)' },
          '100%': { transform: 'translateY(-100vh)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      screens: {
        'xs': '320px',
        '3xl': '1920px',
        '4k': '2560px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
