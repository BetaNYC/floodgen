import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

import mapboxgl, { EventData, MapMouseEvent } from 'mapbox-gl';


export type MapContextType = {
    map: mapboxgl.Map | null,
    marker:mapboxgl.Marker
    setMap: Dispatch<SetStateAction<mapboxgl.Map | null>>
}

type Props = {
    children: ReactNode
}

const MapContext = createContext<MapContextType | null>(null)

const MapProvider = ({ children }: Props) => {

    const [map, setMap] = useState<mapboxgl.Map | null>(null)
    const marker = new mapboxgl.Marker({
        color: 'red'
    })

    return <MapContext.Provider value={{ map, setMap , marker}} >
        {children}
    </MapContext.Provider>
}

export { MapContext, MapProvider }