// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { checkPassword } from "@/utils/passwordUtils";

export async function POST(req: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.error("Supabase is not configured - registration will fail");
      return NextResponse.json(
        { error: "Database connection not configured. Please contact the administrator." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password using our simplified validator
    const passwordCheck = checkPassword(password);
    if (!passwordCheck.valid) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long and include uppercase, lowercase, and numbers" },
        { status: 400 }
      );
    }

    // Use Supabase's built-in sign-up with email confirmation
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Check if the user was created but needs to confirm their email
    if (data?.user?.identities?.length === 0) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Also store user profile info in your users table if you're using it
    if (data?.user?.id) {
      const { error: profileError } = await supabase
        .from("users")
        .insert([
          {
            id: data.user.id,
            name,
            email: email.toLowerCase(),
            created_at: new Date().toISOString(),
          },
        ]);

      if (profileError) {
        console.error("Error creating user profile:", profileError);
        // Continue anyway as the auth user is created
      }
    }

    return NextResponse.json(
      { message: "Verification email sent. Please check your inbox to confirm your email." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}