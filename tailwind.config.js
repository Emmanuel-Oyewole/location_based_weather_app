/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'mainbg': '#49b0cf',// main background color
        'cardbg':'#E8DBC5'
      },
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif'],
        'sourceCode': ['Source Code Pro', 'monospace'],
      }
    },
  },
  plugins: [],
}

