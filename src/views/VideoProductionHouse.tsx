"use client";

import dynamic from 'next/dynamic';
import React from 'react'
// import ExcellenceHero from '../components/websitedevelopment/ExcellenceHero'
import ExcellenceHero from '../components/videoproductionhouse/ExcellenceHero'
const LogoCarousel = dynamic(() => import('../components/home/Logo'));
const ServiceCards = dynamic(() => import('../components/services/servicecards'));
// import PortfolioCarousel from '../components/videoproductionhouse/portfolioData'
const WhyChooseUs = dynamic(() => import('../components/videoproductionhouse/WhyChooseUs'));
const HowWeWork = dynamic(() => import('../components/videoproductionhouse/HowWeWork'));
const CaseStudies = dynamic(() => import('../components/videoproductionhouse/caseStudies'));
const FAQSection = dynamic(() => import('../components/videoproductionhouse/FAQSection'));
const CTASection = dynamic(() => import('../components/common/CTASection'));
const VideoportfolioCoursal = dynamic(() => import('../components/videoproductionhouse/VideoportfolioCoursal'));

const VideoProductionHouse = () => {
    return (
        <div className="bg-black min-h-screen">
            <ExcellenceHero />
            <WhyChooseUs />    
            <HowWeWork />
            {/* <CaseStudies /> */}
            <ServiceCards /> 
            {/* <VideoportfolioCoursal /> */}
            <LogoCarousel />
            <FAQSection />
            <CTASection />
        </div>
   )
}

export default VideoProductionHouse