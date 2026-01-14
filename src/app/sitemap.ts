// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = 'https://meerkat-log.vercel.app';

  // 1. DB에서 모든 포스트의 ID와 최종 수정일을 가져옵니다.
  const { data: posts } = await supabase
    .from('news')
    .select('id, updated_at')
    .order('created_at', { ascending: false });

  // 2. 동적 상세 페이지 URL 생성 (KO / EN 각각 생성)
  const postEntries =
    posts?.flatMap((post) => [
      {
        url: `${baseUrl}/ko/post/${post.id}`,
        lastModified: new Date(post.updated_at),
      },
      {
        url: `${baseUrl}/en/post/${post.id}`,
        lastModified: new Date(post.updated_at),
      },
    ]) ?? [];

  // 3. 기본 페이지(메인 등)와 상세 페이지 합치기
  return [
    { url: `${baseUrl}/ko`, lastModified: new Date() },
    { url: `${baseUrl}/en`, lastModified: new Date() },
    ...postEntries,
  ];
};

export default sitemap;
