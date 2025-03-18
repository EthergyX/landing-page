// src/app/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    try {
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error("Error exchanging code for session:", error);
        return NextResponse.redirect(new URL("/auth/error", request.url));
      }
      
      if (data?.session) {
        // Set cookies for the session
        const cookieStore = await cookies();
        
        // Store the access token and refresh token in cookies
        cookieStore.set("sb-access-token", data.session.access_token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });

        cookieStore.set("sb-refresh-token", data.session.refresh_token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30, // 30 days
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });
        
        // Redirect to dashboard with session established
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      
      // If no session was created, redirect to login page with verification message
      return NextResponse.redirect(new URL("/login?verified=true", request.url));
    } catch (error) {
      console.error("Error exchanging code for session:", error);
      // Redirect to error page
      return NextResponse.redirect(new URL("/auth/error", request.url));
    }
  }

  // If no code is present, redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}