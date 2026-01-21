// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = 'https://meerkat-log.vercel.app';

  // 1. DB에서 모든 포스트의 slug와 생성일을 가져옵니다.
  // ★ id 대신 slug를 가져오도록 수정
  const { data: posts } = await supabase
    .from('news_dev')
    .select('slug, created_at')
    .order('created_at', { ascending: false });

  // 2. 기본 페이지 설정 (메인 페이지 등)
  const defaultRoutes = [
    {
      url: `${baseUrl}/ko`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ];

  // 3. 동적 상세 페이지 URL 생성 (slug 기반)
  const postEntries: MetadataRoute.Sitemap =
    posts?.flatMap((post) => [
      {
        url: `${baseUrl}/ko/post/${post.slug}`, // ★ id -> slug
        lastModified: new Date(post.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/en/post/${post.slug}`, // ★ id -> slug
        lastModified: new Date(post.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ]) ?? [];

  return [...defaultRoutes, ...postEntries];
};

export default sitemap;
