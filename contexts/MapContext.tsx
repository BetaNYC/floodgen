import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

import mapboxgl, { EventData, MapMouseEvent } from 'mapbox-gl';


export type MapContextType = {
    map: mapboxgl.Map | null,
    setMap: Dispatch<SetStateAction<mapboxgl.Map | null>>
    clickedCoord: number[]
    setClickedCoord: Dispatch<SetStateAction<number[] | []>>
}

type Props = {
    children: ReactNode
}

const MapContext = createContext<MapContextType | null>(null)

const MapProvider = ({ children }: Props) => {

    const [map, setMap] = useState<mapboxgl.Map | null>(null)
    const [clickedCoord, setClickedCoord] = useState<number[] | []>([])

    return <MapContext.Provider value={{ map, setMap, clickedCoord, setClickedCoord }} >
        {children}
    </MapContext.Provider>
}

export { MapContext, MapProvider }