import React, { useEffect, useContext, useRef } from 'react'

import { MapContext, MapContextType } from '@/contexts/MapContext'
import mapboxgl, { MapMouseEvent, EventData, LngLatLike } from 'mapbox-gl'
import "../components/map/Map.css"

import * as d3 from "d3"

type Props = {
    node: HTMLInputElement
}

const useTooltips = () => {
    const { map } = useContext(MapContext) as MapContextType
    const popupRef = useRef<mapboxgl.Popup | null>(null);

    useEffect(() => {

        // Helper to create/update popup - Reverted: Removed options/hidePointer
        const showPopup = (lngLat: LngLatLike, content: string) => {
            if (map) {
                if (popupRef.current) {
                    popupRef.current.remove();
                }
                // Reverted: Use default Popup constructor
                popupRef.current = new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
                    .setLngLat(lngLat)
                    .setHTML(content)
                    .addTo(map);
            }
        };

        // Helper to remove popup
        const removePopup = () => {
            if (popupRef.current) {
                popupRef.current.remove();
                popupRef.current = null;
            }
        };

        // --- Stormwater Flooding Handler ---
        const handleStormwaterMove = (e: MapMouseEvent & EventData) => {
             if (!e.features || e.features.length === 0 || !e.features[0].properties) {
                 removePopup();
                 return;
             }
             const category = e.features[0].properties.Flooding_Category;
             let zoneHTML = "";
             let descriptionHTML = "";

             if (category == 1) {
                 zoneHTML = "<div class='zone' style='background:#0100FF;color:white'>Deep & continuous flooding</div>";
                 descriptionHTML = "<div class='description'>Moderate stormwater flood scenario of <span style='font-weight:bold'>1 ft. and greater flooding,</span> with the projected 2050 sea level rise (+2.5 ft)</div>";
             } else if (category == 2) {
                 zoneHTML = "<div class='zone' style='background:#6766FF;color:white'>Nuisance Flooding</div>";
                 descriptionHTML = `<div class="description">Moderate stormwater flood scenario of between 4 and 12 in. of flooding, with the projected 2050 sea level rise (+2.5 ft.)</div>`; // Plain text version
             } else if (category == 3) {
                 zoneHTML = "<div class='zone' style='background:#CCCCFF;color:black'>Future High Tides</div>";
                 descriptionHTML = "<div class='description'>Moderate stormwater flood scenario of the <span style='font-weight:bold'>future high tides</span>, with the projected 2050 sea level rise (+2.5 ft)</div>";
             } else {
                 removePopup();
                 return;
             }

            const content = `<div class="content">${zoneHTML}${descriptionHTML}</div>`;
            if(zoneHTML && descriptionHTML) {
                 showPopup(e.lngLat, content);
            } else {
                 removePopup();
            }
        };

        // --- Coastal Flooding Handler ---
        const handleCoastalMove = (e: MapMouseEvent & EventData) => {
            if (!map || !e.features || e.features.length === 0 || !e.features[0].properties) {
                removePopup();
                return;
            }

            // Check if also hovering over a stormwater feature
            const stormwaterFeatures = map.queryRenderedFeatures(e.point, {
                layers: ['stormwater_flooding']
            });

            // If hovering over stormwater, prioritize its tooltip - do nothing here.
            if (stormwaterFeatures && stormwaterFeatures.length > 0) {
                return; // Exit early, let stormwater handler manage the popup
            }

            // Only proceed if NOT hovering over stormwater
            const props = e.features[0].properties;
            let zoneStyle = "";
            let zoneText = "";
            let descText = "";

            if (props.FLD_ZONE === "VE") {
                zoneStyle = "background:#3B9CD9";
                zoneText = "1% annual chance flood event (coastal)";
                descText = "Areas along coasts subject to inundation by 1% annual chance flood event.";
            } else if (props.FLD_ZONE === "AE") {
                zoneStyle = "background:#7FBEE6";
                zoneText = "1% annual chance flood event";
                descText = "Areas that are subject to inundation by a 100-year flood event (1% annual chance)";
            } else {
                zoneStyle = "background:#C1DFF3";
                zoneText = "0.2% annual chance flood event";
                descText = "Areas between the limits of the base flood and the 500-year flood event (0.2% annual chance)";
            }

            const content = `<div class="content"><div class='zone' style='${zoneStyle}'>${zoneText}</div><div class='description'>${descText}</div></div>`;
            // Reverted: Call original showPopup without options
            showPopup(e.lngLat, content);
        };

        // --- Disadvantaged Communities Handler ---
        const handleDisadvantagedMove = (e: MapMouseEvent & EventData) => {
             if (!e.features || e.features.length === 0 || !e.features[0].properties || e.features[0].properties.DAC_Desig !== "Designated as DAC") {
                 removePopup();
                 return;
             }
            const content = `<div class="content"><div class='zone' style='background:#F7A848'>Disadvantaged Communities</div><div class="description">Communities that are associated with historical discrimination or disinvestment and vulnerable to potential climate change and pollution risks</div></div>`;
            showPopup(e.lngLat, content);
        };

        // --- Hurricane Evacuation Zones Handler ---
        const handleHurricaneMove = (e: MapMouseEvent & EventData) => {
             if (!e.features || e.features.length === 0 || !e.features[0].properties || +e.features[0].properties.hurricane_ > 5) {
                 removePopup();
                 return;
             }
            const props = e.features[0].properties;
            const zoneNum = props.hurricane_;
            let zoneStyle = ""; let zoneText = ""; let descText = "";
            switch(zoneNum) {
                case "1": zoneStyle = "background:#2F8890;color:white"; zoneText = `Zone ${zoneNum}`; descText = "high threat"; break;
                case "2": zoneStyle = "background:#529CA4"; zoneText = `Zone ${zoneNum}`; descText = "high threat"; break;
                case "3": zoneStyle = "background:#74B0B5"; zoneText = `Zone ${zoneNum}`; descText = "moderate threat"; break;
                case "4": zoneStyle = "background:#96C3C8"; zoneText = `Zone ${zoneNum}`; descText = "moderate threat"; break;
                case "5": zoneStyle = "background:#B9D7DA"; zoneText = `Zone ${zoneNum}`; descText = "mild threat"; break;
                default: removePopup(); return;
            }
            const content = `<div class="content"><div class='zone' style='${zoneStyle}'>${zoneText}</div><div class='description'>Areas with <span style='font-weight:bold'>${descText}</span> of coastal flooding resulting from a storm surge</div></div>`;
            showPopup(e.lngLat, content);
        };

        // --- Sites Handler ---
        const handleSitesEnter = (e: MapMouseEvent & EventData) => {
            if (!e.features || e.features.length === 0 || !e.features[0].properties) {
                removePopup();
                return;
            }
            const props = e.features[0].properties;
            const content = `<div class="sites"><div style='font-weight:500;font-size:14px;color:black'>${props.Place}</div><div style='font-weight:300;font-size:12px;color:black'>${props["Case Study"]}</div><div class='line'></div><div class='sites_cta'>Click to view projected flood scenarios</div></div>`;
            showPopup(e.lngLat, content);
        };

        // --- Attach Listeners ---
        map?.on("mousemove", "stormwater_flooding", handleStormwaterMove);
        map?.on("mousemove", "coastal_flooding", handleCoastalMove);
        map?.on("mousemove", "disadvantaged_communities", handleDisadvantagedMove);
        map?.on("mousemove", "hurricane_evacuation_zones", handleHurricaneMove);
        map?.on("mouseenter", "sites", handleSitesEnter);

        // --- Attach Mouseleave Listeners ---
        map?.on("mouseleave", "stormwater_flooding", removePopup);
        map?.on("mouseleave", "coastal_flooding", removePopup);
        map?.on("mouseleave", "disadvantaged_communities", removePopup);
        map?.on("mouseleave", "hurricane_evacuation_zones", removePopup);
        map?.on("mouseleave", "sites", removePopup);

        // Cleanup function: Remove popup on unmount
        return () => {
            removePopup();
        };

    }, [map]) // Dependency array includes map

}

export default useTooltips