import React, { useContext, useState } from 'react'

import Image from 'next/image'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

import sites from "../../public/data/floodgen_sites.geo.json"
import useOnClickSites from '@/hooks/useOnClickSites'

type Props = {
  openStreetView: boolean | null
}

const StreetInfo = ({ openStreetView }: Props) => {

  const { id } = useOnClickSites()


  const selectedSitesFeatures = sites.features.filter(site => site.properties.ID === id)[0]

  const [expanded, setExpanded] = useState(false)

  return (
    <>
      {
        openStreetView && <div className={`absolute bottom-[-65%] flex flex-col lg:left-4 lg:top-[6rem] px-4 pt-[1.56rem] lg:pt-4 w-full lg:w-[17.56rem] ${expanded ? "h-[65%] lg:h-[calc(100%_-_6rem)]" : "h-[9.375rem] lg:h-[9.5rem]"}  bg-white rounded-[1rem] z-40`}>
          <div className='flex justify-between items-center w-full'>
            <h2 className='font-bold text-heading text-content_black'>{selectedSitesFeatures.properties['Place']}</h2>

            {expanded ? <ChevronUpIcon className='w-6  h-6 text-black' onClick={() => setExpanded(false)} /> : <ChevronDownIcon className='w-6  h-6 text-black' onClick={() => setExpanded(true)} />}

          </div>
          <h3 className='text-medium text-[#727272]'>{selectedSitesFeatures.properties['Case Study']}, {selectedSitesFeatures.properties['Borough']}</h3>
          <div className='my-[0.6875rem] w-full h-[1px] bg-[#C9C9C9]'></div>
          <div className='flex justify-between mb-2'>
            <h2 className='font-bold text-heading text-gray'>Description</h2>
            {/* <Image width={24} height={24} src="./icons/info.svg" alt='info' /> */}
            <img src="/icons/info.svg" alt="" className='w-6 h-6' />
          </div>
          <div className='flex-1 overflow-scroll'>
            <p className={`${expanded ? "visible" : "hidden"} text-medium text-black leading-normal`}>
              {selectedSitesFeatures.properties.Description}
            </p>
          </div>
        </div>
      }
    </>

  )
}

export default StreetInfo