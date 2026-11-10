"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OptimizedVideo from "../common/OptimizedVideo";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    const videoEl = containerEl.querySelector("video");
    if (!videoEl) return;

    // Force autoplay compatibility for Safari & iOS
    videoEl.setAttribute("muted", "");
    videoEl.setAttribute("playsinline", "");
    videoEl.muted = true;
    videoEl.defaultMuted = true;
    videoEl.playsInline = true;

    // Programmatic play trigger for Safari
    const playVideo = () => {
      videoEl.play().catch((err) => {
        console.warn("Autoplay blocked initially, retrying: ", err);
      });
    };

    playVideo();
    videoEl.addEventListener("loadedmetadata", playVideo);
    videoEl.addEventListener("loadeddata", playVideo);

    // Responsive GSAP using matchMedia (perfect for resizing & device rotation)
    const mm = gsap.matchMedia();

    // Desktop & Tablet (width > 430px)
    mm.add("(min-width: 431px)", () => {
      // Set initial styles for desktop animation
      gsap.set(videoEl, {
        scale: 1,
        width: "80vw",
        height: "100vh",
        borderRadius: "0rem",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl,
          start: "top top",
          end: "+=100",
          scrub: true,
          pin: true,
          pinType: "transform", // Solves pinning jitter in Safari/iOS when using Lenis
          anticipatePin: 1,
        },
      });

      tl.to(videoEl, {
        scale: 1.2,
        y: "-20%",
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        duration: 2,
        ease: "power2.inOut",
      });
    });

    // Mobile (width <= 430px)
    mm.add("(max-width: 430px)", () => {
      // Set styling for mobile (no ScrollTrigger animation to keep performance smooth)
      gsap.set(videoEl, {
        scale: 1,
        width: "100%",
        height: "auto",
        borderRadius: "0rem",
      });
    });

    // Cleanup on unmount
    return () => {
      mm.revert(); // Reverts all GSAP matchMedia settings & kills all associated ScrollTriggers
      videoEl.removeEventListener("loadedmetadata", playVideo);
      videoEl.removeEventListener("loadeddata", playVideo);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="min-h-[50vh] sm:min-h-screen flex flex-col items-center justify-center px-4 bg-white overflow-hidden"
      >
        {/* Heading Section */}
        <h1 className="heading pt-10 sm:pt-28 text-center text-[22px] font-bold sm:text-[28px] md:text-[38px] lg:text-[50px] xl:text-[68px] leading-snug text-gray-800 max-w-6xl">
          Digital Marketing &amp; Creative Agency in Gurugram
          <span className="block mt-4 text-[15px] sm:text-[18px] md:text-[22px] lg:text-[26px] font-normal text-gray-600">
            Creativity that flows from culture
          </span>
        </h1>

        <div className="mt-8 w-full flex justify-center relative z-10">
          <OptimizedVideo
            src="https://cdn.swastixa.com/swastixadigital/swastixa-hero-video/swastixa-top.mp4"
            poster="/posters/swastixa-hero-poster.jpg"
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            className="w-full min-h-[60vh] object-cover"
            style={{ border: "none", outline: "none" }}
          />
        </div>
      </div>
    </>
  );
};

export default Hero;