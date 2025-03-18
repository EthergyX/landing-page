// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Get environment variables or provide fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// Helper to get the base URL for redirects
export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_BASE_URL || 
    (typeof window !== 'undefined' 
      ? window.location.origin 
      : 'http://localhost:3000');
};