/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))", // 12개의 행으로 확장
        8: "repeat(8, minmax(0, 1fr))", // 12개의 행으로 확장
        9: "repeat(9, minmax(0, 1fr))", // 12개의 행으로 확장
        10: "repeat(10, minmax(0, 1fr))", // 12개의 행으로 확장
      },
    },
  },
  plugins: [],
};
