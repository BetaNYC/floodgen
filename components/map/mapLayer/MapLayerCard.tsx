"use client"
import React, { useState } from 'react'

import Image from 'next/image'


type props = {
    clicked: boolean
    image: string
    title: floodingTypes
    content: string
    clickHandler: () => void
}


const MapLayerCard = ({ clicked, image, title, content, clickHandler }: props) => {
    return (
        <div className={`p-4 rounded-[16px] border-[1px] border-primary_blue cursor-pointer ${clicked ? "bg-primary_blue text-white" : " bg-secondary_blue text-black hover:bg-primary_blue hover:text-white"} `} onClick={clickHandler}>
            <Image
                src={image}
                width={30}
                height={30}
                alt={title}
            />
            <div className={`mt-4 w-[6.08rem] font-semibold text-small lg:text-medium `}>{title}</div>
            <div className={`mt-1 font-regular text-[0.625rem] `}>{content}</div>
        </div>
    )
}

export default MapLayerCard