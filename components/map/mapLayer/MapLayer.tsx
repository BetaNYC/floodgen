import React, { useState } from 'react'

import MapLayerBtns from './MapLayerBtns'
import MapLayerCards from './MapLayerCards'
import Legend from './Legend'


export type btnsType = 'Layers' | 'Legend'


const MapLayer = () => {

    const [clicked, setClicked] = useState({
        Layers: false,
        Legend: true,
    })

    const buttonClickHandler = (title: btnsType) => {
        const newClicked = { ...clicked } as {
            Layers: boolean,
            Legend: boolean
        }

        (Object.keys(newClicked) as btnsType[]).forEach((c: btnsType) => c === title ? newClicked[c] = true : newClicked[c] = false)
        setClicked(newClicked)
    }


    return (
        <>
            <MapLayerBtns clicked={clicked} buttonClickHandler={buttonClickHandler} />
            {clicked['Layers'] ? <MapLayerCards /> : <Legend />}
        </>
    )
}

export default MapLayer