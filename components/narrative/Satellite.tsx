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
        <div className="relative w-full h-full">
            <img src="/imgs/narrative_two.png" className='w-full h-full' alt="" />
            <Scrollama offset={0.5} onStepEnter={onStepEnter}>
                <Step data={1}>
                    <div className="absolute right-12 bottom-16 px-5 py-7 w-[36rem] bg-black bg-opacity-[.65] rounded-lg">
                        <p className="mb-[1rem] font-semibold text-[2rem]">Maps of predicted flooding are helpful planning tools, but aerial views distance viewers from its potential impact</p>
                    </div>
                </Step>
                <Step data={2}>
                    <>
                        <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-40"></div>
                        <div className="absolute left-8 bottom-28 p-5 w-[52.75rem] bg-black bg-opacity-[.65] rounded-lg">
                            {/* <Image
                                src="/imgs/narrative_six.png"
                                width={804}
                                height={423.24}
                                alt="narrative_six"
                            /> */}
                            <img src="/imgs/narrative_six.png" className='w-[804px] h-[423.24px]' alt="" />
                            <p className="mt-2 font-semibold text-[2rem]">If we show the reality of predicted flooding through photorealistic imagery, could people be more prepared?</p>
                        </div>
                    </>
                </Step>

            </Scrollama>
        </div>

    )
}

export default Satellite