import React, { useContext, useState } from 'react'

import Image from 'next/image'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

type Props = {
  openStreetView: boolean | null
}

const StreetInfo = ({ openStreetView }: Props) => {

  const [expanded, setExpanded] = useState(true)

  return (
    <>
      {
        openStreetView && <div className={`absolute bottom-[-100%] lg:left-8 lg:top-7 px-4 pt-[1.56rem] lg:pt-4 w-full lg:w-[17.56rem] ${expanded ? "h-[100%] lg:h-[calc(100%_-_3.5rem)]" : "h-[9.375rem] lg:h-[7.75rem]"}  bg-white rounded-[1rem] z-20 `}>
          <div className='flex justify-between items-center w-full'>
            <h2 className='font-bold text-heading text-content_black'>Rivington St & Suffolk St</h2>

            {expanded ? <ChevronUpIcon className='w-6  h-6 text-black' onClick={() =>setExpanded(false)} /> : <ChevronDownIcon className='w-6  h-6 text-black' onClick={() =>setExpanded(true)}/>}

          </div>
          <h3 className='text-medium text-[#727272]'>Lower East Side, Manhattan</h3>
          <div className='my-[0.6875rem] w-full h-[1px] bg-[#C9C9C9]'></div>
          <div className='flex justify-between mb-4'>
            <h2 className='font-bold text-heading text-gray'>Lower East Side</h2>
            <Image width={24} height={24} src="./icons/info.svg" alt='info' />
          </div>
          <p className={`${expanded ? "visible" : "hidden"} text-medium text-black leading-normal`}>
            Explain why the project focuses on these areas.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </p>
        </div>
      }
    </>

  )
}

export default StreetInfo