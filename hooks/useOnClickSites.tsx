import React, { useEffect, useContext } from 'react'
import mapboxgl, { MapMouseEvent } from 'mapbox-gl'

import { MapContext, MapContextType } from '@/contexts/MapContext'
import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'
import { MarkerContext, MarkerContextType } from '@/contexts/MarkerContext'

import { markerCreator } from '@/utils/markerCreator'



const useOnClickSites = () => {

  const { map } = useContext(MapContext) as MapContextType
  const { openStreetView, setOpenStreetView } = useContext(StreetViewContext) as StreetViewType
  const { setDirection, setMarker, setDirectionDegree } = useContext(MarkerContext) as MarkerContextType

  useEffect(() => {

    map?.on("click", 'sites', (e: MapMouseEvent) => {
      console.log('aaa')
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
      setDirection(direction)
      setMarker(marker)
    });




  }, [map, openStreetView]);

}

export default useOnClickSites