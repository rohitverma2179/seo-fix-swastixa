// src/lib/seo.ts
// Drop-in replacement for the current helper. Same public API
// (getPageMetadata / getBlogMetadata) so no page has to change,
// plus the fixes: brand de-duplication, real OG images, article metadata,
// canonical control and noindex support.

import type { Metadata } from "next";
import { seoData } from "@/data/seoData";
import { blogs } from "@/data/blogs";
import { blogDates } from "@/data/blogDates";
import {
  SITE_URL,
  SITE_NAME,
  BRAND,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_OG_IMAGE_HEIGHT,
  absoluteUrl,
} from "./site";

export { SITE_URL };

const DEFAULT_SEO = {
  title: "Digital Marketing & Web Development Agency",
  description:
    "Swastixa Digital is a full-service digital company that blends strategy, design, and technology to deliver 360° creative and digital marketing solutions, including video production, social media, and website development.",
};

export interface SeoOverrides {
  title?: string;
  description?: string;
  /** Absolute URL or /public path. Defaults to the brand card. */
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  /** Extra keywords for the article tag list (blog only). */
  tags?: string[];
}

/** "SEO Agency & Services | Swastixa" -> "SEO Agency & Services" */
export function stripBrand(title: string) {
  return title
    .replace(new RegExp(`\\s*[|\\-–—]\\s*${BRAND}(\\s+Digital)?\\s*$`, "i"), "")
    .trim();
}

/** Title as it will actually render (template applied) — used for OG/twitter. */
export function withBrand(title: string) {
  return `${stripBrand(title)} | ${BRAND}`;
}

function ogImage(image?: string) {
  const url = absoluteUrl(image || DEFAULT_OG_IMAGE);
  return [{ url, width: DEFAULT_OG_IMAGE_WIDTH, height: DEFAULT_OG_IMAGE_HEIGHT }];
}

export function getPageMetadata(path: string, overrides: SeoOverrides = {}): Metadata {
  const data =
    (seoData as Record<string, { title: string; description: string }>)[path] || DEFAULT_SEO;

  const title = stripBrand(overrides.title || data.title);
  const description = overrides.description || data.description;
  const canonical = path === "/" ? "/" : path;
  const image = ogImage(overrides.image);

  return {
    // The root layout's title.template appends "| Swastixa" exactly once.
    title,
    description,
    alternates: { canonical },
    robots: overrides.noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      title: withBrand(title),
      description,
      url: absoluteUrl(canonical),
      images: image.map((i) => ({
        ...i,
        alt: overrides.imageAlt || `${title} — ${SITE_NAME}`,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: withBrand(title),
      description,
      images: image.map((i) => i.url),
    },
  };
}

export function getBlogMetadata(slug: string): Metadata {
  const blog = (blogs as any[]).find((b) => b.slug === slug);

  if (!blog?.hero) {
    return getPageMetadata(`/blog/${slug}`, { noIndex: true });
  }

  const dates = blogDates[slug];
  const title = stripBrand(blog.hero.metaTitle || blog.hero.title || slug);
  const description = blog.hero.description;
  const image = blog.hero.image ? [absoluteUrl(blog.hero.image)] : [absoluteUrl(DEFAULT_OG_IMAGE)];

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    robots: { index: true, follow: true },
    authors: [{ name: blog.author || SITE_NAME, url: `${SITE_URL}/about` }],
    keywords: blog.tags,
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale: "en_IN",
      title: withBrand(title),
      description,
      url: absoluteUrl(`/blog/${slug}`),
      images: image.map((url) => ({ url, alt: title })),
      // These two are what make a blog post eligible for Top Stories / article cards.
      publishedTime: dates?.publishedAt,
      modifiedTime: dates?.updatedAt || dates?.publishedAt,
      authors: [blog.author || SITE_NAME],
      section: blog.category,
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: withBrand(title),
      description,
      images: image,
    },
  };
}
