import React from 'react'

import Image from 'next/image'

function Legend() {
    return (
        <div className='absolute left-[1rem] lg:left-[1.875rem] bottom-[1rem] lg:bottom-[1.875rem] p-[0.75rem] min-w-[10.5rem] bg-background_white rounded-[1rem] z-20'>
            <div className='mb-[1rem] w-full flex justify-between items-start '>
                <div className='font-bold text-small lg:text-heading text-black'>Legend</div>
                <Image
                    src="./icons/cross.svg"
                    width={15}
                    height={15}
                    alt='cross'
                />
            </div>
            <div className='flex flex-col gap-[1rem]'>
                <div className='flex items-center gap-[0.75rem]'>
                    <div className='w-[1.25rem] lg:w-[1.63rem] h-[1.25rem] lg:h-[1.63rem] bg-secondary_blue'></div>
                    <div className='text-small lg:text-medium text-black'>Coastal Flooding</div>
                </div>
                <div className='flex items-center gap-[0.75rem]'>
                    <div className='w-[1.25rem] lg:w-[1.63rem] h-[1.25rem] lg:h-[1.63rem] bg-primary_blue'></div>
                    <div className='text-small lg:text-medium text-black'>Stormwater Flooding</div>
                </div>
                <div className='flex items-center gap-[0.75rem]'>
                    <Image width={20} height={20} src="./icons/area.svg" alt='area of interest' />
                    <div className='text-small lg:text-medium text-black'>Area of Interest</div>
                </div>
            </div>
        </div>
    )
}

export default Legend