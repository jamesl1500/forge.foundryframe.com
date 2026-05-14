import type { MetadataRoute } from "next";
import { shopCategories } from "@/lib/shop-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forge.foundryframe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = shopCategories.map((category) => ({
    url: `${siteUrl}/shop/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const tierRoutes: MetadataRoute.Sitemap = shopCategories.flatMap((category) =>
    category.tiers.map((tier) => ({
      url: `${siteUrl}/shop/${category.slug}/${tier.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...categoryRoutes, ...tierRoutes];
}
