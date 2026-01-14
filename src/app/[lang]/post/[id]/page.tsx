import { supabase } from '@/lib/supabase';
import { getDictionary, Locale } from '@/lib/dictionary';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, ChevronLeft, ExternalLink, Clock } from 'lucide-react';
import Link from 'next/link';

// 1. 다국어 SEO 메타데이터 (구글 검색 엔진용)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;

  // 1. 필요한 컬럼만 가져오기 (성능 최적화)
  const { data: post } = await supabase
    .from('news')
    .select('title, title_en, content, content_en')
    .eq('id', id)
    .single();

  if (!post) return { title: 'Post Not Found | MEERKAT.LOG' };

  // 2. 언어별 데이터 할당 (간결한 로직)
  const isKo = lang === 'ko';
  const title = isKo ? post.title : post.title_en || post.title;
  const description = (isKo ? post.content : post.content_en || post.content)
    .substring(0, 150)
    .replace(/[#*]/g, '') // 마크다운 기호 제거하여 순수 텍스트만 추출
    .trim();

  return {
    title: `${title} | MEERKAT.LOG`,
    description,
    openGraph: {
      title: `${title} | MEERKAT.LOG`,
      description,
      type: 'article',
      images: [{ url: '/images/meerkat.png' }], // 공유 시 뜰 이미지 강제 지정
    },
    alternates: {
      // 3. 절대 경로 권장 (배포될 실제 도메인이 확정되면 앞에 붙여주는 게 좋습니다)
      canonical: `/${lang}/post/${id}`,
      languages: {
        'ko-KR': `/ko/post/${id}`,
        'en-US': `/en/post/${id}`,
      },
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const dict = getDictionary(lang as Locale);
  const isKo = lang === 'ko';

  const { data: post } = await supabase.from('news').select('*').eq('id', id).single();

  if (!post)
    return <div className="py-20 text-center text-slate-500 font-bold">Post not found.</div>;

  return (
    <article className="max-w-3xl mx-auto">
      {/* 상단 네비게이션 */}
      <Link
        href={`/${lang}`}
        className="inline-flex items-center gap-1 text-slate-400 hover:text-blue-600 mb-10 transition-colors text-sm font-bold group"
      >
        <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        {dict.nav.back}
      </Link>

      {/* 헤더 섹션 */}
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-tighter">
            {post.category}
          </span>
          <div className="flex items-center text-slate-400 text-xs font-bold gap-3">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(post.created_at).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> 3 min read
            </span>
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
          {isKo ? post.title : post.title_en || post.title}
        </h1>
      </header>

      {/* [AD SLOT 1] 본문 시작 전 광고 */}
      {/* <div className="w-full h-24 bg-slate-50 border border-dashed border-slate-200 mb-12 flex items-center justify-center text-[10px] font-black text-slate-300 tracking-widest">AD SENSE - TOP</div> */}

      {/* 마크다운 본문 (Tailwind v4 유틸리티 및 Typography 조합) */}
      <div
        className="prose prose-slate prose-lg max-w-none 
        prose-headings:text-slate-900 prose-headings:font-black 
        prose-p:text-slate-600 prose-p:leading-relaxed
        prose-strong:text-slate-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-3xl prose-img:shadow-2xl break-keep"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {isKo ? post.content : post.content_en || post.content}
        </ReactMarkdown>
      </div>

      {/* [AD SLOT 2] 본문 하단 광고 */}
      {/* <div className="w-full h-64 bg-slate-50 border border-dashed border-slate-200 mt-20 flex items-center justify-center text-[10px] font-black text-slate-300 tracking-widest">AD SENSE - BOTTOM</div> */}

      {/* 출처 섹션 */}
      <footer className="mt-20 pt-10 border-t border-slate-100">
        <div className="bg-slate-50 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-100">
          <div>
            <p className="text-sm text-slate-500 font-medium">{dict.source}</p>
          </div>
          <a
            href={post.original_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm break-keep"
          >
            {isKo ? '원문 읽기' : 'Original Article'} <ExternalLink size={14} />
          </a>
        </div>
      </footer>
    </article>
  );
}
