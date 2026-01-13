export const i18n = {
  defaultLocale: 'en',
  locales: ['ko', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const DB_CATEGORIES = {
  AI: 'AI-ML',
  DEV: 'DEV',
} as const;

const dictionaries = {
  ko: {
    title: '미어캣의 필기장',
    description: '실리콘밸리의 테크 변화를 가장 빠르게 전달합니다.',
    nav: {
      home: '홈',
      about: '소개',
      back: '목록으로',
      categories: '카테고리',
    },
    categories: {
      all: '전체보기',
      [DB_CATEGORIES.AI]: 'AI & 인공지능', // 'AI-ML' 매핑
      [DB_CATEGORIES.DEV]: '개발 & 엔지니어링', // 'DEV' 매핑
      tech: '테크 트랜드', // 기존 유지 (필요시 사용)
    },
    more: '자세히 보기',
    source: '이 글은 AI 미어캣이 외신을 분석한 내용입니다.',
    footer: '© 2026 미어캣의 필기장. All rights reserved.',
  },
  en: {
    title: 'MEERKAT.LOG',
    description: 'Fast-tracking the latest tech shifts from Silicon Valley.',
    nav: {
      home: 'Home',
      about: 'About',
      back: 'Back to list',
      categories: 'categories',
    },
    categories: {
      all: 'All Posts',
      [DB_CATEGORIES.AI]: 'AI & Machine Learning',
      [DB_CATEGORIES.DEV]: 'Software Engineering',
      tech: 'Tech Trends',
    },
    more: 'Read More',
    source: 'This post was analyzed and summarized by Meerkat AI.',
    footer: '© 2026 MEERKAT.LOG. All rights reserved.',
  },
};

const getDictionary = (lang: Locale) => dictionaries[lang] || dictionaries.en;

export { getDictionary };
