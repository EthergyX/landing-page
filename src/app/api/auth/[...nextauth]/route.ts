// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

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
          // Query the user from Supabase
          const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", credentials.email.toLowerCase())
            .single();

          if (error || !user) {
            console.log("User not found:", credentials.email);
            return null;
          }

          // Check if the password matches
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            console.log("Password doesn't match for:", credentials.email);
            return null;
          }

          console.log("Login successful for:", credentials.email);
          
          return {
            id: user.id,
            name: user.name,
            email: user.email,
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
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
  debug: process.env.NODE_ENV === "development",
});

// Export the handler as GET and POST
export { handler as GET, handler as POST };