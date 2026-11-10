"use client";

import Link from "next/link";

// The old version rendered an empty <main>: InnerPageHeader, WorkHero and
// VirtualVideoList were all commented out, so /work had no H1, no copy and no
// links while still being in the nav and the sitemap. This is a crawlable index.

const workLinks = [
  {
    href: "/work/reels",
    title: "Reels & Short-Form Video",
    copy: "Vertical edits, hooks and captions built for Instagram, YouTube Shorts and Meta ads.",
  },
  {
    href: "/work/social-media-management",
    title: "Social Media Management",
    copy: "Content calendars, community building and paid social for brands that post every week.",
  },
  {
    href: "/work/branding",
    title: "Branding & Identity",
    copy: "Naming, logo systems, brand guidelines and packaging for D2C and real estate brands.",
  },
  {
    href: "/work/video-production",
    title: "Video Production",
    copy: "Commercial films, brand films and product videos shot in-house across Delhi NCR.",
  },
  {
    href: "/work/digital-marketing",
    title: "Digital Marketing",
    copy: "Paid search, Meta ads, funnels and reporting for real estate, D2C and B2B clients.",
  },
  {
    href: "/work/website-development",
    title: "Website Development",
    copy: "Responsive, fast-loading builds on Next.js, WordPress and Shopify.",
  },
  {
    href: "/work/print",
    title: "Print & Packaging",
    copy: "Brochures, outdoor, retail collateral and packaging artwork, print-ready.",
  },
  {
    href: "/services",
    title: "All Services",
    copy: "SEO, performance marketing, social, video, influencer marketing and web development.",
  },
];

export default function Work() {
  return (
    <main className="bg-black text-white min-h-screen pt-28 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Our Work — Digital Marketing &amp; Creative Portfolio
        </h1>

        <p className="mt-6 max-w-3xl text-[#9BA3B4] text-base md:text-lg leading-relaxed">
          A selection of the campaigns, films, reels, brands and websites Swastixa has
          built for clients across Gurugram, Delhi NCR and India. Every project below
          started with a business problem — more qualified leads, a stronger brand, or
          content that actually gets watched — and ended with work you can measure.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block h-full rounded-xl border border-white/12 p-6 transition-colors hover:border-white/40 hover:bg-white/5"
              >
                <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#9BA3B4]">{item.copy}</p>
                <span className="mt-4 inline-block text-sm text-[#3A6CF4]">
                  View work →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
