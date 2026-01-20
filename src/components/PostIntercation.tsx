'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Heart } from 'lucide-react';

export default function PostInteraction({
  id,
  initialLikes,
}: {
  id: string;
  initialLikes: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // 마운트 완료 확인용

  // 2. 조회수 및 좋아요 상태 체크는 딱 한 번만 실행
  const hasCalled = useRef(false); // 실행 여부를 추적하는 flag

  useEffect(() => {
    const initInteraction = async () => {
      // 이미 실행 중이거나 실행 완료했다면 리턴
      if (hasCalled.current) return;

      try {
        const cookieName = `viewed_post_${id}`;
        const hasViewed = document.cookie
          .split(';')
          .some((item) => item.trim().startsWith(`${cookieName}=`));

        if (!hasViewed) {
          hasCalled.current = true; // 실행 직전 flag 세우기
          await supabase.rpc('increment_views', { post_id: parseInt(id) });

          const expires = new Date();
          expires.setHours(expires.getHours() + 24);
          document.cookie = `${cookieName}=true; expires=${expires.toUTCString()}; path=/`;
        }
      } catch (error) {
        console.error('Interaction init error:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    initInteraction();
  }, [id]);
  // 3. 핸들러 함수를 useCallback으로 감싸 메모리 낭비와 불필요한 리렌더링 방지
  const handleLike = useCallback(async () => {
    if (isLiked) return;
    setIsLiked(true);
    setLikes((prev) => prev + 1);

    const { error } = await supabase.rpc('increment_likes', { post_id: parseInt(id) });

    if (error) {
      // 에러 발생 시 원래대로 롤백
      setIsLiked(false);
      setLikes((prev) => prev - 1);
      console.error('Like error:', error);
    } else {
      // 로컬스토리지 최종 기록
      const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
      if (!likedPosts.includes(id)) {
        likedPosts.push(id);
        localStorage.setItem('liked_posts', JSON.stringify(likedPosts));
      }
    }
  }, [id, isLiked]);

  // 하이드레이션 오류 방지: 서버와 클라이언트의 첫 렌더링 결과물을 맞춤
  if (!isLoaded) {
    return (
      <div className="mt-10 flex items-center gap-4 border-t border-slate-100 pt-8 opacity-50">
        <div className="h-10 w-24 animate-pulse bg-slate-100 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="mt-10 flex items-center gap-4 border-t border-slate-100 pt-8">
      <button
        onClick={handleLike}
        disabled={isLiked}
        className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all font-bold text-sm ${
          isLiked
            ? 'bg-red-50 border-red-100 text-red-500 cursor-default'
            : 'bg-white border-slate-200 text-slate-600 hover:border-red-200 hover:text-red-500 shadow-sm'
        }`}
      >
        <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
        <span>{likes.toLocaleString()}</span>
      </button>
      {isLiked && (
        <span className="text-xs text-slate-400 font-medium animate-in fade-in slide-in-from-left-2">
          이 글을 좋아합니다!
        </span>
      )}
    </div>
  );
}
