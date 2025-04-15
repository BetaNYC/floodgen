import React, { useContext } from 'react'

import Image from 'next/image'

import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'

import { btnsType, LayerId } from './MapLayer'

import { XMarkIcon } from '@heroicons/react/16/solid'

type Props = {
    buttonClickHandler: (btn: btnsType) => void
    visibleLayers: Record<LayerId, boolean>;
}

function Legend({ buttonClickHandler, visibleLayers }: Props) {

    const { openStreetView } = useContext(StreetViewContext) as StreetViewType



    return (
        <div className={`absolute ${openStreetView ? "left-[10.971rem] bottom-[calc(50%_-_17.375rem)] lg:bottom-[1.875rem]" : "left-4 bottom-4"} lg:left-[1.875rem] lg:bottom-[1.875rem]  p-3  bg-background_white rounded-[1rem] z-20 shadow-2xl`}>
            <div className='flex justify-between items-start mb-4'>
                <div className='font-bold text-small lg:text-heading text-black'>Legend</div>
                <XMarkIcon className='w-6 h-6 text-black cursor-pointer' onClick={() => buttonClickHandler('Close')} />
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <div className='flex items-center gap-7 w-full'>
                    <div className='ml-2 w-3 h-3 bg-primary_blue rounded-full'></div>
                    <div className='text-small lg:text-medium text-black'>Flood prone neighborhood</div>
                </div>
                {
                    visibleLayers.coastal_flooding &&
                        (
                            <div className=''>
                                <div className='mb-2 text-small lg:text-medium text-black'>Coastal Flooding</div>
                                <div className='flex'>
                                    <div className='flex flex-col items-center'>
                                        <div className='w-20 h-6 bg-[#C1DFF3]'></div>
                                        <div className='font-regular text-[0.5rem] text-black'>0.2% annual chance <br /> flood event</div>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <div className='w-20 h-6 bg-[#7FBEE6]'></div>
                                        <div className='font-regular text-[0.5rem] text-black'>1% annual chance <br /> flood event</div>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <div className='w-20 h-6 bg-[#3B9CD9]'></div>
                                        <div className='font-regular text-[0.5rem] text-black'>1% annual chance <br /> flood event (coastal)</div>
                                    </div>
                                </div>
                            </div>
                        )
                }
                {
                     visibleLayers.stormwater_flooding && (
                            <div className=''>
                                <div className='mb-2 text-small lg:text-medium text-black'>Stormwater Flooding</div>
                                <div className='flex'>
                                    <div className='flex flex-col items-center'>
                                        <div className='w-20 h-6 bg-[#CCCCFF]'></div>
                                        <div className='font-regular text-[0.5rem] text-black'>Future High Tides</div>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <div className='w-20 h-6 bg-[#6766FF]'></div>
                                        <div className='font-regular text-[0.5rem] text-black'>Nuisance Flooding</div>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <div className='w-20 h-6 bg-[#0100FF]'></div>
                                        <div className='font-regular text-[0.5rem] text-black'>Deep & continuous <br/>Flooding</div>
                                    </div>

                                </div>
                            </div>
                        )
                }
                {
                    visibleLayers.hurricane_evacuation_zones &&
                            (
                                <div className=''>
                                    <div className='mb-2 text-small lg:text-medium text-black'>Hurricane Evacuation Zones</div>
                                    <div className='flex'>
                                        <div className='flex flex-col items-center'>
                                            <div className='w-12 h-6 bg-[#2F8890]'></div>
                                            <div className='font-regular text-[0.5rem] text-black'>1</div>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <div className='w-12 h-6 bg-[#529CA4]'></div>
                                            <div className='font-regular text-[0.5rem] text-black'>2</div>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <div className='w-12 h-6 bg-[#74B0B5]'></div>
                                            <div className='font-regular text-[0.5rem] text-black'>3</div>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <div className='w-12 h-6 bg-[#96C3C8]'></div>
                                            <div className='font-regular text-[0.5rem] text-black'>4</div>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <div className='w-12 h-6 bg-[#B9D7DA]'></div>
                                            <div className='font-regular text-[0.5rem] text-black'>5</div>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <div className='w-12 h-6 bg-[#D9E8EA]'></div>
                                            <div className='font-regular text-[0.5rem] text-black'>6</div>
                                        </div>
                                    </div>
                                </div>
                            )
                }
                {
                    (visibleLayers.disadvantaged_communities_fill || visibleLayers.disadvantaged_communities_outline) &&
                            (
                                <div className='flex items-center gap-3'>
                                    <div className={`w-5 lg:w-[1.63rem] h-5 lg:h-[1.63rem] border border-[#F7A848] bg-[#F7A848] bg-opacity-50`}></div>
                                    <div className='text-small lg:text-medium text-black'>Disadvantaged Communities</div>
                                </div>
                            )
                }

            </div>
        </div>
    )
}

export default Legend

// (
//     <div className='flex items-center gap-3'>
//         <div className={`w-5 lg:w-[1.63rem] h-5 lg:h-[1.63rem] ${layerName === "Coastal Flooding" ? "bg-secondary_blue" : layerName === "Stormwater Flooding" ? "bg-[#0100FF]" : "bg-[#F7A848]"}`}></div>
//         <div className='text-small lg:text-medium text-black'>{layerName}</div>
//     </div>
// )