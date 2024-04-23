import React from 'react'


type Props = {
    clickHandler: () => void
}

const InfoAbout = ({ clickHandler }: Props) => {
    return (
        <>
            <div className='flex flex-col gap-5 lg:gap-0 w-[75%] lg:w-[725px] '>
                <div className='flex flex-col gap-3 mb-5 max-w-[60rem]'>
                    <p className='font-regular text-medium text-black'>Today, 1.3 million New York City residents live within or directly adjacent to the floodplain.1 Flood damage is expensive, extensive, and oftentimes predictable. Maps of predicted flooding are helpful planning tools, but aerial views distance viewers from its potential impact. If we show the reality of predicted flooding through photorealistic imagery, could people be more prepared?</p>
                    <p className='font-regular text-medium text-black'>FloodGen is an advocacy tool that uses generative artificial intelligence (GenAI) to create photorealistic images of predicted flooding. Projected flood imagery from FloodGen can be integrated within community engagement strategies to:</p>
                    <ol className='font-regular text-medium text-black'>
                        <li>1. raise awareness for communities who have not yet experienced flooding,</li>
                        <li>2. create evidence for communities seeking resilience funding and projects</li>
                        <li>3. respond to resilience advocacy efforts by municipal government agents and decision makers</li>
                    </ol>
                    <p className='font-regular text-medium text-black'>This website demonstrates the potential to position FloodGen as an advocacy tool. FloodGen features an interactive web map that contextualizes flood risk and AI generated imagery of predicted flooding for ten case study sites in New York City. The case study sites were selected based on flood risk hazards of coastal and stormwater flooding, vulnerability of environmental justice areas and hurricane evacuation zones, and exposure to nearby points of interest, including nearby transit, public housing, hospitals, commercial areas, schools, and libraries.</p>
                    <p className='font-regular text-medium text-black'>Explore flood prone neighborhoods in the map and AI generated imagery of street views with projected flooding.</p>
                </div>
                <div className='lg:flex gap-14'>
                    <div className='flex flex-col mb-5 lg:mb-0'>
                        <img src="/imgs/flooding_map.png" alt="" className='w-[265px] h-[232px]'/>
                        <h2 className='lg:order-2 lg:w-[277px] font-bold lg:font-medium text-medium text-title_black'>Explore flood prone neighborhoods in NYC</h2>
                    </div>
                    <div className='flex flex-col'>
                        <img src="https://raw.githubusercontent.com/BetaNYC/floodgen-images/main/flooding_before-after_NEW_sm.gif" alt="" className='mb-2 w-[394.67px] h-[222px] rounded-lg' />
                        <h2 className='lg:order-2 lg:w-[400px] font-bold lg:font-medium text-medium text-title_black'>Visualize flooding street view with AI generated flooding images </h2>
                    </div>
                </div>
                <button className='mt-2 lg:my-10 py-5 w-[15rem] font-semibold text-small lg:text-heading text-white bg-primary_blue rounded-[2.5rem]' onClick={clickHandler}>Explore FloodGen</button>
                <div className='text-xsmall text-black'>
                    <div>References</div>
                    <div>1. Rebuild by Design. “Who lives in the floodplain in the year 2100?”<a href='https://rebuildbydesign.org/who-lives-in-nycs-floodplain/'  target="_blank">https://rebuildbydesign.org/who-lives-in-nycs-floodplain/ </a></div>
                </div>
            </div>
        </>
    )
}

export default InfoAbout