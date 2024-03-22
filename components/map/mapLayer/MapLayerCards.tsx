import React, { useContext, useState, Dispatch, SetStateAction, } from 'react'

import Image from 'next/image'

import { MapContext, MapContextType } from '../../../contexts/MapContext'

import MapLayerCard from './MapLayerCard'
import useHoverStatus from '@/hooks/useHoverStatus'

import { btnsType } from './MapLayer'

import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/16/solid'

type Props = {
    buttonClickHandler: (btn: btnsType) => void
    setLayerName: Dispatch<SetStateAction<floodingTypes>>
}

const layers: {
    image: string,
    image_white: string,
    title: floodingTypes,
    content: string,
}[] = [
        {
            image: "./icons/coastal.svg",
            image_white: "./icons/coastal_white.svg",
            title: "Coastal Flooding",
            content: "Coastal Flooding shows areas vulnerable to coastal flood from 1% annual chance storms and the 0.2% annual chance floodplain."
        },
        {
            image: "./icons/storm.svg",
            image_white: "./icons/storm_white.svg",
            title: "Stormwater Flooding",
            content: "Stormwater Flooding areas show scenarios of moderate stormwater flooding with 2050 sea level rise (+2.5 ft high estimate)."
        },
        {
            image: "./icons/justice.svg",
            image_white: "./icons/justice_white.svg",
            title: "Disadvantaged Communities",
            content: "Communities that are associated with historical discrimination or disinvestment and vulnerable to potential climate change and pollution risks"
        },
        {
            image: "./icons/zone.svg",
            image_white: "./icons/zone_white.svg",
            title: "Hurricane Evacuation Zones",
            content: "Areas designated for evacuation depending on incoming hurricane tracks and projected coastal storm surges"
        }
    ]


const MapLayerCards = ({ buttonClickHandler, setLayerName }: Props) => {

    const { map } = useContext(MapContext) as MapContextType

    const [clicked, setClicked] = useState(layers.map((l, i) => i === 0 ? true : false))

    const { hovered, mouseEnterHandler, mouseLeaveHandler } = useHoverStatus(layers)


    const clickHandler = (title: floodingTypes, index: number) => {
        const newClicked = [...clicked]
        newClicked.forEach((c, i) => i === index ? newClicked[i] = true : newClicked[i] = false)
        setClicked(newClicked)

        const titleID = title.toLowerCase().replaceAll(" ", "_")
        setLayerName(title)

        layers.forEach((l, i) => {
            const layerID = l.title.toLowerCase().replaceAll(" ", "_")
            layerID === titleID ? map?.setLayoutProperty(layerID, "visibility", "visible") : map?.setLayoutProperty(layerID, "visibility", "none")
        })
    }


    return (
        <div className={`absolute lg:left-[1.875rem] bottom-0 lg:bottom-[1.875rem] flex flex-col justify-center px-[1rem] py-8 h-[50%] lg:h-[11rem] w-full lg:w-[51.5rem] bg-background_white rounded-[1rem] z-30 shadow-2xl`}>
            {/* <div className='m-auto w-[5.5rem] h-[0.375rem] bg-[#D9D9D9] rounded-[23.62px]'></div> */}
            <div>
                <div className='flex justify-between items-center mb-5 w-full'>
                    <div className='font-bold text-heading text-black'>Flood Risk Map Layers</div>
                    <div className='flex gap-2 w-[28rem]'>
                        <InformationCircleIcon width={16} height={16} className='text-black' />
                        <div className='text-[0.75rem] text-black'>
                            {layers[clicked.findIndex(c => c === true)].content}
                        </div>
                    </div>
                    <XMarkIcon className='w-6 h-6 text-black cursor-pointer' onClick={() => buttonClickHandler('Close')} />
                </div>

                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                    {layers.map((layer, i) => <MapLayerCard clicked={clicked[i]} image={clicked[i] || hovered[i] ? layer.image_white : layer.image} title={layer.title} content={layer.content} key={layer.title} clickHandler={() => clickHandler(layer.title, i)} mouseEnterHandler={() => mouseEnterHandler(i)} mouseLeaveHandler={mouseLeaveHandler} />)}
                </div>
            </div>
        </div>

    )
}

export default MapLayerCards