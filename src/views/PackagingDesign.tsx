"use client";

import dynamic from 'next/dynamic';
import React from 'react'
import ExcellenceHero from '../components/PackagingDesign/ExcellenceHero'
const LogoCarousel = dynamic(() => import('../components/home/Logo'));
const ServiceCards = dynamic(() => import('../components/services/servicecards'));
const PortfolioCarousel = dynamic(() => import('../components/PackagingDesign/portfolioData'));
const WhyChooseUs = dynamic(() => import('../components/PackagingDesign/WhyChooseUs'));
const HowWeWork = dynamic(() => import('../components/PackagingDesign/HowWeWork'));
// import CaseStudies from '../components/PackagingDesign/caseStudies'
const FAQSection = dynamic(() => import('../components/PackagingDesign/FAQSection'));
const CTASection = dynamic(() => import('../components/common/CTASection'));

const PackagingDesign = () => {
    return (
        <div className="bg-black min-h-screen">
         <ExcellenceHero />
            <WhyChooseUs />
            <HowWeWork />  
            {/* <CaseStudies /> */}
            <ServiceCards />
            <PortfolioCarousel />
            <LogoCarousel />
            <FAQSection />
            <CTASection /> 
        </div>


    )
}

export default PackagingDesign