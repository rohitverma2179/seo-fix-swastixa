// src/lib/schema.ts
// Typed JSON-LD builders. Every builder returns a plain object that the
// <JsonLd /> component serialises — no JSX in here, so this file stays
// importable from server components, route handlers and scripts.

import {
  SITE_URL,
  SITE_NAME,
  BRAND,
  LOGO_PATH,
  EMAIL,
  ORG_ADDRESS,
  ORG_GEO,
  ORG_PHONE,
  SOCIAL_PROFILES,
  AREA_SERVED,
  absoluteUrl,
} from "./site";

type Json = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOCALBUSINESS_ID = `${SITE_URL}/#localbusiness`;

/** Site-wide Organization node. Put this in the root layout. */
export function organizationSchema(): Json {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: BRAND,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(LOGO_PATH),
      width: 512,
      height: 512,
    },
    image: absoluteUrl("/og/swastixa-og-default.jpg"),
    description:
      "Swastixa Digital is a full-service digital marketing and creative agency offering SEO, performance marketing, social media, video production, influencer marketing, packaging design and website development.",
    email: EMAIL,
    telephone: ORG_PHONE,
    address: { "@type": "PostalAddress", ...ORG_ADDRESS },
    sameAs: SOCIAL_PROFILES,
    foundingDate: "2019",
    areaServed: AREA_SERVED.map((name) => ({ "@type": "AdministrativeArea", name })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: EMAIL,
        telephone: ORG_PHONE,
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
  };
}

/** WebSite node with the SearchAction sitelinks hook. */
export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: BRAND,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * ProfessionalService (a LocalBusiness subtype) — this is the node that makes
 * the Gurugram landing page eligible for local pack / map-style results.
 * NAP must match the Google Business Profile character for character.
 */
export function localBusinessSchema(overrides: Json = {}): Json {
  return {
    "@type": "ProfessionalService",
    "@id": LOCALBUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl("/og/swastixa-og-default.jpg"),
    logo: absoluteUrl(LOGO_PATH),
    telephone: ORG_PHONE,
    email: EMAIL,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, UPI",
    address: { "@type": "PostalAddress", ...ORG_ADDRESS },
    geo: { "@type": "GeoCoordinates", ...ORG_GEO },
    hasMap: "TODO: Google Maps share link",
    areaServed: AREA_SERVED.map((name) => ({ "@type": "AdministrativeArea", name })),
    sameAs: SOCIAL_PROFILES,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    parentOrganization: { "@id": ORG_ID },
    ...overrides,
  };
}

/** Service node for /services/* pages. */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  areaServed?: string[];
}): Json {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(input.path)}#service`,
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": ORG_ID },
    areaServed: (input.areaServed || AREA_SERVED).map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    audience: { "@type": "BusinessAudience", audienceType: "Businesses and brands in India" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      url: absoluteUrl(input.path),
    },
  };
}

/** BreadcrumbList — feed it an ordered array, homepage included. */
export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(items[items.length - 1].path)}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** BlogPosting for /blog/[slug]. */
export function blogPostingSchema(input: {
  slug: string;
  headline: string;
  description: string;
  image: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  category?: string;
  tags?: string[];
}): Json {
  const url = absoluteUrl(`/blog/${input.slug}`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: input.headline.slice(0, 110),
    description: input.description,
    image: [absoluteUrl(input.image)],
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: input.publishedAt,
    dateModified: input.updatedAt || input.publishedAt,
    author: {
      "@type": "Organization",
      name: input.author || SITE_NAME,
      url: `${SITE_URL}/about`,
    },
    publisher: { "@id": ORG_ID },
    articleSection: input.category,
    keywords: input.tags?.join(", "),
    inLanguage: "en-IN",
    isAccessibleForFree: true,
  };
}

/** FAQPage — reuse the same array that renders the visible FAQ accordion. */
export function faqSchema(items: { question: string; answer: string }[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Optional: VideoObject for reels / production-house case studies. */
export function videoSchema(input: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate?: string;
  duration?: string; // ISO 8601, e.g. "PT1M32S"
  contentUrl?: string;
  embedUrl?: string;
}): Json {
  return {
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    thumbnailUrl: [absoluteUrl(input.thumbnailUrl)],
    uploadDate: input.uploadDate,
    duration: input.duration,
    contentUrl: input.contentUrl,
    embedUrl: input.embedUrl,
    publisher: { "@id": ORG_ID },
  };
}

/** Wrap several nodes into one @graph — one <script> per page, cleanest output. */
export function graph(...nodes: Json[]): Json {
  return { "@context": "https://schema.org", "@graph": nodes };
}
