"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OptimizedVideo from "@/components/common/OptimizedVideo";

gsap.registerPlugin(ScrollTrigger);

// const cardImages = [
//   {
//     src: "https://cdn.swastixa.com/swastixaservice/service-web-page-images/three-dlf-work.jpeg",
//     alt: "theres-work-and-play-1",
//   },
//   {
//     src: "https://cdn.swastixa.com/swastixaservice/service-page-social-media-marketing/swastixa-service-social-media-marketing-mmm.webp",
//     alt: "theres-work-and-play-2",
//   },
//   {
//     src: "https://cdn.swastixa.com/swastixaservice/service-page-social-media-marketing/swastixa-service-social-media-marketing-mrg.webp",
//     alt: "theres-work-and-play-3",
//   },
//   {
//     src: "https://cdn.swastixa.com/swastixaservice/service-all-eight-pages-images/swastixa-service-video-production.webp",
//     alt: "theres-work-and-play-4",
//   },
//   {
//     src: "https://cdn.swastixa.com/swastixaservice/service-web-page-images/elan-hero-design.png",
//     alt: "theres-work-and-play-5",
//   },
// ];

export default function StrategyCallSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const floatingTweensRef = useRef<gsap.core.Tween[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet Animation
    mm.add("(min-width: 768px)", () => {
      // 1. Initial State: Stacked together at bottom
      gsap.set(cards, {
        x: 0,
        y: 120,
        z: 0,
        rotate: 0,
        rotateY: 0,
        rotateX: 10,
        scale: 0.7,
        opacity: 0,
        transformOrigin: "bottom center",
      });

      // 2. Entrance & Fan-out on ScrollTrigger
      const fanTargets = [
        { x: -360, y: 35, rotate: -18, rotateY: -16, z: -30 },
        { x: -180, y: 10, rotate: -8, rotateY: -8, z: -10 },
        { x: 0, y: 0, rotate: 0, rotateY: 0, z: 10 },
        { x: 180, y: 10, rotate: 8, rotateY: 8, z: -10 },
        { x: 360, y: 35, rotate: 18, rotateY: 16, z: -30 },
      ];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          end: "bottom 85%",
          toggleActions: "play none none reverse",
        },
      });

      cards.forEach((card, i) => {
        const target = fanTargets[i] || { x: 0, y: 0, rotate: 0, rotateY: 0, z: 0 };
        tl.to(
          card,
          {
            x: target.x,
            y: target.y,
            z: target.z,
            rotate: target.rotate,
            rotateY: target.rotateY,
            rotateX: 0,
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
          },
          i * 0.1
        );
      });

      // 3. Gentle Floating / Bobbing Idle Animation
      cards.forEach((card, i) => {
        const tween = gsap.to(card, {
          y: `+=${12 + (i % 2) * 6}`,
          rotate: `+=${(i % 2 === 0 ? 1 : -1) * 1.5}`,
          duration: 3 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.2 + i * 0.15,
        });
        floatingTweensRef.current.push(tween);
      });

      // 4. Interactive 3D Mouse Parallax on Desktop
      const handleMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
        const yPercent = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(stage, {
          rotateY: xPercent * 16,
          rotateX: -yPercent * 12,
          duration: 0.8,
          ease: "power2.out",
          transformPerspective: 1200,
        });

        cards.forEach((card, i) => {
          const depth = (i - 2) * 0.25;
          gsap.to(card, {
            x: `+=${xPercent * 25 * (depth || 0.4)}`,
            duration: 0.8,
            ease: "power2.out",
          });
        });
      };

      const handleMouseLeave = () => {
        gsap.to(stage, {
          rotateY: 0,
          rotateX: 0,
          duration: 1,
          ease: "power2.out",
        });
      };

      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    // Mobile Animation (< 768px)
    mm.add("(max-width: 767px)", () => {
      gsap.set(cards, {
        x: 0,
        y: 80,
        rotate: 0,
        scale: 0.7,
        opacity: 0,
        transformOrigin: "bottom center",
      });

      const mobileTargets = [
        { x: -130, y: 22, rotate: -14 },
        { x: -65, y: 8, rotate: -6 },
        { x: 0, y: 0, rotate: 0 },
        { x: 65, y: 8, rotate: 6 },
        { x: 130, y: 22, rotate: 14 },
      ];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      cards.forEach((card, i) => {
        const target = mobileTargets[i] || { x: 0, y: 0, rotate: 0 };
        tl.to(
          card,
          {
            x: target.x,
            y: target.y,
            rotate: target.rotate,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          i * 0.08
        );
      });
    });

    return () => {
      floatingTweensRef.current.forEach((t) => t.kill());
      floatingTweensRef.current = [];
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="strategy-call"
      className="card-section relative flex flex-col justify-between min-h-[105svh] xl:min-h-screen w-full items-center overflow-hidden bg-black py-24 pb-36 border-t border-white/5"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <OptimizedVideo
          src="/conversion-centered.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        {/* Dark overlays for high readability and seamless blending */}
        {/* <div className="absolute inset-0 bg-black/55 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" /> */}
      </div>

      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 blur-[190px] pointer-events-none rounded-full z-10" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-500/15 blur-[150px] pointer-events-none rounded-full z-10" />

      {/* Center Content: Exact user text */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center my-auto">
        
        {/* Header */}
        <h2 className="text-white font-bold text-[34px] sm:text-[48px] lg:text-[60px] leading-tight mb-8">
          Let&apos;s Plan Your Next Launch
        </h2>

        <div className="space-y-6 max-w-3xl mx-auto mb-10">
          <p className="text-[#CECECE] text-[17px] sm:text-[19px] leading-[1.85]">
            Swastixa Digital is ready to help you plan, launch and grow your next project. Talk to a real estate marketing agency in Gurugram that understands your buyers, your market and your goals.
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="https://swastixa.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-center bg-white text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-neutral-200 hover:scale-[1.03] shadow-[0_10px_35px_rgba(255,255,255,0.18)] text-base sm:text-lg cursor-pointer"
          >
            Book a Free Strategy Call
          </a>
        </div>

      </div>

    </section>
  );
}
