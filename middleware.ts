import { NextRequest, NextResponse } from "next/server";

// This only checks that a session cookie exists (fast, runs on the edge).
// The real verification happens in requireUser() inside each page, which
// also loads the user record.
const PROTECTED_PATHS = ["/selection", "/dashboard"];

export function middleware(request: NextRequest) {
  const isProtected = PROTECTED_PATHS.some((path) => request.nextUrl.pathname.startsWith(path));
  const hasSession = request.cookies.has("session");

  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/selection/:path*", "/dashboard/:path*"],
};
