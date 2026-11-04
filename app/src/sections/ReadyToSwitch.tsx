import '../styles/backup.css'
import { useQuoteModal } from '../context/QuoteModal'

export default function ReadyToSwitch() {
  const { open: openQuote } = useQuoteModal()
  return (
    <section className="kr-main kr-cta ready-cta">
      <div className="wrap">
        <h2>Ready to make <em>the switch?</em></h2>
        <p>Talk to our team and discover a solar solution designed around you. Let’s power a cleaner, more reliable future together.</p>
        <button type="button" className="kr-button" onClick={openQuote}>Get a Free Consultation</button>
        <p className="kr-note">No obligation. Honest advice.</p>
      </div>
    </section>
  )
}
