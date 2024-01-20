import React from 'react'

import MapLayerBtn from './MapLayerBtn'




const MapLayer = () => {
    const layers = [
        {
            image: "./icons/coastal.svg",
            title: "Coastal Flooding",
            content: "Dry and low-lying land is submerged by seawater"
        },
        {
            image: "./icons/storm.svg",
            title: "Stormwater Flooding",
            content: "Caused by heavy rain and meltwater from hail and snow."
        },
        {
            image: "./icons/justice.svg",
            title: "Environmental Justice Areas",
            content: "Communities that are more vulnerable to flood risk due to being underserved historically"
        },
        {
            image: "./icons/zone.svg",
            title: "Hurricane Evacuation Zone",
            content: "Areas meant for evacuation purposes in case of a hurricane"
        }
    ]

    return (
        <div className={`px-[1rem] pt-[1.8125rem]  pb-[1.5rem] lg:py-[1.8125rem] w-full lg:w-[48rem] h-[50%]  bg-[#F3F3F3] rounded-[1rem]`}>
            {/* <div className='m-auto w-[5.5rem] h-[0.375rem] bg-[#D9D9D9] rounded-[23.62px]'></div> */}
            <div className='mb-[1.25rem] font-bold text-heading text-black'>Choose Map Layer</div>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-[1.25rem]'>
                {layers.map((layer, i) => <MapLayerBtn clicked={false} image={layer.image} title={layer.title} content={layer.content} key={layer.title} />)}
            </div>
        </div>

    )
}

export default MapLayer