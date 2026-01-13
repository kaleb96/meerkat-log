import { getDictionary, Locale } from "@/lib/dictionary";
import { Globe, Menu, Search, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans antialiased">
      {/* 1. 글로벌 헤더 (Sticky) */}
      <header className="sticky top-0 z-[100] w-full border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* 로고 & 타이틀 이미지 영역 */}
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <div className="h-10 w-10 overflow-hidden rounded-xl border border-slate-200 shadow-sm transition-transform group-hover:scale-105">
              <Image
                src="/images/meerkat.png"
                alt="Meerkat Log"
                width="50" // 따옴표 없이 숫자로 넣어보세요
                height="50"
                priority // 추가: 로딩 우선순위 높임
                className="object-cover"
              />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
              {dict.title}
            </span>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden items-center gap-8 md:flex text-sm font-bold text-slate-500">
            <Link
              href={`/${lang}`}
              className="hover:text-blue-600 transition-colors"
            >
              {dict.nav.home}
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">
              {dict.nav.about}
            </Link>

            {/* 언어 스위처 (캡슐 디자인) */}
            <div className="flex items-center gap-3 ml-4 bg-slate-100 px-3 py-1.5 rounded-full text-[11px] tracking-widest font-black">
              <Globe size={14} className="text-slate-400" />
              <Link
                href="/ko"
                className={lang === "ko" ? "text-blue-600" : "text-slate-400"}
              >
                KO
              </Link>
              <span className="text-slate-200">|</span>
              <Link
                href="/en"
                className={lang === "en" ? "text-blue-600" : "text-slate-400"}
              >
                EN
              </Link>
            </div>
          </nav>

          {/* 모바일 메뉴 & 검색 버튼 */}
          <div className="flex items-center gap-2 md:hidden">
            <button className="p-2 text-slate-600">
              <Search size={20} />
            </button>
            <button className="p-2 text-slate-600">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. 메인 콘텐츠 및 사이드바 레이아웃 */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:flex lg:gap-16">
        {/* 본문 영역 */}
        <main className="w-full min-w-0 flex-1">{children}</main>

        {/* 사이드바 영역 (글로벌 전략 & 광고) */}
        <aside className="hidden w-80 shrink-0 lg:block">
          <div className="sticky top-28 space-y-10">
            {/* [AD SLOT] 사이드바 상단 고정 광고 영역 */}
            {/* <div className="flex h-[250px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50 text-[10px] font-bold tracking-widest text-slate-300">
               GOOGLE AD SENSE - DISPLAY
            </div> 
            */}

            {/* 프로필 및 소개 섹션 */}
            <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">
                Author
              </h3>
              <p className="text-[15px] leading-relaxed text-slate-600 font-medium italic">
                {dict.description}
              </p>
              <div className="mt-8 flex gap-3">
                <button className="flex-1 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200">
                  Follow
                </button>
                <button className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 hover:bg-slate-50 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* [AD SLOT] 사이드바 하단 스티키 광고 영역 */}
            {/* <div className="flex h-[600px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50 text-[10px] font-bold tracking-widest text-slate-300">
               GOOGLE AD SENSE - STICKY SKY
            </div> 
            */}
          </div>
        </aside>
      </div>

      {/* 3. 푸터 영역 */}
      <footer className="border-t bg-slate-50/30 py-16 text-center">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            {dict.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}
