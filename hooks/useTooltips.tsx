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
        // const tooltip = d3.select("body").append("div").attr("class", "tooltip")
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });


        // const tooltipShowHandler = (content: string, e: MapMouseEvent & EventData) => {

        //     tooltip.html(content).style("visibility", "visible");
        //     tooltip
        //         /* @ts-ignore */
        //         .style("top", e.point.y - (tooltip.node().clientHeight + 5) + "px")
        //         /* @ts-ignore */
        //         .style("left", e.point.x - tooltip.node().clientWidth / 2.0 + "px")
        // }

        map?.on("mousemove", "coastal_flooding", (e: MapMouseEvent & EventData) => {
            console.log(e.features[0].properties.FLD_ZONE === "VE" ? 'aaa' : "failed")
            const content = `<div class="content">
            ${e.features[0].properties.FLD_ZONE === "VE" ? "<div class='zone' style='background:#3B9CD9'>1% annual chance flood event (coastal)</div>" :
                    e.features[0].properties.FLD_ZONE === "AE" ? "<div class='zone' style='background:#7FBEE6'>1% annual chance flood event</div>" :
                        "<div class='zone' style='background:#C1DFF3'>0.2% annual chance flood event</div>"
                }
                ${e.features[0].properties.FLD_ZONE === "VE" ? "<div class='description'>Areas along coasts that are subject to inundation by a 100-year flood event (1% annual chance)</div>" :
                    e.features[0].properties.FLD_ZONE === "AE" ? "<div class='description'>Areas that are subject to inundation by a 100-year flood event (1% annual chance)</div>" :
                        "<div class='description'>Areas between the limits of the base flood and the 500-year flood event (0.2% annual chance)</div>"
                }
            </div>`

            popup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(content).addTo(map);

        })

        map?.on("mousemove", "stormwater_flooding", (e: MapMouseEvent & EventData) => {
            const content = `<div class="content">
            ${e.features[0].properties.Flooding_Category === 1 ? "<div class='zone' style='background:#0100FF;color:white'>Deep & continuous flooding</div>" :
                    e.features[0].properties.Flooding_Category === 2 ? "<div class='zone' style='background:#6766FF;color:white'>Nuisance Flooding</div>" :
                        "<div class='zone' style='background:#CCCCFF;color:black'>Future High Tides</div>"
                }
                ${e.features[0].properties.Flooding_Category === 1 ? "<div class='description'>Moderate stormwater flood scenario of <span style='font-weight:bold'>1 ft. and greater flooding,</span> with the projected 2050 sea level rise (+2.5 ft)</div>" :
                    e.features[0].properties.Flooding_Category === 2 ? "<div class='description'>Moderate stormwater flood scenario of<span style='font-weight:bold'> greater than or equal to 4 in. and less than 1 ft. flooding,</span> with the projected 2050 sea level rise (+2.5 ft)</div>" :
                        "<div class='description'>scenario of the <span style='font-weight:bold'>future high tides</span>, with the projected 2050 sea level rise (+2.5 ft)</div>"
                }
                
            </div>`

            popup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(content).addTo(map);
        })


        map?.on("mousemove", "disadvantaged_communities", (e: MapMouseEvent & EventData) => {

            if (e.features[0].properties.DAC_Desig === "Designated as DAC") {
                const content = `<div class="content">
                <div class='zone' style='background:#F7A848'>Disadvantaged Communities</div>
                    <div class="description">Communities that are associated with historical discrimination or disinvestment and vulnerable to potential climate change and pollution risks</div>
                </div>`


                popup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(content).addTo(map);
            }
        })

        map?.on("mousemove", "hurricane_evacuation_zones", (e: MapMouseEvent & EventData) => {
            const content = `<div class="content">
            ${e.features[0].properties.hurricane_ === "1" ? "<div class='zone' style='background:#2F8890;color:white'>Hurricane Evacuation Zone 1</div>" :
                    e.features[0].properties.hurricane_ === "2" ? "<div class='zone' style='background:#529CA4'>Hurricane Evacuation Zone 2</div>" :
                        e.features[0].properties.hurricane_ === "3" ? "<div class='zone' style='background:#74B0B5'>Hurricane Evacuation Zone 3</div>" :
                            e.features[0].properties.hurricane_ === "4" ? "<div class='zone' style='background:#96C3C8'>Hurricane Evacuation Zone 4</div>" :
                                e.features[0].properties.hurricane_ === "5" ? "<div class='zone' style='background:#B9D7DA'>Hurricane Evacuation Zone 5</div>" :
                                    "<div class='zone' style='background:#D9E8EA'>Hurricane Evacuation Zone 6</div>"
                }
                ${e.features[0].properties.hurricane_ === "1" ? "<div class='description'>Areas with <span style='font-weight:bold'>high</span> threat of coastal flooding resulting from a storm surge</div>" :
                    e.features[0].properties.hurricane_ === "2" ? "<div class='description'>Areas with <span style='font-weight:bold'>high</span> threat of coastal flooding resulting from a storm surge</div>" :
                        e.features[0].properties.hurricane_ === "3" ? "<div class='description'>Areas with <span style='font-weight:bold'>moderate</span> threat of coastal flooding resulting from a storm surge</div>" :
                            e.features[0].properties.hurricane_ === "4" ? "<div class='description'>Areas with <span style='font-weight:bold'>moderate</span> threat of coastal flooding resulting from a storm surge</div>" :
                                e.features[0].properties.hurricane_ === "5" ? "<div class='description'>Areas with <span style='font-weight:bold'>mild</span> threat of coastal flooding resulting from a storm surge</div>" :
                                    "<div class='description'>Areas with <span style='font-weight:bold'>high</span> threat of coastal flooding resulting from a storm surge</div>"
                }
            </div>`
            if (+e.features[0].properties.hurricane_ <= 5) {
                popup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(content).addTo(map);
            }
        })

        map?.on("mouseenter", "sites", (e: MapMouseEvent & EventData) => {
            console.log(e.features[0].properties)
            const content = `<div class="sites">
                <div style='font-weight:500;font-size:14px;color:black'>${e.features[0].properties.Place}</div>
                <div style='font-weight:300;font-size:12px;color:black'>${e.features[0].properties["Case Study"]}</div>
                <div class='line'></div>
                <div class='sites_cta'>Click point to view predicted flood scenarios</div>
            </div>`
            popup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(content).addTo(map);
        })

        map?.on("mouseleave", "hurricane_evacuation_zones", () => popup.remove())
        map?.on("mouseleave", "disadvantaged_communities", () => popup.remove())
        map?.on("mouseleave", "stormwater_flooding", () => popup.remove())
        map?.on("mouseleave", "coastal_flooding", () => popup.remove())
        map?.on("mouseleave", "sites", () => popup.remove())
    }, [map])

}

export default useTooltips