"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Megaphone,
  FileText,
  Video,
  Search,
  Bot,
  Globe,
  Share2,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ServiceItem {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tagline: string;
  description: string;
}

export const services: ServiceItem[] = [
  {
    number: "01",
    icon: Megaphone,
    title: "Digital Marketing",
    tagline: "Omnichannel Launch Campaigns",
    description:
      "Our digital marketing services give your project a complete online presence, from first impression to enquiry. We plan campaigns around each launch phase, keep messaging consistent across channels and report on what drives site visits. We also align messaging with your sales team. Planning, creative and media sit with one team, which keeps decisions fast and every channel working toward more qualified buyers.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Content Marketing",
    tagline: "Buyer Trust & Project Clarity",
    description:
      "Content marketing builds trust before a buyer ever calls your sales team. As a real estate marketing agency in Gurgaon, we create project pages, brochures, blogs, location guides and investor explainers that answer real buyer questions in clear language. Strong content also feeds search and AI engines, so your project is easy to find when families research neighbourhoods, builders, prices and possession timelines.",
  },
  {
    number: "03",
    icon: Video,
    title: "Video Production",
    tagline: "Project Films, Drone & Walkthroughs",
    description:
      "Buyers want to see a home before they visit it, and video is the fastest way to show it. Our in-house team produces project films, walkthroughs, aerial footage, amenity reels and launch videos made for YouTube, Instagram and paid ads. Every video shows scale, location and lifestyle honestly, helping serious buyers shortlist your project and book a site visit with confidence.",
  },
  {
    number: "04",
    icon: Search,
    title: "SEO Services",
    tagline: "High-Intent Google Search Visibility",
    description:
      "SEO, or search engine optimization, helps your project appear when buyers search on Google. Good SEO is a core strength of any digital marketing agency for real estate. We optimise project pages, local listings, site structure and technical health, then build content around searches for location, budget and configuration. Steady SEO also reduces your dependence on paid leads over time and keeps working after a campaign ends.",
  },
  {
    number: "05",
    icon: Bot,
    title: "AEO and GEO Services",
    tagline: "Answer & Generative AI Optimization",
    description:
      "AEO, or Answer Engine Optimization, structures your content so search engines can lift it as a direct answer. GEO, or Generative Engine Optimization, helps AI tools such as ChatGPT and Gemini understand and mention your brand. Together they place your project where buyers now ask questions, supported by clear facts, structured data and consistent brand information that keeps AI answers about your project accurate.",
  },
  {
    number: "06",
    icon: Globe,
    title: "Website Development",
    tagline: "Fast & High-Converting Property Sites",
    description:
      "Your website is where every campaign lands, so it must load fast and convert visitors into enquiries. Our real estate lead generation agency in Gurgaon builds mobile-friendly project websites and landing pages with clear floor plans, location maps, enquiry forms and WhatsApp-ready calls to action, so buyers can reach your sales team quickly. Each page is built for search visibility, speed and easy tracking of every enquiry.",
  },
  {
    number: "07",
    icon: Share2,
    title: "Social Media Marketing",
    tagline: "Community Reach & Continuous Trust",
    description:
      "Social media keeps your project visible between launches and site visits. Swastixa Digital, a real estate marketing agency in Gurugram, manages content calendars, reels, community engagement and paid social across Instagram, Facebook, LinkedIn and YouTube. Our approach keeps your brand voice consistent across every post and gives buyers and channel partners a steady reason to follow, trust and engage with your updates.",
  },
  {
    number: "08",
    icon: TrendingUp,
    title: "Performance Marketing",
    tagline: "Google, Meta & YouTube ROI Tracking",
    description:
      "Performance marketing focuses on measurable outcomes. We run Google, Meta and YouTube campaigns with tight audience targeting, tested creatives and full conversion tracking, so every rupee of your ad budget is accountable. As a real estate lead generation agency in Gurgaon, we judge success by qualified enquiries and site visits, and we move budgets toward whatever the data shows is working as campaigns run.",
  },
];

export const DEFAULT_ITEMS = services;

