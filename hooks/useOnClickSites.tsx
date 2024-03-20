"use client"
import React, { useEffect, useContext, useState } from 'react'
import mapboxgl, { MapMouseEvent, EventData } from 'mapbox-gl'

import { MapContext, MapContextType } from '@/contexts/MapContext'
import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'
import { MarkerContext, MarkerContextType } from '@/contexts/MarkerContext'

import { markerCreator } from '@/utils/markerCreator'



const useOnClickSites = () => {

  const { map } = useContext(MapContext) as MapContextType
  const { openStreetView, setOpenStreetView } = useContext(StreetViewContext) as StreetViewType
  const { setDirection, setMarker, setDirectionDegree } = useContext(MarkerContext) as MarkerContextType

  const [id, setId] = useState(0)

  useEffect(() => {

    map?.on("click", 'sites', (e: MapMouseEvent & EventData) => {
      console.log(e.features[0].properties.ID)
      setId(18)
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



      const { direction, marker } = markerCreator(e, map)
      setDirectionDegree(0)
      setDirection(prevdirection => {
        prevdirection?.remove()
        return direction
      })
      setMarker(prevmarker => {
        prevmarker?.remove()
        return marker
      })
    });




  }, [map, openStreetView]);


  return {id}

}

export default useOnClickSites