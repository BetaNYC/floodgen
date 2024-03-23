import React from 'react'

const InfoAI = () => {
    return (
        <div className='max-w-[60rem] flex flex-col gap-5 mt-5'>
            <h2 className='font-semibold text-heading text-black'>How to identify an AI generated image</h2>
            <p className='font-regular text-medium text-black'>FloodGen uses AI to generate photorealistic images of potential flooding scenarios to raise awareness, bolster community preparedness, and support local governments resilience strategies. The street view images are transformed with a generative artificial intelligence process called CycleGAN to depict projected flood scenarios. CycleGAN is an image-to-image translation model that takes an input of a normal street view image and reprocesses the pixels to illustrate an image with flooding.</p>
            <p className='font-regular text-medium text-black'>All FloodGen generated imagery that is created with the use of generative artificial intelligence includes a FloodGen logo, located on the bottom-right corner of the image. View the image below for a few more tips on how to identify an AI generated flood image:</p>
            <img src="https://raw.githubusercontent.com/BetaNYC/floodgen-images/main/identify%20GenAi_1080.gif" alt="" />
            <p className='font-regular text-medium text-black'> FloodGen is positioned as an advocacy tool with a community engagement strategy. The surreal quality of sometimes clear skies, calm water that is free of debris, and distorted surface of water in these images are intended to convey a level of photorealism to instill a sense of urgency around the issue of flooding. FloodGen imagery does not predict any future events, and these images are not intended to falsely portray any historic flood events. Read more about the FloodGen community engagement strategy on the About page. </p>
        </div>
    )
}

export default InfoAI