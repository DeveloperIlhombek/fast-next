import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        ],
      },
    ];
  },
};

export default nextConfig;
