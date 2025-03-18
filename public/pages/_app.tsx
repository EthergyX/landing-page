// pages/_app.tsx
import { Suspense } from "react";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-blue-100">Loading...</div>}>
        <Component {...pageProps} />
      </Suspense>
    </AuthProvider>
  );
}

export default MyApp;