import React, { useState } from 'react'

import MapLayerBtns from './MapLayerBtns'
import MapLayerCards from './MapLayerCards'
import Legend from './Legend'


export type btnsType = 'Layers' | 'Legend' | 'Close'


const MapLayer = () => {

    const [clicked, setClicked] = useState<btnsType>('Legend')
    const [layerName, setLayerName] = useState<floodingTypes>('Coastal Flooding')
    const buttonClickHandler = (title: btnsType) => setClicked(title)




    return (
        <>
            <MapLayerBtns clicked={clicked} buttonClickHandler={buttonClickHandler} />
            {clicked === 'Layers' ? <MapLayerCards buttonClickHandler={buttonClickHandler} setLayerName={setLayerName} layerName={layerName} /> : clicked === 'Legend' ? <Legend buttonClickHandler={buttonClickHandler} layerName={layerName} /> : null}
        </>
    )
}

export default MapLayer