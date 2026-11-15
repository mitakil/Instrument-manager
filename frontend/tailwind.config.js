/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#002667',
      },
      fontSize: {
        label: ['14px', { lineHeight: '20px' }], // 14 → 20 (8px-grid OK)
        body: ['16px', { lineHeight: '24px' }], // 16 → 24
        'title-sm': ['18px', { lineHeight: '24px' }], // 18 → 24
        title: ['20px', { lineHeight: '28px' }], // 20 → 28
        'title-lg': ['24px', { lineHeight: '32px' }], // 24 → 32
      },
    },
  },
  plugins: [],
}
