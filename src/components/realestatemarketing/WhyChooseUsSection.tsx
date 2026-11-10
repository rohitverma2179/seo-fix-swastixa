"use client";

import React from "react";

const whyChooseItems = [
  {
    title: "Real estate focus",
    description:
      "As a real estate marketing agency in Gurugram, we build campaigns around launches, inventory cycles and buyer intent.",
  },
  {
    title: "One team, one message",
    description:
      "Strategy, creative, video, development and media buying work together, so your brand stays consistent.",
  },
  {
    title: "In-house production",
    description:
      "Our own team shoots and edits video, which keeps quality high and turnaround quick.",
  },
  {
    title: "Culture-aware creative",
    description:
      "Our messaging reflects how Indian families think about homes, investment and trust.",
  },
  {
    title: "Lead quality first",
    description:
      "We look beyond clicks to enquiries and site visits, and you always know what is delivering.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h2 className="text-white font-bold text-[30px] sm:text-[40px] lg:text-[48px] leading-tight">
            Why Choose Swastixa Digital as the Best Real Estate Marketing Agency
          </h2>

          <p className="mt-5 text-[#A1A1A1] text-[17px] sm:text-[19px] max-w-3xl mx-auto leading-relaxed">
            The best real estate marketing agency combines market focus, creative strength and clear reporting. Here is what you get with us:
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseItems.map((item, index) => {
            const isFullWidthOnLarge = index === 4;

            return (
              <div
                key={index}
                className={`
                  group relative rounded-[20px] border border-white/10
                  bg-gradient-to-b from-[#121215] via-[#0E0E11] to-[#0A0A0C]
                  p-8 overflow-hidden transition-all duration-300
                  hover:border-white/25 hover:-translate-y-1
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                  ${isFullWidthOnLarge ? "md:col-span-2 lg:col-span-1" : ""}
                `}
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <h3 className="text-white text-[22px] font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-[#8B8B8B] text-[15px] sm:text-[16px] leading-[1.8]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
