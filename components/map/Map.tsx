import React, { useState, useEffect, useRef, useContext } from 'react'
import mapboxgl from 'mapbox-gl'

import { MapContext, MapContextType } from '@/contexts/MapContext'
import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'

import MapLayer from './mapLayer/MapLayer'



const Map = () => {

    const mapContainer = useRef<HTMLInputElement>(null)
    const { setMap } = useContext(MapContext) as MapContextType
    const { openStreetView, setOpenStreetView } = useContext(StreetViewContext) as StreetViewType

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

            m.addSource('try-out', {
                'type': 'geojson',
                'data': {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates:
                            [-73.913, 40.763]
                    },
                    properties: {},
                }
            })

            m.addLayer({
                'id': 'try-out',
                'source': 'try-out',
                'type': 'circle',
                'paint': {
                    'circle-color': "#812948",
                    'circle-radius': 4,
                }
            })


            m.on("click", 'try-out', () => {
                console.log('aaa')
                setOpenStreetView(true)
                setTimeout(() => {
                    m.flyTo({
                        center: [-73.913, 40.733],
                        duration: 1500
                    });
                }, 1500)

            })
        })
    }, [])


    return (
        <div className='relative w-full h-full'>
            <div className={`absolute left-0 w-full z-10 transition-all duration-[1500ms] ease-in-out  ${openStreetView ? "top-[50%] h-[50vh]" : "top-[0%] h-[100vh]"}`} ref={mapContainer}></div>
            <MapLayer />
        </div>
    )
}

export default Map