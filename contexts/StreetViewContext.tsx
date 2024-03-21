import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react'

export type StreetViewType = {
    openStreetView: boolean | null,
    setOpenStreetView: Dispatch<SetStateAction<boolean>>,
    streetViewImgFloodHeight: number,
    setStreetViewImgFloodHeight: Dispatch<SetStateAction<number>>,
    streetViewImgAngle: number,
    setStreetViewImgAngle: Dispatch<SetStateAction<number>>,
    streetViewImgFullscreen: boolean,
    setstreetViewImgFullscreen: Dispatch<SetStateAction<boolean>>,
    clicked:{
        "Street View": boolean,
        "Minor Flooding": boolean,
        "Moderate Flooding": boolean,
        "Major Flooding": boolean,
    },
    setClicked: Dispatch<SetStateAction<{
        "Street View": boolean,
        "Minor Flooding": boolean,
        "Moderate Flooding": boolean,
        "Major Flooding": boolean,
    }>>
}

type Props = {
    children: ReactNode
}

const StreetViewContext = createContext<StreetViewType | null>(null)


const StreetViewProvider = ({ children }: Props) => {
    const [openStreetView, setOpenStreetView] = useState(false)
    const [streetViewImgFloodHeight, setStreetViewImgFloodHeight] = useState(1)
    const [streetViewImgAngle, setStreetViewImgAngle] = useState(1)
    const [streetViewImgFullscreen, setstreetViewImgFullscreen] = useState(false)
    const [clicked, setClicked] = useState({
        "Street View": false,
        "Minor Flooding": true,
        "Moderate Flooding": false,
        "Major Flooding": false,
    })

    return (
        <StreetViewContext.Provider value={{
            openStreetView,
            setOpenStreetView,
            streetViewImgFloodHeight,
            setStreetViewImgFloodHeight,
            streetViewImgAngle,
            setStreetViewImgAngle,
            streetViewImgFullscreen,
            setstreetViewImgFullscreen,
            clicked,
            setClicked
        }}>
            {children}
        </StreetViewContext.Provider>
    )
}

export { StreetViewContext, StreetViewProvider }