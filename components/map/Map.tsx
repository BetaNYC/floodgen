import React, { useState, useEffect, useRef, useContext } from 'react'
import mapboxgl, { MapMouseEvent, EventData } from 'mapbox-gl'
import { motion } from 'framer-motion'

import { MapContext, MapContextType } from '@/contexts/MapContext'
import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'
import { NarrativeContext, NarrativeType } from '@/contexts/NarrativeContext'
import { MarkerContext, MarkerContextType } from '@/contexts/MarkerContext'

import useOnClickSites from '@/hooks/useOnClickSites'
import sitesData from '../../public/data/floodgen_sites.geo.json' // Import sites data

import MapLayer from './mapLayer/MapLayer'

import useFetchMapLayerData from '@/hooks/useFetchMapLayerData'
import useTooltips from '@/hooks/useTooltips'

import { markerCreator } from '@/utils/markerCreator'

// Simple debounce function
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<F>): void => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => func(...args), waitFor);
    };
}

const Map = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const previousOpenStreetViewRef = useRef<boolean | null | undefined>(undefined); // Ref to track previous state

    const { map, setMap, setLayersLoaded } = useContext(MapContext) as MapContextType;
    const { openStreetView, setOpenStreetView, setStreetViewImgAngle, setStreetViewImgFloodHeight, setClicked, clicked } = useContext(StreetViewContext) as StreetViewType;
    const { openNarrative } = useContext(NarrativeContext) as NarrativeType;
    const { setDirection, setMarker, setDirectionDegree } = useContext(MarkerContext) as MarkerContextType;
    const { mapLayerData } = useFetchMapLayerData();
    const { id: clickedSiteId } = useOnClickSites(); // Get clicked site ID
    useTooltips();

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (!hasMounted || !mapLayerData.coastalFlooding || mapContainer.current === null || mapRef.current) {
            // Prevent re-initialization if map already exists
            return;
        }

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

        const lng = -73.913;
        const lat = 40.763;
        const zoom = 11;

        const m = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/betanyc/clrrs5fv200h101o87qwn1sw1",
            center: [lng, lat],
            zoom: zoom,
            minZoom: 10,
            maxZoom: 15,
            interactive: true,
            doubleClickZoom: false,
        });
        mapRef.current = m; // Store instance in ref

        m.dragRotate.disable();
        m.touchZoomRotate.disableRotation();

        m.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        // --- Setup ResizeObserver ---
        let debounceTimeoutId: ReturnType<typeof setTimeout> | null = null;
        const debouncedMapResize = debounce(() => {
            if (mapRef.current) {
                mapRef.current.resize();
                // console.log("[Map.tsx] Map resized via ResizeObserver.");
            }
        }, 100); // Debounce resize calls from observer

        const resizeObserver = new ResizeObserver(() => {
            // Call the debounced resize function when the container size changes
            debouncedMapResize();
        });

        let isInitialized = false;
        m.on("load", () => {
            if (isInitialized || !mapRef.current) return;
            isInitialized = true;

            setMap(mapRef.current);

            if (mapLayerData.coastalFlooding && mapRef.current.getSource("coastal_flooding") === undefined) {
                 mapRef.current.addSource("coastal_flooding", { type: 'geojson', data: mapLayerData.coastalFlooding });
            }
            if (mapLayerData.disadvantagedCommunities) mapRef.current.addSource('disadvantaged_communities', { type: 'geojson', data: mapLayerData.disadvantagedCommunities })
            if (!mapRef.current.getSource("hurricane_evacuation_zones") && mapLayerData.evacuationZone) mapRef.current.addSource('hurricane_evacuation_zones', { type: 'geojson', data: mapLayerData.evacuationZone })
            if (!mapRef.current.getSource("stormwater_flooding") && mapLayerData.stormwaterFlooding) mapRef.current.addSource('stormwater_flooding', { type: 'geojson', data: mapLayerData.stormwaterFlooding })
            if (!mapRef.current.getSource("neighborhood") && mapLayerData.neighborhood) mapRef.current.addSource('neighborhood', { type: 'geojson', data: mapLayerData.neighborhood })
            if (!mapRef.current.getSource("sites") && mapLayerData.sites) mapRef.current.addSource('sites', { type: 'geojson', data: mapLayerData.sites })
            // --- Add Council Districts Source ---
            if (!mapRef.current.getSource('council_districts') && mapLayerData.councilDistricts) {
                mapRef.current.addSource('council_districts', { type: 'geojson', data: mapLayerData.councilDistricts });
            }

            // --- Add DAC Fill Layer (Temporarily add at top) ---
            if (!mapRef.current.getLayer('disadvantaged_communities_fill') && mapRef.current.getSource('disadvantaged_communities')) {
                mapRef.current.addLayer({
                    id: 'disadvantaged_communities_fill',
                    type: 'fill',
                    source: 'disadvantaged_communities',
                    layout: { visibility: "none" },
                    paint: {
                        "fill-color": "#F7A848",
                        "fill-opacity": 0.2
                    }
                });
            }

            // --- Coastal Flooding Layer ---
            if (!mapRef.current.getLayer('coastal_flooding') && mapRef.current.getSource('coastal_flooding')) {
                mapRef.current.addLayer({
                    id: 'coastal_flooding',
                    type: 'fill',
                    source: 'coastal_flooding',
                    layout: {
                        visibility: "visible"
                    },
                    paint: {
                        "fill-color": [
                            'case',
                            ['all', ['==', ['get', "FLD_ZONE"], "VE"]],
                            "#3B9CD9",
                            ['all', ['==', ['get', "FLD_ZONE"], "AE"]],
                            "#7FBEE6",
                            "#C1DFF3",
                        ],
                        'fill-opacity': 1
                    }
                })
            }

            // --- Disadvantaged Communities OUTLINE Layer (Temporarily add at top) ---
            if (!mapRef.current.getLayer('disadvantaged_communities_outline') && mapRef.current.getSource('disadvantaged_communities')) {
                mapRef.current.addLayer({
                    id: 'disadvantaged_communities_outline',
                    type: 'line',
                    source: 'disadvantaged_communities',
                    layout: { visibility: "none" },
                    paint: {
                        "line-color": "#F7A848",
                        "line-width": 1.5
                    }
                });
            }

            // --- Hurricane Evacuation Zones Layer ---
            if (!mapRef.current.getLayer('hurricane_evacuation_zones') && mapRef.current.getSource('hurricane_evacuation_zones')) {
                mapRef.current.addLayer({
                    id: 'hurricane_evacuation_zones',
                    type: 'fill',
                    source: 'hurricane_evacuation_zones',
                    layout: {
                        visibility: "none"
                    },
                    paint: {
                        "fill-color": [
                            'case',
                            ['all', ['==', ['get', "hurricane_"], "1"]],
                            "#2F8890",
                            ['all', ['==', ['get', "hurricane_"], "2"]],
                            "#529CA4",
                            ['all', ['==', ['get', "hurricane_"], "3"]],
                            "#74B0B5",
                            ['all', ['==', ['get', "hurricane_"], "4"]],
                            "#96C3C8",
                            ['all', ['==', ['get', "hurricane_"], "5"]],
                            "#B9D7DA",
                            ['all', ['==', ['get', "hurricane_"], "6"]],
                            "#D9E8EA",
                            'transparent'
                        ],
                        'fill-opacity': 1
                    }
                })
            }

            // --- Stormwater Flooding Layer ---
            if (!mapRef.current.getLayer('stormwater_flooding') && mapRef.current.getSource('stormwater_flooding')) {
                mapRef.current.addLayer({
                    id: 'stormwater_flooding',
                    type: 'fill',
                    source: 'stormwater_flooding',
                    layout: {
                        visibility: "none"
                    },
                    paint: {
                        "fill-color": [
                            'case',
                            ['all', ['==', ['get', "Flooding_Category"], 1]],
                            "#0100FF",
                            ['all', ['==', ['get', "Flooding_Category"], 2]],
                            "#6766FF",
                            "#CCCCFF"
                        ],
                        "fill-opacity": 1
                    }
                })
            }

            // --- Add Council Districts Layer ---
            if (!mapRef.current.getLayer('council_districts_outline') && mapRef.current.getSource('council_districts')) {
                mapRef.current.addLayer({
                    id: 'council_districts_outline',
                    type: 'line',
                    source: 'council_districts',
                    layout: { visibility: 'none' }, // Initially hidden
                    paint: {
                        'line-color': '#3C4DD9', // Updated color
                        'line-width': 1.5
                    }
                });
            }

            // --- Add Sites Layer ---
            if (!mapRef.current.getLayer('sites') && mapRef.current.getSource('sites')) {
                mapRef.current.addLayer({
                    'id': 'sites',
                    'source': 'sites',
                    'type': 'circle',
                    'paint': {
                        'circle-color': "#306DDD",
                        'circle-radius': 8,
                    }
                })
            }

            // --- Add Council Districts Labels Layer (Moved after Sites) ---
            if (!mapRef.current.getLayer('council_districts_labels') && mapRef.current.getSource('council_districts')) {
                mapRef.current.addLayer({
                    id: 'council_districts_labels',
                    type: 'symbol',
                    source: 'council_districts',
                    layout: {
                        'visibility': 'none',
                        'text-field': ['to-string', ['get', 'CounDist']],
                        'text-size': 14,
                        'text-allow-overlap': false,
                        'text-ignore-placement': false,
                    },
                    paint: {
                        'text-color': '#3C4DD9',
                        'text-halo-color': '#FFFFFF',
                        'text-halo-width': 1.5,
                        'text-halo-blur': 0
                    }
                });
            }

            console.log("[Map.tsx] Map loaded, sources/layers added.");
            setLayersLoaded(true);

            // Start observing the map container *after* map is loaded
            if (mapContainer.current) {
                 resizeObserver.observe(mapContainer.current);
            }

            // Initial resize call after load - still useful
            setTimeout(() => {
                if (mapRef.current) {
                    mapRef.current.resize();
                }
            }, 50);
        });

        return () => {
            console.log("[Map.tsx] Cleaning up map and ResizeObserver.");
            // Disconnect observer
            resizeObserver.disconnect();
            
            // Clear debounce timeout
            if (debounceTimeoutId) {
                clearTimeout(debounceTimeoutId);
            }

            if (mapRef.current) {
                mapRef.current.remove();
            }
            mapRef.current = null;
            setMap(null);
            setLayersLoaded(false);
        };
    }, [hasMounted, mapLayerData, setMap, setLayersLoaded]);

    // --- Effect to pan map when Street View opens ---
    useEffect(() => {
        const justOpened = previousOpenStreetViewRef.current === false && openStreetView === true;

        // Use clickedSiteId and sitesData to find coordinates
        const clickedFeature = sitesData.features.find(site => site.properties.ID === clickedSiteId);
        const clickedCoords = clickedFeature?.geometry?.coordinates as [number, number] | undefined; // Extract coords [lng, lat]

        if (justOpened && map && clickedCoords && mapContainer.current) {
            // console.log("[Map.tsx] Street View opened for site ID:", clickedSiteId, "Coords:", clickedCoords);

            const mapHeight = mapContainer.current.clientHeight;
            const offsetY = mapHeight * 0.325;

            map.easeTo({
                center: clickedCoords, // Use extracted coordinates
                offset: [0, offsetY],
                duration: 1000,
            });
        }

        previousOpenStreetViewRef.current = openStreetView;

    }, [openStreetView, map, clickedSiteId, mapContainer]); // Update dependencies

    // --- Rendering ---

    // Restore conditional logo rendering
    const logoSrc = openNarrative || openStreetView ? "/logos/floodgen_logo_white.png" : "/logos/floodgen_logo.png"

    // --- Framer Motion Variants --- // No longer animating map size
    // const mapVariants = {
    //     open: { top: "65%", height: "35vh" },
    //     closed: { top: "0%", height: "100vh" },
    // };
    // const mapTransition = { duration: 1.5, ease: "easeInOut" };

    // Base classes for full-size map container
    const mapDivClass = `absolute left-0 top-0 w-full h-[100vh] z-10`;

    if (!hasMounted) {
        // Initial render state should also be full height
        return (
            <div className='relative w-full h-full'>
                <img src={logoSrc} className="absolute left-4 top-6 w-[155px] h-[38.75px] z-[999]" alt="FloodGen Logo" />
                <div className={`absolute left-0 w-full z-10 top-[0%] h-[100vh]`} id='map'></div>
            </div>
        );
    }

    return (
        <div className='relative w-full h-full'>
            <img src={logoSrc} className="absolute left-4 top-6 w-[155px] h-[38.75px] z-[999]" alt="FloodGen Logo" />
            {/* Wrap map container with motion.div */}
            <motion.div
                ref={mapContainer} // Attach ref here
                id="map"
                className={mapDivClass} // Apply base classes (should ensure top:0, h:100vh)
            >
                {/* Mapbox attaches to the element with ref=mapContainer */}
            </motion.div>
            {map && <MapLayer />}
        </div>
    )
}

export default Map