// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

// Configure the authentication options
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Authenticate with Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error || !data.user) {
            console.log("Login error:", error?.message);
            return null;
          }

          // Get user profile data
          const { data: userProfile } = await supabase
            .from("users")
            .select("*")
            .eq("id", data.user.id)
            .single();

          // Return user data for the session
          return {
            id: data.user.id,
            email: data.user.email,
            name: userProfile?.name || data.user.user_metadata?.name || null,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
    verifyRequest: "/register/confirmation",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token?: JWT }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret-change-in-production",
  debug: process.env.NODE_ENV === "development",
});

// Export the handler as GET and POST
export { handler as GET, handler as POST };