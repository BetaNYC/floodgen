import React from 'react'

import Image from 'next/image'

type Props = {
    clicked: boolean
    title: string
    src: string
    buttonClickHandler: () => void
}

const FloodingButton = ({ clicked, title, src, buttonClickHandler }: Props) => {
    return (
        <div className={`inline-flex items-center gap-[0.56rem] px-2 py-[0.5rem] min-w-[6.5625rem] max-h-[2.5rem] font-semibold text-small bg-opacity-80 rounded-[37px] cursor-pointer ${clicked ? "text-white bg-primary_blue" : "text-black bg-white "}`} onClick={buttonClickHandler}>
            <Image width={24} height={24} src={src} alt={title} className='' />
            <p className=''>{title}</p>
        </div>
    )
}

export default FloodingButton


