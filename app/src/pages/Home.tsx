import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import HowSolarWorks from '../sections/HowSolarWorks'
import TwoPaths from '../sections/TwoPaths'
import Testimonials from '../sections/Testimonials'
import ReadyToSwitch from '../sections/ReadyToSwitch'
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
      <div className="home-hindi-line">अपनी बिजली बनाओ और पैसे बचाओ</div>
      <HowSolarWorks />
      <TwoPaths />
      <RoofToMeter />
      <Testimonials />
      <ReadyToSwitch />
    </main>
  )
}