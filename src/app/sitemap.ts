import type { MetadataRoute } from "next";

const BASE_URL = "https://www.zaxispharmachine.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Get current date for lastModified
  const currentDate = new Date();

  // Define all indexable routes
  const routes: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    // About section
    {
      url: `${BASE_URL}/#about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Services/Systems section
    {
      url: `${BASE_URL}/#services`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Infrastructure section
    {
      url: `${BASE_URL}/#infrastructure`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Careers section
    {
      url: `${BASE_URL}/#careers`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Contact section
    {
      url: `${BASE_URL}/#contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return routes;
}
