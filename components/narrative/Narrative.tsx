import { useState, useContext, useEffect } from "react";



import Image from "next/image";
import  Slider  from "./Slider";
import Satellite from "./Satellite";


const Narrative = () => {
    return (
        <div className="w-full h-[100vh] overflow-y-auto">
            {/* <Scrollama offset={0.5} onStepEnter={onStepEnter}> */}
            {/* </Scrollama> */}
            <div className="relative w-full h-full">
                <Image
                    src="/imgs/narrative_one.png"
                    layout="fill"
                    alt="one"
                />
                <div className="absolute right-12 bottom-16 px-5 py-7 w-[36rem] bg-black bg-opacity-[.65] rounded-lg">
                    <h1 className="font-semibold text-[6.25rem]">1.3 million</h1>
                    <p className="mb-[1rem] font-semibold text-[2rem]">New York City residents live within or directly adjacent to the floodplain. Flood damage is extensive, expensive, and often times predictable</p>
                    <p className="font-semibold text-[1rem]">Source: Info, Photo</p>
                </div>
            </div>
            <Satellite />
            <div className="relative w-full h-full">
                <Image
                    src="/imgs/narrative_four.png"
                    layout="fill"
                    alt="two"
                />
                <Image
                    src="/logos/floodgen_logo_white.png"
                    width={155}
                    height={38.75}
                    alt="logos_white"
                    className="absolute left-8 top-12"
                />
            </div>
            <Slider />

        </div>
    )
}

export default Narrative