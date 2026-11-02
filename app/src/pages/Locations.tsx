import { useEffect } from 'react'
import indiaMap from '../assets/india-map.svg?raw'
import '../styles/locations.css'

export default function LocationsPage() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.18 })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <main id="main">
      <section className="section" id="locations">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="kicker">Where we work</div>
              <h2>Close enough to come back.</h2>
            </div>
            <p>Residential work is local by nature. The map shows where our own teams survey, install and service — not a dealer with our logo on a van.</p>
          </div>

          <div className="india-map-wrap">
            <div className="india-map" dangerouslySetInnerHTML={{ __html: indiaMap }} />
            <div className="map-legend">
              <div className="item"><span className="swatch res" />Residential + Commercial &amp; Industrial</div>
              <div className="item"><span className="swatch com" />Commercial &amp; Industrial only</div>
              <p style={{ marginTop: 12, fontSize: 13, color: 'var(--muted-2)', lineHeight: 1.6 }}>
                Homes, rooftops and builder floors are served in Bihar, Uttarakhand and Delhi NCR by our own crews. Commercial and industrial projects are delivered anywhere in India under a single EPC contract.
              </p>
            </div>
          </div>

          <div className="map-cities">
            <div className="map-city">
              <span className="tag">Bihar</span>
              <h3>Patna</h3>
              <p>Head office. Residential rooftop programme with local survey teams and DISCOM liaison for Patna and nearby districts.</p>
            </div>
            <div className="map-city">
              <span className="tag">Delhi NCR</span>
              <h3>Delhi</h3>
              <p>Rooftop systems for independent homes, builder floors and housing societies across Delhi, Gurugram and Noida.</p>
            </div>
            <div className="map-city">
              <span className="tag">Uttarakhand</span>
              <h3>Uttarakhand</h3>
              <p>Hill-climate sizing, snow and wind loading, and service coverage across Uttarakhand and the surrounding valley.</p>
            </div>
            <div className="map-city">
              <span className="tag">Pan India</span>
              <h3>C&amp;I projects</h3>
              <p>Industrial and commercial projects delivered nationwide, with feasibility, EPC and O&amp;M under one contract.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}