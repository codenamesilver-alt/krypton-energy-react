import { useQuoteModal } from '../context/QuoteModal'
import { products } from '../data/content'

export default function Hero() {
  const { open: openQuote } = useQuoteModal()

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
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