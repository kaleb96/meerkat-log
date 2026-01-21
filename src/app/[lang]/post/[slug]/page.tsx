import { supabase } from '@/lib/supabase';
import { getDictionary, Locale } from '@/lib/dictionary';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, ChevronLeft, ExternalLink, Clock } from 'lucide-react';
import Link from 'next/link';
import PostInteraction from '@/components/PostIntercation';
import Image from 'next/image';
// import { ReadingProgressBar } from '@/components/ReadingProgressBar'

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

  const { data: post } = await supabase.from('news_dev').select('*').eq('slug', slug).single();

  if (!post)
    return <div className="py-20 text-center text-meerkat-sand font-bold">Post not found.</div>;

  const displayTitle = isKo ? post.title_ko : post.title_en;
  const displayContent = isKo ? post.content_ko : post.content_en;

  return (
    <article className="max-w-3xl mx-auto pb-32">
      {/* SECTION: 네비게이션 */}
      <Link
        href={`/${lang}`}
        className="inline-flex items-center gap-1 text-meerkat-sand hover:text-meerkat-amber mb-12 transition-colors text-sm font-bold group"
      >
        <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        {dict.nav.back}
      </Link>

      {/* SECTION: 헤더 */}
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="bg-meerkat-amber text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-sm">
            {post.category}
          </span>
          <div className="flex items-center text-meerkat-sand text-xs font-bold gap-4 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {new Date(post.created_at).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.views || 0} views
            </span>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-[1000] text-meerkat-earth leading-[1.1] tracking-tighter break-keep">
          {displayTitle}
        </h1>
      </header>

      {/* SECTION: 마크다운 본문 (색상 고도화) */}
      <div
        className="prose prose-slate prose-lg max-w-none 
        prose-headings:text-meerkat-earth prose-headings:font-black 
        prose-p:text-meerkat-clay prose-p:leading-[1.85]
        prose-strong:text-meerkat-amber 
        prose-blockquote:border-meerkat-amber prose-blockquote:bg-meerkat-bone prose-blockquote:rounded-r-2xl prose-blockquote:text-meerkat-shadow
        prose-img:rounded-[2.5rem] prose-img:shadow-2xl break-keep"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayContent}</ReactMarkdown>
      </div>

      <PostInteraction id={post.id.toString()} initialLikes={post.likes || 0} />

      {/* SECTION: Meerkat Insight Footer */}
      <footer className="mt-24">
        <div className="bg-meerkat-bone rounded-[3rem] p-10 md:p-14 border border-meerkat-border flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6 text-left w-full">
            <div className="w-16 h-16 bg-meerkat-earth rounded-3xl flex items-center justify-center text-3xl shadow-lg shrink-0">
              <Image
                alt="Meerkat-insight"
                src="/images/meerkat-insight.png"
                width={40}
                height={40}
                priority
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-meerkat-earth font-[900] text-xl mb-1 italic">Meerkat Insights</p>
              <p className="text-meerkat-shadow text-sm leading-relaxed font-medium">
                {isKo
                  ? '거친 야생과 같은 정보의 세계에서 미어캣은 오직 진실만을 감시합니다.'
                  : 'In a world of wild information, Meerkat monitors only the truth.'}
              </p>
            </div>
          </div>
          <a
            href={post.original_url}
            target="_blank"
            rel="noreferrer"
            className="w-full md:w-auto text-center bg-meerkat-amber text-white px-8 py-4 rounded-2xl font-black hover:bg-meerkat-earth transition-all shadow-xl shadow-meerkat-amber/20 break-keep"
          >
            {isKo ? '오리지널 리포트' : 'Original Report'}
          </a>
        </div>
      </footer>
    </article>
  );
}
