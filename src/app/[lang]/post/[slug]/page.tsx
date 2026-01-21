import { supabase } from '@/lib/supabase';
import { getDictionary, Locale } from '@/lib/dictionary';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, ChevronLeft, ExternalLink, Clock } from 'lucide-react';
import Link from 'next/link';
import PostInteraction from '@/components/PostIntercation';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

// 1. 동적 메타데이터: SEO 최적화 (id -> slug)
export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const isKo = lang === 'ko';

  const { data: post } = await supabase
    .from('news_dev')
    .select('title_ko, title_en, content_ko, content_en, created_at')
    .eq('slug', slug)
    .single();

  if (!post) return { title: 'Post Not Found | MEERKAT.LOG' };

  const title = isKo ? post.title_ko : post.title_en;
  // 설명문에서 마크다운 제거 및 요약
  const description = (isKo ? post.content_ko : post.content_en)
    .replace(/[#*`]/g, '')
    .substring(0, 160)
    .trim();

  const baseUrl = 'https://meerkat-log.vercel.app';

  return {
    title: `${title} | MEERKAT.LOG`,
    description,
    openGraph: {
      title: `${title} | MEERKAT.LOG`,
      description,
      type: 'article',
      publishedTime: post.created_at,
      images: [{ url: '/images/meerkat.png' }],
      url: `${baseUrl}/${lang}/post/${slug}`,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/post/${slug}`,
      languages: {
        'ko-KR': `${baseUrl}/ko/post/${slug}`,
        'en-US': `${baseUrl}/en/post/${slug}`,
      },
    },
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  const dict = getDictionary(lang as Locale);
  const isKo = lang === 'ko';

  // 2. 데이터 가져오기 (slug 기반 조회)
  const { data: post } = await supabase.from('news_dev').select('*').eq('slug', slug).single();

  if (!post)
    return <div className="py-20 text-center text-slate-500 font-bold">Post not found.</div>;

  const displayTitle = isKo ? post.title_ko : post.title_en;
  const displayContent = isKo ? post.content_ko : post.content_en;

  // 3. 구조화 데이터 (JSON-LD) 추가: 구글 검색 노출용
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: displayTitle,
    datePublished: post.created_at,
    author: { '@type': 'Person', name: 'Meerkat' },
    articleSection: post.category,
    inLanguage: lang,
  };

  return (
    <article className="max-w-3xl mx-auto">
      {/* 검색엔진용 JSON-LD 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SECTION: 네비게이션 */}
      <Link
        href={`/${lang}`}
        className="inline-flex items-center gap-1 text-slate-400 hover:text-blue-600 mb-10 transition-colors text-sm font-bold group"
      >
        <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        {dict.nav.back}
      </Link>

      {/* SECTION: 헤더 */}
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
              <Clock size={12} /> {post.views?.toLocaleString() || 0} views
            </span>
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
          {displayTitle}
        </h1>
      </header>

      {/* SECTION: 마크다운 본문 */}
      <div
        className="prose prose-slate prose-lg max-w-none 
        prose-headings:text-slate-900 prose-headings:font-black 
        prose-p:text-slate-600 prose-p:leading-relaxed
        prose-strong:text-slate-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-3xl prose-img:shadow-2xl break-keep"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayContent}</ReactMarkdown>
      </div>

      {/* 4. 상호작용 섹션: post.id를 내부적으로 사용 (조회수/좋아요 로직용) */}
      <PostInteraction id={post.id.toString()} initialLikes={post.likes || 0} />

      {/* SECTION: 출처 */}
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
