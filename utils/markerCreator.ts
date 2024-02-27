import mapboxgl, { MapMouseEvent } from "mapbox-gl";

import directionSVG from "../public/icons/direction.svg"
import markerSVG from "../public/icons/marker.svg"

export const markerCreator = (e: MapMouseEvent, m: mapboxgl.Map, directionImg:HTMLElement, markerImg:HTMLElement) => {

    const direction = new mapboxgl.Marker(directionImg, {
        offset: [-.5, -25]
    }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(m)


    const marker = new mapboxgl.Marker(markerImg, {
        offset: [0, 0]
    }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(m)

    return { direction, marker }

}

