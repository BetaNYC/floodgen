import React, { useState, useEffect, useRef, useContext } from 'react'
import mapboxgl, { MapMouseEvent } from 'mapbox-gl'

import { MapContext, MapContextType } from '@/contexts/MapContext'
import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'
import { MarkerContext, MarkerContextType } from '@/contexts/MarkerContext'

import MapLayer from './mapLayer/MapLayer'
import { markerCreator } from '@/utils/markerCreator'


import coastalFlooding from "../../public/data/CoastalFlood.geo.json"
import justiceArea from "../../public/data/EnvironmentalJusticeArea.geo.json"
import evacuationZone from "../../public/data/HurricaneEvacuationZones.geo.json"
import neightborhood from "../../public/data/2020_nys_neigborhood.geo.json"
import sites from "../../public/data/floodgen_sites.geo.json"

import directionSVG from "../../public/icons/direction.svg"
import markerSVG from "../../public/icons/marker.svg"


const Map = () => {

    const mapContainer = useRef<HTMLInputElement>(null)
    const { setMap } = useContext(MapContext) as MapContextType
    const { openStreetView, setOpenStreetView } = useContext(StreetViewContext) as StreetViewType
    const { setDirection, setMarker, setDirectionDegree } = useContext(MarkerContext) as MarkerContextType

    const [lng, setLng] = useState(-73.913);
    const [lat, setLat] = useState(40.763);
    const [zoom, setZoom] = useState(11);


    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string

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

            let directionImg = new Image(50, 50)
            let markerImg = new Image(25, 25)

            directionImg.onload = () => m?.addImage('direcitonImg', directionImg, {
                sdf: true
            })
            directionImg.src = directionSVG.src

            markerImg.onload = () => m?.addImage('markerImg', markerImg, {
                sdf: true
            })
            markerImg.src = markerSVG.src


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


            m.on("click", 'sites', (e: MapMouseEvent) => {
                setOpenStreetView(true)
                setTimeout(() => {
                    m.flyTo({
                        center: [-73.913, 40.733],
                        duration: 1500
                    });
                }, 1500)

                const { direction, marker } = markerCreator(e, m, directionImg, markerImg)
                setDirectionDegree(0)
                setDirection(direction),
                setMarker(marker)
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