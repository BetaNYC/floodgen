import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

export type MarkerContextType = {
    marker: mapboxgl.Marker | null,
    setMarker: Dispatch<SetStateAction<mapboxgl.Marker | null>>
    markerDegree: number
    setMarkerDegree: Dispatch<SetStateAction<number>>
}


type Props = {
    children: ReactNode
}

const MarkerContext = createContext<MarkerContextType | null>(null)

const MarkerProvider = ({ children }: Props) => {
    const [marker, setMarker] = useState<mapboxgl.Marker | null>(null)
    const [markerDegree, setMarkerDegree] = useState(0)

    return <MarkerContext.Provider value={{ marker, setMarker, markerDegree, setMarkerDegree }} >
        {children}
    </MarkerContext.Provider>
}


export {MarkerContext, MarkerProvider}