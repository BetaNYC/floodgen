import React, { useState } from 'react'


const useHoverStatus = (data: {}[]) => {
    const [hovered, setHovered] = useState(data.map(d => false))

    const mouseEnterHandler = (index: number) => {
        const newHovered = [...hovered]
        newHovered.forEach((l, i) => i === index ? newHovered[i] = true : newHovered[i] = false)
        setHovered(newHovered)
    }
    const mouseLeaveHandler = () => {
        const newHovered = [...hovered]
        newHovered.forEach((l, i) => newHovered[i] = false)
        setHovered(newHovered)
    }

    return { hovered, mouseEnterHandler, mouseLeaveHandler }
}

export default useHoverStatus