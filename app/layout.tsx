// app/layout.tsx  —  full replacement (metadata section is what changes)
import "../src/index.css";
import "../src/App.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";
import Script from "next/script";
import localFont from "next/font/local";
import JsonLd from "@/components/seo/JsonLd";
import SiteFooter from "@/components/common/SiteFooter";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL, SITE_NAME, TITLE_TEMPLATE, DEFAULT_OG_IMAGE } from "@/lib/site";

const rajdhani = localFont({
  src: "../public/fonts/Rajdhani-Variable.woff2",
  variable: "--font-rajdhani",
  display: "swap",
});

const chakraPetch = localFont({
  src: [
    { path: "../public/chakra-petch/ChakraPetch-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/chakra-petch/ChakraPetch-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/chakra-petch/ChakraPetch-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/chakra-petch/ChakraPetch-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/chakra-petch/ChakraPetch-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-chakra-petch",
  display: "swap",
});

export const metadata: Metadata = {
  // Makes every relative URL below (canonical, OG image, icons) absolute.
  metadataBase: new URL(SITE_URL),

  // Child pages export a *bare* title; this template adds the brand once.
  title: {
    default: "Digital Marketing & Creative Agency in Gurugram | Swastixa",
    template: TITLE_TEMPLATE,
  },
  description:
    "Swastixa Digital is a full-service digital marketing and creative agency in Gurugram — SEO, performance marketing, social media, video production, influencer marketing and website development for brands across India.",

  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: `${SITE_URL}/about` }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Digital Marketing Agency",

  // Do NOT set `alternates.canonical` here — a global canonical points every
  // page at the homepage. Each page sets its own (see src/lib/seo.ts).
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    google: "u8G2NTtI02IiQp7w34E1yWd1SKg6KRAmcu0CJAc0qXs",
  },

  icons: {
    icon: [
      { url: "/swastixa_32X32.png", sizes: "32x32", type: "image/png" },
      { url: "/swastixa_192X192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/swastixa_180X180.png", sizes: "180x180" }],
  },

  manifest: "/site.webmanifest",

  // Default social card for every page that does not override it.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: SITE_URL,
    title: "Digital Marketing & Creative Agency in Gurugram | Swastixa",
    description:
      "SEO, performance marketing, social media, video production and web development for brands that want measurable growth.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Swastixa Digital — digital marketing and creative agency in Gurugram",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing & Creative Agency in Gurugram | Swastixa",
    description:
      "SEO, performance marketing, social media, video production and web development for brands that want measurable growth.",
    images: [DEFAULT_OG_IMAGE],
  },

  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${rajdhani.variable} ${chakraPetch.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* One @graph instead of scattered <script> tags. Organization + WebSite
            are site-wide; page-level nodes are added inside each page. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />

        <Providers>
          {children}
          <SiteFooter />
        </Providers>

        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PM5LV7QM');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PM5LV7QM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      </body>
    </html>
  );
}
