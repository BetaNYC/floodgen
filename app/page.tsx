"use client"
import Image from 'next/image'

import { MapProvider } from '@/contexts/MapContext'
import { StreetViewProvider } from '@/contexts/StreetViewContext'
import { MarkerProvider } from '@/contexts/MarkerContext'
import Map from '@/components/map/Map'
import InfoPage from '@/components/infoPage/InfoPage'
import StreetView from '@/components/streetView/StreetView'
import Narrative from '@/components/narrative/Narrative'

export default function Home() {
  return (
    <main className="relative w-[100vw] h-[100vh] overflow-y-hidden">
      <MapProvider>
        <StreetViewProvider>
          <MarkerProvider>
            {/* <Map />
            <InfoPage />
            <StreetView /> */}
            <Narrative />
          </MarkerProvider>
        </StreetViewProvider>
      </MapProvider>
    </main>
  )
}
