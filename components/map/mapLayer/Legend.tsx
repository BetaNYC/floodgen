import React, { useContext } from 'react'

import Image from 'next/image'

import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'

function Legend() {

    const { openStreetView, setOpenStreetView } = useContext(StreetViewContext) as StreetViewType

    return (
        <div className={`absolute ${openStreetView ? "left-[10.971rem] bottom-[calc(50%_-_10.375rem)] lg:bottom-[1.875rem]" : "left-4 bottom-4"} lg:left-[1.875rem] lg:bottom-[1.875rem]  p-3 min-w-[10.5rem] bg-background_white rounded-[1rem] z-20`}>
            <div className='mb-4 w-full flex justify-between items-start '>
                <div className='font-bold text-small lg:text-heading text-black'>Legend</div>
                <Image
                    src="./icons/cross.svg"
                    width={15}
                    height={15}
                    alt='cross'
                />
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-3'>
                    <div className='w-5 lg:w-[1.63rem] h-5 lg:h-[1.63rem] bg-secondary_blue'></div>
                    <div className='text-small lg:text-medium text-black'>Coastal Flooding</div>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='w-5 lg:w-[1.63rem] h-5 lg:h-[1.63rem] bg-primary_blue'></div>
                    <div className='text-small lg:text-medium text-black'>Stormwater Flooding</div>
                </div>
                <div className='flex items-center gap-3'>
                    <Image width={20} height={20} src="./icons/area.svg" alt='area of interest' />
                    <div className='text-small lg:text-medium text-black'>Area of Interest</div>
                </div>
            </div>
        </div>
    )
}

export default Legend