import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    // Enable modern image formats for better compression
    formats: ["image/avif", "image/webp"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Image sizes for responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize image size
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Allow images from these domains (if using external images)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.zaxispharmachine.com",
      },
    ],
  },

  // Enable compression
  compress: true,

  // Power pack experimental features for performance
  experimental: {
    // Optimize CSS
    optimizeCss: true,
  },

  // Redirect non-www to www for canonical URL consistency
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "zaxispharmachine.com",
          },
        ],
        destination: "https://www.zaxispharmachine.com/:path*",
        permanent: true, // 308 redirect
      },
    ];
  },

  // Add caching headers for static assets
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(woff|woff2|ttf|otf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
