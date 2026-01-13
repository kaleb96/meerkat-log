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
  // 정적 파일 및 API 제외
  matcher: "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
};
