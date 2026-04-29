import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;
  const isPublic = pathname.startsWith("/login");

  const token = request.cookies.get("token")?.value;

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/post/:path*", "/profile/:path*"],
};