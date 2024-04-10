import { useState, useContext, useEffect } from "react";

import Introduction from "./Introduction";
import Slider from "./Slider";
import Satellite from "./Satellite";
import StreetView from "./StreetView";
import Ending from "./Ending";

import { NarrativeContext, NarrativeType } from "@/contexts/NarrativeContext";

import { XMarkIcon } from "@heroicons/react/20/solid";

const Narrative = () => {

    const { openNarrative, setOpenNarrative } = useContext(NarrativeContext) as NarrativeType

    const clickHandler = () => setOpenNarrative(false)

    return (
        <>
            {
                openNarrative && (
                    <>
                        <div className="absolute right-8 top-6 flex items-center justify-center w-[35px] h-[35px] bg-[#E7E7E7] bg-opacity-60 rounded-full z-[10002] cursor-pointer">
                            <XMarkIcon width={24} height={24} className=" text-black font-thin " onClick={clickHandler} />
                        </div>
                        <div className="absolute top-0 left-0 z-[1002] w-full h-full overflow-y-auto ">
                            <Introduction />
                            <Satellite />
                            <StreetView />
                            <Slider />
                            <Ending clickHandler={clickHandler}/>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Narrative