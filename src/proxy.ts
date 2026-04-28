import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("Middleware checking route:", req.nextUrl.pathname);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("Middleware authorized check. Token exists:", !!token);
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = { 
  matcher: [
    "/day-02/:path*",
    "/day-06/:path*",
    "/day-10/:path*",
    "/api/chat/:path*",
  ] 
};
