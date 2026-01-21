import { getDictionary, Locale } from '@/lib/dictionary';
import { Globe, Menu, Search, Mail, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className="flex min-h-screen flex-col bg-meerkat-savanna font-sans antialiased text-meerkat-clay">
      {/* 1. 글로벌 헤더 (Savanna Glass Theme) */}
      <header className="sticky top-0 z-[100] w-full border-b border-meerkat-border bg-meerkat-savanna/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* 로고 영역 */}
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <div className="h-11 w-11 overflow-hidden rounded-2xl border border-meerkat-border bg-white shadow-sm transition-all group-hover:rotate-3 group-hover:scale-110">
              <Image
                src="/images/meerkat.png"
                alt="Meerkat Log"
                width={50}
                height={50}
                priority
                className="object-cover"
              />
            </div>
            <span className="text-2xl font-[1000] tracking-tighter text-meerkat-earth uppercase">
              {dict.title}
              <span className="text-meerkat-amber">.</span>
            </span>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden items-center gap-10 md:flex text-[13px] font-black text-meerkat-sand uppercase tracking-widest">
            <Link href={`/${lang}`} className="hover:text-meerkat-amber transition-colors">
              {dict.nav.home}
            </Link>

            {/* 언어 스위처 (Sand Capsule) */}
            <div className="flex items-center gap-3 ml-4 bg-meerkat-bone border border-meerkat-border px-4 py-2 rounded-full font-black shadow-sm">
              <Globe size={14} className="text-meerkat-sand" />
              <Link
                href="/ko"
                className={
                  lang === 'ko'
                    ? 'text-meerkat-amber'
                    : 'text-meerkat-sand hover:text-meerkat-earth'
                }
              >
                KO
              </Link>
              <span className="text-meerkat-border">|</span>
              <Link
                href="/en"
                className={
                  lang === 'en'
                    ? 'text-meerkat-amber'
                    : 'text-meerkat-sand hover:text-meerkat-earth'
                }
              >
                EN
              </Link>
            </div>
          </nav>

          {/* 모바일 아이콘 */}
          <div className="flex items-center gap-4 md:hidden text-meerkat-earth">
            <Search size={22} />
            <Menu size={26} />
          </div>
        </div>
      </header>

      {/* 2. 메인 레이아웃 */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:flex lg:gap-20">
        <main className="w-full min-w-0 flex-1">{children}</main>

        {/* 사이드바 영역 */}
        <aside className="hidden w-80 shrink-0 lg:block">
          <div className="sticky top-32 space-y-12">
            {/* 위젯 1: 미어캣 큐레이션 카드 (Author 대체) */}
            <div className="rounded-[2.5rem] bg-meerkat-earth p-9 text-white shadow-2xl shadow-meerkat-earth/20 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-meerkat-amber rounded-full blur-3xl opacity-50"></div>
              <h3 className="text-meerkat-amber text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                Meerkat Curation
              </h3>
              <p className="text-[17px] leading-relaxed font-bold tracking-tight break-keep">
                {lang === 'ko'
                  ? '매일 쏟아지는 기술 뉴스 중 개발자에게 영감을 주는 1%를 감시합니다.'
                  : 'We monitor the 1% of tech news that truly inspires developers.'}
              </p>
              <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                <div className="text-[11px] font-bold text-white/50 uppercase tracking-widest">
                  Since 2022
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-meerkat-earth bg-meerkat-sand"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* 위젯 2: 뉴스레터 구독 (깔끔한 필러 역할) */}
            <div className="rounded-[2.5rem] border border-meerkat-border bg-meerkat-bone p-9 transition-all hover:shadow-lg">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Mail size={20} className="text-meerkat-amber" />
              </div>
              <h4 className="text-meerkat-earth font-black text-lg mb-2 tracking-tight">
                Weekly Meerkat
              </h4>
              <p className="text-sm text-meerkat-shadow leading-relaxed mb-6 font-medium">
                {lang === 'ko'
                  ? '가장 뜨거운 인사이트를 메일로 받아보세요.'
                  : 'Get the hottest insights in your inbox.'}
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-meerkat-border bg-white px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-meerkat-amber/20 transition-all"
                />
                <button className="absolute right-2 top-2 p-2 bg-meerkat-earth text-white rounded-xl hover:bg-meerkat-amber transition-colors">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>

            {/* [AD SLOT] 하단 광고 영역 */}
            {/* <div className="flex h-[400px] w-full items-center justify-center rounded-[2.5rem] border-2 border-dashed border-meerkat-border bg-meerkat-bone/50 text-[10px] font-black tracking-widest text-meerkat-sand uppercase">
              Sponsorship Area
            </div> */}
          </div>
        </aside>
      </div>

      {/* 3. 푸터 영역 */}
      <footer className="border-t border-meerkat-border bg-meerkat-bone py-20 text-center">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex justify-center gap-8 text-[11px] font-black text-meerkat-sand uppercase tracking-[0.2em]">
            <Link href={`/${lang}/privacy`} className="hover:text-meerkat-earth">
              Privacy
            </Link>
            <Link href={`/${lang}/terms`} className="hover:text-meerkat-earth">
              Terms
            </Link>
            <Link href={`/${lang}/contact`} className="hover:text-meerkat-earth">
              Contact
            </Link>
          </div>
          <p className="text-xs font-bold tracking-[0.3em] text-meerkat-sand uppercase">
            © 2026 MEERKAT.LOG - Watching the future
          </p>
        </div>
      </footer>
    </div>
  );
}
