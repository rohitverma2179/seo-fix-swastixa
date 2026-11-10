"use client";



import { useEffect } from "react";

export const useVideoObserver = (videoRef) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {}); // 🔥 silent fix
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 } // 🔥 IMPORTANT
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);
};
