import type { MetadataRoute } from "next";

const BASE_URL = "https://www.zaxispharmachine.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Get current date for lastModified
  const currentDate = new Date();

  // Define all indexable routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add more routes as the site grows
    // {
    //   url: `${BASE_URL}/infrastructure`,
    //   lastModified: currentDate,
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
  ];

  return routes;
}
