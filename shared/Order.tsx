import React from 'react'
import Image from 'next/image'

type Props = {
  order: 'previous' | 'next'
  clickHandler: () => void
}

const Order = ({ order, clickHandler }: Props) => {
  return (
    <div className='flex justify-center items-center w-[2.5rem] h-[2.5rem] bg-[rgba(255,255,255,0.65)] rounded-full cursor-pointer' onClick={clickHandler}>
      <Image width={24} height={24} src={`${order === 'previous' ? "./icons/previous.svg" : "./icons/next.svg" }`} alt='order' />
    </div>
  )
}

export default Order