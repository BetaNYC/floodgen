import React, { useContext, useState, useEffect } from 'react'

import { useMediaQuery } from 'react-responsive'


// import InfoTitle from './InfoTitle'
import InfoAbout from './InfoAbout'
import InfoCredit from './InfoCredit'

import Image from 'next/image'



const InfoBox = () => {


    const [selected, setSelected] = useState<'About' | "Credit">("About")
    const [boxShown, setBoxShown] = useState(false)


    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" })


    const selectedClickHandler = (s: 'About' | "Credit") => {
        setSelected(s)
    }

    const boxShownClickHandler = (b: boolean) => {
        setBoxShown(b)
    }


    return (
        <>
            <div className={`absolute top-[36%]  lg:top-0 w-full h-[64%] lg:h-full bg-white lg:bg-secondary_blue rounded-t-[1rem] lg:rounded-none z-30 overflow-y-auto ${boxShown ? "translate-y-0 duration-700" : "translate-y-full duration-700"}`}>
                <div className=' px-[1.125rem] lg:px-[4rem] pt-[3rem] lg:pt-[5rem] pb-[2rem] w-full rounded-t-[1rem]'>
                    <Image width={isDesktop ? 203 : 80} height={isDesktop ? 38.17 : 15.4} src="./logos/floodgen.svg" alt='floodgen' />
                    {/* <InfoTitle /> */}
                    <div className='lg:flex lg:mt-[4rem]'>
                        (<div className='flex lg:flex-col gap-[0.75rem] lg:gap-[1.125rem] lg:mr-[8.25rem] w-full lg:w-[12.68rem]'>
                            <div className={`w-[50%] text-heading lg:text-[1.625rem] text-title_black cursor-pointer ${selected === "About" && "pb-[0.05rem] font-bold border-b-[3px] border-primary_blue"}`} onClick={() => selectedClickHandler("About")}>About</div>
                            <div className={`w-[50%] text-heading lg:text-[1.625rem] text-title_black cursor-pointer ${selected === "Credit" && "pb-[0.05rem] font-bold border-b-[3px] border-primary_blue"}`} onClick={() => selectedClickHandler("Credit")}>Credit</div>
                        </div>)
                        {
                            selected === "About" ? <InfoAbout clickHandler={() => boxShownClickHandler(false)} /> : <InfoCredit />
                        }
                    </div>
                </div>
            </div>
            <div className='absolute top-[1.75rem] left-[1rem] lg:left-[calc(100%_-_4.5rem)] flex items-center justify-center w-[2.5rem] h-[2.5rem] bg-[rgba(255,255,255,.65)] z-30' onClick={() => boxShown ? boxShownClickHandler(false) : boxShownClickHandler(true)}>
                <Image width={18} height={12} src={boxShown ? "./icons/cross.svg" : "./icons/hamburger.svg"} alt='hamburger' className='cursor-pointer' />
            </div>
        </>
    )
}

export default InfoBox