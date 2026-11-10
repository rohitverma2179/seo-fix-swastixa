"use client";

import dynamic from 'next/dynamic';
import React from 'react'
// import AboutHero from '../components/about/AboutHero'
const DigitalEraSection = dynamic(() => import('../components/about/DigitalEraSection'));
const LogoCarousel = dynamic(() => import('../components/home/Logo'));
const ScrollReveal = dynamic(() => import('../components/common/ScrollReveal'));
import CardSwap, { Card } from '../components/common/CardSwap'
const ApproachSection = dynamic(() => import('../components/about/ApproachSection'));
const ManaginDiroctor = dynamic(() => import('../components/about/ManaginDiroctor'));
// import OurTeam from '../components/about/OurTeam'
const ScrollRevealText = dynamic(() => import('../components/common/scrollRevealText'));
// import BrandManifesto from '../components/common/ScrollFillText'
const ScrollFillText = dynamic(() => import('../components/common/ScrollFillText'));
const CTASection = dynamic(() => import('../components/common/CTASection'));

const About = () => {

    const cardData = [
        {
            id: 1,
            title: "Social Media Management",
            description: "Strategic content and consistent management that turns followers into loyal audiences.",
            image: "https://cdn.swastixa.com/swastixabout/about-more-website-design-swastixa.jpeg"
        },
        {
            id: 2,
            title: "Production House",
            description: "High-impact videos, ads, and visual stories crafted to connect and inspire.",
            image: "https://cdn.swastixa.com/swastixabout/about-website-films-swastixa.jpeg"
        },
        {
            id: 3,
            title: "Website Development",
            description: "Clean, responsive, and scalable websites built for speed, experience, and conversion.",
            // image: "https://swastixa.b-cdn.net/About%20-%204%20-%20%20(2).png"
            image: "https://cdn.swastixa.com/swastixabout/about-design-meeting-swastixa.jpeg"
        },
        {
            id: 4,
            title: "Digital Marketing",
            description: "Performance-driven campaigns designed to increase reach, engagement, and measurable growth.",
            image: "https://cdn.swastixa.com/swastixabout/about-website-design-swastixa.jpeg"
            // image: "https://swastixa.b-cdn.net/About%20-%204%20-%20%20(1).png"
        },
    ];

    return (
        <>
            <div className='bg-black text-white'>

                <div className='relative w-full '>  {/* fixed background  paralex background */}
                    {/* <AboutHero /> */}

                    {/* Single H1 for /about — AboutHero is commented out, so this carries it */}
                    <div className="max-w-5xl mx-auto px-6 pt-28 pb-10 text-center">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            About Swastixa — A Culture-Led Creative Agency
                        </h1>
                        <p className="mt-5 text-sm md:text-base text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Swastixa means eternal flow. We are a digital marketing and creative
                            agency in Gurugram building brands on culture, strategy and work you
                            can measure.
                        </p>
                    </div>

                     <div className="relative w-full h-[90vh] min-h-[600px] 2xl:min-h-[500px]">
                          <CardSwap
                            cardDistance={60}
                            verticalDistance={70}
                            delay={2000}
                            pauseOnHover={false}
                        >
                            {cardData.map((card) => (
                                <Card key={card.id} customClass="overflow-hidden group">
                                    <div className="absolute inset-0 w-full h-full">
                                        <img loading="lazy" decoding="async" 
                                        
                                            src={card.image}
                                            alt={card.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                                    </div>
                                    <div className="relative h-full flex flex-col justify-end p-8 select-none">
                                        <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{card.title}</h3>
                                        <p className="text-zinc-300 text-[0.7rem] leading-relaxed max-w-[90%]">{card.description}</p>
                                    </div>
                                </Card>
                            ))}
                        </CardSwap>  
                    </div> 
                </div>


                
                <div className='text-white w-full lg:max-w-[980px] 2xl:max-w-[1400px] text-center flex items-center justify-center mx-auto
                    pt-24 md:pt-40 lg:pt-60 2xl:pt-80
                    mb-24 lg:mb-32 2xl:mb-40
                    px-4
                '>
                    <ScrollReveal
                        baseOpacity={0.1}
                        enableBlur={true}
                        baseRotation={0}
                        blurStrength={10}
                    >
                        For us, creativity is a refined and strategic flow where deep understanding shapes ideas, thoughtful design creates balance, and digital innovation transforms vision into powerful and scalable solutions, delivered with clarity, consistency, and measurable performance across every stage of the brand journey.
                    </ScrollReveal>

                </div>

                
                {/* <ScrollFillText /> */}



 
              
                {/* <ScrollFillText /> */}
                <DigitalEraSection />
                <ApproachSection />
                <LogoCarousel />  
                <CTASection />
                {/* <ManaginDiroctor />
                <OurTeam /> */}
            </div>
        </>
    )
}





export default About






