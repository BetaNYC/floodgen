import React from 'react'

import Image from 'next/image'

function Legend() {
  return (
    <div className='p-[0.75rem] w-[10.5rem] bg-[#FBFBFB] rounded-[1rem]'>
        <div className='mb-[1rem] w-full flex justify-between items-start '>
            <div className='font-bold text-label_mobile text-black'>Legend</div>
            <Image 
                src="./icons/cross.svg"
                width={15}
                height={15}
                alt='cross'
            />
        </div>
        <div className='flex flex-col gap-[1rem]'>
            <div className='flex items-center gap-[0.75rem]'>
                <div className='w-[1.25rem] h-[1.25rem] bg-secondary_blue'></div>
                <div className='text-buttom_text text-black'>Coastal Flooding</div>
            </div>
            <div className='flex items-center gap-[0.75rem]'>
                <div className='w-[1.25rem] h-[1.25rem] bg-primary_blue'></div>
                <div className='text-buttom_text text-black'>Stormwater Flooding</div>
            </div>
            <div className='flex items-center gap-[0.75rem]'>
                <Image width={20} height={20} src="./icons/area.svg" alt='area of interest' />
                <div className='text-buttom_text text-black'>Area of Interest</div>
            </div>
        </div>
    </div>
  )
}

export default Legend