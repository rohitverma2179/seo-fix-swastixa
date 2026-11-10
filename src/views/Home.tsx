"use client";

import dynamic from 'next/dynamic';
import React, { useEffect } from "react";
import Hero from "../components/home/Hero";
const HeroSection = dynamic(() => import('../components/home/HeroSecond'));
const HomeAbout = dynamic(() => import('../components/home/HomeAbout'));
const ForthSection = dynamic(() => import('../components/home/HomeWork'));
const EndToEndExcellence = dynamic(() => import('../components/home/EndToEndExcellence'));
const LogoCarousel = dynamic(() => import('../components/home/Logo'));
const ContactSection = dynamic(() => import('../components/common/Contact'));
const TorchlightTextReveal = dynamic(() => import('../components/home/MouseGlowText'));
import { useLocation } from "@/lib/router";

export default function Home() {
  const location = useLocation();
  // useEffect(() => {
  //   if (location.hash === "#contact") {
  //     // const timer = setTimeout(() => {
  //     const el = document.getElementById("contactSection");
  //     if (el) {
  //       el.scrollIntoView({ behavior: "instant", block: "start" });
  //     }
  //     // }, 10);
  //     // return () => clearTimeout(timer);
  //   }
  // }, [location]);


  useEffect(() => {
    if (location.hash === "#contact") {


      const timer = setTimeout(() => {
        const el = document.getElementById("contactSection");
        if (el) {
          el.scrollIntoView({ behavior: "instant", block: "start" });

          // 🔥 URL se #contact remove (without reload)
          window.history.replaceState(
            null,
            "",
            location.pathname
          );
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <main>
      <Hero />
      <HeroSection />
      <HomeAbout />
      <EndToEndExcellence />
      <ForthSection />
      <LogoCarousel />
      <TorchlightTextReveal />
      <ContactSection />  
    </main>
  );
}
