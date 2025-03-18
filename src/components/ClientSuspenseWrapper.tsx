"use client";

import { Suspense, ReactNode } from "react";

interface ClientSuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * A wrapper component that provides a Suspense boundary for client components
 * that use hooks like useSearchParams, usePathname, etc.
 * 
 * This helps prevent the "should be wrapped in a suspense boundary" error
 * when using client-side routing hooks in Next.js.
 */
export default function ClientSuspenseWrapper({
  children,
  fallback = <div className="min-h-screen flex items-center justify-center text-blue-100">Loading...</div>
}: ClientSuspenseWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}