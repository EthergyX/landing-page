// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// These values should come from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Authentication will not work properly.");
}

// Create Supabase client with fallback empty strings to prevent crashes
export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};