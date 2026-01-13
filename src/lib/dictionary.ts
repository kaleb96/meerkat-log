export const i18n = {
  defaultLocale: "en",
  locales: ["ko", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const DB_CATEGORIES = {
  AI: "AI-ML",
  DEV: "DEV",
} as const;

const dictionaries = {
  ko: {
    title: "미어캣의 필기장",
    description:
      "복잡한 최신 기술과 AI 트렌드를 핵심만 골라 쉽고 깔끔하게 정리하고자 합니다.",
    nav: {
      home: "홈",
      about: "소개",
      back: "목록으로",
      categories: "카테고리",
    },
    categories: {
      all: "전체보기",
      [DB_CATEGORIES.AI]: "AI & 인공지능", // 'AI-ML' 매핑
      [DB_CATEGORIES.DEV]: "개발 & 엔지니어링", // 'DEV' 매핑
      tech: "테크 트랜드", // 기존 유지 (필요시 사용)
    },
    more: "자세히 보기",
    source:
      "이 포스팅은 주요 기술 소식을 분석하여 핵심 위주로 정리하고자 한 미어캣의 필기장입니다.",
    footer: "© 2026 미어캣의 필기장. All rights reserved.",
  },
  en: {
    title: "MEERKAT.LOG",
    description:
      "Aiming to simplify complex AI and tech trends into clear, actionable insights.",
    nav: {
      home: "Home",
      about: "About",
      back: "Back to list",
      categories: "categories",
    },
    categories: {
      all: "All Posts",
      [DB_CATEGORIES.AI]: "AI & Machine Learning",
      [DB_CATEGORIES.DEV]: "Software Engineering",
      tech: "Tech Trends",
    },
    more: "Read More",
    source: "A collection of insights curated and summarized by Meerkat.",
    footer: "© 2026 MEERKAT.LOG. All rights reserved.",
  },
};

const getDictionary = (lang: Locale) => dictionaries[lang] || dictionaries.en;

export { getDictionary };
