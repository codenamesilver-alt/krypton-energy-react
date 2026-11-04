import '../styles/about.css'
import { useQuoteModal } from '../context/QuoteModal'

export default function ReadyToSwitch() {
  const { open: openQuote } = useQuoteModal()
  return (
    <section className="ready-cta">
      <div className="wrap">
        <div className="about-cta">
          <h2>Ready to make <span>the switch?</span></h2>
          <p>Talk to our team and discover a solar solution designed around you. Let’s power a cleaner, more reliable future together.</p>
          <button className="btn btn-gold" onClick={openQuote}>Get a Free Consultation</button>
          <p className="calc-note" style={{ marginTop: 16 }}>No obligation. Honest advice. A plain-language answer to every question.</p>
        </div>
      </div>
    </section>
  )
}
