import React from 'react'

const Ending = () => {
    return (
        <div className="relative w-full h-full">
            <img src="/imgs/narrative_six.png" alt="" className="w-full h-full" />
            <div className="absolute left-8 bottom-[11rem] px-5 py-7 max-w-[57rem] bg-black bg-opacity-[.65] rounded-lg">
                <p className="font-semibold text-[2rem]">FloodGen offers AI generative imagery that can show the predictable flooding, and improve preparedness</p>
            </div>
            <button className='absolute left-8 bottom-[5rem] px-5 py-4 text-semibold text-[1.5rem] bg-[#306DDD] rounded-[40px] cursor-pointer'>Explore Floodgen</button>
            <img src='/logos/fg_logo_white_sm.png' className='absolute right-6 bottom-4 z-30 w-8 h-8' />
        </div>
    )
}

export default Ending