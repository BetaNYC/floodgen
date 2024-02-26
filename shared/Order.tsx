import React from 'react'


import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'

type Props = {
  order: 'previous' | 'next'
  clickHandler: () => void
}

const Order = ({ order, clickHandler }: Props) => {
  return (
    <div className='flex justify-center items-center w-[2.5rem] h-[2.5rem] bg-[rgba(255,255,255,0.65)] rounded-full cursor-pointer shadow-2xl' onClick={clickHandler}>
      {
        order === 'previous' ?
        <ChevronLeftIcon className='w-6 h-6 text-black' /> :
        <ChevronRightIcon className='w-6 h-6 text-black' /> 
      }
    </div>
  )
}

export default Order