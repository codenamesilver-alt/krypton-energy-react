import { useQuoteModal } from '../context/QuoteModal'

export default function TwoPaths() {
  const { open: openQuote } = useQuoteModal()
  return (
    <section className="section" id="homes">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 className="paths-title">Solar System Customised to your Energy <span style={{ color: '#e4d18e' }}>Needs</span></h2>
          </div>
        </div>

        <div className="paths">
          <article className="path path-biz">
            <div className="path-content">
              <div className="path-tag">For business</div>
              <h3>Commercial &amp; Industrial Solar Solutions</h3>
              <p>We provide solar solutions for factories, offices, warehouses, shops and other commercial spaces. Our systems help businesses generate their own electricity, reduce monthly power bills and depend less on grid electricity.</p>
              <a className="link-arrow" href="#quote" onClick={(e) => { e.preventDefault(); openQuote() }}>
                Talk to our C&amp;I team
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
