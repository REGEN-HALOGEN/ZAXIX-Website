import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

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
};

export default nextConfig;
