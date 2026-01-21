import { supabase } from '@/lib/supabase';
import { getDictionary, Locale } from '@/lib/dictionary';
import Link from 'next/link';
import Image from 'next/image';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);
  const isKo = lang === 'ko';

  const { data: posts } = await supabase
    .from('news_dev')
    .select('*')
    .order('created_at', { ascending: false });

  const totalPosts = posts?.length || 0;
  const totalViews = posts?.reduce((acc, curr) => acc + (curr.views || 0), 0) || 0;

  const getExcerpt = (text: string) => {
    return text.replace(/[#*`]/g, '').replace(/\n/g, ' ').trim().substring(0, 120) + '...';
  };

  return (
    <div className="space-y-16 pb-20">
      {/* SECTION: Meerkat Author & Stats */}
      <section className="py-16 border-b-2 border-[#F3EFE9] flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6 group">
            <div className="w-14 h-14 bg-meerkat-amber rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-meerkat-amber/20 transition-all group-hover:rotate-3 group-hover:scale-110">
              <Image
                src="/images/meerkat-watch.png"
                alt="Meerkat watch"
                width={40}
                height={40}
                priority
                className="object-cover"
              />
            </div>
            <span className="text-meerkat-amber font-black tracking-widest text-xs uppercase">
              Meerkat Watch
            </span>
          </div>
          <h1 className="text-5xl font-[1000] tracking-tighter text-meerkat-earth mb-6 leading-none">
            {dict.title}
            <span className="text-meerkat-amber">.</span>
          </h1>
          <p className="text-xl text-meerkat-shadow font-medium leading-relaxed break-keep italic">
            {isKo
              ? '고요한 초원 위, 미어캣의 시선으로 기술의 핵심을 포착합니다.'
              : 'On the quiet savannah, we capture the core of tech through the eyes of a meerkat.'}
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-meerkat-bone p-6 rounded-[2rem] border border-meerkat-border text-center min-w-[120px]">
            <div className="text-meerkat-earth text-2xl font-black">{totalPosts}</div>
            <div className="text-meerkat-sand text-[10px] font-black uppercase tracking-widest mt-1">
              LOGS
            </div>
          </div>
          <div className="bg-meerkat-bone p-6 rounded-[2rem] border border-meerkat-border text-center min-w-[120px]">
            <div className="text-meerkat-earth text-2xl font-black">
              {totalViews.toLocaleString()}
            </div>
            <div className="text-meerkat-sand text-[10px] font-black uppercase tracking-widest mt-1">
              VIEWS
            </div>
          </div>
        </div>
      </section>

      {/* 포스트 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {posts?.map((post) => {
          const title = isKo ? post.title_ko : post.title_en;
          const content = isKo ? post.content_ko : post.content_en;

          return (
            <article key={post.id} className="group">
              <Link href={`/${lang}/post/${post.slug}`}>
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="bg-meerkat-amber text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-tighter">
                      {post.category}
                    </span>
                    <time className="text-meerkat-sand text-xs font-bold uppercase tracking-wider">
                      {new Date(post.created_at).toLocaleDateString()}
                    </time>
                  </div>

                  <h2 className="text-2xl font-[900] text-meerkat-earth group-hover:text-meerkat-amber transition-colors line-clamp-2 leading-tight break-keep">
                    {title}
                  </h2>

                  <p className="text-meerkat-shadow leading-relaxed line-clamp-3 text-[15px] break-keep">
                    {getExcerpt(content)}
                  </p>

                  <div className="pt-2 flex items-center text-sm font-black text-meerkat-earth group-hover:translate-x-1 transition-transform">
                    {dict.more} <span className="text-meerkat-amber ml-1">→</span>
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
