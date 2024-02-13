import React, { useState, useContext } from 'react'

import Image from 'next/image'

import Button from '@/shared/Button'
import Previous from '@/shared/Previous'
import { btnsType } from './MapLayer'

import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'

type Props = {
    clicked: btnsType
    buttonClickHandler: (title: btnsType) => void
}

const MapLayerBtns = ({ clicked, buttonClickHandler }: Props) => {

    const { openStreetView, setOpenStreetView } = useContext(StreetViewContext) as StreetViewType

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
            <div className={`absolute left-4 flex items-center gap-4 transition-all duration-[1500ms] ease-in-out z-20 ${openStreetView ? " top-[calc(50%_+_1.125rem)]" : "top-[1.125rem]"}`}>
                {/* <Image width={80} height={80} src="./icons/previous.svg" alt='previous' className='border-2 border-black' /> */}
                {
                    openStreetView && <Previous />
                }
                <Button key={btnsData[0].title} title={btnsData[0].title} src={clicked === 'Layers' ? btnsData[0].src_selected : btnsData[0].src} clicked={clicked === 'Layers'} buttonClickHandler={() => buttonClickHandler('Layers')} />
                <Button key={btnsData[1].title} title={btnsData[1].title} src={clicked=== 'Legend'? btnsData[1].src_selected : btnsData[1].src} clicked={clicked === 'Legend'} buttonClickHandler={() => buttonClickHandler('Legend')} />
            </div>
        </>

    )
}

export default MapLayerBtns

//
// 

{/* {
                btnsData.map(b => <Button key={b.title} title={b.title} src={b.src} clicked={clicked[b.title]} buttonClickHandler={() =>buttonClickHandler(b.title)} />)
            } */}