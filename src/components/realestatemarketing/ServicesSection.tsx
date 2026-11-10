"use client";

import React from "react";
import FlexCarousel, { DEFAULT_ITEMS } from "./FlexCarousel";

export default function ServicesSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-blue-600/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[550px] h-[450px] bg-indigo-600/10 blur-[180px] pointer-events-none rounded-full" />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="text-white font-bold text-[32px] sm:text-[44px] lg:text-[54px] leading-tight tracking-tight">
            Our Real Estate Marketing Services
          </h2>

          <p className="mt-5 text-[#A1A1A1] text-[17px] sm:text-[20px] max-w-3xl mx-auto leading-relaxed">
            As a digital marketing agency for real estate, we offer eight connected services that cover your full buyer journey.
          </p>
        </div>

        {/* GSAP 3D Interactive Carousel with the 8 Services Cards */}
        <div className="w-full relative mb-14">
          <FlexCarousel items={DEFAULT_ITEMS} />
        </div>

        {/* Mid-Section Call to Action Card */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <a
            href="https://swastixa.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-center bg-white text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-neutral-200 hover:scale-[1.02] shadow-[0_10px_35px_rgba(255,255,255,0.15)] text-base sm:text-lg max-w-3xl cursor-pointer"
          >
            Book a Free Strategy Call
          </a>
        </div>
      </div>
    </section>
  );
}