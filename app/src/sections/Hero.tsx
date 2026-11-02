import { useEffect, useState } from 'react'
import { useQuoteModal } from '../context/QuoteModal'
import { products } from '../data/content'
import adaniImg from '../assets/round/adani.png'
import lumiImg from '../assets/round/lumi.png'
import sungrowImg from '../assets/round/sungrow.png'
import tataImg from '../assets/round/tata.png'
import ultImg from '../assets/round/ult.png'
import wareeImg from '../assets/round/waree.png'

const roundImages = [adaniImg, lumiImg, sungrowImg, tataImg, ultImg, wareeImg]

export default function Hero() {
  const { open: openQuote } = useQuoteModal()
  const [orbIdx, setOrbIdx] = useState(0)

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1001px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer: ReturnType<typeof setInterval> | null = null

    const start = () => {
      if (timer) clearInterval(timer)
      if (!isDesktop.matches || reducedMotion.matches) return
      timer = setInterval(() => setOrbIdx((v) => (v + 1) % roundImages.length), 2000)
    }

    if (isDesktop.matches) {
      document.body.classList.add('orb-photos')
      start()
    }

    isDesktop.addEventListener('change', () => {
      if (isDesktop.matches) {
        document.body.classList.add('orb-photos')
        setOrbIdx(0)
      } else {
        document.body.classList.remove('orb-photos')
      }
      start()
    })
    reducedMotion.addEventListener('change', start)

    return () => {
      if (timer) clearInterval(timer)
      document.body.classList.remove('orb-photos')
      isDesktop.removeEventListener('change', start as any)
      reducedMotion.removeEventListener('change', start as any)
    }
  }, [])

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="place-line"><span className="dot" aria-hidden="true" />Bihar · Delhi · Uttarakhand</div>
            <h1>
              <span className="line"><span>Sunlight,</span></span>
              <span className="line"><span>made <em>useful.</em></span></span>
            </h1>
            <p className="hero-sub">Solar panels, inverters, batteries and EV chargers — specified, installed and serviced by our own engineers. Homes in Bihar, Delhi and Uttarakhand; business anywhere in India.</p>
            <div className="hero-actions">
              <button className="btn btn-gold" onClick={openQuote}>Get a free rooftop plan</button>
            </div>
            <div className="hero-meta">
              <span>MNRE-approved equipment</span>
              <span className="sep">·</span>
              <span>25-year performance warranty</span>
              <span className="sep">·</span>
              <span>Subsidy paperwork handled</span>
            </div>
          </div>

          <div className="orb-stage" aria-hidden="true">
            <svg className="rings" viewBox="0 0 600 600" fill="none">
              <circle className="ring-line" cx="300" cy="300" r="290" />
              <circle className="ring-gold" cx="300" cy="300" r="290" />
              <line className="ring-tick" x1="300" y1="10" x2="300" y2="28" />
              <line className="ring-tick" x1="300" y1="572" x2="300" y2="590" />
              <line className="ring-tick" x1="10" y1="300" x2="28" y2="300" />
              <line className="ring-tick" x1="572" y1="300" x2="590" y2="300" />
            </svg>
            <svg className="orb-text-ring" viewBox="0 0 600 600" aria-hidden="true">
              <defs>
                <path id="orbTextPath" d="M 300,300 m -265,0 a 265,265 0 1,1 530,0 a 265,265 0 1,1 -530,0" />
              </defs>
              <text textAnchor="middle">
                <textPath href="#orbTextPath" startOffset="25%">LET US GIVE OUR CHILDREN A GREEN TOMORROW</textPath>
              </text>
              <text textAnchor="middle">
                <textPath href="#orbTextPath" startOffset="75%">KRYPTON ENERGY ELECTRICITY REDIFINED</textPath>
              </text>
            </svg>
            <div className="orb">
              <div className="orb-slides" aria-hidden="true">
                {roundImages.map((src, i) => (
                  <img key={src} src={src} alt="" className={i === orbIdx ? 'is-on' : ''} />
                ))}
              </div>
              <span className="orb-veil" aria-hidden="true" />
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