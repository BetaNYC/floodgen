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


const MapLayer = () => {
    const { map } = useContext(MapContext) as MapContextType
    const [clicked, setClicked] = useState<btnsType>("Layers")
    const [initialVisibleLayers] = useState<Record<LayerId, boolean>>({
        coastal_flooding: true,
        hurricane_evacuation_zones: false,
        stormwater_flooding: false,
        disadvantaged_communities_fill: false,
        disadvantaged_communities_outline: false,
        sites: true,
        council_districts_outline: false,
        council_districts_labels: false
    });
    const [visibleLayers, setVisibleLayers] = useState(initialVisibleLayers);
    // Revert lastActiveLayerId type
    const [lastActiveLayerId, setLastActiveLayerId] = useState<LayerId | null>('coastal_flooding');

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
        } else {
            // Handle layer toggling (existing logic)
            let newVisibleLayers = { ...visibleLayers };

            switch (btn) {
                case 'Coastal Flooding':
                    const isCFVisible = !visibleLayers.coastal_flooding;
                    newVisibleLayers.coastal_flooding = isCFVisible;
                    if (isCFVisible) { // If turning CF ON
                        newVisibleLayers.hurricane_evacuation_zones = false; // Turn HEZ OFF
                    }
                    break;
                case 'Hurricane Evacuation Zones':
                    const isHEZVisible = !visibleLayers.hurricane_evacuation_zones;
                    newVisibleLayers.hurricane_evacuation_zones = isHEZVisible;
                    if (isHEZVisible) { // If turning HEZ ON
                        newVisibleLayers.coastal_flooding = false; // Turn CF OFF
                        newVisibleLayers.stormwater_flooding = false; // Turn SF OFF
                    }
                    break;
                case 'Stormwater Flooding':
                    const isSFVisible = !visibleLayers.stormwater_flooding;
                    newVisibleLayers.stormwater_flooding = isSFVisible;
                     if (isSFVisible) { // If turning SF ON
                        newVisibleLayers.hurricane_evacuation_zones = false; // Turn HEZ OFF
                    }
                   break;
                case 'Disadvantaged Communities':
                    const isDACOutlineVisible = !visibleLayers.disadvantaged_communities_outline; // Toggle outline
                    newVisibleLayers.disadvantaged_communities_outline = isDACOutlineVisible;
                    // Fill visibility depends on outline AND other layers
                    // (Calculated below)
                    if (isDACOutlineVisible) { // If turning DAC ON
                        newVisibleLayers.council_districts_outline = false; // Turn CD OFF
                        newVisibleLayers.council_districts_labels = false;
                    }
                    break;
                case 'Council Districts':
                    const isCDVisible = !visibleLayers.council_districts_outline;
                    newVisibleLayers.council_districts_outline = isCDVisible;
                    newVisibleLayers.council_districts_labels = isCDVisible;
                    if (isCDVisible) { // If turning CD ON
                        newVisibleLayers.disadvantaged_communities_fill = false; // Turn DAC Fill OFF
                        newVisibleLayers.disadvantaged_communities_outline = false; // Turn DAC Outline OFF
                    }
                    break;
            }

            // --- Recalculate DAC Fill based on the latest state of other layers ---
            newVisibleLayers.disadvantaged_communities_fill = 
                newVisibleLayers.disadvantaged_communities_outline && 
                !newVisibleLayers.hurricane_evacuation_zones && 
                !newVisibleLayers.council_districts_outline;

            console.log("[MapLayer.tsx] Final State to be set:", newVisibleLayers);
            setVisibleLayers(newVisibleLayers);

            // The useEffect hook below will handle applying this state to the map layers.
            // Removed redundant map.setLayoutProperty calls from here.
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
                     // Remove unused props
                     // setVisibleLayers={setVisibleLayers}
                     // visibleLayers={visibleLayers}
                     // lastActiveLayerId={lastActiveLayerId}
                     // setLastActiveLayerId={setLastActiveLayerId}
                 />
                 : clicked === 'Legend' ?
                 <Legend buttonClickHandler={buttonClickHandler} visibleLayers={visibleLayers} />
                 : null
            }
        </>
    )
}

export default MapLayer