"use client";

import dynamic from 'next/dynamic';
import React from 'react'
import ExcellenceHero from '../components/socialmediamarketing/ExcellenceHero'
const LogoCarousel = dynamic(() => import('../components/home/Logo'));
const ServiceCards = dynamic(() => import('../components/services/servicecards'));
const PortfolioCarousel = dynamic(() => import('../components/socialmediamarketing/portfolioData'));
const WhyChooseUs = dynamic(() => import('../components/socialmediamarketing/WhyChooseUs'));
const HowWeWork = dynamic(() => import('../components/socialmediamarketing/HowWeWork'));
// import CaseStudies from '../components/socialmediamarketing/caseStudies'
const FAQSection = dynamic(() => import('../components/socialmediamarketing/FAQSection'));
const CTASection = dynamic(() => import('../components/common/CTASection'));

const SocialMediaMarketingAgency = () => {
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
            {/* <CaseStudies /> */}
        </div>
    )
}

export default SocialMediaMarketingAgency