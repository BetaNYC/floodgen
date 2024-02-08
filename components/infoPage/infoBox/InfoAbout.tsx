import React from 'react'


type Props = {
    clickHandler: () => void
}

const InfoAbout = ({ clickHandler }: Props) => {
    return (
        <>
            <div className='flex flex-col gap-5 lg:m-0'>
                <div className='lg:flex gap-14'>
                    <div className='flex flex-col mb-5 lg:mb-0'>
                        <h2 className='lg:order-2 lg:w-[22rem] font-bold lg:font-medium text-heading lg:text-[1.75rem] text-title_black'>Explore flood prone neighborhoods in NYC</h2>
                        <p className='lg:order-3 mt-2 mb-4 lg:max-w-[529px]  text-small lg:text-[1.375rem] text-content_black'>Explain why the project focuses on these areas. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <div className='lg:order-1 lg:mb-8 w-full lg:w-[529px] h-[110px] lg:h-[281px] rounded-[0.75rem] bg-gray'></div>
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='lg:order-2 lg:w-[30rem] font-bold lg:font-medium text-heading lg:text-[1.75rem] text-title_black'>Visualize flooding street view with AI generated flooding images </h2>
                        <p className='lg:order-3 mt-2 mb-4 lg:max-w-[529px] text-small lg:text-[1.375rem] text-content_black'>Explain why the project focuses on these areas. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <div className='lg:order-1 lg:mb-8 w-full lg:w-[529px] h-[110px] lg:h-[281px] rounded-[0.75rem] bg-gray'></div>
                    </div>
                </div>
                {/* <div className='mt-[1rem] lg:hidden'>
                <h2 className='font-bold text-heading text-title_black'>Area of research</h2>
                <div className='mt-[0.75rem]'>
                    <p className='text-medium text-content_black'>
                        Explain why the project focuses on these areas.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div> */}
                <button className='mt-2 py-5 lg:w-[10.68rem] font-semibold text-small lg:text-[1.5rem] text-white bg-primary_blue rounded-[2.5rem]' onClick={clickHandler}>Get Started</button>
            </div>
        </>
    )
}

export default InfoAbout