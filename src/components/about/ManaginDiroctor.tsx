"use client";

import React from 'react';
import { FaLinkedinIn } from "react-icons/fa";

const ManaginDiroctor = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Manish",
            role: "Cryptocurrency",
            image: "https://imgs.search.brave.com/pIgRsf5jVevcid3yYahuoWchwJSg0Puq5v-MgXiBDcQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU3/MTk0NDQyL3Bob3Rv/L3N1aXQtYm95LXBy/b2ZpbGUuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPWgweVVp/VkY1eGhjMzFzV3pI/cWVTbkRIVHpuVVE3/LWZuQWM0eUhKTnA4/MkU9"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            role: "Creative Director",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 3,
            name: "David Smith",
            role: "Tech Lead",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000"
        },      
    ];

    return (
      <>
        <h2 className='text-5xl font-bold text-white text-center sm:text-left sm:pl-36 mt-20 tracking-tight'>Managing Director</h2>
        <div className="py-16 px-4 flex justify-center bg-transparent">
            <div className="flex flex-wrap gap-8 justify-center items-center">
                {teamMembers.map((member) => (
                    <div 
                        className="w-[22rem] h-[27rem] bg-[#313131] rounded-[20px] flex flex-col items-center justify-center text-white transition-all duration-200 ease-in-out relative cursor-pointer overflow-hidden hover:scale-[1.04] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] group"
                        key={member.id}
                    >
                        <img 
                            loading="lazy" 
                            decoding="async"
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover absolute transition-all duration-200 ease-in-out z-1 group-hover:blur-[3px]"
                        />
                        <div className="opacity-0 group-hover:opacity-100 flex flex-col items-start justify-end w-full h-full p-4 z-10 transition-all duration-200 ease-in-out bg-gradient-to-t from-black/80 to-transparent group-hover:gap-2">
                            <p className="text-[1.2em] font-bold text-white">{member.name}</p>
                            <p className="text-[0.9em] text-[#ccc] font-light">{member.role}</p>
                            <p className="text-[1.2em] font-bold text-white mt-[5px]"><FaLinkedinIn /></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </>
    );
}

export default ManaginDiroctor;
