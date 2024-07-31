import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
const adminOnlyPathRegexs = [new RegExp(`^/admin.*$`)];

export default withAuth((request) => {
  const { pathname } = request.nextUrl;
  if (
    request.nextauth.token?.role !== "ADMIN" &&
    adminOnlyPathRegexs.some((regex) => regex.test(pathname))
  ) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
}, {});

export const config = {
  matcher: [
    // "/user/:path*",
    "/admin/:path*",
    // "/glyphs/add",
  ],
};
