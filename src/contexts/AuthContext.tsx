// src/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any | null }>;
  updatePassword: (password: string) => Promise<{ error: any | null }>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps your app and makes auth object available to any child component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get current session and user on mount
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user || null);
      } catch (error) {
        console.error("Error retrieving session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        setIsLoading(false);
      }
    );

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
        },
      });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/confirm`,
      });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  // Update password
  const updatePassword = async (password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({ password });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  // Create the value object that will be supplied to consumers
  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}