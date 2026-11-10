"use client";

import React, { memo, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

const GridItem = memo(({ item, globalIndex }: any) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const imgRef = useRef(null);

    // Robust check for image loading (handles cached images)
    useEffect(() => {
        if (imgRef.current && (imgRef.current as HTMLImageElement).complete) {
            setIsImageLoaded(true);
        }
    }, []);

    // The first 8 images should appear immediately without waiting for scroll trigger
    const isInitialBatch = globalIndex < 8;

    return (
        <motion.div
            initial={isInitialBatch ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={isInitialBatch ? { opacity: 1, y: 0 } : undefined}
            whileInView={!isInitialBatch ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "50px" }}
            transition={{
                duration: 0.5,
                ease: [0.215, 0.61, 0.355, 1],
                delay: isInitialBatch ? (globalIndex % 4) * 0.05 : 0.05
            }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="w-full mb-6 relative rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 group shadow-2xl"
        >
            <div className="relative w-full overflow-hidden bg-neutral-800">
                {/* Fallback skeleton while image loads */}
                {!isImageLoaded && (
                    <div className="absolute inset-0 bg-linear-to-br from-neutral-800 to-neutral-700 animate-pulse" />
                )}

                <img
                    ref={imgRef}
                    src={item.image}
                    alt={item.title || "Social Media Content"}
                    onLoad={() => setIsImageLoaded(true)}
                    className={`w-full h-auto object-cover transition-opacity duration-500 group-hover:scale-105
                        ${isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    loading={isInitialBatch ? "eager" : "lazy"}
                    decoding="async"
                />
            </div>

            {/* {(item.title || item.category) && (
                <div className="absolute inset-0   
                opacity-0 group-hover:opacity-100 transition-all duration-500
                flex flex-col justify-end p-6">
                    {item.category && (
                        <span className="text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase mb-2">
                            {item.category}
                        </span>
                    )}
                </div>
            )} */}
        </motion.div>
    );
});

const SMMGrid = ({ smmContent }: any) => {
    // Starting with 16 images to fill grid layout nicely
    const [visibleCount, setVisibleCount] = useState(16);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const isMoreLoadingRef = useRef(false);
    const loaderRef = useRef(null);
    const [columns, setColumns] = useState(1);

    const totalCount = smmContent ? smmContent.length : 0;

    // Responsive Column Count Logic
    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width >= 1536) setColumns(4);
            else if (width >= 1024) setColumns(3);
            else if (width >= 640) setColumns(2);
            else setColumns(1);
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    const loadMore = useCallback(() => {
        if (isMoreLoadingRef.current) return;
        setVisibleCount(prev => {
            if (prev >= totalCount) return prev;
            isMoreLoadingRef.current = true;
            setIsMoreLoading(true);
            setTimeout(() => {
                isMoreLoadingRef.current = false;
                setIsMoreLoading(false);
            }, 300);
            return Math.min(prev + 12, totalCount);
        });
    }, [totalCount]);

    useEffect(() => {
        if (visibleCount >= totalCount) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1, rootMargin: '200px' }
        );

        const currentLoader = loaderRef.current;
        if (currentLoader) observer.observe(currentLoader);

        return () => {
            if (currentLoader) observer.unobserve(currentLoader);
            observer.disconnect();
        };
    }, [loadMore, visibleCount, totalCount]);

    // Distribute items into lanes based on height estimation to keep column heights balanced and prevent shifting
    const lanes = useMemo(() => {
        if (!smmContent) return [];
        const items = smmContent.slice(0, visibleCount);
        const result = Array.from({ length: columns }, () => []);
        const heights = Array(columns).fill(0);

        items.forEach((item, index) => {
            // Estimate height factor: edm/avenue/suite are tall (1.77), statics are square/landscape (1.0)
            const url = item.image ? item.image.toLowerCase() : '';
            const isTall = url.includes('edm') || url.includes('line-avenue') || url.includes('line-suite');
            const heightFactor = isTall ? 1.77 : 1.0;

            // Find the shortest column
            let minColIdx = 0;
            let minHeight = heights[0];
            for (let c = 1; c < columns; c++) {
                if (heights[c] < minHeight) {
                    minHeight = heights[c];
                    minColIdx = c;
                }
            }

            result[minColIdx].push({ item, globalIndex: index });
            heights[minColIdx] += heightFactor;
        });
        return result;
    }, [visibleCount, smmContent, columns]);

    if (!smmContent || smmContent.length === 0) return null;

    return (
        <section className="w-full min-h-screen bg-black px-4 py-20">
            <div className="max-w-[2500px] mx-auto flex flex-row gap-4 sm:gap-6">
                {lanes.map((laneItems, laneIdx) => (
                    <div key={`lane-${laneIdx}`} className="flex-1 flex flex-col">
                        {laneItems.map(({ item, globalIndex }) => (
                            <GridItem key={item.id} item={item} globalIndex={globalIndex} />
                        ))}
                    </div>
                ))}
            </div>

            <div
                ref={loaderRef}
                className={`w-full flex flex-col items-center justify-center bg-black transition-all duration-300
                    ${visibleCount < smmContent.length ? 'h-40 mt-12' : 'h-0 mt-0 overflow-hidden'}`}
            >
                {visibleCount < smmContent.length && (
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-10 h-10 border-t-2 border-blue-500 rounded-full"
                        />
                        <span className="text-blue-500/50 text-[10px] font-black tracking-[0.3em] uppercase">
                            Loading More
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default memo(SMMGrid);