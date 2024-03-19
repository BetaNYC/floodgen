import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react'

export type NarrativeType = {
    openNarrative: boolean | null,
    setOpenNarrative: Dispatch<SetStateAction<boolean>>
}

type Props = {
    children: ReactNode
}

const NarrativeContext = createContext<NarrativeType | null>(null)

const NarrativeProvider = ({ children }: Props) => {
    const [openNarrative, setOpenNarrative] = useState(true)

    return (
        <NarrativeContext.Provider value={{openNarrative, setOpenNarrative}}>
            {children}
        </NarrativeContext.Provider>
    )
}

export {NarrativeContext, NarrativeProvider}