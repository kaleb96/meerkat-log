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
};

// params를 받아올 수 있도록 타입을 수정합니다.
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // 현재 접속한 경로의 언어(lang)를 가져옵니다.
  const { lang } = await params;

  return (
    // 중요: lang="en" 대신 동적으로 lang={lang}을 설정합니다.
    <html lang={lang || 'ko'}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
