import React from 'react'

import { ChevronDoubleDownIcon } from '@heroicons/react/20/solid'

const Introduction = () => {
    return (
        <div className="relative w-full h-[50%] md:h-full">
            <img src="/imgs/narrative_one.png" className="w-full h-full" />
            <div className="absolute right-8 max-sm:left-8  md:right-12 bottom-16 px-5 py-7 md:w-[36rem] bg-black bg-opacity-[.65] rounded-lg">
                <h1 className="font-semibold text-[24px]  md:text-[3.75rem] text-white">1.3 million</h1>
                <p className="mb-[1rem] font-semibold text-[14px] md:text-heading text-white">New York City residents live within or directly adjacent to the floodplain. Flood damage is extensive, expensive, and often times predictable</p>
                <p className="font-semibold text-[10px] md:text-[0.875rem] text-white">Source: Info, Photo</p>
            </div>
            <ChevronDoubleDownIcon width={48} height={48}  className='absolute right-[50%] bottom-8'/>
        </div>
    )
}

export default Introduction