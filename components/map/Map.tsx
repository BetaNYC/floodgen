import React, { useState, useEffect, useRef, useContext } from 'react'
import mapboxgl, { MapMouseEvent } from 'mapbox-gl'

import { MapContext, MapContextType } from '@/contexts/MapContext'
import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'

import useOnClickSites from '@/hooks/useOnClickSites'

import MapLayer from './mapLayer/MapLayer'


import coastalFlooding from "../../public/data/CoastalFlood.geo.json"
import justiceArea from "../../public/data/EnvironmentalJusticeArea.geo.json"
import evacuationZone from "../../public/data/HurricaneEvacuationZones.geo.json"
import neightborhood from "../../public/data/2020_nys_neigborhood.geo.json"
import sites from "../../public/data/floodgen_sites.geo.json"




const Map = () => {

    const mapContainer = useRef<HTMLInputElement>(null)
    const { setMap } = useContext(MapContext) as MapContextType
    const { openStreetView} = useContext(StreetViewContext) as StreetViewType

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string
        const lng = -73.913;
        const lat = 40.763;
        const zoom = 11;

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

        m.on("load", () => {
            setMap(m)

            m.addSource("coastal_flooding", {
                type: 'geojson',
                data: coastalFlooding as GeoJSON.FeatureCollection
            })

            m.addSource('environmental_justice_areas', {
                type: 'geojson',
                data: justiceArea as GeoJSON.FeatureCollection
            })

            m.addSource('hurricane_evacuation_zones', {
                type: 'geojson',
                data: evacuationZone as GeoJSON.FeatureCollection
            })

            m.addSource('stormwater_flooding', {
                type: 'geojson',
                data: neightborhood as GeoJSON.FeatureCollection
            })

            m.addSource('neighborhood', {
                type: 'geojson',
                data: neightborhood as GeoJSON.FeatureCollection
            })

            m.addSource('sites', {
                type: 'geojson',
                data: sites as GeoJSON.FeatureCollection
            })


            m.addLayer({
                id: 'coastal_flooding',
                type: 'fill',
                source: 'coastal_flooding',
                paint: {
                    "fill-color": [
                        'case',
                        ['all', ['==', ['get', "FLD_ZONE"], "VE"]],
                        "#3B9CD9",
                        ['all', ['==', ['get', "FLD_ZONE"], "AE"]],
                        "#7FBEE6",
                        "#3C9CD9",
                    ],
                    'fill-opacity': 1
                }
            })

            m.addLayer({
                id: 'environmental_justice_areas',
                type: 'fill',
                source: 'environmental_justice_areas',
                paint: {
                    "fill-color": [
                        'case',
                        ['all', ['==', ['get', "ejdesignat"], "EJ Area"]],
                        "#F7A848",
                        ['all', ['==', ['get', "ejdesignat"], "Potential EJ Area"]],
                        "#FBD4A3",
                        'transparent'
                    ],
                    'fill-opacity': 0
                }
            })

            m.addLayer({
                id: 'hurricane_evacuation_zones',
                type: 'fill',
                source: 'hurricane_evacuation_zones',
                paint: {
                    "fill-color": [
                        'case',
                        ['all', ['==', ['get', "hurricane_"], "1"]],
                        "#2F8890",
                        ['all', ['==', ['get', "hurricane_"], "2"]],
                        "#529CA4",
                        ['all', ['==', ['get', "hurricane_"], "3"]],
                        "#74B0B5",
                        ['all', ['==', ['get', "hurricane_"], "4"]],
                        "#96C3C8",
                        ['all', ['==', ['get', "hurricane_"], "5"]],
                        "#B9D7DA",
                        ['all', ['==', ['get', "hurricane_"], "6"]],
                        "#D9E8EA",
                        'transparent'
                    ],
                    'fill-opacity': 0
                }
            })


            m.addLayer({
                id: 'stormwater_flooding',
                type: 'fill',
                source: 'stormwater_flooding',
                paint: {
                    "fill-color": [
                        'case',
                        ['all', ['==', ['get', "ejdesignat"], "EJ Area"]],
                        "#F7A848",
                        ['all', ['==', ['get', "ejdesignat"], "Potential EJ Area"]],
                        "#FBD4A3",
                        'transparent'
                    ],
                    'fill-opacity': 0
                }
            })

            m.addLayer({
                'id': 'neighborhood_outline',
                'type': 'line',
                'source': 'neighborhood',
                'layout': {},
                'paint': {
                    'line-color': 'black',
                    'line-width': .5,
                    'line-opacity': .3
                }
            });

            m.addLayer({
                'id': 'sites',
                'source': 'sites',
                'type': 'circle',
                'paint': {
                    'circle-color': "#306DDD",
                    'circle-radius': 6,
                }
            })
        })

    }, [])

    useOnClickSites()




    return (
        <div className='relative w-full h-full'>
            <div className={`absolute left-0 w-full z-10 transition-all duration-[1500ms] ease-in-out  ${openStreetView ? "top-[50%] h-[50vh]" : "top-[0%] h-[100vh]"}`} ref={mapContainer}></div>
            <MapLayer />
        </div>
    )
}

export default Map