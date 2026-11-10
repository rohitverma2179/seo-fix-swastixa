// src/components/common/SiteFooter.tsx
// The site currently has no crawlable link block: the header menu items are
// <button onClick={navigate()}> and the footer only links to /privacy-policy.
// That leaves /awards, /real-estate-marketing-agency-in-gurugram,
// /work/digital-marketing and /work/website-development effectively orphaned.
// A single sitewide footer fixes internal linking for every page at once.

import Link from "next/link";

const columns = [
  {
    title: "Services",
    links: [
      { label: "SEO Agency", href: "/services/seo-agency" },
      { label: "Performance Marketing", href: "/services/performance-marketing" },
      { label: "Social Media Marketing", href: "/services/social-media-marketing" },
      { label: "Website Development", href: "/services/website-development" },
      { label: "Video Production House", href: "/services/video-production-house" },
      { label: "Content Marketing", href: "/services/content-marketing" },
      { label: "Influencer Marketing", href: "/services/influencer-marketing" },
      { label: "Packaging Design", href: "/services/packaging-design" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "All Work", href: "/work" },
      { label: "Reels & Short-Form Video", href: "/work/reels" },
      { label: "Branding & Identity", href: "/work/branding" },
      { label: "Social Media Management", href: "/work/social-media-management" },
      { label: "Video Production", href: "/work/video-production" },
      { label: "Digital Marketing", href: "/work/digital-marketing" },
      { label: "Website Development", href: "/work/website-development" },
      { label: "Print & Design", href: "/work/print" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Awards & Recognition", href: "/awards" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/#contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Locations",
    links: [
      {
        label: "Real Estate Marketing in Gurugram",
        href: "/real-estate-marketing-agency-in-gurugram",
      },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-black text-white/70 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {columns.map((column) => (
          <nav key={column.title} aria-labelledby={`footer-${column.title}`}>
            <h2
              id={`footer-${column.title}`}
              className="text-white text-sm uppercase tracking-[2px] mb-4"
            >
              {column.title}
            </h2>
            <ul className="space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  );
}
