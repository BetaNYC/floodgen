import React, { useContext } from 'react'

import Image from 'next/image'

import { StreetViewContext, StreetViewType } from '@/contexts/StreetViewContext'

const StreetInfo = () => {

  const { openStreetView, setOpenStreetView } = useContext(StreetViewContext) as StreetViewType

  return (
    <div className={`absolute bottom-0 lg:left-8 lg:top-7 px-4 pt-[1.56rem] lg:pt-4 w-full lg:w-[17.56rem] h-[9.375rem] lg:h-[7.75rem] bg-white rounded-[1rem] z-20 `}>
      <h2 className='font-bold text-heading text-content_black'>Rivington St & Suffolk St</h2>
      <h3 className='text-medium text-[#727272]'>Lower East Side, Manhattan</h3>
      <div className='my-[0.6875rem] w-full h-[1px] bg-[#C9C9C9]'></div>
      <div className='flex justify-between'>
        <h2 className='font-bold text-heading text-gray'>Lower East Side</h2>
        <Image width={24} height={24} src="./icons/info.svg" alt='info' />
      </div>
    </div>
  )
}

export default StreetInfo