import React, { useState, useEffect, useRef, useContext } from 'react'
import mapboxgl from 'mapbox-gl'

import { MapContext, MapContextType } from '@/contexts/MapContext'
import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'

import MapLayer from './mapLayer/MapLayer'

import coastalFlooding from "../../public/data/CoastalFlood.geo.json"
import justiceArea from "../../public/data/EnvironmentalJusticeArea.geo.json"
import evacuationZone from "../../public/data/HurricaneEvacuationZones.geo.json"
import neightborhood from "../../public/data/2020_nys_neigborhood.geo.json"


const Map = () => {

    const mapContainer = useRef<HTMLInputElement>(null)
    const { setMap, setClickedCoord } = useContext(MapContext) as MapContextType
    const { openStreetView, setOpenStreetView } = useContext(StreetViewContext) as StreetViewType

    /* @ts-ignore */
    const coastalFloodingFeatures = (coastalFlooding).features
    /* @ts-ignore */
    const justiceAreaFeatures = (justiceArea).features
    /* @ts-ignore */
    const evacuationZoneFeatures = evacuationZone.features
    /* @ts-ignore */
    const neightborhoodFeatures = (neightborhood).features

    const [lng, setLng] = useState(-73.913);
    const [lat, setLat] = useState(40.763);
    const [zoom, setZoom] = useState(11);


    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string

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
                data: {
                    type: "FeatureCollection",
                    features: coastalFloodingFeatures,
                }
            })

            m.addSource('environmental_justice_areas', {
                type: 'geojson',
                data: {
                    type: "FeatureCollection",
                    features: justiceAreaFeatures,
                }
            })

            m.addSource('hurricane_evacuation_zones', {
                type: 'geojson',
                data: {
                    type: "FeatureCollection",
                    features: evacuationZoneFeatures
                }
            })

            m.addSource('stormwater_flooding', {
                type: 'geojson',
                data: {
                    type: "FeatureCollection",
                    features: evacuationZoneFeatures
                }
            })

            m.addSource('neighborhood', {
                type: 'geojson',
                data: {
                    type: "FeatureCollection",
                    features: neightborhoodFeatures,
                }
            })

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
                'id': 'try-out',
                'source': 'try-out',
                'type': 'circle',
                'paint': {
                    'circle-color': "#812948",
                    'circle-radius': 4,
                }
            })


            m.on("click", 'try-out', (e:) => {
                setOpenStreetView(true)
                setClickedCoord([e.lngLat.lng, e.lngLat.lat])
                setTimeout(() => {
                    m.flyTo({
                        center: [-73.913, 40.733],
                        duration: 1500
                    });
                }, 1500)
                const marker = new mapboxgl.Marker({
                    color: 'red'
                }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(m).setRotation(30)

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