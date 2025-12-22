import { NextResponse } from "next/server";
import { URL_REDIRECTS, VALID_ROUTES } from "./app/utils/urlValidation";

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

 
  if (request.headers.get("purpose") === "prefetch") {
    return NextResponse.next();
  }

  const lower = pathname.toLowerCase();

 
  if (pathname !== lower) {
    if (VALID_ROUTES[lower]) {
      return NextResponse.redirect(
        new URL(lower + search, request.url),
        301
      );
    }
    return NextResponse.next(); // prevent unnecessary redirects
  }

  // 🟢 URL Redirects
  const redirectTarget = URL_REDIRECTS[lower];
  if (redirectTarget) {
    return NextResponse.redirect(
      new URL(redirectTarget + search, request.url),
      301
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|.*\\..*).*)", // ignore static files & prefetch
  ],
};