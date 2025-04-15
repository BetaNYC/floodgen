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
    visibleLayers: Record<LayerId, boolean>;
    setVisibleLayers: Dispatch<SetStateAction<Record<LayerId, boolean>>>;
    lastActiveLayerId: LayerId | null;
    setLastActiveLayerId: Dispatch<SetStateAction<LayerId | null>>;
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


const MapLayerCards = ({ buttonClickHandler, setVisibleLayers, visibleLayers, lastActiveLayerId, setLastActiveLayerId }: Props) => {

    const { map, layersLoaded } = useContext(MapContext) as MapContextType

    const { hovered, mouseEnterHandler, mouseLeaveHandler } = useHoverStatus(layers)

    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" })

    const clickHandler = (title: LayerTitle, layerIdFromCard: string) => {
        setVisibleLayers(prev => {
            const newState = { ...prev };
            const layerId = layerIdFromCard as LayerId;
            const isCoastal = layerIdFromCard === 'coastal_flooding';
            const isStormwater = layerIdFromCard === 'stormwater_flooding';
            const isDacCard = title === 'Disadvantaged Communities';
            const isHurricane = layerIdFromCard === 'hurricane_evacuation_zones';
            const isFloodLayer = isCoastal || isStormwater;

            let layerIdToSetActive: LayerId | null = null;

            // --- Determine Action Based on Clicked Card ---
            if (isHurricane) {
                const turnOn = !prev.hurricane_evacuation_zones;
                newState.hurricane_evacuation_zones = turnOn;
                // If turning Hurricane ON, turn off Flood layers
                if (turnOn) {
                    newState.coastal_flooding = false;
                    newState.stormwater_flooding = false;
                    layerIdToSetActive = 'hurricane_evacuation_zones';
                }
                // Update DAC Fill based on NEW Hurricane state and CURRENT DAC Outline state
                newState.disadvantaged_communities_fill = newState.disadvantaged_communities_outline && !newState.hurricane_evacuation_zones;

            } else if (isDacCard) {
                const turnOn = !prev.disadvantaged_communities_outline;
                newState.disadvantaged_communities_outline = turnOn;
                // Update DAC Fill based on NEW DAC Outline state and CURRENT Hurricane state
                newState.disadvantaged_communities_fill = turnOn && !newState.hurricane_evacuation_zones;
                // DAC toggle does not affect Flood/Hurricane
                if (turnOn) layerIdToSetActive = 'disadvantaged_communities_outline';

            } else if (isFloodLayer) {
                const turnOn = !prev[layerId];
                newState[layerId] = turnOn;
                // If turning a Flood layer ON: turn off Hurricane
                if (turnOn) {
                    newState.hurricane_evacuation_zones = false;
                    // Update DAC Fill based on NEW Hurricane state (false) and CURRENT DAC Outline state
                    newState.disadvantaged_communities_fill = newState.disadvantaged_communities_outline && !newState.hurricane_evacuation_zones;
                    layerIdToSetActive = layerId;
                }
                 // Flood toggle doesn't affect other Flood or DAC Outline
            }

            // --- Update Last Active Layer ID ---
            if (layerIdToSetActive) {
                setLastActiveLayerId(layerIdToSetActive);
            } else {
                const currentVisible = Object.entries(newState)
                    .filter(([id, visible]) => visible && id !== 'disadvantaged_communities_fill')
                    .map(([id]) => id as LayerId);

                if (currentVisible.includes('hurricane_evacuation_zones')) {
                    setLastActiveLayerId('hurricane_evacuation_zones');
                } else if (currentVisible.includes('disadvantaged_communities_outline')) {
                    setLastActiveLayerId('disadvantaged_communities_outline');
                } else if (currentVisible.includes('stormwater_flooding')) {
                    setLastActiveLayerId('stormwater_flooding');
                } else if (currentVisible.includes('coastal_flooding')) {
                    setLastActiveLayerId('coastal_flooding');
                } else {
                    setLastActiveLayerId(null);
                }
            }

            return newState;
        });
    }

    useEffect(() => {
        if (!map || !layersLoaded) {
            // console.log(`[MapLayerCards] useEffect - Skipping layer update (Map ready: ${!!map}, Layers Loaded: ${layersLoaded})`);
            return;
        }
        // console.log("[MapLayerCards] useEffect - Running layer update...");

        Object.keys(visibleLayers).forEach(id => {
            const currentLayerId = id as LayerId;
            const visibility = visibleLayers[currentLayerId] ? 'visible' : 'none';
            // Remove console log added previously
            // if (currentLayerId === 'disadvantaged_communities_fill' || currentLayerId === 'disadvantaged_communities_outline') {
            //     console.log(`[MapLayerCards] useEffect - Checking layer: ${currentLayerId}, Exists: ${!!map.getLayer(currentLayerId)}, Setting visibility to: ${visibility}`);
            // }
            if (map.getLayer(currentLayerId)) {
                map.setLayoutProperty(currentLayerId, 'visibility', visibility);
            } else {
                // Remove console warn added previously
                // if (visibleLayers[currentLayerId]) {
                //      console.warn(`[MapLayerCards] useEffect - Layer ${currentLayerId} not found on map.`);
                // }
            }
        });

        // Enforce Layer Order
        if (visibleLayers.coastal_flooding && visibleLayers.stormwater_flooding) {
            // This condition should technically not be met with new logic, but keep as safety
            if (map.getLayer('stormwater_flooding') && map.getLayer('hurricane_evacuation_zones')) { // Ensure moving above hurricane if needed
                map.moveLayer('stormwater_flooding', 'hurricane_evacuation_zones');
            }
        }
        // Move DAC outline layer above flood/hurricane
        if (visibleLayers.disadvantaged_communities_outline) {
             if (map.getLayer('disadvantaged_communities_outline') && map.getLayer('sites')) {
                map.moveLayer('disadvantaged_communities_outline', 'sites');
             }
        }

    }, [visibleLayers, map, layersLoaded, setLastActiveLayerId]);


    return (
        <div className={`absolute lg:left-[1.875rem] bottom-0 lg:bottom-[1.875rem] flex flex-col justify-center px-[1rem] py-8 h-[50%] lg:h-[11rem] w-full lg:w-[51.5rem] bg-background_white rounded-[1rem] z-30 shadow-2xl`}>
            <div>
                <div className='flex justify-between items-center mb-5 w-full '>
                    <div className='font-bold text-heading text-black'>Flood Risk Map Layers</div>
                    {
                        isDesktop && <div className='flex gap-2 w-[30rem]'>
                            <img src="/icons/info.svg" alt="" className='w-6 h-6' />
                            <div className='text-[0.75rem] text-black'>
                                {(() => {
                                    let contentToShow = "Select a layer to see details.";
                                    const activeLayerIdForDesc = lastActiveLayerId && visibleLayers[lastActiveLayerId]
                                        ? lastActiveLayerId
                                        : (Object.keys(visibleLayers) as LayerId[]).find(id => visibleLayers[id]);

                                    if (activeLayerIdForDesc) {
                                        let titleForDesc: LayerTitle | undefined;
                                        if (activeLayerIdForDesc === 'disadvantaged_communities_fill' || activeLayerIdForDesc === 'disadvantaged_communities_outline') {
                                            titleForDesc = 'Disadvantaged Communities';
                                        } else if (activeLayerIdForDesc === 'coastal_flooding') {
                                            titleForDesc = 'Coastal Flooding';
                                        } else if (activeLayerIdForDesc === 'stormwater_flooding') {
                                            titleForDesc = 'Stormwater Flooding';
                                        } else if (activeLayerIdForDesc === 'hurricane_evacuation_zones') {
                                            titleForDesc = 'Hurricane Evacuation Zones';
                                        }
                                        if(titleForDesc) {
                                            contentToShow = layers.find(l => l.title === titleForDesc)?.content || contentToShow;
                                        }
                                    }
                                    return contentToShow;
                                })()}
                            </div>
                        </div>
                    }
                    <XMarkIcon className='w-6 h-6 text-black cursor-pointer' onClick={() => buttonClickHandler('Close')} />
                </div>

                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                    {layers.map((layer, i) => {
                        const cardLayerId = layer.title.toLowerCase().replaceAll(" ", "_");
                        const isClicked = layer.title === 'Disadvantaged Communities'
                            ? visibleLayers.disadvantaged_communities_outline
                            : visibleLayers[cardLayerId as LayerId];
                        const isHovered = hovered[i];
                        return (
                            <MapLayerCard
                                clicked={isClicked}
                                image={isClicked || isHovered ? layer.image_white : layer.image}
                                title={layer.title}
                                content={layer.content}
                                key={layer.title}
                                clickHandler={() => clickHandler(layer.title, cardLayerId)}
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