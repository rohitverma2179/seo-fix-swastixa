"use client";



import { useEffect, useRef, useState } from "react";

export const useLazyVideo = () => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",   // 🔥 LOAD BEFORE ENTERING VIEW
        threshold: 0.01        // 🔥 VERY EARLY TRIGGER
      }
    );

    if(videoRef.current) observer.observe(videoRef.current)

    if (videoRef.current) observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return { videoRef, isVisible };
};
