"use client";

import React from "react";

// const realEstateLogos = [
//   {
//     name: "DLF Homes",
//     url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/dlf-logo.png",
//   },
//   {
//     name: "Emaar India",
//     url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/emaar-logo.png",
//   },
//   {
//     name: "M3M",
//     url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/mthreem-logo.png",
//   },
//   {
//     name: "Signature Global",
//     url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/signature-global-logo.png",
//   },
//   {
//     name: "Ganga Realty",
//     url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/ganga-logo.png",
//   },
//   {
//     name: "Trehan Iris",
//     url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/iris-logo.png",
//   },
// ];



const realEstateLogos = [
  {
    url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/dlf-logo.png",
    alt: "dlf-logo",
  },
  {
    url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/emaar-logo.png",
    alt: "Munchon",
  },
  {
    url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/mthreem-logo.png",
    alt: "Munchon",
  },
  // m3m

  {
    url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/mrg-logo.png",
    alt: "Munchon",
  },
  {
    url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/signature-global-logo.png",
    alt: "Signature Global",
    // link: "https://signatureglobal.in" 
  },
  {
    url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/ganga-logo.png",
    alt: "Munchon",
  },
  {
    url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/aarize-logo.png",
    alt: "Mahagun",
    // link: "https://mahagunindia.com"
  },

  {
    url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/smart-world-logo.png",
    alt: "Munchon",
  },
  
  {
    url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/sare-logo.png",
    alt: "Munchon",
  },
 
  {
    url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/grace-aesthetic-logo.png",
    alt: "Munchon",
  },
  {
    url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/ishaadrii-logo.png",
    alt: "Munchon",
  },
  // {
  //   url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/swadeshi-logo.png",
  //   alt: "Munchon",
  // },
  // {
  //   url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/washguys-logo.png",
  //   alt: "Munchon",
  // },
  // {
  //   url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/kloy-logo.png",
  //   alt: "Munchon",
  // },
  {
    url: "https://cdn.swastixa.com/swastixadigital/swastixa-clients-logos/one-group-logo.png",
    alt: "Munchon",
  },


];


export default function ClientsSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[400px] bg-blue-600/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-white font-bold text-[30px] sm:text-[40px] lg:text-[48px] leading-tight mb-8">
            Clients We&apos;ve Worked With
          </h2>

          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-[#CECECE] text-[16px] sm:text-[18px] leading-[1.85]">
              Swastixa Digital has worked with leading names in Indian real estate, including DLF Homes, Emaar India, M3M, Bharti Real Estate, Ganga Realty, Signature Global and Trehan Iris.
            </p>

            <p className="text-[#A1A1A1] text-[15px] sm:text-[17px] leading-[1.85]">
              Each brand has its own audience and goals, and our team adapts to match. Developers comparing the best real estate marketing agency options often start with client work, which is why we name the brands we have worked with. That experience shapes how we serve every new client as a real estate marketing agency in Gurgaon.
            </p>
          </div>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {realEstateLogos.map((client, idx) => (
            <div
              key={idx}
              className="
                group relative h-32 rounded-2xl border border-white/10
                bg-gradient-to-b from-[#141418] to-[#0A0A0D]
                p-5 flex flex-col items-center justify-center
                hover:border-white/30 transition-all duration-300
                shadow-[0_10px_30px_rgba(0,0,0,0.5)]
              "
            >
              <img
                src={client.url}
                alt={client.alt || (client as any).name || "client-logo"}
                loading="lazy"
                className="max-h-14 w-auto max-w-[85%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
