import React, { useState, useEffect, useRef, useContext } from 'react'
import mapboxgl, { MapMouseEvent } from 'mapbox-gl'

import { MapContext, MapContextType } from '@/contexts/MapContext'
import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'

import useOnClickSites from '@/hooks/useOnClickSites'

import MapLayer from './mapLayer/MapLayer'

import useFetchMapLayerData from '@/hooks/useFetchMapLayerData'
import useTooltips from '@/hooks/useTooltips'



const Map = () => {

    const mapContainer = useRef<HTMLInputElement>(null)
    const { setMap } = useContext(MapContext) as MapContextType
    const { openStreetView } = useContext(StreetViewContext) as StreetViewType
    const { mapLayerData } = useFetchMapLayerData()
    useOnClickSites()
    useTooltips()

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string



        const lng = -73.913;
        const lat = 40.763;
        const zoom = 11;

        if (mapLayerData.coastalFlooding !== null) {
            const m = new mapboxgl.Map({
                container: mapContainer.current || "",
                style: "mapbox://styles/betanyc/clrrs5fv200h101o87qwn1sw1",
                center: [lng, lat],
                zoom: zoom,
                minZoom: 10,
                maxZoom: 15,
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
                    data: mapLayerData.coastalFlooding! as GeoJSON.FeatureCollection
                })

                m.addSource('disadvantaged_communities', {
                    type: 'geojson',
                    data: mapLayerData.disadvantagedCommunities! as GeoJSON.FeatureCollection
                })

                m.addSource('hurricane_evacuation_zones', {
                    type: 'geojson',
                    data: mapLayerData.evacuationZone! as GeoJSON.FeatureCollection
                })

                m.addSource('stormwater_flooding', {
                    type: 'geojson',
                    data: mapLayerData.stormwaterFlooding! as GeoJSON.FeatureCollection
                })


                m.addSource('neighborhood', {
                    type: 'geojson',
                    data: mapLayerData.neighborhood! as GeoJSON.FeatureCollection
                })

                m.addSource('sites', {
                    type: 'geojson',
                    data: mapLayerData.sites! as GeoJSON.FeatureCollection
                })


                m.addLayer({
                    id: 'coastal_flooding',
                    type: 'fill',
                    source: 'coastal_flooding',
                    layout: {
                        visibility: "visible"
                    },
                    paint: {
                        "fill-color": [
                            'case',
                            ['all', ['==', ['get', "FLD_ZONE"], "VE"]],
                            "#3B9CD9",
                            ['all', ['==', ['get', "FLD_ZONE"], "AE"]],
                            "#7FBEE6",
                            "#C1DFF3",
                        ],
                        'fill-opacity': 1
                    }
                })

                m.addLayer({
                    id: 'disadvantaged_communities',
                    type: 'fill',
                    source: 'disadvantaged_communities',
                    layout: {
                        visibility: "none"
                    },
                    paint: {
                        "fill-color": [
                            'case',
                            ['all', ['==', ['get', "DAC_Desig"], "Designated as DAC"]],
                            "#F7A848",
                            'transparent'
                        ],
                    }
                })

                m.addLayer({
                    id: 'hurricane_evacuation_zones',
                    type: 'fill',
                    source: 'hurricane_evacuation_zones',
                    layout: {
                        visibility: "none"
                    },
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
                        'fill-opacity': 1
                    }
                })


                m.addLayer({
                    id: 'stormwater_flooding',
                    type: 'fill',
                    source: 'stormwater_flooding',
                    layout: {
                        visibility: "none"
                    },
                    paint: {
                        "fill-color": [
                            'case',
                            ['all', ['==', ['get', "Flooding_Category"], 1]],
                            "#0100FF",
                            ['all', ['==', ['get', "Flooding_Category"], 2]],
                            "#6766FF",
                            "#CCCCFF"

                        ],
                        "fill-opacity": 1
                    }
                })

                // m.addLayer({
                //     'id': 'neighborhood_outline',
                //     'type': 'line',
                //     'source': 'neighborhood',
                //     'layout': {},
                //     'paint': {
                //         'line-color': 'black',
                //         'line-width': .5,
                //         'line-opacity': .3
                //     }
                // });

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
        }
    }, [mapLayerData])



    return (
        <div className=' relative w-full h-full'>
            <img src="/logos/floodgen_logo_white.png" className="absolute left-4 top-6 w-[155px] h-[38.75px] z-[999] " alt="logos_white" />
            <div className={`absolute left-0 w-full z-10 transition-all duration-[1500ms] ease-in-out  ${openStreetView ? "top-[65%] h-[35vh]" : "top-[0%] h-[100vh]"}`} ref={mapContainer} id='map'></div>
            <MapLayer />
        </div>
    )
}

export default Map