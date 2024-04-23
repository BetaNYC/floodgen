import React from 'react'

const InfoCredit = () => {
  return (
    <div className='w-[75%]'>
      <div className='flex flex-col gap-5'>
        <h2 className='font-semibold text-heading text-black'><a href="https://beta.nyc/" target="_blank" className='hover:underline'>BetaNYC</a></h2>
        <p className='font-regular text-medium text-black'>BetaNYC is a civic organization dedicated to improving lives in New York through civic design, technology, and data. With an aim to improve access to public interest technology, the Civic Innovation Lab at BetaNYC provides assistance with research, data analysis, and data visualization. This project was created by the Civic Innovation Lab at BetaNYC, with the initial research into the flood image generator model led by Vaishali Talwar.</p>
        <p className='font-regular text-medium text-black'>If you are interested in working with BetaNYC, our team is happy to get in touch through a Research and Data Assistance Request (RADAR). Follow this link to <a href="https://beta.nyc/products/research-and-data-assistance-requests/" target="_blank" className='underline'>learn more about RADARs and how to submit a request!</a></p>
        <div className='flex flex-col '>
        <h3 className='font-semibold text-medium text-black'>BetaNYC Civic Innovation Lab Team</h3>
        <p className='font-regular text-medium text-black'>Ashley Louie (Director), Erik Brown, Zhi Keng He, Hao Lun Hung, Audrey Leung, Hailee Luong, Vaishali Talwar</p>
      </div>
      </div>

      <div className='flex flex-col gap-5 mt-12'>
        <h2 className='font-semibold text-heading text-black'>Data Source</h2>
        <div>
          <h2 className='font-semibold text-medium text-black'>LiDAR Point Cloud</h2>
          <p className='font-regular text-medium text-black'>Cyclomedia. 2023. Cyclomedia LiDAR Point Cloud v21.13.2. Accessed March 13, 2024. <a href="https://www.cyclomedia.com/us/producten/data-visualisatie/lidar-point-cloud" target="_blank" className='hover:underline'>[link to website]</a></p>
        </div>
        <div>
          <h2 className='font-semibold text-medium text-black'>Street View Flood Height Threshold</h2>
          <p className='font-regular text-medium text-black'>BetaNYC. 2022. NYC Batch Geocoder. Accessed March 13, 2024. <a href="http://geocoder.nyc/streetview" target="_blank" className='hover:underline'>[link to website]</a></p>
        </div>
        <div>
          <h2 className='font-semibold text-medium text-black'>ClimateGAN Cycle-GAN Image Generator</h2>
          <p className='font-regular text-medium text-black'>ClimateGAN: Raising Climate Change Awareness by Generating Images of Floods. Schmidt et al. International Conference on Learning Representations, 2022. <a href="https://openreview.net/forum?id=EZNOb_uNpJk" target="_blank" className='hover:underline'>[link to paper]</a> <a href="https://github.com/cc-ai/climategan" target="_blank">[link to GitHub repository]</a></p>
        </div>
        <div>
          <h2 className='font-semibold text-medium text-black'>Coastal Flooding</h2>
          <p className='font-regular text-medium text-black'>Federal Emergency Management Agency. Preliminary Flood Insurance Rate Maps (PFIRMs) 2015. Accessed February 9, 2024. <a href="https://dcp.maps.arcgis.com/home/item.html?id=1e56cf3d576849d1a6936f9cdcd3511d" target="_blank" className='hover:underline'>[link to dataset]</a></p>
        </div>
        <div>
          <h2 className='font-semibold text-medium text-black'>Stormwater Flooding</h2>
          <p className='font-regular text-medium text-black'>Flood 2050 Sea Level Rise. Accessed January 31, 2024. <a href="https://data.cityofnewyork.us/City-Government/NYC-Stormwater-Flood-Map-Moderate-Flood-with-2050-/5rzh-cyqd/about_data" target="_blank" className='hover:underline'>[link to dataset]</a></p>
        </div>
        <div>
          <h2 className='font-semibold text-medium text-black'>Disadvantaged Communities</h2>
          <p className='font-regular text-medium text-black'>New York State Energy Research and Development Authority (NYSERDA). 2023. Final Disadvantaged Communities (DAC) 2023. Accessed March 18, 2024. <a href="https://data.ny.gov/Energy-Environment/Final-Disadvantaged-Communities-DAC-2023/2e6c-s6fp/about_data" target="_blank" className='hover:underline'>[link to dataset]</a></p>
        </div>
        <div>
          <h2 className='font-semibold text-medium text-black'>Hurricane Evacuation Zones</h2>
          <p className='font-regular text-medium text-black'>NYC Emergency Management Department (NYCEM). 2024. Hurricane Evacuation Zones. Accessed January 31, 2024.</p>
        </div>
      </div>
      <div className='flex flex-col gap-5 mt-12'>
        <h3 className='font-semibold text-heading text-black'>Methodology & Limitations</h3>
        <p className='font-regular text-medium text-black'>The flood images featured on this website were generated using the open-source <a href="https://github.com/cc-ai/climategan" target="_blank" className='underl'>ClimateGAN</a> image generation models. The ClimateGAN model is licensed under GPL-3.0 and is open for public use, promoting transparency and collaboration. The model code, data, and pre-trained weights available in the original ClimateGAN repository were applied to Cylomedia street view images from the geocoder.nyc website to generate the photorealistic images of flooding. In order to generate images with mild, moderate, and major flooding levels, the threshold parameter of the model was set to 0.99, 0.9, and 0.8 respectively. Although these values do not correspond to exact measurements of flooding, we estimate that the mild, moderate, and major flooding levels correspond to the approximate ranges &lt; 0.4 inches, 0.4–12 inches, and 12–24 inches respectively. In a future iteration, we hope to improve the model performance by feeding an initial flood mask generated via the elevation tool on the geocoder.nyc website to the model. Stay tuned for further updates!</p>
      </div>
    </div>
  )
}

export default InfoCredit