// src/app/[lang]/page.tsx
import { supabase } from '@/lib/supabase';
import { getDictionary, Locale } from '@/lib/dictionary';
import Link from 'next/link';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);
  const isKo = lang === 'ko';

  // Supabase 데이터 fetch
  const { data: posts } = await supabase
    .from('news_dev')
    .select('*')
    .order('created_at', { ascending: false });

  const getExcerpt = (text: string) => {
    return (
      text
        .replace(/[#*`]/g, '') // 마크다운 기호 제거
        .replace(/\n/g, ' ') // 줄바꿈을 공백으로 치환
        .trim()
        .substring(0, 120) + '...'
    );
  };

  return (
    <div className="space-y-12">
      {/* 메인 타이틀 섹션 */}
      <section className="py-10 border-b border-slate-50">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-4">{dict.title}</h1>
        <p className="text-lg text-slate-500 font-medium">{dict.description}</p>
      </section>

      {/* 포스트 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {posts?.map((post) => {
          // 2. 언어별 데이터 할당 (새로운 컬럼명 적용)
          const title = isKo ? post.title_ko : post.title_en;
          const content = isKo ? post.content_ko : post.content_en;

          return (
            <article key={post.id} className="group">
              <Link href={`/${lang}/post/${post.id}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter">
                      {post.category}
                    </span>
                    <time className="text-slate-400 text-xs font-medium">
                      {new Date(post.created_at).toLocaleDateString()}
                    </time>
                    {/* 3. 조회수 표시 미리 반영 */}
                    <span className="text-slate-300 text-[10px] font-bold">
                      VIEWS {post.views || 0}
                    </span>
                  </div>

                  {/* 새 타이틀 컬럼 적용 */}
                  <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                    {title}
                  </h2>

                  {/* 마크다운 기호가 제거된 요약본 표시 */}
                  <p className="text-slate-500 leading-relaxed line-clamp-3 text-[15px]">
                    {getExcerpt(content)}
                  </p>

                  <div className="pt-2 flex items-center text-sm font-black text-slate-900 group-hover:gap-2 transition-all">
                    {dict.more} <span className="text-blue-600 ml-1">→</span>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
