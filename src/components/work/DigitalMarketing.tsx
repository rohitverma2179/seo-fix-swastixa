"use client";

import React from 'react'
import WorkHero from './WorkHero'

const DigitalMarketing = () => {
  return (
    <main className="bg-black text-white min-h-screen pt-28 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Digital Marketing Campaign Portfolio
        </h1>
        <p className="mt-6 max-w-3xl text-[#9BA3B4] text-base md:text-lg leading-relaxed">
          Paid search, Meta ads, landing pages and reporting work by Swastixa for real
          estate, D2C and B2B clients. Each campaign below was built around a cost per
          qualified lead target, not impressions.
        </p>
        <WorkHero />
        <p className="mt-12 text-[#9BA3B4]">
          Want the same for your business? See our{" "}
          <a href="/services/performance-marketing" className="text-[#3A6CF4] underline">
            performance marketing services
          </a>{" "}
          or{" "}
          <a href="/work" className="text-[#3A6CF4] underline">
            browse all our work
          </a>
          .
        </p>
      </div>
    </main>
  )
}

export default DigitalMarketing
