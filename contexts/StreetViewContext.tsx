import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react'

export type StreetViewType = {
    openStreetView: boolean | null,
    setOpenStreetView: Dispatch<SetStateAction<boolean>>
}

type Props = {
    children: ReactNode
}

const StreetViewContext = createContext<StreetViewType | null>(null)


const StreetViewProvider = ({ children }: Props) => {
    const [openStreetView, setOpenStreetView] = useState(false)

    return (
        <StreetViewContext.Provider value={{ openStreetView, setOpenStreetView }}>
            {children}
        </StreetViewContext.Provider>
    )
}

export  { StreetViewContext, StreetViewProvider }