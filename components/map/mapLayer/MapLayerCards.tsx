import React, { useContext, useState, Dispatch, SetStateAction, useEffect } from 'react'

import Image from 'next/image'

import { MapContext, MapContextType } from '../../../contexts/MapContext'

import MapLayerCard from './MapLayerCard'
import useHoverStatus from '@/hooks/useHoverStatus'

import { btnsType, LayerId, LayerTitle } from './MapLayer'

import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/16/solid'
import { useMediaQuery } from 'react-responsive'

type Props = {
    buttonClickHandler: (btn: btnsType) => void
}

const layers: {
    image: string,
    image_white: string,
    title: LayerTitle,
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
            image: "./icons/zone.svg",
            image_white: "./icons/zone_white.svg",
            title: "Hurricane Evacuation Zones",
            content: "Areas designated for evacuation depending on incoming hurricane tracks and projected coastal storm surges"
        },
        {
            image: "./icons/justice.svg",
            image_white: "./icons/justice_white.svg",
            title: "Disadvantaged Communities",
            content: "Communities that are associated with historical discrimination or disinvestment and vulnerable to potential climate change and pollution risks"
        },
        {
            image: "./icons/cd.svg",
            image_white: "./icons/cd_white.svg",
            title: "Council Districts",
            content: "The New York City Council is comprised of 51 council districts, each with 51 elected members"
        }
    ]


const MapLayerCards = ({ buttonClickHandler }: Props) => {

    const { map, layersLoaded } = useContext(MapContext) as MapContextType

    const { hovered, mouseEnterHandler, mouseLeaveHandler } = useHoverStatus(layers)

    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" })

    // Simplify clickHandler: Just call the parent's handler
    const clickHandler = (title: LayerTitle) => {
        buttonClickHandler(title);
    }

    // Comment out this useEffect as the parent MapLayer component handles layer visibility updates
    // useEffect(() => {
    //     if (!map || !layersLoaded) {
    //         // console.log(`[MapLayerCards] useEffect - Skipping layer update (Map ready: ${!!map}, Layers Loaded: ${layersLoaded})`);
    //         return;
    //     }
    //     // console.log("[MapLayerCards] useEffect - Running layer update...");
    //
    //     Object.keys(visibleLayers).forEach(id => {
    //         const currentLayerId = id as LayerId;
    //         const visibility = visibleLayers[currentLayerId] ? 'visible' : 'none';
    //         // Remove console log added previously
    //         // if (currentLayerId === 'disadvantaged_communities_fill' || currentLayerId === 'disadvantaged_communities_outline') {
    //         //     console.log(`[MapLayerCards] useEffect - Checking layer: ${currentLayerId}, Exists: ${!!map.getLayer(currentLayerId)}, Setting visibility to: ${visibility}`);
    //         // }
    //         if (map.getLayer(currentLayerId)) {
    //             map.setLayoutProperty(currentLayerId, 'visibility', visibility);
    //         } else {
    //             // Remove console warn added previously
    //             // if (visibleLayers[currentLayerId]) {
    //             //      console.warn(`[MapLayerCards] useEffect - Layer ${currentLayerId} not found on map.`);
    //             // }
    //         }
    //     });
    //
    //     // Enforce Layer Order
    //     // ... (Layer ordering logic removed for clarity, might need review if layer order becomes an issue)
    //
    // }, [visibleLayers, map, layersLoaded, setLastActiveLayerId]);


    return (
        <div className={`absolute lg:left-[1.875rem] bottom-0 lg:bottom-[1.875rem] flex flex-col justify-center px-[1rem] py-8 h-[50%] lg:h-[11rem] w-full lg:w-[58rem] bg-background_white rounded-[1rem] z-30 shadow-2xl`}>
            <div>
                <div className='flex justify-between items-center mb-5 w-full '>
                    <div className='font-bold text-heading text-black'>Flood Risk Map Layers</div>
                    <XMarkIcon className='w-6 h-6 text-black cursor-pointer' onClick={() => buttonClickHandler('Close')} />
                </div>

                <div className='grid grid-cols-2 lg:grid-cols-5 gap-4'>
                    {layers.map((layer, i) => {
                        const isHovered = hovered[i];
                        return (
                            <MapLayerCard
                                clicked={false}
                                image={isHovered ? layer.image_white : layer.image}
                                title={layer.title}
                                content={layer.content}
                                key={layer.title}
                                clickHandler={() => clickHandler(layer.title)}
                                mouseEnterHandler={() => mouseEnterHandler(i)}
                                mouseLeaveHandler={mouseLeaveHandler}
                            />
                        );
                    })}
                </div>
            </div>
        </div>

    )
}

export default MapLayerCards