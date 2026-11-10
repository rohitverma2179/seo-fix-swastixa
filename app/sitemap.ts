// app/sitemap.ts
import type { MetadataRoute } from "next";
import { blogs } from "@/data/blogs";
import { blogDates } from "@/data/blogDates";

export const dynamic = "force-static";

const BASE = "https://swastixa.com";

/**
 * One fixed date for pages you have not tracked yet. Change it when you
 * actually edit the page — never call new Date() here, or every deploy tells
 * Google that all 45 URLs changed today (and Google learns to ignore it).
 */
const CONTENT_UPDATED: Record<string, string> = {
  "/": "2026-11-01",
  "/services": "2026-10-15",
  "/services/seo-agency": "2026-10-15",
  "/real-estate-marketing-agency-in-gurugram": "2026-10-20",
  // ...add a real date per URL as you touch each page
};

const FALLBACK_UPDATED = "2026-09-01";

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const staticRoutes: Route[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },

  // Commercial money pages
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/seo-agency", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/performance-marketing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/website-development", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/social-media-marketing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/video-production-house", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/content-marketing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/influencer-marketing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/packaging-design", priority: 0.9, changeFrequency: "monthly" },

  // Local landing page — highest commercial intent after /services
  { path: "/real-estate-marketing-agency-in-gurugram", priority: 0.9, changeFrequency: "monthly" },

  // Portfolio
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work/reels", priority: 0.8, changeFrequency: "weekly" },
  { path: "/work/branding", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work/print", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work/digital-marketing", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work/website-development", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work/social-media-management", priority: 0.8, changeFrequency: "weekly" },
  { path: "/work/video-production", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work/video-production/films", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work/video-production/construction", priority: 0.7, changeFrequency: "monthly" },

  // Trust + company
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/awards", priority: 0.6, changeFrequency: "yearly" },
  { path: "/careers", priority: 0.6, changeFrequency: "weekly" },

  // Blog hub
  { path: "/blog", priority: 0.8, changeFrequency: "daily" },

  // Legal — crawlable, but never compete for priority
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE}${route.path}`,
    lastModified: new Date(CONTENT_UPDATED[route.path] ?? FALLBACK_UPDATED),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Deduplicate slugs — a repeated slug in blogs.ts must not create a duplicate URL.
  const seen = new Set<string>();
  const posts: MetadataRoute.Sitemap = (blogs as any[])
    .filter((blog) => {
      if (!blog?.slug || seen.has(blog.slug)) return false;
      seen.add(blog.slug);
      return true;
    })
    .map((blog) => {
      const dates = blogDates[blog.slug];
      return {
        url: `${BASE}/blog/${blog.slug}`,
        lastModified: new Date(dates?.updatedAt ?? dates?.publishedAt ?? FALLBACK_UPDATED),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });

  return [...pages, ...posts];
}
