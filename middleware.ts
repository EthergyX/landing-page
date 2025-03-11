// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthRoute = path.startsWith("/dashboard");
  
  // Get token from NextAuth
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
  });
  
  // Redirect to login if trying to access a protected route without being authenticated
  if (isAuthRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/dashboard/:path*"],
};