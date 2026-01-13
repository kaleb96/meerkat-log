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
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-12">
      {/* 메인 타이틀 섹션 */}
      <section className="py-10 border-b border-slate-50">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-4">{dict.title}</h1>
        <p className="text-lg text-slate-500 font-medium">{dict.description}</p>
      </section>

      {/* 포스트 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {posts?.map((post) => (
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
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                  {isKo ? post.title : post.title_en || post.title}
                </h2>
                <p className="text-slate-500 leading-relaxed line-clamp-3 text-[15px]">
                  {isKo ? post.content : post.content_en || post.content}
                </p>
                <div className="pt-2 flex items-center text-sm font-black text-slate-900 group-hover:gap-2 transition-all">
                  {dict.more} <span className="text-blue-600">→</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
