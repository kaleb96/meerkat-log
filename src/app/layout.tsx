// src/app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | 미어캣의 필기장',
    default: '미어캣의 필기장 - 기술 요약 노트',
  },
  description: '복잡한 최신 기술과 AI 트렌드를 핵심만 골라 쉽고 깔끔하게 정리하고자 합니다.',
  icons: {
    icon: '/images/meerkat.png',
  },
  verification: {
    google: 'NDjDFkk9Xhag9p8BaViOLZoB8dtDAU4CxVV0rcnI5dw',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 최상위에서는 기본 언어를 설정하거나, lang 속성을 비워두어도 하위 layout에서 덮어씁니다.
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
