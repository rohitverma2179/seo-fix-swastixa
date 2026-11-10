// src/data/blogDates.ts
// BlogPosting schema and og:published_time both need real dates.
// Fill these from your CMS / Google Search Console URL Inspection history —
// do NOT generate them with new Date(), and do not guess: a wrong datePublished
// is worse than none.

export type BlogDate = {
  /** ISO 8601, e.g. "2026-03-14T09:30:00+05:30" */
  publishedAt: string;
  updatedAt?: string;
};

export const blogDates: Record<string, BlogDate> = {
  // "how-to-recover-a-hacked-instagram-account": {
  //   publishedAt: "2026-01-12T10:00:00+05:30",
  //   updatedAt: "2026-06-02T11:15:00+05:30",
  // },
  // ...one entry per slug in src/data/blogs.ts (21 posts)
};
