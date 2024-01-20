import React from 'react'

import Image from 'next/image'

type Props = {
    title: string
    src: string
}


const Button = ({title, src}:Props) => {
  return (
    <div className='flex justify-between px-[0.5rem] py-[1rem] w-[6.875rem] h-[2.5rem] rounded-[37px]'>
        <Image width={24} height={24} src={src} alt={title} />
        <div className='font-semibold text-label_mobile'>{title}</div>
    </div>
  )
}

export default Button