// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

import { validatePassword } from "@/utils/passwordUtils";

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

    // Validate password complexity
    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      return NextResponse.json(
        { error: passwordCheck.message },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: queryError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase())
      .single();

    if (queryError && queryError.code !== "PGRST116") {
      // PGRST116 is the error code for "no rows returned"
      console.error("Error checking existing user:", queryError);
      return NextResponse.json(
        { error: "Database error: " + queryError.message },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const { error: insertError } = await supabase.from("users").insert([
      {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.error("Error creating user:", insertError);
      let errorMessage = "Failed to create user";
      
      // Check if it's a foreign key constraint or table doesn't exist
      if (insertError.code === "23503") {
        errorMessage = "Foreign key constraint error. Database schema issue.";
      } else if (insertError.code === "42P01") {
        errorMessage = "Table 'users' does not exist. Database setup issue.";
      }
      
      return NextResponse.json(
        { error: errorMessage, details: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User registered successfully" },
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