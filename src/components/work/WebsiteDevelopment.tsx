"use client";

import Link from "next/link";
import WorkHero from "./WorkHero";

// Was a stub: <div>WebsiteDevelopment</div> with no H1, no copy and no links.
const WebsiteDevelopment = () => {
  return (
    <main className="bg-black text-white min-h-screen pt-28 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Website Design &amp; Development Portfolio
        </h1>

        <p className="mt-6 max-w-3xl text-[#9BA3B4] text-base md:text-lg leading-relaxed">
          Websites Swastixa has designed and built for businesses in Gurugram and Delhi
          NCR — responsive layouts, fast Core Web Vitals, clean information architecture
          and a CMS the client can actually edit. Every build ships with schema markup,
          optimised images and analytics wired in from day one.
        </p>

        <WorkHero />

        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-semibold">What every build includes</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 text-[#9BA3B4]">
            <li>• Responsive layouts tested from 360px to 1920px</li>
            <li>• Core Web Vitals budget: LCP under 2.5s on mobile</li>
            <li>• Schema markup, sitemap and robots configured</li>
            <li>• Editable CMS sections for the marketing team</li>
            <li>• Analytics, GTM and conversion tracking</li>
            <li>• Handover documentation and a training call</li>
          </ul>
        </section>

        <p className="mt-12 text-[#9BA3B4]">
          Need a site that ranks and converts?{" "}
          <Link href="/services/website-development" className="text-[#3A6CF4] underline">
            See our website development services
          </Link>{" "}
          or{" "}
          <Link href="/work" className="text-[#3A6CF4] underline">
            browse all our work
          </Link>
          .
        </p>
      </div>
    </main>
  );
};

export default WebsiteDevelopment;
