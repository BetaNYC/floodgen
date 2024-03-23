import React, { useContext, useState, useEffect } from 'react'

import { useMediaQuery } from 'react-responsive'

import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'
import { NarrativeContext, NarrativeType } from '@/contexts/NarrativeContext'

import { XMarkIcon, Bars3Icon } from '@heroicons/react/16/solid'

// import InfoTitle from './InfoTitle'
import InfoAbout from './InfoAbout'
import InfoCredit from './InfoCredit'
import InfoAI from './InfoAI'




const InfoBox = () => {


    const [selected, setSelected] = useState<'About' | "Credit" | 'Introduction' | 'AI'>("About")
    const [boxShown, setBoxShown] = useState(false)

    const { setOpenNarrative } = useContext(NarrativeContext) as NarrativeType
    const { setOpenStreetView, openStreetView } = useContext(StreetViewContext) as StreetViewType


    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" })


    const selectedClickHandler = (s: 'About' | "Credit" | "Introduction" | "AI") => {
        setSelected(s)
    }

    const boxShownClickHandler = (b: boolean) => {
        setBoxShown(b)
    }

    const narrativeClickHandler = () => {
        setOpenNarrative(true)
        setBoxShown(false)
        setOpenStreetView(false)
    }

    return (
        <>
            <div className={`absolute top-[0] lg:top-0 w-full h-[100%] lg:h-full bg-white lg:bg-secondary_blue rounded-t-[1rem] lg:rounded-none z-30 overflow-y-auto ${boxShown ? "translate-y-0 duration-700" : "translate-y-full duration-700"}`}>
                <div className=' px-5 lg:px-16 pt-8 lg:pt-[5rem] pb-8 w-full rounded-t-[1rem]'>
                    {/* <Image width={isDesktop ? 203 : 80} height={isDesktop ? 38.17 : 15.4} src="./logos/floodgen.svg" alt='floodgen' className='mb-2' /> */}
                    {
                        isDesktop ? <img src="/logos/floodgen.svg" alt="" className='mb-2 w-[203px] h-[38.17px]' /> :
                        <img src="/logos/floodgen.svg" alt="" className='mb-4 w-[80px] h-[15.4px]' /> 
                    }

                    {/* <InfoTitle /> */}
                    <div className='lg:flex lg:mt-8'>
                        <div className='grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:gap-5  text-[#9C9C9C] '>
                            <div className={`lg:w-[50%] font-bold text-4 lg:text-[1.5rem]  cursor-pointer ${selected === "About" && "pb-[0.05rem] text-title_black lg:border-b-[3px] border-primary_blue"}`} onClick={() => selectedClickHandler("About")}>About</div>
                            <div className={`lg:w-[50%] font-bold text-4 lg:text-[1.5rem]  cursor-pointer ${selected === "Introduction" && "pb-[0.05rem]  text-title_black lg:border-b-[3px] border-primary_blue"}`} onClick={narrativeClickHandler}>Introduction</div>
                            <div className={`lg:w-[50%] font-bold text-4 lg:text-[1.5rem]  cursor-pointer ${selected === "AI" && "pb-[0.05rem] text-title_black lg:border-b-[3px] border-primary_blue"}`} onClick={() => selectedClickHandler("AI")}>How to identify an AI generated image</div>
                            <div className={`lg:w-[50%] font-bold text-4 lg:text-[1.5rem]  cursor-pointer ${selected === "Credit" && "pb-[0.05rem] text-title_black lg:border-b-[3px] border-primary_blue"}`} onClick={() => selectedClickHandler("Credit")}>Credits</div>
                        </div>
                        {
                            selected === "About" ? <InfoAbout clickHandler={() => boxShownClickHandler(false)} /> :
                                selected === "AI" ? <InfoAI /> :
                                    <InfoCredit />
                        }
                    </div>
                </div>
            </div>
            <div className={`absolute top-6 ${openStreetView ? "left-4 lg:left-[calc(100%_-_3.5rem)]" : "left-[calc(100%_-_3.5rem)]"}  flex items-center justify-center w-10 h-10 bg-[rgba(255,255,255,.65)] z-40 shadow-2xl`} onClick={() => boxShown ? boxShownClickHandler(false) : boxShownClickHandler(true)}>
                {
                    boxShown ? <XMarkIcon className='w-6 h-6 text-black' /> : <Bars3Icon className='w-5 h-5 text-black' />
                }
            </div>
        </>
    )
}
// ${openStreetView ? "flex" : "hidden"}
export default InfoBox