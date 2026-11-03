import { useQuoteModal } from '../context/QuoteModal'

export default function TwoPaths() {
  const { open: openQuote } = useQuoteModal()
  return (
    <section className="section" id="homes">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2>Solar System Customised to your Energy Needs</h2>
          </div>
        </div>

        <div className="paths">
          <article className="path path-home">
            <div className="path-tag">For business</div>
            <h3>Commercial &amp; Industrial Solar Solutions</h3>
            <p>We provide solar solutions for factories, offices, warehouses, shops and other commercial spaces. Our systems help businesses generate their own electricity, reduce monthly power bills and depend less on grid electricity.</p>
            <ul className="path-list">
              <li>Site inspection and energy consumption assessment.</li>
              <li>Customised solar solutions for businesses and industries.</li>
              <li>Complete installation, setup and grid connection support.</li>
              <li>Ongoing maintenance and after-sales service.</li>
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
