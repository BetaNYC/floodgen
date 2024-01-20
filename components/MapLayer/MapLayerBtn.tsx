"use client"
import React, { useState } from 'react'

import Image from 'next/image'


type props = {
    clicked: boolean
    image: string
    title: string
    content: string
}


const MapLayerBtn = ({ clicked, image, title, content }: props) => {
    return (
        <div className={`p-[1rem] rounded-[16px] border-[1px] border-primary_blue cursor-pointer ${clicked ? "bg-primary_blue text-white" : " bg-secondary_blue text-black hover:bg-primary_blue hover:text-white"} `}>
            <Image
                src={image}
                width={30}
                height={30}
                alt={title}
            />
            <div className={`mt-[1rem] w-[6.08rem] font-semibold text-label_mobile `}>{title}</div>
            <div className={`mt-[0.25rem] font-regular text-[0.625rem] `}>{content}</div>
        </div>
    )
}

export default MapLayerBtn