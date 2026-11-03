import { useEffect, useState } from 'react'
import { useQuoteModal } from '../context/QuoteModal'
import { products } from '../data/content'

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
            <p className="hero-sub">Bringing Australian experience and innovative energy solutions to India. Empowering homes and businesses with cleaner energy, lower electricity costs and greater energy independence.</p>
            <div className="hero-actions">
              <button className="btn btn-gold" onClick={openQuote}>Get your Free Solar consultation</button>
            </div>
            <div className="hero-meta">
              <span>☀️ Solar Solutions for Homes &amp; Businesses</span>
              <span className="sep">·</span>
              <span>🔋 Advanced Battery Storage &amp; Inverters</span>
              <span className="sep">·</span>
              <span>⚡ Smart EV Charging Solutions</span>
              <span className="sep">·</span>
              <span>🏡 PM Surya Ghar: Muft Bijli Yojana – Residential Rooftop Solar Solutions</span>
              <span className="sep">·</span>
              <span>🌱 Sustainable Energy for a Greener Future</span>
            </div>
          </div>
        </div>
        <div className="hero-rule" />
      </section>

      <section className="shelf" id="products" aria-label="What Krypton supplies">
        <div className="wrap">
          <div className="shelf-top">
            <span className="kicker">The system</span>
            <span className="shelf-note">Four components. One warranty. One team. <a href="#quote">Build mine</a></span>
          </div>
          <ol className="shelf-grid">
            {products.map((p, i) => {
              const idx = ['01 / Generation', '02 / Conversion', '03 / Storage', '04 / Load'][i]
              return (
              <li className="tile-wrap" key={p.name}>
                <div className="tile">
                  <span className="tile-bar" aria-hidden="true" />
                  <span className="tile-idx">{idx}</span>
                  <span className="tile-name">{p.name}</span>
                  <span className="tile-spec">{p.spec}</span>
                  <svg className="tile-arrow" width="16" height="8" viewBox="0 0 16 8" fill="none" aria-hidden="true"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                </div>
              </li>
              )
            })}
          </ol>
        </div>
      </section>
    </>
  )
}