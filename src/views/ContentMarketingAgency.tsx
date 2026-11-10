"use client";

import dynamic from 'next/dynamic';
import React from 'react'
import ExcellenceHero from '../components/contentmarketing/ExcellenceHero'
const LogoCarousel = dynamic(() => import('../components/home/Logo'));
const ServiceCards = dynamic(() => import('../components/services/servicecards'));
// import PortfolioCarousel from '../components/contentmarketing/portfolioData'
const WhyChooseUs = dynamic(() => import('../components/contentmarketing/WhyChooseUs'));
const HowWeWork = dynamic(() => import('../components/contentmarketing/HowWeWork'));
// import CaseStudies from '../components/contentmarketing/caseStudies'
const FAQSection = dynamic(() => import('../components/contentmarketing/FAQSection'));
const CTASection = dynamic(() => import('../components/common/CTASection'));

const ContentMarketingAgency = () => {
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
    )
}   

export default ContentMarketingAgency