import React from 'react'

const Introduction = () => {
    return (
        <div className="relative w-full h-full">
            <img src="/imgs/narrative_one.png" className="w-full h-full" />
            <div className="absolute right-12 bottom-16 px-5 py-7 w-[36rem] bg-black bg-opacity-[.65] rounded-lg">
                <h1 className="font-semibold text-[6.25rem]">1.3 million</h1>
                <p className="mb-[1rem] font-semibold text-[2rem]">New York City residents live within or directly adjacent to the floodplain. Flood damage is extensive, expensive, and often times predictable</p>
                <p className="font-semibold text-[1rem]">Source: Info, Photo</p>
            </div>
        </div>
    )
}

export default Introduction