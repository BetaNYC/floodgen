"use client"
import Image from 'next/image'

import { WindowProvider } from '@/contexts/windowContext'
import { MapProvider } from '@/contexts/MapContext'
import Map from '@/components/map/Map'
import InfoPage from '@/components/infoPage/InfoPage'
import StreetView from '@/components/streetView/StreetView'
import StreetInfo from '@/components/streetView/StreetInfo'

export default function Home() {
  return (
    <main className="relative w-[100vw] h-[100vh] overflow-y-hidden">
      <WindowProvider>
        <MapProvider>
          <Map />
          <InfoPage />
          <StreetView />
          <StreetInfo />
        </MapProvider>
      </WindowProvider>
    </main>
  )
}
