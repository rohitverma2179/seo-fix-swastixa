"use client";

import TextWriteAnimation from "./TextWriteAnimation";
import OptimizedVideo from "../common/OptimizedVideo";

const VIDEO_URL = "https://cdn.swastixa.com/swastixadigital/swastixa-hero-video/swastixa-second.mp4";

export default function HeroSection() {
  return (
    <section className="w-full min-h-[71vh] bg-white flex justify-center items-center px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-6xl w-full">
        {/* Left Text Section */}
        <div className="text-left lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-snug">
            DIGITAL AGENCY FOR <br />
            <span className="text-blue-500">
              {" "}
              <TextWriteAnimation />{" "}
            </span>
            <br />
            ROOTED IN CULTURE
          </h2>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center items-center w-full max-w-md">
          <OptimizedVideo
            src={VIDEO_URL}
            loop
            className="w-full max-w-md object-contain"
            style={{ border: "none", outline: "none" }}
          />
        </div>
      </div>
    </section>
  );
}
