import React, { useState, Dispatch, SetStateAction } from 'react'

import MapLayerBtns from './MapLayerBtns'
import MapLayerCards from './MapLayerCards'
import Legend from './Legend'


export type btnsType = 'Layers' | 'Legend' | 'Close'

// Update LayerId type
export type LayerId = 'coastal_flooding' | 'stormwater_flooding' | 'disadvantaged_communities_fill' | 'disadvantaged_communities_outline' | 'hurricane_evacuation_zones';

// Define the titles used in the UI, mapping potentially needed later
export type LayerTitle = 'Coastal Flooding' | 'Stormwater Flooding' | 'Disadvantaged Communities' | 'Hurricane Evacuation Zones';


const MapLayer = () => {

    const [clicked, setClicked] = useState<btnsType>('Legend')
    // Update visibleLayers state
    const [visibleLayers, setVisibleLayers] = useState<Record<LayerId, boolean>>({
        coastal_flooding: true,
        stormwater_flooding: false,
        disadvantaged_communities_fill: false,
        disadvantaged_communities_outline: false,
        hurricane_evacuation_zones: false,
    });
    // Revert lastActiveLayerId type
    const [lastActiveLayerId, setLastActiveLayerId] = useState<LayerId | null>('coastal_flooding');

    const buttonClickHandler = (title: btnsType) => setClicked(title)

    return (
        <>
            <MapLayerBtns clicked={clicked} buttonClickHandler={buttonClickHandler} />
            {/* Pass original props structure */}
            {clicked === 'Layers' ?
                 <MapLayerCards
                     buttonClickHandler={buttonClickHandler}
                     setVisibleLayers={setVisibleLayers}
                     visibleLayers={visibleLayers}
                     lastActiveLayerId={lastActiveLayerId}
                     setLastActiveLayerId={setLastActiveLayerId}
                 />
                 : clicked === 'Legend' ?
                 <Legend buttonClickHandler={buttonClickHandler} visibleLayers={visibleLayers} />
                 : null
            }
        </>
    )
}

export default MapLayer