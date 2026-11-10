"use client";

import React from "react";
import CursorGrid from "./CursorGrid";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen pt-24 pb-16 overflow-hidden flex items-center justify-center bg-black">
      {/* Background Cursor Grid */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <CursorGrid
          cellSize={70}
          color="#ffffff"
          highlight="area"
          gridStyle="lines"
          radius={100}
          holdTime={150}
          fadeDuration={800}
          fillOpacity={0.06}
          gridOpacity={0.08}
          spotlight={0.6}
          clickPulse
          className="w-full h-full"
        />
      </div>


      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full z-0" />

      <div className="max-w-[1300px] mx-auto w-full px-6 md:px-12 lg:px-20 relative z-10">
        {/* Main Heading */}
        <div className="text-center max-w-5xl mx-auto mb-8">
          <h1 className="text-white font-bold leading-[1.1] text-[34px] sm:text-[46px] md:text-[58px] lg:text-[70px] tracking-tight">
            Real Estate Marketing Agency In Gurugram for Developers, Builders
            and Brokers
          </h1>
          <p className="mt-6 text-[#CECECE] text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Strategy, content, video, search and performance marketing for
            property launches, delivered by one team.
          </p>
        </div>

        {/* CTA Link from content */}
        <div className="text-center mb-12 sm:mb-24">
          <a
            href="https://swastixa.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-center bg-white text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-neutral-200 hover:scale-[1.02] shadow-[0_10px_35px_rgba(255,255,255,0.15)] text-base sm:text-lg max-w-2xl"
          >
            Book a Free Strategy Call
          </a>
        </div>
      </div>
    </section>
  );
}
