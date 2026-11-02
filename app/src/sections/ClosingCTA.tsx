import { useQuoteModal } from '../context/QuoteModal'

export default function ClosingCTA() {
  const { open: openQuote } = useQuoteModal()
  return (
    <section className="closing" id="quote">
      <div className="wrap closing-grid">
        <h2>Start with your <em>last bill.</em></h2>
        <div>
          <div className="closing-actions">
            <button className="btn btn-gold" onClick={openQuote}>Upload Bill & Get Quote</button>
          </div>
        </div>
      </div>
    </section>
  )
}