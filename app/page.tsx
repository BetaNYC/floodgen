"use client"
import Image from 'next/image'

import { MapProvider } from '@/contexts/MapContext'
import { StreetViewProvider } from '@/contexts/StreetViewContext'
import Map from '@/components/map/Map'
import InfoPage from '@/components/infoPage/InfoPage'
import StreetView from '@/components/streetView/StreetView'
import StreetInfo from '@/components/streetView/StreetInfo'

export default function Home() {
  return (
    <main className="relative w-[100vw] h-[100vh] overflow-y-hidden">
      <MapProvider>
        <StreetViewProvider>
          <Map />
          <InfoPage />
          <StreetView />
          <StreetInfo />
        </StreetViewProvider>
      </MapProvider>
    </main>
  )
}
