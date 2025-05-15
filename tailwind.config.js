/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        background: 'var(--background)',
        "main-text": 'var(--main-text)',
        "main-muted": 'var(--main-muted)',
        footer: 'var(--footer)',
        "chat-back": 'var(--chat-back)',
        "bot-back": 'var(--bot-back)',
        "nft-color": 'var(--nft-color)',
        "market-color": 'var(--market-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-duration': (value) => ({
            animationDuration: value,
          }),
        },
        { values: theme('transitionDuration') }
      )
    }),
    require('@tailwindcss/line-clamp'),
  ],
}

