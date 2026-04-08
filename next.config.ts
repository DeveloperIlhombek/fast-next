import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove X-Powered-By header to reduce response size
  poweredByHeader: false,

  // Enable gzip compression
  compress: true,

  // Strict mode for catching bugs early
  reactStrictMode: true,

  // Allow Telegram media domains for profile photos
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t.me",
      },
      {
        protocol: "https",
        hostname: "*.telegram.org",
      },
    ],
    // Optimize image formats
    formats: ["image/avif", "image/webp"],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Allow embedding in Telegram
          { key: "X-Frame-Options", value: "ALLOW-FROM https://web.telegram.org" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self' https://web.telegram.org" },
          // Cache static assets aggressively
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Don't cache HTML pages
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
