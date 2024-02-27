import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";


export type MarkerContextType = {
    marker: mapboxgl.Marker | null,
    setMarker: Dispatch<SetStateAction<mapboxgl.Marker | null>>
    direction: mapboxgl.Marker | null,
    setDirection: Dispatch<SetStateAction<mapboxgl.Marker | null>>
    directionDegree: number
    setDirectionDegree: Dispatch<SetStateAction<number>>
}


type Props = {
    children: ReactNode
}

const MarkerContext = createContext<MarkerContextType | null>(null)

const MarkerProvider = ({ children }: Props) => {
    const [marker, setMarker] = useState<mapboxgl.Marker | null>(null)
    const [direction, setDirection] = useState<mapboxgl.Marker | null>(null)
    const [directionDegree, setDirectionDegree] = useState(0)



    return <MarkerContext.Provider value={{ marker, setMarker, direction, setDirection,directionDegree, setDirectionDegree }} >
        {children}
    </MarkerContext.Provider>
}


export { MarkerContext, MarkerProvider }