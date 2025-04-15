"use client"
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { LayerTitle } from './MapLayer' // Use LayerTitle type which includes Community Districts




type props = {
    clicked: boolean
    image: string
    title: LayerTitle
    content: string
    clickHandler: () => void
    mouseEnterHandler: () => void
    mouseLeaveHandler: () => void
}


const MapLayerCard = ({ clicked, image, title, content, clickHandler, mouseEnterHandler, mouseLeaveHandler }: props) => {

    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" })

    return (
        <div className={`p-4 lg:p-3 rounded-[16px] border-[1px] border-primary_blue cursor-pointer ${clicked ? "bg-primary_blue text-white" : " bg-secondary_blue text-black hover:bg-primary_blue hover:text-white"} `} onClick={clickHandler} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
            {/* <Image
                src={image}
                width={30}
                height={30}
                alt={title}
            /> */}
            <div className='lg:flex lg:gap-2 lg:items-center'>
                <img src={image} className='w-[1.875rem] h-[1.875rem]' alt={title} />
                <div className={`mt-4 lg:m-0 font-semibold text-small lg:text-medium `}>{title}</div>
            </div>
            {
                !isDesktop && <div className={`mt-1 font-regular text-[0.625rem]`}>{content}</div>
            }

        </div>
    )
}

export default MapLayerCard