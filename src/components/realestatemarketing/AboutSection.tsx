"use client";

import React from "react";
import { GlimmerWrap } from "@/components/ui/glimmer-wrap";

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-28 bg-black relative overflow-hidden border-t border-white/5">
      {/* Glimmer Wrap - Drifting fine glints & flashing lens flares */}
      <GlimmerWrap
        className="absolute inset-0 pointer-events-none z-0"
        glintCount={120}
        speed={0.55}
        maxSize={2.4}
        flareSize={42}
        flashFrequency={0.01}
        enableParallax={true}
      />

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-amber-500/5 blur-[170px] pointer-events-none rounded-full" />

        {/* Subtle grid pattern overlay */}
        <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-[1350px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Side: Location 3D Map Pin Graphic */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[480px] group">
              {/* Backlight Ambient Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/20 via-yellow-500/10 to-blue-600/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-85 transition-opacity duration-500 -z-10" />

              {/* Glass Frame Wrapper */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-b from-[#181820]/90 to-[#0A0A0E]/95 p-3 sm:p-4 backdrop-blur-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden">
                {/* Top Subtle Amber Highlight Line */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

                {/* Inner Image Container */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 border border-white/10">
                  <img
                    src="/assets/location.webp"
                    alt="About Swastixa Digital - Real Estate Marketing Agency in Gurugram"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Heading & Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Heading */}
            <h2 className="text-white font-bold text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.2] tracking-tight mb-8">
              About Swastixa Digital, a Real Estate Marketing Agency In Gurugram
            </h2>

            {/* Content Paragraphs */}
            <div className="space-y-5 text-[#CECECE] text-[16px] sm:text-[18px] leading-[1.85]">
              <p>
                Swastixa means eternal flow in Sanskrit, and that idea shapes how we work. We study your project, your buyers and your market, then build marketing that moves smoothly from first impression to site visit.
              </p>

              <p>
                Buyers compare projects, watch walkthroughs, read reviews and ask AI assistants for advice before they call a developer. We design every campaign around that journey.
              </p>

              <p>
                Our team supports developers, builders and brokers across Delhi NCR as a real estate marketing agency in Gurgaon focused on predictable enquiries, not scattered campaigns.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}