import React, { useContext } from 'react'
import useHoverStatus from '@/hooks/useHoverStatus'

import Button from '@/shared/Button'
import { btnsType } from './MapLayer'
import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'


type Props = {
    clicked: btnsType
    buttonClickHandler: (title: btnsType) => void
}

const MapLayerBtns = ({ clicked, buttonClickHandler }: Props) => {

    const { openStreetView } = useContext(StreetViewContext) as StreetViewType

    const btnsData: { src: string, src_white: string, title: btnsType }[] = [
        {
            src: "./icons/layers.svg",
            src_white: "./icons/layers_white.svg",
            title: "Layers"
        },
        {
            src: "./icons/legend.svg",
            src_white: "./icons/legend_white.svg",
            title: "Legend"
        }
    ]

    const { hovered, mouseEnterHandler, mouseLeaveHandler } = useHoverStatus(btnsData)



    return (
        <>
            <div className={`absolute left-20 lg:left-4  flex items-center gap-4 transition-all duration-[1500ms] ease-in-out z-20 ${openStreetView ? " top-[calc(50%_+_1.125rem)]" : "top-[1.125rem]"}`}>
                {/* <Image width={80} height={80} src="./icons/previous.svg" alt='previous' className='border-2 border-black' /> */}
                {/* {
                    openStreetView && <Previous />
                } */}
                <Button key={btnsData[0].title} title={btnsData[0].title} src={clicked === 'Layers' || hovered[0] ? btnsData[0].src_white : btnsData[0].src} clicked={clicked === 'Layers'} hovered={hovered[0]} buttonClickHandler={() => buttonClickHandler('Layers')} mouseEnterHandler={() => mouseEnterHandler(0)} mouseLeaveHandler={mouseLeaveHandler} />
                <Button key={btnsData[1].title} title={btnsData[1].title} src={clicked === 'Legend' || hovered[1] ? btnsData[1].src_white : btnsData[1].src} clicked={clicked === 'Legend'} hovered={hovered[1]} buttonClickHandler={() => buttonClickHandler('Legend')} mouseEnterHandler={() => mouseEnterHandler(1)} mouseLeaveHandler={mouseLeaveHandler} />
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