interface FlexCarouselProps {
  items?: ServiceItem[];
  [key: string]: unknown;
}

export default function FlexCarousel({ items = services }: FlexCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastDeltaXRef = useRef(0);

  const total = items.length;

  // Ultra-optimized hardware-accelerated card positioning
  const renderCards = useCallback(
    (index: number, animate = true) => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const isTablet =
        typeof window !== "undefined" &&
        window.innerWidth >= 768 &&
        window.innerWidth < 1024;

      const spacing = isMobile ? 300 : isTablet ? 370 : 430;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        // Circular relative distance (-total/2 to +total/2)
        let diff = (i - index) % total;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;

        const absDiff = Math.abs(diff);

        // Completely hide far-away cards to eliminate GPU and composition overhead
        if (absDiff > 2) {
          gsap.set(card, {
            display: "none",
            autoAlpha: 0,
          });
          return;
        }

        // Visible cards configuration
        let x = diff * spacing;
        let y = 0;
        let z = 0;
        let rotateY = 0;
        let scale = 1;
        let opacity = 1;
        let zIndex = 10;

        if (diff === 0) {
          // Center active card
          x = 0;
          y = 0;
          z = isMobile ? 15 : 40;
          rotateY = 0;
          scale = 1;
          opacity = 1;
          zIndex = 40;
        } else if (absDiff === 1) {
          // Immediate neighbors
          x = diff * spacing;
          y = 0;
          z = isMobile ? -30 : -60;
          rotateY = isMobile ? diff * -6 : diff * -12;
          scale = isMobile ? 0.91 : 0.93;
          opacity = isMobile ? 0.5 : 0.75;
          zIndex = 30;
        } else if (absDiff === 2) {
          // Secondary outer cards
          x = diff * (spacing * 0.94);
          y = 0;
          z = -140;
          rotateY = diff * -20;
          scale = 0.84;
          opacity = isMobile ? 0 : 0.35;
          zIndex = 20;
        }

        const targetStyles = {
          display: "flex",
          x,
          y,
          z,
          rotateY,
          scale,
          autoAlpha: opacity,
          force3D: true,
          backfaceVisibility: "hidden",
        };

        if (animate) {
          gsap.to(card, {
            ...targetStyles,
            duration: 0.42,
            ease: "power2.out",
            overwrite: "auto",
            onStart: () => {
              card.style.zIndex = String(zIndex);
              card.style.pointerEvents = diff === 0 ? "auto" : "auto";
            },
          });
        } else {
          gsap.set(card, targetStyles);
          card.style.zIndex = String(zIndex);
          card.style.pointerEvents = "auto";
        }
      });
    },
    [total]
  );

  const goTo = useCallback(
    (nextIdx: number) => {
      const normalized = (nextIdx + total) % total;
      activeIndexRef.current = normalized;
      setActiveIndex(normalized);
      renderCards(normalized, true);
    },
    [total, renderCards]
  );

  const handlePrev = useCallback(() => {
    goTo(activeIndexRef.current - 1);
  }, [goTo]);

  const handleNext = useCallback(() => {
    goTo(activeIndexRef.current + 1);
  }, [goTo]);

  // Initial setup & Entrance animation (Runs strictly ONCE on mount)
  useEffect(() => {
    renderCards(0, false);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        {
          y: 40,
          autoAlpha: 0,
          scale: 0.9,
        },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
          },
          onComplete: () => {
            renderCards(activeIndexRef.current, false);
          },
        }
      );
    }, container);

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        renderCards(activeIndexRef.current, false);
      }, 100);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      ctx.revert();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [renderCards]);

  // Touch and pointer drag without scroll interference
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    lastDeltaXRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    // If user is scrolling vertically, do not treat as horizontal drag
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
      isDraggingRef.current = false;
      return;
    }

    lastDeltaXRef.current = dx;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const delta = lastDeltaXRef.current;
    if (delta < -40) {
      handleNext();
    } else if (delta > 40) {
      handlePrev();
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="w-full relative flex flex-col items-center select-none outline-none focus:outline-none"
    >
      {/* 3D Stage & Floating Side Navigation Buttons */}
      <div className="w-full relative flex items-center justify-center">
        {/* Left Floating Navigation Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous Service"
          className="absolute -left-1 sm:-left-3 lg:-left-6 top-[38%] -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/15 bg-[#121218]/90 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
        </button>

        {/* 3D Perspective Stage - NO wheel listener to keep native Lenis scroll 100% smooth */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full h-[510px] sm:h-[550px] lg:h-[580px] relative flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible touch-pan-y"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
        {items.map((service, index) => {
          const IconComponent = service.icon;
          const isActive = index === activeIndex;

          return (
            <div
              key={service.number}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => {
                if (!isActive) goTo(index);
              }}
              className={`
                absolute w-[86vw] max-w-[340px] sm:max-w-[410px] lg:max-w-[450px]
                h-[450px] sm:h-[480px] lg:h-[500px]
                rounded-[28px] p-6 sm:p-8
                flex flex-col justify-between
                transition-colors duration-300
                ${
                  isActive
                    ? "border-2 border-white/40 bg-gradient-to-b from-[#1A1A22] via-[#121217] to-[#0A0A0D] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(255,255,255,0.06)]"
                    : "border border-white/10 bg-gradient-to-b from-[#141418] via-[#0E0E12] to-[#08080A] hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
                }
              `}
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              {/* Active Card Subtle Top Highlight */}
              {isActive && (
                <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
              )}

              {/* Card Header: Icon + Number & Arrow */}
              <div className="relative z-10 flex items-center justify-between">
                {/* Icon Badge */}
                <div
                  className={`
                    w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center
                    transition-colors duration-300
                    ${
                      isActive
                        ? "bg-white/10 border border-white/30 text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                        : "bg-white/[0.04] border border-white/10 text-white/60"
                    }
                  `}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
                </div>

                {/* Number & Arrow Indicator */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-white/40 text-base sm:text-lg font-semibold tracking-wider">
                    {service.number}
                  </span>
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300
                      ${
                        isActive
                          ? "border-white/30 bg-white/10 text-white"
                          : "border-white/10 bg-white/[0.03] text-white/40"
                      }
                    `}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Card Middle: Title & Description */}
              <div className="relative z-10 my-auto pt-3">
                {/* Service Title */}
                <h3 className="text-white font-bold text-2xl sm:text-[26px] leading-tight tracking-tight mb-2.5">
                  {service.title}
                </h3>

                {/* Title underline accent */}
                <div className="w-10 h-[1.5px] bg-white/25 rounded-full mb-3.5" />

                {/* Description */}
                <p className="text-[#A1A1AA] text-sm sm:text-[15px] leading-relaxed line-clamp-5">
                  {service.description}
                </p>
              </div>

              {/* Card Bottom: Status Bar */}
              <div className="relative z-10 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-white/80 animate-pulse" : "bg-white/20"
                    }`}
                  />
                  {isActive ? "Currently Viewing" : "Click to View"}
                </span>

                <span className="font-mono text-[11px] text-white/40">
                  {service.number} / 08
                </span>
              </div>
            </div>
          );
        })}
      </div>

        {/* Right Floating Navigation Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next Service"
          className="absolute -right-1 sm:-right-3 lg:-right-6 top-[38%] -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/15 bg-[#121218]/90 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
        </button>
      </div>

      {/* Bottom Status / Pagination Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-2xl px-4 z-20">
        {/* Left: Current Active Title & Step */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold font-mono text-white">
            {items[activeIndex]?.number || "01"}
          </span>
          <div className="h-4 w-[1px] bg-white/20" />
          <span className="text-sm font-semibold text-[#CECECE]">
            {items[activeIndex]?.title}
          </span>
        </div>

        {/* Right: Pagination Dots */}
        <div className="flex items-center gap-2">
          {items.map((item, idx) => (
            <button
              key={item.number}
              onClick={() => goTo(idx)}
              aria-label={`Go to ${item.title}`}
              className={`
                h-2 rounded-full transition-all duration-300 cursor-pointer
                ${
                  idx === activeIndex
                    ? "w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}