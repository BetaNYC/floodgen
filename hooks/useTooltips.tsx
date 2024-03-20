import React, { useEffect, useContext } from 'react'

import { MapContext, MapContextType } from '@/contexts/MapContext'
import mapboxgl from 'mapbox-gl'

const useTooltips = () => {
    const { map } = useContext(MapContext) as MapContextType

    const CFPopups = new mapboxgl.Popup({
        offset: [0, -30],
        anchor: "bottom-left",
        closeButton: false,
        closeOnClick: true,
    })

    const SWPopups = new mapboxgl.Popup({
        offset: [0, -30],
        anchor: "bottom-left",
        closeButton: false,
        closeOnClick: true,
    })

    const EJAPopups = new mapboxgl.Popup({
        offset: [0, -30],
        anchor: "bottom-left",
        closeButton: false,
        closeOnClick: true,
    })

    const HEZPopups = new mapboxgl.Popup({
        offset: [0, -30],
        anchor: "bottom-left",
        closeButton: false,
        closeOnClick: true,
    })

    useEffect(() => {
        map?.on("mousemove", "coastal_flooding", () => {
            
        })
    })

}

export default useTooltips