import React, { useState } from 'react'

import MapLayerBtns from './MapLayerBtns'
import MapLayerCards from './MapLayerCards'
import Legend from './Legend'


export type btnsType = 'Layers' | 'Legend'


const MapLayer = () => {

    const [clicked, setClicked] = useState<btnsType>('Legend')

    const buttonClickHandler = (title: btnsType) => setClicked(title)
    // const newClicked = { ...clicked } as {
    //     Layers: boolean,
    //     Legend: boolean
    // }

    // (Object.keys(newClicked) as btnsType[]).forEach((c: btnsType) => c === title ? newClicked[c] = true : newClicked[c] = false)




    return (
        <>
            <MapLayerBtns clicked={clicked} buttonClickHandler={buttonClickHandler} />
            {clicked === 'Layers' ? <MapLayerCards /> : <Legend />}
        </>
    )
}

export default MapLayer