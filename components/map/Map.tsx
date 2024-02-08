import React, { useState, useEffect, useRef, useContext } from 'react'
import mapboxgl from 'mapbox-gl'

import { MapContext, MapContextType } from '@/contexts/MapContext'

import MapLayer from './mapLayer/MapLayer'



const Map = () => {

    const mapContainer = useRef<HTMLInputElement>(null)
    const { setMap } = useContext(MapContext) as MapContextType


    const [lng, setLng] = useState(-73.913);
    const [lat, setLat] = useState(40.763);
    const [zoom, setZoom] = useState(11);

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoiYmV0YW55YyIsImEiOiJhdEk0RmZ3In0.z3ayA_ZWlFP7Co7h-T-6WQ"

        const m = new mapboxgl.Map({
            container: mapContainer.current || "",
            style: "mapbox://styles/betanyc/clrrs5fv200h101o87qwn1sw1",
            center: [lng, lat],
            zoom: zoom,
            minZoom: 6,
            maxZoom: 12,
            interactive: true,
            doubleClickZoom: false,
        })

        m.dragRotate.disable();
        m.touchZoomRotate.disableRotation();

        m.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

        m.on("move", () => {
            setLng(Number(m.getCenter().lng.toFixed(4)));
            setLat(Number(m.getCenter().lat.toFixed(4)));
            setZoom(Number(m.getZoom()));
        });

        m.on("load", () => {
            setMap(m)
        })
    }, [])


    return (
        <>
            <div className='absolute top-[50%] left-0 w-full h-[50vh] z-10' ref={mapContainer}></div>
            <MapLayer />
        </>
    )
}

export default Map