"use client"
import Image from 'next/image'

import MapLayer from '@/components/MapLayer/MapLayer'
import Legend from '@/components/elements/Legend'

export default function Home() {
  return (
    <main className="">
      <MapLayer />
      <Legend />
    </main>
  )
}
