"use client";
import React from "react";

export default function HeroSecond() {
  const marqueeBrands = [
    "DLF Homes",
    "Emaar India",
    "M3M",
    "Signature Global",
  ];

  const pillars = [
    {
      num: "01",
      title: "Strategy",
      tagline: "Real Estate Digital Marketing",
      accent: "from-blue-500/20 to-blue-500/5",
    },
    {
      num: "02",
      title: "Create",
      tagline: "Leads for Your Projects",
      accent: "from-indigo-500/20 to-indigo-500/5",
    },
    {
      num: "03",
      title: "Market",
      tagline: "Build Trusted Brands",
      accent: "from-sky-500/20 to-sky-500/5",
    },
    {
      num: "04",
      title: "Grow",
      tagline: "More Qualified Buyer Leads",
      accent: "from-emerald-500/20 to-emerald-500/5",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-black relative overflow-hidden border-t border-white/5">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 blur-[170px] pointer-events-none rounded-full" />
      <div className="absolute bottom-12 right-12 w-[450px] h-[450px] bg-indigo-600/10 blur-[160px] pointer-events-none rounded-full" />

      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-[1350px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
          

            {/* Heading */}
            <h2 className="text-white font-bold text-[32px] sm:text-[42px] lg:text-[50px] leading-[1.18] tracking-tight">
              Driving Qualified Buyer Leads &amp; Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white">
                Trusted Project Brands
              </span>
            </h2>

            {/* First Paragraph */}
            <p className="mt-6 text-[#D4D4D8] text-[17px] sm:text-[19px] leading-[1.8] font-normal">
              <strong className="text-white font-semibold">Swastixa Digital</strong> is a Gurugram-based digital marketing agency for real estate that helps developers, builders and brokers generate qualified buyer leads and build trusted project brands.
            </p>

            {/* Second Paragraph */}
            <p className="mt-4 text-[#A1A1AA] text-[16px] sm:text-[18px] leading-[1.8]">
              As a real estate marketing agency in Gurugram, we bring strategy, content marketing, video production, website development, search optimization and performance marketing together in one team.
            </p>

            {/* 4 Pillars Grid mirroring the Graphic */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-8 mb-8">
              {pillars.map((item) => (
                <div
                  key={item.num}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="text-xs uppercase font-semibold text-blue-400 tracking-wider">
                    {item.num}. {item.title}
                  </div>
                  <div className="text-[13px] font-medium text-white/90 mt-1 leading-snug">
                    {item.tagline}
                  </div>
                </div>
              ))}
            </div>

            {/* Marquee Brands Bar */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-xs sm:text-sm text-[#9CA3AF] font-medium mb-3">
                We have worked with premier industry leaders:
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {marqueeBrands.map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-white text-xs sm:text-sm font-semibold tracking-wide hover:border-white/20 transition-colors"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://swastixa.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-black font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:bg-neutral-200 hover:scale-[1.02] shadow-[0_8px_25px_rgba(255,255,255,0.12)] text-sm sm:text-base cursor-pointer"
              >
                Book a Free Strategy Call
              </a>
              
            </div>
          </div>

          {/* Right Column: High-End Graphic Frame for social.webp */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[520px] group">
              {/* Backlight Glow Behind Card */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/25 via-indigo-500/20 to-sky-400/25 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Glass Frame Wrapper */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-b from-[#181820]/90 to-[#0A0A0E]/95 p-3 sm:p-4 backdrop-blur-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden">
                {/* Top Subtle Neon Edge Line */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

                {/* Inner Image Container */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 border border-white/10">
                  <img
                    src="/assets/social.webp"
                    alt="Swastixa Digital Real Estate Strategy, Create, Market, Grow - DLF, Emaar, M3M, Signature Global"
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

               
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}