import { useQuoteModal } from '../context/QuoteModal'

export default function TwoPaths() {
  const { open: openQuote } = useQuoteModal()
  return (
    <section className="section" id="homes">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="kicker">Two kinds of roofs</div>
            <h2>One company. Two very different jobs.</h2>
          </div>
          <p>A 3 kW roof in Patna and a 3 MW plant in Pune are not the same project. We staff, price and design them separately — so neither gets a diluted version of the other.</p>
        </div>

        <div className="paths">
          <article className="path path-home">
            <div className="path-tag">For homes</div>
            <h3>Your roof, working for the monthly bill.</h3>
            <p>We size the system to your actual consumption, handle the DISCOM application and the PM Surya Ghar subsidy, and stay on after commissioning.</p>
            <ul className="path-list">
              <li>Free roof survey and shading check</li>
              <li>Subsidy and net-metering paperwork</li>
              <li>Local engineers in Patna, Delhi and Uttarakhand</li>
              <li>Service response within 48 hours</li>
            </ul>
            <a className="link-arrow" href="#quote" onClick={(e) => { e.preventDefault(); openQuote() }}>
              Plan my rooftop
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
          </article>

          <article className="path path-biz" id="business">
            <div className="path-tag">For business</div>
            <h3>Solar at the scale your operations actually run.</h3>
            <p>Feasibility, engineering, EPC and O&amp;M for industrial and commercial sites — anywhere in India, with production downtime treated as a design constraint.</p>
            <ul className="path-list">
              <li>Load study and feasibility report</li>
              <li>Rooftop, ground-mount and hybrid systems</li>
              <li>Execution with zero-production-loss planning</li>
              <li>Monitoring and annual maintenance contracts</li>
            </ul>
            <a className="link-arrow" href="#quote" onClick={(e) => { e.preventDefault(); openQuote() }}>
              Talk to our C&amp;I team
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
