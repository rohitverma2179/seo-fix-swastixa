"use client";

import React from "react";
import { useNavigate } from "@/lib/router";

const ExcellenceHero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen pt-24 mb-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-20">

        {/* CENTER TITLE */}
        <div className="text-center pt-20 lg:pt-24 pb-20">
          <h1
            className="
              text-white
              font-bold
              leading-none
              text-[44px]
              sm:text-[56px]
              md:text-[72px]
              lg:text-[96px]
            "
          >
            Content Marketing Agency in <span className="text-[#3A6CF4]">Gurugram</span>
          </h1>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="max-w-[520px]">

            <h2
              className="
                text-white
                uppercase
                font-medium
                tracking-[4px]
                text-[20px]
                md:text-[24px]
                lg:text-[32px]
                leading-[1.15]
              "
            >
              Create Content That Connects, Engages, and Converts
            </h2>

            <p
              className="
                mt-6
                text-[#8B8B8B]
                text-[15px]
                leading-[1.9]
                max-w-[600px]
              "
            >
              Great content does more than fill space. It builds trust, starts conversations, educates your audience, and gives your brand a clear voice. At Swastixa, we create content marketing strategies that help your brand communicate with clarity, consistency, and purpose.
            </p>

            <p
              className="
                mt-3
                text-[#8B8B8B]
                text-[15px]
                leading-[1.9]
                max-w-[600px]
              "
            >
              As a content marketing agency, we help brands turn ideas into impactful communication across digital platforms. From blogs and website content to social media copy, campaign messaging, emailers, and brand storytelling, every piece of content is created to support awareness, engagement, and business growth.
            </p>

            <button
              className="
                mt-10
                bg-[#1F1F22]
                text-white
                font-medium
                px-10
                py-5
                rounded-xl
                transition-all
                duration-300
                hover:bg-[#2A2A2E]
                hover:scale-[1.02]
                cursor-pointer
              "
              onClick={() => {
                navigate("/#contact");
              }}
            >
              Start Our Project
            </button>

          </div>

          {/* RIGHT VISUAL */}
          <div className="relative flex justify-center lg:justify-end">

            <div className="relative w-full max-w-[560px]">

              <div
                className="
                  overflow-hidden
                  rounded-[28px]
                  shadow-[0_20px_80px_rgba(255,255,255,0.04)]
                "
              >
                <img loading="eager" fetchPriority="high" decoding="sync"                   src="https://cdn.swastixa.com/swastixaservice/service-all-eight-pages-images/swastixa-service-content-marketing.webp"
                  alt="Swastixa content strategists mapping an editorial calendar"
                  width={1600}
                  height={900}
                  className="
                    w-full
                    h-[420px]
                    md:h-[480px]
                    object-cover
                    transition-transform
                    max-sm:h-auto
        max-sm:object-contain
                  "
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ExcellenceHero;