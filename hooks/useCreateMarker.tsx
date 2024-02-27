import React, { useState, useContext } from "react";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";
import { MarkerContext, MarkerContextType } from '@/contexts/MarkerContext'

import directionSVG from "../public/icons/direction.svg"
import markerSVG from "../public/icons/marker.svg"

const useCreateMarker = (e: MapMouseEvent, m: mapboxgl.Map) => {
    const { setDirection, setMarker } = useContext(MarkerContext) as MarkerContextType


    let directionImg = new Image(50, 50)
    directionImg.onload = () => m.addImage('direciton', directionImg, {
        sdf: true
    })
    directionImg.src = directionSVG.src

    const direction = new mapboxgl.Marker(directionImg, {
        offset: [-.5, -25]
    }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(m)
    setDirection(direction)

    let markerImg = new Image(25, 25)
    markerImg.onload = () => m.addImage('marker', markerImg, {
        sdf: true
    })
    markerImg.src = markerSVG.src

    const marker = new mapboxgl.Marker(markerImg, {
        offset: [0, 0]
    }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(m)
    setMarker(marker)
}

export default useCreateMarker