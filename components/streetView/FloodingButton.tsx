import React from 'react'

import Image from 'next/image'

type Props = {
    clicked: boolean
    hovered: boolean
    title: string
    src: string
    clickHandler: () => void
    mouseEnterHandler: () => void
    mouseLeaveHandler: () => void
}

const FloodingButton = ({ clicked, hovered, title, src, clickHandler, mouseEnterHandler, mouseLeaveHandler }: Props) => {
    return (
        <div className={`inline-flex items-center gap-[0.56rem] px-2 py-[0.5rem] min-w-[6.5625rem] max-h-[2.5rem] font-semibold text-small bg-opacity-80 rounded-[37px] cursor-pointer shadow-2xl ${clicked || hovered ? "text-white bg-primary_blue" : "text-black bg-white "}`} onClick={clickHandler} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
            {/* <Image width={24} height={24} src={src} alt={title} className='' /> */}
            <img src={src} alt={title} className='w-6 h-6' />
            <p className=''>{title}</p>
        </div>
    )
}

export default FloodingButton


