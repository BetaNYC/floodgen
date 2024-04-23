"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

const Slider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const ref = useRef()

    const handleMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDragging) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

        setSliderPosition(percent);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };


    return (
        <div className="w-full h-[50vh] md:h-[100vh] bg-white relative" onMouseUp={handleMouseUp}  >
            <div
                className="relative w-full h-full overflow-hidden select-none"
                onMouseMove={handleMove}
                onMouseDown={handleMouseDown}
            >
                <img src="https://raw.githubusercontent.com/BetaNYC/floodgen-images/main/flood_image_output/25_F1_V7.png" className="w-full h-full" alt="" />
                <div className="absolute right-8 bottom-10 md:bottom-24 p-5 font-semibold text-[14px] md:text-[1.125rem] bg-black bg-opacity-70 rounded-lg text-white">AI generated</div>
                <div
                    className="absolute top-0 left-0 right-0 w-full h-full overflow-hidden select-none z-30"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <div className="absolute left-8 bottom-10 md:bottom-24 p-5 font-semibold text-[14px] md:text-[1.125rem] bg-black bg-opacity-70 rounded-lg text-white">Street view</div>
                    <img src="https://raw.githubusercontent.com/BetaNYC/floodgen-images/main/flood_image_output/25_F0_V7.png" className="w-full h-full" alt="" />
                </div>
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-40"
                    style={{
                        left: `calc(${sliderPosition}% - 1px)`,
                    }}
                >
                    <div className="bg-white absolute rounded-full w-14 h-14 -left-[calc(50%_+_24px)] top-[calc(50%_-_5px)]">
                        <ChevronRightIcon width={24} height={24} className="absolute right-0 top-[calc(50%_-_12px)] text-black" />
                        <ChevronLeftIcon width={24} height={24} className="absolute left-0 top-[calc(50%_-_12px)] text-black" />
                    </div>
                </div>
            </div>
            <img src='/logos/fg_logo_white_sm.png' className='absolute right-6 bottom-4 z-30 w-8 h-8' />
        </div>
    );
};


export default Slider