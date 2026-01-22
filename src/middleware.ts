import { NextResponse, type NextRequest } from 'next/server';

const locales = ['ko', 'en'];
const defaultLocale = 'en';
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return;

  const acceptLanguage = request.headers.get('accept-language');
  const locale = acceptLanguage?.toLocaleLowerCase().includes('ko') ? 'ko' : defaultLocale;

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    /*
     * 아래로 시작하는 경로를 제외한 모든 경로에 미들웨어 적용:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - sitemap.xml, robots.txt (검색엔진용 파일)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
