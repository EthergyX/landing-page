// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { users } from "../../register/route";

export const authOptions = {
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

        // For debugging
        console.log("Login attempt for:", credentials.email);
        console.log("Available users:", users.map(u => ({id: u.id, email: u.email})));

        // Find user by email (case insensitive)
        const user = users.find(
          (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
        );
        
        if (!user) {
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };