// src/app/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    try {
      // Exchange the code for a session
      await supabase.auth.exchangeCodeForSession(code);
      
      // Redirect to login page with success message
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