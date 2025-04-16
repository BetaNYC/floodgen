import React, { useState, Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { MapContext, MapContextType } from '@/contexts/MapContext'

import MapLayerBtns from './MapLayerBtns'
import MapLayerCards from './MapLayerCards'
import Legend from './Legend'


export type btnsType = 'Layers' | 'Legend' | 'Close' | 'Coastal Flooding' | 'Hurricane Evacuation Zones' | 'Stormwater Flooding' | 'Disadvantaged Communities' | 'Council Districts'

// Update LayerId type
export type LayerId = 'coastal_flooding' | 'hurricane_evacuation_zones' | 'stormwater_flooding' | 'disadvantaged_communities_fill' | 'disadvantaged_communities_outline' | 'sites' | 'council_districts_outline' | 'council_districts_labels'

// Define the titles used in the UI, mapping potentially needed later
export type LayerTitle = 'Coastal Flooding' | 'Stormwater Flooding' | 'Disadvantaged Communities' | 'Hurricane Evacuation Zones' | 'Council Districts'

// Mapping from Title to relevant Layer IDs
const titleToLayerIds: Record<LayerTitle, LayerId[]> = {
    'Coastal Flooding': ['coastal_flooding'],
    'Stormwater Flooding': ['stormwater_flooding'],
    'Hurricane Evacuation Zones': ['hurricane_evacuation_zones'],
    'Disadvantaged Communities': ['disadvantaged_communities_outline', 'disadvantaged_communities_fill'], // Check both
    'Council Districts': ['council_districts_outline', 'council_districts_labels'], // Check both
};


const MapLayer = () => {
    const { map } = useContext(MapContext) as MapContextType
    const [clicked, setClicked] = useState<btnsType>("Layers")
    const [initialVisibleLayers] = useState<Record<LayerId, boolean>>({
        coastal_flooding: true,
        hurricane_evacuation_zones: false,
        stormwater_flooding: false,
        disadvantaged_communities_fill: false, // DAC fill initially off
        disadvantaged_communities_outline: false,
        sites: true,
        council_districts_outline: false,
        council_districts_labels: false
    });
    const [visibleLayers, setVisibleLayers] = useState(initialVisibleLayers);
    // State to track activation order for description logic
    const [activationOrder, setActivationOrder] = useState<LayerTitle[]>(['Coastal Flooding']); // Start with CF active
    // State to hold the title whose description should be shown
    const [titleForDescription, setTitleForDescription] = useState<LayerTitle | null>('Coastal Flooding');

    const btnsData: { title: btnsType, src: string, src_white: string }[] = [
        { title: 'Coastal Flooding', src: './icons/coastal.svg', src_white: './icons/coastal_white.svg' },
        { title: 'Hurricane Evacuation Zones', src: './icons/hurricane.svg', src_white: './icons/hurricane_white.svg' },
        { title: 'Stormwater Flooding', src: './icons/stormwater.svg', src_white: './icons/stormwater_white.svg' },
        { title: 'Disadvantaged Communities', src: './icons/communities.svg', src_white: './icons/communities_white.svg' },
        { title: 'Council Districts', src: './icons/cd.svg', src_white: './icons/cd_white.svg' }
    ]

    const buttonClickHandler = (btn: btnsType) => {
        // Handle panel switching
        if (btn === 'Layers' || btn === 'Legend' || btn === 'Close') {
            setClicked(btn);
             // Optionally reset description focus when switching panels or closing
             // setTitleForDescription(activationOrder.length > 0 ? activationOrder[activationOrder.length - 1] : null);
        } else {
            // Handle layer toggling and description update
            const clickedTitle = btn as LayerTitle;
            const prevVisibleLayers = { ...visibleLayers };
            let newVisibleLayers = { ...visibleLayers }; // Start with current state

            // --- Apply visibility logic (existing switch statement) ---
            switch (clickedTitle) {
                 case 'Coastal Flooding':
                    const isCFVisible = !prevVisibleLayers.coastal_flooding;
                    newVisibleLayers.coastal_flooding = isCFVisible;
                    if (isCFVisible) { newVisibleLayers.hurricane_evacuation_zones = false; }
                    break;
                case 'Hurricane Evacuation Zones':
                    const isHEZVisible = !prevVisibleLayers.hurricane_evacuation_zones;
                    newVisibleLayers.hurricane_evacuation_zones = isHEZVisible;
                    if (isHEZVisible) { newVisibleLayers.coastal_flooding = false; newVisibleLayers.stormwater_flooding = false; }
                    break;
                case 'Stormwater Flooding':
                    const isSFVisible = !prevVisibleLayers.stormwater_flooding;
                    newVisibleLayers.stormwater_flooding = isSFVisible;
                     if (isSFVisible) { newVisibleLayers.hurricane_evacuation_zones = false; }
                   break;
                case 'Disadvantaged Communities':
                    const isDACOutlineVisible = !prevVisibleLayers.disadvantaged_communities_outline;
                    newVisibleLayers.disadvantaged_communities_outline = isDACOutlineVisible;
                    if (isDACOutlineVisible) { newVisibleLayers.council_districts_outline = false; newVisibleLayers.council_districts_labels = false; }
                    break;
                case 'Council Districts':
                    const isCDVisible = !prevVisibleLayers.council_districts_outline;
                    newVisibleLayers.council_districts_outline = isCDVisible;
                    newVisibleLayers.council_districts_labels = isCDVisible;
                    if (isCDVisible) { newVisibleLayers.disadvantaged_communities_fill = false; newVisibleLayers.disadvantaged_communities_outline = false; }
                    break;
            }
            // --- Recalculate DAC Fill ---
             newVisibleLayers.disadvantaged_communities_fill =
                newVisibleLayers.disadvantaged_communities_outline &&
                !newVisibleLayers.hurricane_evacuation_zones &&
                !newVisibleLayers.council_districts_outline;


            // --- Update Activation Order ---
            let newActivationOrder = [...activationOrder];
            const titlesTurnedOff: LayerTitle[] = [];

            // Check each layer group based on titleToLayerIds
            Object.entries(titleToLayerIds).forEach(([titleStr, ids]) => {
                const title = titleStr as LayerTitle;
                const wasGroupActive = ids.some(id => prevVisibleLayers[id]);
                const isGroupNowActive = ids.some(id => newVisibleLayers[id]); // Check the *final* calculated state

                if (wasGroupActive && !isGroupNowActive) { // Group turned OFF
                    titlesTurnedOff.push(title);
                    newActivationOrder = newActivationOrder.filter(t => t !== title);
                } else if (!wasGroupActive && isGroupNowActive) { // Group turned ON
                     // Remove previous instance if any, and add to end
                    newActivationOrder = newActivationOrder.filter(t => t !== title);
                    newActivationOrder.push(title);
                }
            });

            // --- Determine new title for description ---
            // The last item in the updated order is the one whose description we show
            const newTitleDesc = newActivationOrder.length > 0 ? newActivationOrder[newActivationOrder.length - 1] : null;

            // --- Update States ---
            setVisibleLayers(newVisibleLayers); // Update visibility state
            setActivationOrder(newActivationOrder); // Update activation order
            setTitleForDescription(newTitleDesc); // Update description title

             console.log("[MapLayer.tsx] Updated Activation Order:", newActivationOrder);
             console.log("[MapLayer.tsx] Title for Description:", newTitleDesc);
             console.log("[MapLayer.tsx] Final State to be set:", newVisibleLayers);

        }
    }

    // Effect to synchronize visibleLayers state with Mapbox GL layers
    useEffect(() => {
        if (!map) return; // Map not ready yet

        // console.log("[MapLayer.tsx] Syncing layer visibility with map:", visibleLayers);
        Object.entries(visibleLayers).forEach(([layerId, isVisible]) => {
            if (map.getLayer(layerId)) {
                map.setLayoutProperty(layerId, 'visibility', isVisible ? 'visible' : 'none');
                // Add specific log for the labels layer
                if (layerId === 'council_districts_labels') {
                    console.log(`[MapLayer.tsx] Setting visibility for ${layerId} to: ${isVisible ? 'visible' : 'none'}`);
                }
            } else {
                // Optional: Warn if a layer ID in state doesn't exist on the map
                // This might happen briefly during loading or if IDs mismatch
                // if (isVisible) {
                //     console.warn(`[MapLayer.tsx] Layer ID "${layerId}" exists in state but not on map.`);
                // }
            }
        });

    }, [visibleLayers, map]); // Re-run whenever state or map changes

    return (
        <>
            <MapLayerBtns clicked={clicked} buttonClickHandler={buttonClickHandler} />
            {/* Pass only needed props */}
            {clicked === 'Layers' ?
                 <MapLayerCards
                     buttonClickHandler={buttonClickHandler}
                     visibleLayers={visibleLayers}
                     titleForDescription={titleForDescription} // Pass new state down
                 />
                 : clicked === 'Legend' ?
                 <Legend buttonClickHandler={buttonClickHandler} visibleLayers={visibleLayers} />
                 : null
            }
        </>
    )
}

export default MapLayer