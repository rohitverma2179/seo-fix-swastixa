"use client";

import React from 'react';
import { useNavigate, useLocation } from "@/lib/router";

const Smmbutton = ({ activeTab }: { activeTab?: string }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine current active tab from prop or pathname
    const path = location.pathname.toLowerCase();
    const active = activeTab || (
        path.includes('/social-media') ? 'posts' :
        path.includes('/reels') ? 'reels' :
        path.includes('/branding') ? 'branding' :
        path.includes('/print') ? 'print' : ''
    );

    const getButtonClass = (tabName: string) => {
        return active === tabName
            ? "text-xl m-6 border px-8 py-2 rounded-sm transition-colors cursor-pointer bg-white text-black border-white"
            : "text-xl m-6 border px-8 py-2 rounded-sm transition-colors cursor-pointer border-white/30 text-white/70 hover:border-white hover:text-white";
    };

    return (
        <>
            <button
                onClick={() => active !== 'posts' && navigate('/work/social-media-management')}
                className={getButtonClass('posts')}
            >
                Posts
            </button>
            <button
                onClick={() => active !== 'reels' && navigate('/work/reels')}
                className={getButtonClass('reels')}
            >
                Reels
            </button>
            <button
                onClick={() => active !== 'branding' && navigate('/work/branding')}
                className={getButtonClass('branding')}
            >
                Branding
            </button>
            <button
                onClick={() => active !== 'print' && navigate('/work/print')}
                className={getButtonClass('print')}
            >
                Print
            </button>
        </>
    );
};

export default Smmbutton;