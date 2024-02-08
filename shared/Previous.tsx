import React from 'react'
import Image from 'next/image'

const Previous = () => {
  return (
    <div className='flex justify-center items-center w-[2.5rem] h-[2.5rem] bg-[rgba(255,255,255,0.65)] rounded-full cursor-pointer'>
        <Image width={24} height={24} src="./icons/previous.svg" alt='previous'  />
    </div>
  )
}

export default Previous