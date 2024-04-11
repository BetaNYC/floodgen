import React, { useState } from 'react'
import Image from 'next/image'

//@ts-ignore
import { Scrollama, Step } from "react-scrollama";



const Satellite = () => {
    const [_currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const onStepEnter = (data: number) => {
        setCurrentStepIndex(data)
    }
    return (
        <div className="">
            {/* <Scrollama offset={0.5} onStepEnter={onStepEnter}> */}
            {/* <Step data={1}> */}
            <div className='relative w-full h-[50%] md:h-full'>
                <img src="/imgs/narrative_two.png" className='w-full h-full' alt="" />
                <div className="absolute right-8 max-sm:left-8  md:right-12 bottom-[25%] md:bottom-16 px-5 py-7 md:w-[36rem] bg-black bg-opacity-[.65] rounded-lg">
                    <p className="mb-[1rem] font-semibold max-width-full text-[14px] md:text-[1.125rem] text-white">Maps of predicted flooding are helpful planning tools, but aerial views distance viewers from its potential impact</p>
                </div>
            </div>
            {/* </Step> */}
            {/* <Step data={2}> */}
            <div className='relative w-full h-[50%] md:h-full'>
                <img src="/imgs/narrative_three.png" className='w-full h-full' alt="" />
                {/* <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-40"></div> */}
                <div className="absolute left-11 bottom-[5%] flex flex-col items-center p-5 w-[50%] bg-black bg-opacity-[.65] rounded-lg">
                    <img src="/imgs/narrative_six.png" className='w-full h-[20%]' alt="" />
                    <p className="mt-2 font-semibold text-[14px] md:text-[1.125rem] text-white">If we show the reality of predicted flooding through photorealistic imagery, could people be more prepared?</p>
                </div>
            </div>
            {/* </Step> */}
            {/* </Scrollama> */}
        </div>
    )
}

export default Satellite