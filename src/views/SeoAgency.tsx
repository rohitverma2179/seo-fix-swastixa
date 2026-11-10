"use client";

import dynamic from 'next/dynamic';
import React from 'react'
import ExcellenceHero from '../components/seoagency/ExcellenceHero'
const LogoCarousel = dynamic(() => import('../components/home/Logo'));
const ServiceCards = dynamic(() => import('../components/services/servicecards'));
const WhyChooseUs = dynamic(() => import('../components/seoagency/WhyChooseUs'));
const HowWeWork = dynamic(() => import('../components/seoagency/HowWeWork'));
// import CaseStudies from '../components/seoagency/caseStudies'
const FAQSection = dynamic(() => import('../components/seoagency/FAQSection'));
const CTASection = dynamic(() => import('../components/common/CTASection'));
// import CTASection from '../components/common/CTASection'

const SeoAgency = () => {
    
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

export default SeoAgency