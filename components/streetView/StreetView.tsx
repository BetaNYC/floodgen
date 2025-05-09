import React, { useState, useContext, useEffect } from 'react'

import FloodingButton from './FloodingButton'
import Order from '@/shared/Order'

import useHoverStatus from '@/hooks/useHoverStatus'
import useOnClickSites from '@/hooks/useOnClickSites'

import StreetInfo from './StreetInfo'


import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'
import { MarkerContext, MarkerContextType } from '@/contexts/MarkerContext'


import { ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/20/solid'

type floodingTypes = 'Street View' | 'Minor Flooding' | "Moderate Flooding" | "Major Flooding"

const floodingBtnsData: {
    title: floodingTypes,
    src: string
    src_white: string
}[] = [
        {
            title: 'Street View',
            src: './icons/street.svg',
            src_white: './icons/street_white.svg'
        },
        {
            title: 'Minor Flooding',
            src: './icons/minor.svg',
            src_white: './icons/minor_white.svg'
        },
        {
            title: 'Moderate Flooding',
            src: './icons/moderate.svg',
            src_white: './icons/moderate_white.svg'
        },
        {
            title: 'Major Flooding',
            src: './icons/extreme.svg',
            src_white: './icons/extreme_white.svg'
        }
    ]


const StreetView = () => {
    const { openStreetView,
        streetViewImgFloodHeight,
        setStreetViewImgFloodHeight,
        streetViewImgAngle,
        setStreetViewImgAngle,
        streetViewImgFullscreen,
        setstreetViewImgFullscreen,
        clicked,
        setClicked } = useContext(StreetViewContext) as StreetViewType
    const { direction, directionDegree, setDirectionDegree } = useContext(MarkerContext) as MarkerContextType
    const { id } = useOnClickSites()
    const { hovered, mouseEnterHandler, mouseLeaveHandler } = useHoverStatus(floodingBtnsData)

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const urlID = id < 10 ? `0${id}` : `${id}`






    const floodingButtonClickHandler = (title: floodingTypes) => {

        let newClicked = { ...clicked, "Street View": true } as {
            "Street View": boolean,
            "Minor Flooding": boolean,
            "Moderate Flooding": boolean,
            "Major Flooding": boolean,
        }

        (Object.keys(newClicked) as floodingTypes[]).forEach((c: floodingTypes) => c === title ? newClicked[c] = true : newClicked[c] = false)
        setClicked(newClicked)

        switch (title) {
            case "Street View":
                setStreetViewImgFloodHeight(0)
                break
            case "Minor Flooding":
                setStreetViewImgFloodHeight(1)
                break
            case "Moderate Flooding":
                setStreetViewImgFloodHeight(2)
                break
            case "Major Flooding":
                setStreetViewImgFloodHeight(3)
                break

        }
    }

    const changeStreetViewClickHandler = (o: 'previous' | 'next') => {
        const degree = 45
        switch (o) {
            case 'previous':
                direction!.setRotation(directionDegree - degree)
                setDirectionDegree(curr => curr - degree)
                if (streetViewImgAngle === 1) {
                    setStreetViewImgAngle(8)
                } else {
                    setStreetViewImgAngle(prev => prev - 1)
                }
                break
            case 'next':
                direction!.setRotation(directionDegree + degree)
                setDirectionDegree(curr => curr + degree)
                if (streetViewImgAngle === 8) {
                    setStreetViewImgAngle(1)
                } else {
                    setStreetViewImgAngle(prev => prev + 1)
                }
                break
        }



    }

    const fullScreenStreetViewClickHandler = (d: "open" | "close") => {
        d === "open" ? setstreetViewImgFullscreen(true) : setstreetViewImgFullscreen(false)

    }

    const streetViewDivClass = `absolute top-0 left-0 ${hasMounted && openStreetView ? "translate-y-0" : "translate-y-[-100%]"} w-[100vw] h-[65%] z-20 transition-all duration-[1500ms] ease-in-out`;
    const showFullscreen = hasMounted && streetViewImgFullscreen;

    return (
        <>
            <div className={streetViewDivClass}>
                {hasMounted && (
                    <>
                        <div className='w-full h-full overflow-hidden'>
                            <img src={`https://raw.githubusercontent.com/BetaNYC/floodgen-images/main/flood_image_output/${urlID}_F${streetViewImgFloodHeight}_V${streetViewImgAngle}.png`} alt="" className={`w-full h-[100%]   `} />
                        </div>

                        <div className='absolute top-6 left-[8rem] lg:left-[13rem] flex gap-4 ml-20 lg:ml-[0rem]'>
                            {
                                floodingBtnsData.map((f, i) => <FloodingButton key={f.title} clicked={clicked[f.title]} hovered={hovered[i]} title={f.title} src={clicked[f.title] || hovered[i] ? f.src_white : f.src} clickHandler={() => floodingButtonClickHandler(f.title)} mouseEnterHandler={() => mouseEnterHandler(i)} mouseLeaveHandler={mouseLeaveHandler} />)
                            }
                        </div>
                        <div className='absolute  bottom-10 left-[calc(50%_-_100px)] lg:left-[calc(50%_-_160px)] opacity-75'>
                            <Order order='previous' clickHandler={() => changeStreetViewClickHandler('previous')} />
                        </div>
                        <div className='absolute  bottom-10 left-[calc(50%_+_60px)] lg:left-[calc(50%)] opacity-75'>
                            <Order order='next' clickHandler={() => changeStreetViewClickHandler('next')} />
                        </div>
                        <StreetInfo openStreetView={openStreetView} />
                        <div className='absolute right-4  bottom-10 flex justify-center items-center w-[2.5rem] h-[2.5rem] bg-[rgba(255,255,255,0.65)] rounded-full cursor-pointer shadow-2xl' onClick={() => fullScreenStreetViewClickHandler("open")}>
                            <ArrowsPointingOutIcon className=' w-5 h-5 text-black opacity-75 cursor-pointer' />
                        </div>
                        <div className='absolute left-[calc(50%_-_45px)] lg:left-[calc(50%_-_105px)] bottom-10 px-4 py-2 font-bold text-[0.75rem] text-white bg-black bg-opacity-20'>Image {streetViewImgAngle}/8</div>
                        <img src="/logos/fg_logo.png" className='absolute right-2 bottom-2 w-[15px] h-[17.54px]' alt="" />
                    </>
                 )}
            </div>
            {
                showFullscreen && (
                    <div className='absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-70 z-30 '>
                        <div className='relative  md:w-[1347px] h-full md:h-[616px]'>
                            <img src={`https://raw.githubusercontent.com/BetaNYC/floodgen-images/main/flood_image_output/${urlID}_F${streetViewImgFloodHeight}_V${streetViewImgAngle}.png`} alt="" className='w-full h-full object-cover' />
                            <div className='absolute right-4 bottom-10 lg:top-10 flex justify-center items-center w-[2.5rem] h-[2.5rem] bg-[rgba(255,255,255,0.65)] rounded-full cursor-pointer shadow-2xl z-40' onClick={() => fullScreenStreetViewClickHandler("close")}>
                                <ArrowsPointingInIcon className=' w-5 h-5 text-black opacity-75 cursor-pointer' />
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default StreetView