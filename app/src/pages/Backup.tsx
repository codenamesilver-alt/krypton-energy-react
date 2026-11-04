import '../styles/backup.css'
import { useEffect, useState } from 'react'

export default function BackupPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [selected, setSelected] = useState<number | null>(null)
  return (
    <main id="main" className="kr-main">
      {/* 1. HERO */}
      <section className="kr-hero">
        <div className="kr-wrap">
          <h1>Clean energy, designed <em>around you.</em></h1>
          <p className="kr-lead">Solar, battery storage and EV charging for homes, factories and commercial sites across India.</p>
          <ul className="kr-facts">
            <li><strong>Since 2022</strong><span>Established in Australia</span></li>
            <li><strong>Our own team</strong><span>Bihar, Delhi NCR and Uttarakhand</span></li>
            <li><strong>Pan-India</strong><span>Commercial and industrial projects</span></li>
          </ul>
        </div>
      </section>

      {/* 2. FOUNDER'S MESSAGE */}
      <section className="kr-section">
        <div className="kr-wrap kr-story">
          <div className="kr-founder-frame">
            <h2>Krypton Energy is coming to <em>India!</em></h2>
            <p>Our journey began with a vision to make energy smarter, cleaner and more affordable. Having built our experience in Australia, we’re now bringing that vision home to India!</p>
            <p>From Solar Solutions, Battery Storage, EV Chargers, Inverters and Smart Energy Solutions, we’re here to power homes and businesses with technology built for a sustainable future.</p>
            <p>Our mission is simple: help you take control of rising electricity costs, reduce those never-ending power bills and increase the long-term value of your home or business.</p>
            <p>This is more than an expansion. It’s a commitment to a greener future, greater energy independence and a better tomorrow for the next generation.</p>
            <p className="kr-tagline">Australia to India. One Vision. One Mission.</p>
            <p className="kr-sign">Azka Masumi <span>Founder</span></p>
          </div>
          <div className="kr-photo-tiles has-photo-tiles">
            <div className="photo-tiles">
              {[1,2,3,4,5,6].map((n) => (
                <div
                  className={`photo-tile${selected === n ? ' is-selected' : ''}`}
                  key={n}
                  onClick={() => setSelected((prev) => (prev === n ? null : n))}
                >
                  <img src={`/media/kry/kry-${n}.jpg`} alt={`Krypton project ${n}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW WE WORK */}
      <section className="kr-section">
        <div className="kr-wrap">
          <h2>How we <em>work.</em></h2>
          <ul className="kr-principles">
            <li>
              <h3>Designed around you</h3>
              <p>No one-size-fits-all systems. Every design is tailored to how you use power, your roof, and India's climate and grid.</p>
            </li>
            <li>
              <h3>Honest advice</h3>
              <p>If something won't work for you, we'll say so upfront, even if it means a smaller sale.</p>
            </li>
            <li>
              <h3>Installed properly</h3>
              <p>A handpicked team of trained electricians follows strict installation protocols, and answers your questions in plain language.</p>
            </li>
            <li>
              <h3>Support that stays</h3>
              <p>We handle DISCOM liaison and help you claim available subsidies, and we are here long after installation.</p>
            </li>
          </ul>
          <p className="kr-closing">One standard of quality, whatever the size: for homeowners, factories and warehouses, and commercial complexes.</p>
        </div>
      </section>

      {/* 4. WHERE WE WORK */}
      <section className="kr-section">
        <div className="kr-wrap kr-where">
          <div className="kr-map-slot">Place the existing India map here</div>
          <div>
            <h2>Where we <em>work.</em></h2>
            <ul className="kr-regions">
              <li><h3>Patna, Delhi NCR, Uttarakhand</h3><p>Residential, commercial and industrial installations</p></li>
              <li><h3>India-wide</h3><p>Commercial and industrial installations</p></li>
            </ul>
            <div className="kr-legend">
              <span>Residential + commercial and industrial</span>
              <span>Commercial and industrial only</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROOF */}
      <section className="kr-section">
        <div className="kr-wrap">
          <h2>Trusted by those <em>we've worked with.</em></h2>
          <div className="kr-letters-slot">Place the existing client letters carousel here, with a caption naming the client, place and country</div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="kr-section kr-cta">
        <div className="kr-wrap">
          <p className="kr-hindi" lang="hi">अपनी बिजली बनाओ और पैसे बचाओ</p>
          <h2>Ready to make <em>the switch?</em></h2>
          <p>Talk to our team and get a solar solution designed around you.</p>
          <a className="kr-button" href="/contact">Get a free consultation</a>
          <p className="kr-note">No obligation. Honest advice.</p>
        </div>
      </section>
    </main>
  )
}
