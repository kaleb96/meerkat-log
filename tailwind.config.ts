import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // app 폴더가 src 안에 있다면 필수
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // components 폴더 경로
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        meerkat: {
          amber: '#D97706', // 미어캣 눈동자/석양 (포인트)
          earth: '#3D332D', // 깊은 대지 (제목/중요 텍스트)
          clay: '#4F463F', // 흙 (본문 텍스트)
          shadow: '#635A52', // 그림자/풀 (부연 설명)
          sand: '#A39485', // 마른 모래 (날짜/보조 정보)
          savanna: '#FCFBF9', // 넓은 초원 (전체 배경)
          bone: '#FAF7F2', // 바랜 뼈/모래 표면 (카드/위젯 배경)
          border: '#E9E2D8', // 경계선
        },
      },
    },
  },
  plugins: [typography],
};

export default config; // 변수를 내보냄
