import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // Additional configuration compatible with Netlify
  trailingSlash: true,
};

export default nextConfig;