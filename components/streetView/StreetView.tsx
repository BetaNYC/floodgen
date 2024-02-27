import React, { useState, useContext } from 'react'

import FloodingButton from './FloodingButton'
import Order from '@/shared/Order'

import useHoverStatus from '@/hooks/useHoverStatus'

import StreetInfo from './StreetInfo'


import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'
import { MarkerContext, MarkerContextType } from '@/contexts/MarkerContext'

import { ArrowsPointingOutIcon } from '@heroicons/react/20/solid'

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
            src: './icons/minor.svg',
            src_white: './icons/minor_white.svg'
        },
        {
            title: 'Major Flooding',
            src: './icons/minor.svg',
            src_white: './icons/minor_white.svg'
        }
    ]


const StreetView = () => {
    const { openStreetView, setOpenStreetView } = useContext(StreetViewContext) as StreetViewType
    const { marker, direction, directionDegree, setDirectionDegree } = useContext(MarkerContext) as MarkerContextType

    const [clicked, setClicked] = useState({
        "Street View": false,
        "Minor Flooding": false,
        "Moderate Flooding": false,
        "Major Flooding": false,
    })

    const { hovered, mouseEnterHandler, mouseLeaveHandler } = useHoverStatus(floodingBtnsData)


    const floodingButtonClickHandler = (title: floodingTypes) => {

        let newClicked = { ...clicked, "Street View": true } as {
            "Street View": boolean,
            "Minor Flooding": boolean,
            "Moderate Flooding": boolean,
            "Major Flooding": boolean,
        }

        (Object.keys(newClicked) as floodingTypes[]).forEach((c: floodingTypes) => c === title ? newClicked[c] = true : newClicked[c] = false)
        setClicked(newClicked)
    }

    const changeStreetViewClickHandler = (o: 'previous' | 'next') => {
        const degree = 45
        switch (o) {
            case 'previous':
                direction!.setRotation(directionDegree - degree)
                setDirectionDegree(curr => curr - degree)
                break
            case 'next':
                direction!.setRotation(directionDegree + degree)
                setDirectionDegree(curr => curr + degree)
                break
        }
    }

    const closeStreetViewClickHandler = () => {
        setOpenStreetView(false)
        setDirectionDegree(0)
        marker?.remove()
        direction?.remove()

    }

    return (
        <>
            <div className={`absolute top-0 left-0 pt-[1.75rem] ${openStreetView ? "translate-y-0" : "translate-y-[-100%]"}   lg:pl-8 w-full h-[50%] bg-slate-400 z-20 transition-all duration-[1500ms] ease-in-out`}>
                <div className='flex gap-[1rem] ml-[4.5rem] lg:ml-[18.56rem] overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
                    {/* <div className='flex items-center justify-center min-w-[2.5rem] h-[2.5rem] bg-[rgba(255,255,255,.65)] z-20'>
                    <Image width={18} height={12} src="./icons/hamburger.svg" alt='hamburger' className='cursor-pointer' />
                </div> */}
                    {
                        floodingBtnsData.map((f, i) => <FloodingButton key={f.title} clicked={clicked[f.title]} hovered={hovered[i]} title={f.title} src={clicked[f.title] || hovered[i] ? f.src_white : f.src} clickHandler={() => floodingButtonClickHandler(f.title)} mouseEnterHandler={() => mouseEnterHandler(i)} mouseLeaveHandler={mouseLeaveHandler} />)
                    }
                </div>
                <div className='absolute top-[calc(50%_-_2.5rem)] left-4 lg:left-8 opacity-75'>
                    <Order order='previous' clickHandler={() => changeStreetViewClickHandler('previous')} />
                </div>
                <div className='absolute top-[calc(50%_-_2.5rem)] right-4 lg:right-8 opacity-75'>
                    <Order order='next' clickHandler={() => changeStreetViewClickHandler('next')} />
                </div>
                <StreetInfo openStreetView={openStreetView} />
                <div className='absolute right-4 lg:right-8 bottom-10 flex justify-center items-center w-[2.5rem] h-[2.5rem] bg-[rgba(255,255,255,0.65)] rounded-full cursor-pointer shadow-2xl' onClick={closeStreetViewClickHandler}>
                    <ArrowsPointingOutIcon className=' w-5 h-5 text-black opacity-75 cursor-pointer' />
                </div>

                {/* <Image width={80} height={80} src="./icons/fullscreen.svg" alt="fullscreen" className='absolute right-4 bottom-0 opacity-75 cursor-pointer' /> */}
            </div>

        </>
    )
}

export default StreetView