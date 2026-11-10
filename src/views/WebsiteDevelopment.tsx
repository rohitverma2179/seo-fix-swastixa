"use client";

import dynamic from 'next/dynamic';
import React from 'react'
import ExcellenceHero from '../components/websitedevelopment/ExcellenceHero'
const LogoCarousel = dynamic(() => import('../components/home/Logo'));
const ServiceCards = dynamic(() => import('../components/services/servicecards'));
const PortfolioCarousel = dynamic(() => import('../components/websitedevelopment/portfolioData'));
const WhyChooseUs = dynamic(() => import('../components/websitedevelopment/WhyChooseUs'));
const HowWeWork = dynamic(() => import('../components/websitedevelopment/HowWeWork'));
// import CaseStudies from '../components/websitedevelopment/caseStudies'
const FAQSection = dynamic(() => import('../components/websitedevelopment/FAQSection'));
const CTASection = dynamic(() => import('../components/common/CTASection'));

const WebsiteDevelopment = () => {
    return (
        <div className="bg-black min-h-screen">
            <ExcellenceHero />
            <WhyChooseUs />
            <HowWeWork />
            <ServiceCards />
            <PortfolioCarousel />
            <LogoCarousel />
            <FAQSection />
            <CTASection />  
        </div>
    )
}

export default WebsiteDevelopment