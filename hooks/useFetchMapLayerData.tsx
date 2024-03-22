import React, { useState, useEffect, Dispatch, SetStateAction, } from 'react'

import axios from 'axios'

const useFetchMapLayerData = () => {
    const [mapLayerData, setMapLayerData] = useState({
        coastalFlooding: null,
        evacuationZone: null,
        disadvantagedCommunities: null,
        neighborhood: null,
        stormwaterFlooding: null,
        sites: null
    })

    useEffect(() => {
        const fetchMapLayerData = async () => {
            const resCoastalFlooding = await axios.get("./data/CoastalFlood.geo.json")
            const resDisadvantagedCommunities = await axios.get("./data/DisadvantagedCommunities.geo.json")
            const resEvacuationZone = await axios.get("./data/HurricaneEvacuationZones.geo.json")
            const resNeighborhood = await axios.get("./data/2020_nys_neigborhood.geo.json")
            const resStormwaterFlooding = await axios.get("./data/StormwaterFlooding_Moderate2050.geo.json")
            const resSites = await axios.get("./data/floodgen_sites.geo.json")

            setMapLayerData({
                ...mapLayerData,
                coastalFlooding: resCoastalFlooding.data,
                disadvantagedCommunities: resDisadvantagedCommunities.data,
                evacuationZone: resEvacuationZone.data,
                neighborhood: resNeighborhood.data,
                stormwaterFlooding: resStormwaterFlooding.data,
                sites: resSites.data
            })
        }
        fetchMapLayerData()

    }, [])


    return { mapLayerData }
}

export default useFetchMapLayerData