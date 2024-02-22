import React from 'react'

import Image from 'next/image'

type Props = {
  clicked: boolean
  hovered: boolean
  title: string
  src: string
  buttonClickHandler: () => void
  mouseEnterHandler: () => void
  mouseLeaveHandler: () => void
}


const Button = ({ clicked, hovered, title, src, buttonClickHandler, mouseEnterHandler, mouseLeaveHandler }: Props) => {
  return (
    <div className={`flex items-center gap-[0.56rem] px-2 py-[0.5rem] h-[2.5rem] font-semibold text-small text-primary_blue rounded-[37px] cursor-pointer shadow-2xl ${clicked || hovered ? "text-white bg-primary_blue " : "text-primary_blue bg-secondary_blue "} `} onClick={buttonClickHandler} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
      <Image width={24} height={24} src={src} alt={title} className='' />
      <div>{title}</div>
    </div>
  )
}

export default Button


// hover:text-white hover:bg-primary_blue