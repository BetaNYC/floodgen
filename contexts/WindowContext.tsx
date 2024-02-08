import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react"


export type WindowContextType = {
    desktop: number,
    tablet: number,
    width: number,
    setWidth: Dispatch<SetStateAction<number>>,
}

type Props = {
    children: ReactNode
}

const WindowContext = createContext<WindowContextType | null>(null)


const WindowProvider = ({ children }: Props) => {

    const [width, setWidth] = useState<number>(window.innerWidth)
    const [desktop, setDesktop] = useState<number>(1024)
    const [tablet, setTablet] = useState<number>(768)



    return <WindowContext.Provider value={{ desktop, tablet, width, setWidth }}>
        {children}
    </WindowContext.Provider>
}

export { WindowContext, WindowProvider }