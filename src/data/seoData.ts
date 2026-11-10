// src/data/seoData.ts
// Titles are BARE (no brand suffix) — app/layout.tsx adds " | Swastixa" via title.template.
// Base titles <= 50 chars, descriptions 140-155 chars. Source of truth for src/lib/seo.ts.

export const seoData: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Digital Marketing & Creative Agency in Gurugram",
    description:
      "Swastixa Digital is a Gurugram digital marketing and creative agency delivering SEO, performance ads, social media and video for brands across India.",
  },
  "/about": {
    title: "About Swastixa — Culture-Led Creative Agency",
    description:
      "Meet Swastixa Digital — a Gurugram creative and digital marketing agency building brands on culture, strategy and measurable performance. See our story.",
  },
  "/services": {
    title: "Digital Marketing Services for Growing Brands",
    description:
      "Explore Swastixa's digital marketing services — SEO, performance marketing, social media, video production, influencer marketing and web development.",
  },
  "/services/seo-agency": {
    title: "SEO Agency in Gurugram — Technical & Local SEO",
    description:
      "Hire an SEO agency in Gurugram that fixes technical issues, wins local rankings and grows organic revenue. See our audits, process and results.",
  },
  "/services/performance-marketing": {
    title: "Performance Marketing Agency — Google & Meta Ads",
    description:
      "Performance marketing built around CAC, not impressions. Google and Meta campaigns, landing pages and clear reporting from Swastixa in Gurugram.",
  },
  "/services/website-development": {
    title: "Website Development Company in Gurugram",
    description:
      "Swastixa builds fast, SEO-ready Next.js and WordPress websites for Indian brands — from design to launch, with Core Web Vitals in mind every time.",
  },
  "/services/social-media-marketing": {
    title: "Social Media Marketing Agency in Gurugram",
    description:
      "Grow your brand with Swastixa's social media marketing in Gurugram — strategy, content, community management and paid social that converts consistently.",
  },
  "/services/video-production-house": {
    title: "Video Production House in Gurugram — Ads & Films",
    description:
      "Swastixa is a video production house in Gurugram producing commercials, brand films, reels and product videos — from script to final cut in India.",
  },
  "/services/content-marketing": {
    title: "Content Marketing Agency — Strategy to Production",
    description:
      "Content marketing that earns rankings and trust — strategy, editorial calendars, blogs, video scripts and distribution by Swastixa Digital in India.",
  },
  "/services/influencer-marketing": {
    title: "Influencer Marketing Agency for Indian Brands",
    description:
      "Swastixa's influencer marketing agency connects Indian brands with creators who actually convert — sourcing, briefing, contracts and reporting.",
  },
  "/services/packaging-design": {
    title: "Packaging Design Agency — D2C & Retail",
    description:
      "Packaging design for D2C and retail brands — structure, artwork, print-ready files and shelf tests by Swastixa's design team. See the packs.",
  },
  "/real-estate-marketing-agency-in-gurugram": {
    title: "Real Estate Marketing Agency in Gurugram",
    description:
      "Swastixa is a real estate marketing agency in Gurugram building qualified buyer pipelines for developers and brokers — RERA-safe creative and ads.",
  },
  "/work": {
    title: "Our Work — Digital Marketing & Creative Portfolio",
    description:
      "Browse Swastixa's work — branding, performance campaigns, reels, social media management, print and website development. See the real results.",
  },
  "/work/reels": {
    title: "Reels & Short-Form Video Portfolio",
    description:
      "Reels and short-form video work by Swastixa — vertical edits, hooks and captions built for Instagram, YouTube Shorts and Meta ads. Watch the reels.",
  },
  "/work/branding": {
    title: "Branding & Identity Design Portfolio",
    description:
      "Branding and identity work by Swastixa — naming, logo systems, brand guidelines and packaging for D2C, real estate and service brands. See the work.",
  },
  "/work/print": {
    title: "Print & Packaging Design Portfolio",
    description:
      "Print and packaging design work by Swastixa — brochures, outdoor, retail collateral and packaging for brands across Delhi NCR. Browse the gallery.",
  },
  "/work/digital-marketing": {
    title: "Digital Marketing Campaign Portfolio",
    description:
      "Digital marketing campaign work by Swastixa — paid search, Meta ads, funnels and reporting for real estate, D2C and B2B clients. See the numbers.",
  },
  "/work/website-development": {
    title: "Website Design & Development Portfolio",
    description:
      "Website design and development work by Swastixa — responsive, fast-loading builds on Next.js, WordPress and Shopify. See the live builds today.",
  },
  "/work/social-media-management": {
    title: "Social Media Management Portfolio",
    description:
      "Explore Swastixa's social media management portfolio: content calendars, community building and paid campaigns that grew real brand accounts.",
  },
  "/work/video-production": {
    title: "Video Production Portfolio — Ads, Films & Reels",
    description:
      "See Swastixa's video production portfolio — commercial films, brand videos, reels and product shoots made for Indian brands that need real attention.",
  },
  "/work/video-production/films": {
    title: "Commercial Films & Brand Video Work",
    description:
      "Commercial films and brand video work by Swastixa — launch films, founder stories and product films shot across Delhi NCR. Watch the brand films.",
  },
  "/work/video-production/construction": {
    title: "Construction & Industrial Video Production Work",
    description:
      "Construction and industrial video production by Swastixa — site films, project walkthroughs and drone footage for developers. See the films.",
  },
  "/awards": {
    title: "Awards & Recognition for Digital Marketing Work",
    description:
      "Awards and recognition earned by Swastixa Digital for digital marketing, creative campaigns and video production work across India. See them all.",
  },
  "/careers": {
    title: "Digital Marketing Jobs & Internships in Gurugram",
    description:
      "Explore digital marketing jobs and internships at Swastixa in Gurugram — content, design, performance marketing, video and web development roles.",
  },
  "/blog": {
    title: "Digital Marketing Blog — SEO, Ads & Social Guides",
    description:
      "Practical guides on SEO, Google and Meta ads, social media, content and web development, written by the Swastixa Digital team in Gurugram. No fluff.",
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description:
      "Read Swastixa Digital's privacy policy to understand what data we collect, why we collect it, how long we keep it and how you can request changes.",
  },
};
