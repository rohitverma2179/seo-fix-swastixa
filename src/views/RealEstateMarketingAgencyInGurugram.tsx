"use client";

import React from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/realestatemarketing/HeroSection";
import HeroSecond from "@/components/realestatemarketing/HeroSecond";
import AboutSection from "@/components/realestatemarketing/AboutSection";
import WhyChooseUsSection from "@/components/realestatemarketing/WhyChooseUsSection";
import ServicesSection from "@/components/realestatemarketing/ServicesSection";
import ProcessSection from "@/components/realestatemarketing/ProcessSection";
import ClientsSection from "@/components/realestatemarketing/ClientsSection";
import TrustSection from "@/components/realestatemarketing/TrustSection";
import StrategyCallSection from "@/components/realestatemarketing/StrategyCallSection";
import FAQSection from "@/components/realestatemarketing/FAQSection";

const faqSchemaData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does a real estate marketing agency in Gurugram do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A real estate marketing agency in Gurugram plans and runs campaigns that bring qualified buyers to property projects. This includes digital marketing, content, video, SEO, website development, social media and paid advertising. Swastixa Digital manages these services together, so developers, builders and brokers get consistent messaging and trackable enquiries.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a real estate marketing agency in Gurgaon charge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cost depends on your project size, number of channels, content needs and advertising budget. Agencies usually charge a service fee or retainer, plus a separate media budget for paid ads. Swastixa Digital, a real estate marketing agency in Gurugram, shares a clear scope and pricing after understanding your goals, which you can discuss on a free strategy call.",
      },
    },
    {
      "@type": "Question",
      name: "How does a real estate lead generation agency in Gurgaon get quality leads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A real estate lead generation agency in Gurgaon gets quality leads by targeting the right buyers with the right message and tracking them through to site visits. This combines paid campaigns, search visibility and well-built landing pages. Quality improves when results are reviewed often and budgets move toward the sources that bring serious buyers.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a digital marketing agency for real estate take to show results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paid campaigns can start generating enquiries within a few weeks of launch, while SEO and AI search visibility usually take a few months to build. Timelines vary with the project, location, budget and competition. A good plan combines fast-moving performance marketing with long-term search work, so results compound over time.",
      },
    },
    {
      "@type": "Question",
      name: "Are property portals or performance marketing better for real estate leads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Neither is always better, and the strongest results usually come from using both. Property portals give instant reach but share your audience with competitors. Performance marketing gives you control over targeting, creatives, landing pages and tracking, and it builds your own brand and data. As a real estate lead generation agency in Gurgaon, Swastixa Digital helps developers balance portal listings with campaigns they own.",
      },
    },
    {
      "@type": "Question",
      name: "What is AEO for real estate, and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AEO, or Answer Engine Optimization, is the practice of structuring content so search engines and AI assistants can quote it as a direct answer. For real estate, it helps your project appear when buyers ask about locations, prices, amenities or builders. Clear FAQs, accurate facts and structured data make your brand easier to surface and trust.",
      },
    },
    {
      "@type": "Question",
      name: "What is GEO for real estate, and how is it different from SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GEO, or Generative Engine Optimization, helps AI tools such as ChatGPT and Gemini understand your brand and mention it in generated answers, while SEO focuses on ranking pages in search results. For real estate, GEO relies on clear content, consistent brand details and trusted sources. As a digital marketing agency for real estate, Swastixa Digital offers both as part of its search services.",
      },
    },
    {
      "@type": "Question",
      name: "Why hire a digital marketing agency for real estate instead of an in-house team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An agency gives you strategy, creative, media buying, video and development in one place, without the cost of hiring and managing several specialists. It also brings fresh ideas from working across different brands and projects. Developers can scale activity up or down for each launch while keeping messaging and reporting consistent.",
      },
    },
    {
      "@type": "Question",
      name: "How do I choose the best real estate marketing agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose the best real estate marketing agency by checking its real estate focus, its range of services, its client brands and how clearly it reports on enquiries and site visits. Ask how it handles lead quality, content, AI search visibility and communication. Swastixa Digital welcomes these questions on a free strategy call.",
      },
    },
    {
      "@type": "Question",
      name: "Who does Swastixa Digital work with, and how can I get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Swastixa Digital works with real estate developers, builders and brokers across Gurugram and Delhi NCR, and has worked with brands including DLF Homes, Emaar India and M3M. To get started, book a free strategy call at https://swastixa.com/. As a real estate marketing agency in Gurugram, we will review your project and suggest the right plan.",
      },
    },
  ],
};

export default function RealEstateMarketingAgencyInGurugram() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500 selection:text-white">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      {/* Sections */}
      <HeroSection />
      <HeroSecond />
      <AboutSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <ProcessSection />
      <ClientsSection />
      <TrustSection />
      <StrategyCallSection />
      <FAQSection />
    </div>
  );
}
