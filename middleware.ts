// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Create a Supabase client configured to use cookies
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  
  const requestHeaders = new Headers(request.headers);
  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          // If the cookie is being set, update the request headers
          requestHeaders.set("Set-Cookie", `${name}=${value}; Path=${options?.path ?? "/"}`);
        },
        remove(name, options) {
          // If the cookie is being deleted, update the request headers
          requestHeaders.set("Set-Cookie", `${name}=; Path=${options?.path ?? "/"}; Max-Age=0`);
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  
  // Check auth condition
  const isLoggedIn = !!session;
  const isAuthPage = 
    request.nextUrl.pathname === "/login" || 
    request.nextUrl.pathname === "/register" || 
    request.nextUrl.pathname.startsWith("/auth/") ||
    request.nextUrl.pathname === "/reset-password";
  const isDashboardPage = request.nextUrl.pathname === "/dashboard";

  // Redirect if user is logged in and trying to access auth pages
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  // Redirect if user is not logged in and trying to access dashboard
  if (!isLoggedIn && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Return the response with updated headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/register',
    '/dashboard/:path*',
    '/auth/:path*',
    '/reset-password',
  ],
};