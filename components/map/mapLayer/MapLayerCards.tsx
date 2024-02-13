import React, { MouseEvent, useContext, useState } from 'react'

import { MapContext, MapContextType } from '../../../contexts/MapContext'

import MapLayerCard from './MapLayerCard'

// type FloodingTypes =
//   | "Coastal Floodin"
//   | "Storm Flooding"
//   | "Environmental Justice Areas"
//   | "Hurricane Evacuation Zone";


const MapLayerCards = () => {

    const { map } = useContext(MapContext) as MapContextType

    const layers: {
        image: string,
        title: floodingTypes,
        content: string,
    }[] = [
            {
                image: "./icons/coastal.svg",
                title: "Coastal Flooding",
                content: "Dry and low-lying land is submerged by seawater"
            },
            {
                image: "./icons/storm.svg",
                title: "Stormwater Flooding",
                content: "Caused by heavy rain and meltwater from hail and snow."
            },
            {
                image: "./icons/justice.svg",
                title: "Environmental Justice Areas",
                content: "Communities that are more vulnerable to flood risk due to being underserved historically"
            },
            {
                image: "./icons/zone.svg",
                title: "Hurricane Evacuation Zones",
                content: "Areas meant for evacuation purposes in case of a hurricane"
            }
        ]

    const clickHandler = (title: floodingTypes) => {
        const titleID = title.toLowerCase().replaceAll(" ", "_")

        layers.forEach((l, i) => {
            const layerID = l.title.toLowerCase().replaceAll(" ", "_")
            layerID === titleID ? map?.setPaintProperty(layerID, "fill-opacity", 1) : map?.setPaintProperty(layerID, "fill-opacity", 0)
        })



    }

    return (
        <div className={`absolute lg:left-[1.875rem] bottom-0 lg:bottom-[1.875rem] flex flex-col justify-center px-[1rem] py-[1.8125rem] h-[50%] lg:h-[16.375rem] w-full lg:w-[48rem] bg-background_white rounded-[1rem] z-30`}>
            {/* <div className='m-auto w-[5.5rem] h-[0.375rem] bg-[#D9D9D9] rounded-[23.62px]'></div> */}
            <div>
                <div className='mb-5 font-bold text-heading text-black'>Choose Map Layer</div>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                    {layers.map((layer, i) => <MapLayerCard clicked={false} image={layer.image} title={layer.title} content={layer.content} key={layer.title} clickHandler={() => clickHandler(layer.title)} />)}
                </div>
            </div>
        </div>

    )
}

export default MapLayerCards