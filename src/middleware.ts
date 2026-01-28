import { NextResponse, type NextRequest } from "next/server";

const locales = ["ko", "en"];
const defaultLocale = "en";
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  const acceptLanguage = request.headers.get("accept-language");
  const locale = acceptLanguage?.toLocaleLowerCase().includes("ko")
    ? "ko"
    : defaultLocale;

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    /*
     * 아래 확장자를 포함한 파일들은 미들웨어 로직(언어 리다이렉트)을 타지 않도록 설정
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|ads.txt|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
