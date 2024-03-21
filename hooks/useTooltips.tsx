import React, { useEffect, useContext } from 'react'

import { MapContext, MapContextType } from '@/contexts/MapContext'
import mapboxgl, { MapMouseEvent, EventData, LngLatLike } from 'mapbox-gl'
import "../components/map/Map.css"

import * as d3 from "d3"

type Props = {
    node: HTMLInputElement
}

const useTooltips = () => {
    const { map } = useContext(MapContext) as MapContextType


    useEffect(() => {
        const tooltip = d3.select("body").append("div").attr("class", "tooltip")
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });


        const tooltipShowHandler = (content: string, e: MapMouseEvent & EventData) => {

            tooltip.html(content).style("visibility", "visible");
            tooltip
                /* @ts-ignore */
                .style("top", e.point.y - (tooltip.node().clientHeight + 5) + "px")
                /* @ts-ignore */
                .style("left", e.point.x - tooltip.node().clientWidth / 2.0 + "px")
        }

        map?.on("mousemove", "coastal_flooding", (e: MapMouseEvent & EventData) => {
            const hoveredCoordinates = e.features[0].geometry.coordinates[0][0] as LngLatLike
            const content = `<div class="content">
            ${e.features[0].properties.FLD_ZONE === "VE" ? "<div class='cf_zone' style='background:#3C9CD9'>VE</div>" :
                    e.features[0].properties.FLD_ZONE === "AE" ? "<div class='cf_zone' style='background:#7FBEE6'>AE</div>" :
                        "<div class='cf_zone' style='background:#C1DFF3'>0.2% annual chance of flood hazard</div>"
                }
                <div class="description">Coastal Flooding Level</div>
            </div>`

            popup.setLngLat(hoveredCoordinates).setHTML(content).addTo(map);

        })

        map?.on("mousemove", "stormwater_flooding", (e: MapMouseEvent & EventData) => {
            const hoveredCoordinates = e.features[0].geometry.coordinates[0][0] as LngLatLike
            const content = `<div class="content">
            ${e.features[0].properties.Flooding_Category === 1 ? "<div class='cf_zone' style='background:#0100FF'>Deep & continuous flooding (1ft. and greater)</div>" :
                    e.features[0].properties.Flooding_Category === 2 ? "<div class='cf_zone' style='background:#6766FF'>Nuisance Flooding (greater or equal to 4 in. and less than 1ft)</div>" :
                        "<div class='cf_zone' style='background:#CCCCFF'>Future High Tides 2050</div>"
                }
                <div class="description">Stormwater Moderate Flood with 2050 Sea level Rise</div>
            </div>`

            popup.setLngLat(hoveredCoordinates).setHTML(content).addTo(map);
        })


        map?.on("mousemove", "environmental_justice_areas", (e: MapMouseEvent & EventData) => {
            const hoveredCoordinates = e.features[0].geometry.coordinates[0][0] as LngLatLike
            const content = `<div class="content">
            ${e.features[0].properties.ejdesignat === "EJ Area" ? "<div class='cf_zone' style='background:#F7A848'>Environmental Justice Areas</div>" :
                    "<div class='cf_zone' style='background:#FBD4A3'>Potential Environmental Justice Areas</div>"
                }
                <div class="description">Stormwater Moderate Flood with 2050 Sea level Rise</div>
            </div>`
            popup.setLngLat(hoveredCoordinates).setHTML(content).addTo(map);
        })

        map?.on("mousemove", "hurricane_evacuation_zones", (e: MapMouseEvent & EventData) => {
            const hoveredCoordinates = e.features[0].geometry.coordinates[0][0] as LngLatLike
            const content = `<div class="content">
            ${e.features[0].properties.hurricane_ === "1" ? "<div class='cf_zone' style='background:#2F8890'>Zone 1</div>" :
                    e.features[0].properties.hurricane_ === "2" ? "<div class='cf_zone' style='background:#529CA4'>Zone 2</div>" :
                        e.features[0].properties.hurricane_ === "3" ? "<div class='cf_zone' style='background:#74B0B5'>Zone 3</div>" :
                            e.features[0].properties.hurricane_ === "4" ? "<div class='cf_zone' style='background:#96C3C8'>Zone 4</div>" :
                                e.features[0].properties.hurricane_ === "5" ? "<div class='cf_zone' style='background:#B9D7DA'>Zone 5</div>" :
                                    "<div class='cf_zone' style='background:#D9E8EA'>Zone 6</div>"
                }
                <div class="description">Stormwater Moderate Flood with 2050 Sea level Rise</div>
            </div>`
            popup.setLngLat(hoveredCoordinates).setHTML(content).addTo(map);
        })

        map?.on("mouseleave", "hurricane_evacuation_zones", () => popup.remove())
        map?.on("mouseleave", "environmental_justice_areas", () => popup.remove())
        map?.on("mouseleave", "stormwater_flooding", () => popup.remove())
        map?.on("mouseleave", "coastal_flooding", () => popup.remove())
    }, [map])

}

export default useTooltips