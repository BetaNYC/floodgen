import React, { useState } from 'react'

import FloodingButton from './FloodingButton'
import Previous from '@/shared/Previous'
import Next from '@/shared/Next'

import Image from 'next/image'


type floodingTypes = 'Street View' | 'Minor Flooding' | "Moderate Flooding" | "Major Flooding"

const floodingBtnsData: {
    title: floodingTypes,
    src: string
}[] = [
        {
            title: 'Street View',
            src: './icons/street.svg',
        },
        {
            title: 'Minor Flooding',
            src: './icons/minor.svg',
        },
        {
            title: 'Moderate Flooding',
            src: './icons/minor.svg',
        },
        {
            title: 'Major Flooding',
            src: './icons/minor.svg',
        }
    ]


const StreetView = () => {

    const [clicked, setClicked] = useState({
        "Street View": false,
        "Minor Flooding": false,
        "Moderate Flooding": false,
        "Major Flooding": false,
    })

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

    return (
        <div className='absolute top-0 left-0 pt-[1.75rem] translate-y-[-100%] lg:pl-8 w-full h-[50%] bg-slate-400 z-20 '>
            <div className='flex gap-[1rem] ml-[4.5rem] lg:ml-[18.56rem] overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
                {/* <div className='flex items-center justify-center min-w-[2.5rem] h-[2.5rem] bg-[rgba(255,255,255,.65)] z-20'>
                    <Image width={18} height={12} src="./icons/hamburger.svg" alt='hamburger' className='cursor-pointer' />
                </div> */}
                {
                    floodingBtnsData.map(f => <FloodingButton key={f.title} clicked={clicked[f.title]} title={f.title} src={f.src} buttonClickHandler={() => floodingButtonClickHandler(f.title)} />)
                }
            </div>
            <div className='absolute top-[calc(50%_-_2.5rem)] left-4 lg:left-8 opacity-75'>
                <Previous />
            </div>
            <div className='absolute top-[calc(50%_-_2.5rem)] right-4 lg:right-8 opacity-75'>
                <Next />
            </div>
            {/* <Image width={80} height={80} src="./icons/fullscreen.svg" alt="fullscreen" className='absolute right-4 bottom-0 opacity-75 cursor-pointer' /> */}
        </div>
    )
}

export default StreetView