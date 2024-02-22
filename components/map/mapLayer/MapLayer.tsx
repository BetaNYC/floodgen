import React, { useState } from 'react'

import MapLayerBtns from './MapLayerBtns'
import MapLayerCards from './MapLayerCards'
import Legend from './Legend'


export type btnsType = 'Layers' | 'Legend' | 'Close'


const MapLayer = () => {

    const [clicked, setClicked] = useState<btnsType>('Legend')
    const buttonClickHandler = (title: btnsType) => setClicked(title)




    return (
        <>
            <MapLayerBtns clicked={clicked} buttonClickHandler={buttonClickHandler} />
            {clicked === 'Layers' ? <MapLayerCards buttonClickHandler={buttonClickHandler} /> : clicked === 'Legend' ? <Legend buttonClickHandler={buttonClickHandler} /> : null}
        </>
    )
}

export default MapLayer