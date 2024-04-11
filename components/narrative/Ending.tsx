import React from 'react'

type Props = {
    clickHandler: () => void
}

const Ending = ({ clickHandler }: Props) => {
    return (
        <div className="relative w-full h-[50%] md:h-full">
            <img src="/imgs/narrative_six.png" alt="" className="w-full h-full" />
            <div className="absolute max-sm:right-4 left-4  md:left-8 bottom-[11rem] px-5 py-7 md:max-w-[50rem] bg-black bg-opacity-[.65] rounded-lg">
                <p className="font-semibold text-[14px] md:text-heading text-white">FloodGen uses AI to generate photorealistic images of potential flooding scenarios to raise awareness, bolster community preparedness, and support local governments resilience strategies.</p>
            </div>
            <button className='absolute left-8 bottom-[5rem] px-5 py-4 text-semibold text-[14px] md:text-[1.25rem] text-white bg-[#306DDD] rounded-[40px] cursor-pointer' onClick={clickHandler}>Explore FloodGen</button>
            <img src='/logos/fg_logo_white_sm.png' className='absolute right-6 bottom-4 z-30 w-8 h-8' />
        </div>
    )
}

export default Ending