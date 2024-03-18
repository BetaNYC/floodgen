"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

const Slider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

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
        <div className="w-full h-full relative" onMouseUp={handleMouseUp}>
            <div
                className="relative w-full h-full overflow-hidden select-none"
                onMouseMove={handleMove}
                onMouseDown={handleMouseDown}
            >
                <Image
                    alt=""
                    fill
                    priority
                    src="/imgs/narrative_six.png"
                />

                <div
                    className="absolute top-0 left-0 right-0 w-full h-full overflow-hidden select-none"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <Image
                        fill
                        priority
                        alt=""
                        src="/imgs/narrative_four.png"
                    />
                </div>
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                    style={{
                        left: `calc(${sliderPosition}% - 1px)`,
                    }}
                >
                    <div className="bg-white absolute rounded-full w-14 h-14 -left-[calc(50%_+_24px)] top-[calc(50%_-_5px)]">
                        <ChevronRightIcon width={24} height={24} className="absolute right-0 top-[calc(50%_-_12px)] text-black" />
                        <ChevronLeftIcon width={24} height={24} className="absolute left-0 top-[calc(50%_-_12px)] text-black" />

                    </div>
                </div>
                <Image
                    src="/logos/floodgen_logo_white.png"
                    width={155}
                    height={38.75}
                    alt="logos_white"
                    className="absolute left-8 top-12"
                />
            </div>
        </div>
    );
};


export default Slider