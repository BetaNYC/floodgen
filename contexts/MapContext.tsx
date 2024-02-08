import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

import mapboxgl, { EventData, MapMouseEvent } from 'mapbox-gl';


export type MapContextType = {
    map: mapboxgl.Map | null,
    setMap: Dispatch<SetStateAction<mapboxgl.Map | null>>
    openStreetView: boolean,
    setOpenStreetView: Dispatch<SetStateAction<boolean>>
}

type Props = {
    children: ReactNode
}

const MapContext = createContext<MapContextType | null>(null)

const MapProvider = ({ children }: Props) => {

    const [map, setMap] = useState<mapboxgl.Map | null>(null)
    const [openStreetView, setOpenStreetView] = useState(false)

    return <MapContext.Provider value={{ map, setMap, openStreetView, setOpenStreetView }} >
        {children}
    </MapContext.Provider>
}

export { MapContext, MapProvider }