// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = 'https://meerkat-log.vercel.app';

  // 1. DB에서 모든 포스트의 ID와 최종 수정일을 가져옵니다.
  const { data: posts } = await supabase
    .from('news_dev')
    .select('id, created_at')
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

  // 3. 동적 상세 페이지 URL 생성
  const postEntries: MetadataRoute.Sitemap =
    posts?.flatMap((post) => [
      {
        url: `${baseUrl}/ko/post/${post.id}`,
        // post.updated_at이 있으면 사용하고, 없으면 created_at 사용
        lastModified: new Date(post.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/en/post/${post.id}`,
        lastModified: new Date(post.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ]) ?? [];

  return [...defaultRoutes, ...postEntries];
};

export default sitemap;
