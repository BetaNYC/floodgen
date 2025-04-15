import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react'
import mapboxgl from 'mapbox-gl'

export type MapContextType = {
    map: mapboxgl.Map | null,
    setMap: Dispatch<SetStateAction<mapboxgl.Map | null>>,
    layersLoaded: boolean;
    setLayersLoaded: Dispatch<SetStateAction<boolean>>;
}

type Props = {
    children: ReactNode
}

const MapContext = createContext<MapContextType | null>(null)

const MapProvider = ({ children }: Props) => {
    const [map, setMap] = useState<mapboxgl.Map | null>(null)
    const [layersLoaded, setLayersLoaded] = useState(false);

    return (
        <MapContext.Provider value={{
            map,
            setMap,
            layersLoaded,
            setLayersLoaded
        }}>
            {children}
        </MapContext.Provider>
    )
}

export { MapContext, MapProvider }