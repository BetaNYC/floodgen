"use client"
import React, { useEffect, useContext, useState } from 'react'
import mapboxgl, { MapMouseEvent, EventData } from 'mapbox-gl'

import { MapContext, MapContextType } from '@/contexts/MapContext'
import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'
import { MarkerContext, MarkerContextType } from '@/contexts/MarkerContext'

import { markerCreator } from '@/utils/markerCreator'



const useOnClickSites = () => {

  const { map } = useContext(MapContext) as MapContextType
  const { openStreetView, setOpenStreetView, setStreetViewImgAngle, setStreetViewImgFloodHeight, setClicked } = useContext(StreetViewContext) as StreetViewType
  const { setDirection, setMarker, setDirectionDegree } = useContext(MarkerContext) as MarkerContextType

  const [id, setId] = useState(0)

  useEffect(() => {

    map?.on("click", 'sites', (e: MapMouseEvent & EventData) => {

      setId(e.features[0].properties.ID)
      if (!openStreetView) {
        setOpenStreetView(prevOpenStreetView => {
          if (!prevOpenStreetView) {
            setTimeout(() => {
              // Comment out flyTo to prevent automatic zoom/pan on click
              // map?.flyTo({
              //   center: [e.lngLat.lng, e.lngLat.lat-0.06],
              //   duration: 1500,
              //   zoom:12
              // });
              // map?.zoomIn({
              //   duration:1500
              // })
            }, 1500);
          }
          return true;
        });
      }


      const yaw = Math.round(e.features[0].properties.Yaw)

      const { direction, marker } = markerCreator(e, map)
      setDirectionDegree(yaw)
      setDirection(prevdirection => {
        prevdirection?.remove()
        return direction.setRotation(yaw)
      })
      setMarker(prevmarker => {
        prevmarker?.remove()
        return marker
      })
      setStreetViewImgAngle(1)
      setStreetViewImgFloodHeight(1)
      setClicked({
        "Street View": false,
        "Minor Flooding": true,
        "Moderate Flooding": false,
        "Major Flooding": false,
      })
    });




  }, [map, openStreetView]);


  return { id }

}

export default useOnClickSites