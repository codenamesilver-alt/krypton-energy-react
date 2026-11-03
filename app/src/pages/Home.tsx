import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import TwoPaths from '../sections/TwoPaths'
import Testimonials from '../sections/Testimonials'
import RoofToMeter from '../sections/RoofToMeter'

export default function Home() {
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [hash])

  return (
    <main id="main">
      <Hero />
      <TwoPaths />
      <RoofToMeter />
      <Testimonials />
    </main>
  )
}