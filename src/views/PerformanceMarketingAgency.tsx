"use client";

import dynamic from "next/dynamic";
import React from "react";
import ExcellenceHero from "../components/performancemarketing/ExcellenceHero";
const LogoCarousel = dynamic(() => import("../components/home/Logo"));
const ServiceCards = dynamic(
  () => import("../components/services/servicecards"),
);
const WhyChooseUs = dynamic(
  () => import("../components/performancemarketing/WhyChooseUs"),
);
const HowWeWork = dynamic(
  () => import("../components/performancemarketing/HowWeWork"),
);
// import CaseStudies from '../components/performancemarketing/caseStudies'
const FAQSection = dynamic(
  () => import("../components/performancemarketing/FAQSection"),
);
const CTASection = dynamic(() => import("../components/common/CTASection"));

const PerformanceMarketingAgency = () => {
  return (
    <div className="bg-black min-h-screen">
      <ExcellenceHero />
      <WhyChooseUs />
      <HowWeWork />
      {/* <CaseStudies /> */}
      <ServiceCards />
      <LogoCarousel />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default PerformanceMarketingAgency;
