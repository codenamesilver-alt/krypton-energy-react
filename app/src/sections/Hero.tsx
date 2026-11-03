import { useEffect, useState } from 'react'
import { useQuoteModal } from '../context/QuoteModal'
import HowSolarWorks from './HowSolarWorks'

const DESKTOP_VIDEO = '/media/krypton-hero.mp4'
const MOBILE_VIDEO = '/media/krypton-hero-720.mp4'

/** lighter encode on small screens */
function useHeroVideoSrc() {
  const [src, setSrc] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches
      ? MOBILE_VIDEO
      : DESKTOP_VIDEO,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)')
    const sync = () => setSrc(mq.matches ? MOBILE_VIDEO : DESKTOP_VIDEO)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return src
}

export default function Hero() {
  const { open: openQuote } = useQuoteModal()
  const videoSrc = useHeroVideoSrc()

  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <video
            key={videoSrc}
            className="hero-video"
            src={videoSrc}
            poster="/media/krypton-hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
            disablePictureInPicture
            disableRemotePlayback
          />
        </div>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>
              <span className="line"><span>Powering a Smarter,</span></span>
              <span className="line"><span>Greener <em>Tomorrow.</em></span></span>
            </h1>
            <p className="hero-sub">Bringing Australian expertise to India with smarter energy solutions that help homes and businesses lower electricity bills and build a greener future.</p>
            <div className="hero-actions">
              <button className="btn btn-gold btn-pill" onClick={openQuote}>Get your Free Solar consultation</button>
            </div>
          </div>
        </div>
        <div className="hero-points-wrap">
          <ul className="hero-points">
            <li>Solar Solutions for Homes &amp; Businesses</li>
            <li>Battery Storage &amp; Inverters</li>
            <li>EV Charging Solutions</li>
            <li>PM Surya Ghar Yojana – Rooftop Solar Solutions</li>
            <li>Smart &amp; Sustainable Energy Solutions</li>
            <li>Solar Solutions for Homes &amp; Businesses</li>
            <li>Battery Storage &amp; Inverters</li>
            <li>EV Charging Solutions</li>
            <li>PM Surya Ghar Yojana – Rooftop Solar Solutions</li>
            <li>Smart &amp; Sustainable Energy Solutions</li>
          </ul>
        </div>
        <div className="hero-rule" />
      </section>

      <HowSolarWorks />
    </>
  )
}