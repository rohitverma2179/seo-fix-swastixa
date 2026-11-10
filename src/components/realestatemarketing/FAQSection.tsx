"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "Q1. What does a real estate marketing agency in Gurugram do?",
    answer:
      "A real estate marketing agency in Gurugram plans and runs campaigns that bring qualified buyers to property projects. This includes digital marketing, content, video, SEO, website development, social media and paid advertising. Swastixa Digital manages these services together, so developers, builders and brokers get consistent messaging and trackable enquiries.",
  },
  {
    question: "Q2. How much does a real estate marketing agency in Gurgaon charge?",
    answer:
      "The cost depends on your project size, number of channels, content needs and advertising budget. Agencies usually charge a service fee or retainer, plus a separate media budget for paid ads. Swastixa Digital, a real estate marketing agency in Gurugram, shares a clear scope and pricing after understanding your goals, which you can discuss on a free strategy call.",
  },
  {
    question: "Q3. How does a real estate lead generation agency in Gurgaon get quality leads?",
    answer:
      "A real estate lead generation agency in Gurgaon gets quality leads by targeting the right buyers with the right message and tracking them through to site visits. This combines paid campaigns, search visibility and well-built landing pages. Quality improves when results are reviewed often and budgets move toward the sources that bring serious buyers.",
  },
  {
    question: "Q4. How long does a digital marketing agency for real estate take to show results?",
    answer:
      "Paid campaigns can start generating enquiries within a few weeks of launch, while SEO and AI search visibility usually take a few months to build. Timelines vary with the project, location, budget and competition. A good plan combines fast-moving performance marketing with long-term search work, so results compound over time.",
  },
  {
    question: "Q5. Are property portals or performance marketing better for real estate leads?",
    answer:
      "Neither is always better, and the strongest results usually come from using both. Property portals give instant reach but share your audience with competitors. Performance marketing gives you control over targeting, creatives, landing pages and tracking, and it builds your own brand and data. As a real estate lead generation agency in Gurgaon, Swastixa Digital helps developers balance portal listings with campaigns they own.",
  },
  {
    question: "Q6. What is AEO for real estate, and why does it matter?",
    answer:
      "AEO, or Answer Engine Optimization, is the practice of structuring content so search engines and AI assistants can quote it as a direct answer. For real estate, it helps your project appear when buyers ask about locations, prices, amenities or builders. Clear FAQs, accurate facts and structured data make your brand easier to surface and trust.",
  },
  {
    question: "Q7. What is GEO for real estate, and how is it different from SEO?",
    answer:
      "GEO, or Generative Engine Optimization, helps AI tools such as ChatGPT and Gemini understand your brand and mention it in generated answers, while SEO focuses on ranking pages in search results. For real estate, GEO relies on clear content, consistent brand details and trusted sources. As a digital marketing agency for real estate, Swastixa Digital offers both as part of its search services.",
  },
  {
    question: "Q8. Why hire a digital marketing agency for real estate instead of an in-house team?",
    answer:
      "An agency gives you strategy, creative, media buying, video and development in one place, without the cost of hiring and managing several specialists. It also brings fresh ideas from working across different brands and projects. Developers can scale activity up or down for each launch while keeping messaging and reporting consistent.",
  },
  {
    question: "Q9. How do I choose the best real estate marketing agency?",
    answer:
      "Choose the best real estate marketing agency by checking its real estate focus, its range of services, its client brands and how clearly it reports on enquiries and site visits. Ask how it handles lead quality, content, AI search visibility and communication. Swastixa Digital welcomes these questions on a free strategy call.",
  },
  {
    question: "Q10. Who does Swastixa Digital work with, and how can I get started?",
    answer:
      "Swastixa Digital works with real estate developers, builders and brokers across Gurugram and Delhi NCR, and has worked with brands including DLF Homes, Emaar India and M3M. To get started, book a free strategy call at https://swastixa.com/. As a real estate marketing agency in Gurugram, we will review your project and suggest the right plan.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black py-20 relative overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-white text-[32px] sm:text-[40px] lg:text-[48px] font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-gradient-to-r
                  from-[#17171B]
                  to-[#1B1B20]
                  transition-all
                  duration-300
                  hover:border-white/20
                "
              >
                {/* Question Button */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-6
                    sm:px-8
                    py-6
                    text-left
                    cursor-pointer
                    gap-4
                  "
                >
                  <span className="text-white text-base sm:text-lg font-medium leading-snug">
                    {faq.question}
                  </span>

                  <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                    <span className="absolute w-full h-[2px] rounded-full bg-white" />
                    <span
                      className={`
                        absolute
                        h-full
                        w-[2px]
                        rounded-full
                        bg-white
                        transition-all
                        duration-300
                        ease-in-out
                        ${isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"}
                      `}
                    />
                  </div>
                </button>

                {/* Answer Accordion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-t border-white/5 px-6 sm:px-8 py-6 bg-white/[0.01]">
                        <p className="text-[#A1A1A1] text-[15px] sm:text-[16px] leading-[1.85] max-w-full">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
