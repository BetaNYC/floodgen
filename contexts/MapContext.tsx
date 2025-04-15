import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react'
import mapboxgl from 'mapbox-gl'

export type MapDataType = {
    coastalFlooding?: GeoJSON.FeatureCollection;
    evacuationZone?: GeoJSON.FeatureCollection;
    disadvantagedCommunities?: GeoJSON.FeatureCollection;
    stormwaterFlooding?: GeoJSON.FeatureCollection;
    neighborhood?: GeoJSON.FeatureCollection;
    sites?: GeoJSON.FeatureCollection;
    councilDistricts?: GeoJSON.FeatureCollection;
}

export type MapContextType = {
    map: mapboxgl.Map | null,
    setMap: Dispatch<SetStateAction<mapboxgl.Map | null>>,
    mapLayerData: MapDataType;
    setMapLayerData: Dispatch<SetStateAction<MapDataType>>;
    layersLoaded: boolean;
    setLayersLoaded: Dispatch<SetStateAction<boolean>>;
    evacuationZone: null;
    disadvantagedCommunities: null;
    neighborhood: null;
    stormwaterFlooding: null;
    sites: null;
    councilDistricts: null;
}

type Props = {
    children: ReactNode
}

const MapContext = createContext<MapContextType | null>(null)

const MapProvider = ({ children }: Props) => {
    const [map, setMap] = useState<mapboxgl.Map | null>(null)
    const [mapLayerData, setMapLayerData] = useState<MapDataType>({
        coastalFlooding: undefined,
        evacuationZone: undefined,
        disadvantagedCommunities: undefined,
        neighborhood: undefined,
        stormwaterFlooding: undefined,
        sites: undefined,
        councilDistricts: undefined
    })
    const [layersLoaded, setLayersLoaded] = useState<boolean>(false)

    return (
        <MapContext.Provider value={{
            map,
            setMap,
            mapLayerData,
            setMapLayerData,
            layersLoaded,
            setLayersLoaded,
            evacuationZone: null,
            disadvantagedCommunities: null,
            neighborhood: null,
            stormwaterFlooding: null,
            sites: null,
            councilDistricts: null
        }}>
            {children}
        </MapContext.Provider>
    )
}

export { MapContext, MapProvider }