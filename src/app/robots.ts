import type { MetadataRoute } from "next";

const BASE_URL = "https://www.zaxispharmachine.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",      // API routes
          "/admin/",    // Future admin routes
          "/auth/",     // Future auth routes
          "/_next/",    // Next.js internal routes
          "/private/",  // Private routes
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
