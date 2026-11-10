"use client";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "@/components/common/Header";
import ScrollToTop from "@/components/common/ScrollToTop";
import ScrollButton from "@/components/common/ScrollButton";

gsap.registerPlugin(ScrollTrigger);

export default function Providers({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <ScrollToTop />
      <ScrollButton />
      <Header />
      {children}
    </>
  );
}
