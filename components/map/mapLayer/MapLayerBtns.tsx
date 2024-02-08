import React, { useState } from 'react'

import Image from 'next/image'

import Button from '@/shared/Button'
import Previous from '@/shared/Previous'
import { btnsType } from './MapLayer'

type Props = {
    clicked: {
        Layers: boolean,
        Legend: boolean
    },
    buttonClickHandler: (title: btnsType) => void
}

const MapLayerBtns = ({ clicked, buttonClickHandler }: Props) => {

    const btnsData: { src: string, src_selected: string, title: btnsType }[] = [
        {
            src: "./icons/layers.svg",
            src_selected: "./icons/layers_white.svg",
            title: "Layers"
        },
        {
            src: "./icons/legend.svg",
            src_selected: "./icons/legend_white.svg",
            title: "Legend"
        }
    ]

    return (
        <>
            <div className='  absolute top-[calc(50%_+_1.125rem)] left-4 flex items-center gap-4 z-20'>
                {/* <Image width={80} height={80} src="./icons/previous.svg" alt='previous' className='border-2 border-black' /> */}
                <Previous />
                <Button key={btnsData[0].title} title={btnsData[0].title} src={clicked['Layers'] ? btnsData[0].src_selected : btnsData[0].src} clicked={clicked[btnsData[0].title]} buttonClickHandler={() => buttonClickHandler(btnsData[0].title)} />
                <Button key={btnsData[1].title} title={btnsData[1].title} src={clicked['Legend'] ? btnsData[1].src_selected : btnsData[1].src} clicked={clicked[btnsData[1].title]} buttonClickHandler={() => buttonClickHandler(btnsData[1].title)} />
            </div>
        </>

    )
}

export default MapLayerBtns

//top- 2.625rem

{/* {
                btnsData.map(b => <Button key={b.title} title={b.title} src={b.src} clicked={clicked[b.title]} buttonClickHandler={() =>buttonClickHandler(b.title)} />)
            } */}