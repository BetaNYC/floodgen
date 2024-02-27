import React, { useEffect, useContext, useMemo } from 'react'
import mapboxgl, { MapMouseEvent } from 'mapbox-gl'

import { MapContext, MapContextType } from '@/contexts/MapContext'
import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'
import { MarkerContext, MarkerContextType } from '@/contexts/MarkerContext'

import { markerCreator } from '@/utils/markerCreator'

import directionSVG from "../public/icons/direction.svg"
import markerSVG from "../public/icons/marker.svg"

const useOnClickSites = () => {

  const { map } = useContext(MapContext) as MapContextType
  const { openStreetView, setOpenStreetView } = useContext(StreetViewContext) as StreetViewType
  const { setDirection, setMarker, setDirectionDegree } = useContext(MarkerContext) as MarkerContextType

  // let directionImg = new Image(50, 50)
  // let markerImg = new Image(25, 25)
  // useMemo(() => {
  //   directionImg.onload = () => map?.addImage('direcitonImg', directionImg, {
  //     sdf: true
  //   })
  //   directionImg.src = directionSVG.src

  //   markerImg.onload = () => map?.addImage('markerImg', markerImg, {
  //     sdf: true
  //   })
  //   markerImg.src = markerSVG.src
  // }, [])



  useEffect(() => {
    console.log(openStreetView);
    map?.on("click", 'sites', (e: MapMouseEvent) => {
      if (!openStreetView) {
        setOpenStreetView(prevOpenStreetView => {
          if (!prevOpenStreetView) {
            setTimeout(() => {
              map?.flyTo({
                center: [-73.913, 40.733],
                duration: 1500,
              });
            }, 1500);
          }
          return true;
        });
      }
    });


    // const { direction, marker } = markerCreator(e, map, directionImg, markerImg)
    // setDirectionDegree(0)
    // setDirection(direction)
    // setMarker(marker)

  }, [map, openStreetView]);

}

export default useOnClickSites