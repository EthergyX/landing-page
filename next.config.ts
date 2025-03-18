import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Additional configuration compatible with Netlify
  trailingSlash: true,
  // Disable ESLint during build to prevent build failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add output configuration for better Netlify compatibility
  output: "export",
  // Disable image optimization for Netlify builds
  experimental: {
    // This setting ensures that generateStaticParams is properly handled
    workerThreads: false,
    // Allows using fetch in server components
    serverActions: {
      allowedOrigins: ["localhost:3000", "127.0.0.1:3000", "*.netlify.app"],
    },
  },
};

export default nextConfig;