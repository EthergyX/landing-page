// src/hooks/useSupabaseAuth.ts
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session
    const setupAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user || null);
      setLoading(false);

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user || null);
          setLoading(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };

    setupAuth();
  }, []);

  return { user, session, loading };
}