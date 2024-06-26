import mapboxgl, { MapMouseEvent } from "mapbox-gl";

import directionSVG from "../public/icons/direction.svg";
import markerSVG from "../public/icons/marker.svg";
export const markerCreator = (e: MapMouseEvent, m: mapboxgl.Map) => {

  let directionImg: HTMLImageElement | undefined;
  let markerImg: HTMLImageElement | undefined;

    if (typeof window !== 'undefined') { 
      directionImg = new Image(50, 50);
      markerImg = new Image(25, 25);
  
      directionImg.onload = () =>
        m?.addImage("directionImg", directionImg!, {
          sdf: true,
        });
      markerImg.onload = () =>
        m?.addImage("markerImg", markerImg!, {
          sdf: true,
        });
  
      directionImg.src = directionSVG.src;
      markerImg.src = markerSVG.src;
  
      if (m.hasImage("directionImg")) {
        m.removeImage("directionImg");
      }
      if (m.hasImage("markerImg")) {
        m.removeImage("markerImg");
      }
    }
  
    const direction = new mapboxgl.Marker(directionImg, {
      offset: [-0.5, -25],
    })
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .addTo(m);
  
    const marker = new mapboxgl.Marker(markerImg, {
      offset: [0, 0],
    })
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .addTo(m);
  
    return { direction, marker };
  };
