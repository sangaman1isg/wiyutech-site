import type { MetadataRoute } from "next";

const BASE_URL = "https://wiyuletech.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/checkout`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
