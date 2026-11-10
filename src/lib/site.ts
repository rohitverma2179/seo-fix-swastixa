// src/lib/site.ts
// Single source of truth for every SEO-related constant.
// Every other SEO file imports from here — never hardcode the domain again.

export const SITE_URL = "https://swastixa.com";
export const SITE_NAME = "Swastixa Digital";
export const BRAND = "Swastixa";

/** Title template used by the root layout: "<page title> | Swastixa" */
export const TITLE_TEMPLATE = `%s | ${BRAND}`;

/** 1200x630 social card. MUST be uploaded to /public/og/swastixa-og-default.jpg */
export const DEFAULT_OG_IMAGE = "/og/swastixa-og-default.jpg";
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const LOGO_PATH = "/swastixa_192X192.png";
export const EMAIL = "hello@swastixa.com";

/** Keep in sync with the Google Business Profile — NAP must match exactly. */
export const ORG_ADDRESS = {
  streetAddress: "TODO: full street address, e.g. 4th Floor, Tower B, Cyber Park",
  addressLocality: "Gurugram",
  addressRegion: "Haryana",
  postalCode: "TODO: 122002",
  addressCountry: "IN",
};

/** Copy the exact coordinates from Google Maps (right-click -> copy lat/lng). */
export const ORG_GEO = {
  latitude: "TODO: 28.4595",
  longitude: "TODO: 77.0266",
};

export const ORG_PHONE = "TODO: +91-XXXXXXXXXX";

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/share/1BavrtTDFV/",
  "https://www.instagram.com/swastixadigital",
  "https://www.linkedin.com/company/swastixa/",
  "https://youtube.com/@swastixadigital",
];

export const AREA_SERVED = [
  "Gurugram",
  "Delhi",
  "Noida",
  "Faridabad",
  "Delhi NCR",
  "India",
];

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
