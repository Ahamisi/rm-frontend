/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-subtle': '#44546F',
        'text-default': '#172B4D',
        'text-subtlest': '#626F86',
        'titleColor': '#172B4D',
        'bg-sunken': '#F7F8F9',
      },
      fontFamily: {
        'sans': ['sfPro', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 