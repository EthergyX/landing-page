// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EthergyX | Virtual Power Plant Solutions",
  description: "Scaling virtual power plant deployments for a sustainable future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}