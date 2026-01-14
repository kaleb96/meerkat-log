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
    template: '%s | 미어캣의 필기장', // 상세 페이지용 템플릿
    default: '미어캣의 필기장 - 기술 요약 노트', // 기본 제목
  },
  description: '복잡한 최신 기술과 AI 트렌드를 핵심만 골라 쉽고 깔끔하게 정리하고자 합니다.',
  icons: {
    icon: '/images/meerkat.png', // 탭에 뜰 작은 아이콘(파비콘)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
